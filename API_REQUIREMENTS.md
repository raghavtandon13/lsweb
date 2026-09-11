# API requirements (LoanSparrow web)

Identity is **mobile**. A different number is a different customer. Logout must end the auth session **and** the in-progress apply file so the next number does not inherit PAN / CIBIL / lender responses.

## Apply journey (current UI)

1. `/apply` — name + mobile + terms
2. `/apply/verify` — SMS OTP
3. `/apply/details` — email, PAN, pincode, income, loan amount (min ₹5,000), purpose, employment, DOB
4. `/apply/consent` — CIBIL OTP, then bureau + lender-share ticks (WhatsApp optional). Soft check; does not affect score
5. `/apply/processing` — eligibility job (see lender pipeline below)
6. `/apply/cibil` — **last page.** Score card + tabs **Loan offers** | **Credit Cure**. Loan tab shows **only `accept`** lender responses. Zero accepts → empty copy (“No loan offer. No worries…”) + Credit Cure CTA. Reject / dedupe are never shown
7. `/apply/cibil/details` — full report. Credit Cure add-ons: `/apply/addons`, `/apply/addons/{slug}`, `/apply/addons/{slug}/done`

`/apply/offers` redirects to `/apply/cibil`. `/apply/no-offer` is leftover; primary no-accept UX is the Loan offers tab on `/apply/cibil`.

## Lender pipeline (eligibility job, server-side)

Leads may arrive from **multiple partners**. Before any lender API:

1. Filter by **age, income, pincode** (and product policy)
2. **Dedupe** against existing lender files
3. If not duplicate → **create lead**
4. Push to **lenders / NBFCs in priority order**. Lender APIs are **rate-limited**
5. Persist every response with outcome **`accept` | `reject` | `dedupe`**

UI rule: **`accept` only**. `reject` and `dedupe` stay on the file for ops; they must not appear as offer cards.

---

## Send application OTP

- **Screen / component:** Apply — Name + mobile (`/apply`, home Quick Apply)
- **Why:** Customer submits name and mobile and must accept Terms / Privacy / Disclaimer before OTP is sent. Bind the session to this mobile; if mobile changed, drop the previous customer’s apply file.
- **Method + path:** `POST /api/v1/apply/otp/send`
- **Request:** `{ "mobile": "string (10-digit IN)", "name": "string", "purpose": "apply", "termsAccepted": true }`
- **Response:** `{ "ok": true, "otpSent": true, "resendAfterSeconds": 30, "sessionId": "string" }` Example: `{ "ok": true, "otpSent": true, "resendAfterSeconds": 30, "sessionId": "sess_7f3a" }`
- **States:** Loading: button “Sending…”. Empty: N/A. Error: inline message for invalid mobile, missing terms tick, rate-limit, or SMS failure. Do not send OTP if `termsAccepted` is not true.
- **Blocking?** yes

## Verify application OTP

- **Screen / component:** Apply — OTP (`/apply/verify`)
- **Why:** Prove possession of the mobile. Issues customer session. Customer is keyed by mobile (not a hardcoded name).
- **Method + path:** `POST /api/v1/apply/otp/verify`
- **Request:** `{ "sessionId": "string", "mobile": "string", "otp": "string (6)" }`
- **Response:** `{ "ok": true, "verified": true, "accessToken": "string", "refreshToken": "string", "expiresIn": 900, "customerId": "string", "name": "string | null" }` Example: `{ "ok": true, "verified": true, "accessToken": "eyJ…", "refreshToken": "rt_…", "expiresIn": 900, "customerId": "cus_19", "name": "Riya Sharma" }`
- **States:** Loading: “Verifying…”. Empty: N/A. Error: wrong OTP, expired, too many attempts — offer resend. Wrong number → back to `/apply`.
- **Blocking?** yes

## Create or resume application

- **Screen / component:** Apply — after OTP (PAN is collected later on details)
- **Why:** Persist the file under this mobile so the customer can pause and see it under My Applications. Resume only if the same mobile.
- **Method + path:** `POST /api/v1/applications`
- **Request:** `{ "mobile": "string", "name": "string", "source": "web", "productHint": "string | null" }`
- **Response:** `{ "applicationId": "string", "status": "draft" | "profile_pending" | "consent_pending" | "processing" | "eligible" | "no_offer" | "expired", "createdAt": "iso8601" }` Example: `{ "applicationId": "SU-240918-1842", "status": "draft", "createdAt": "2026-09-08T10:00:00+05:30" }`
- **States:** Loading: skeleton on resume. Empty: start new. Error: duplicate open file for this mobile.
- **Blocking?** yes

## Validate PAN

- **Screen / component:** Apply — Details (`/apply/details`)
- **Why:** Catch format and (if you have it) NSDL/name mismatch before bureau OTP.
- **Method + path:** `POST /api/v1/kyc/pan/validate`
- **Request:** `{ "pan": "string" }`
- **Response:** `{ "valid": true, "pan": "string", "nameOnPan": "string | null", "status": "valid" | "invalid" | "not_found" }` Example: `{ "valid": true, "pan": "FQRPS1234L", "nameOnPan": "RIYA SHARMA", "status": "valid" }`
- **States:** Loading: field spinner. Empty: N/A. Error: invalid format vs not found vs service down.
- **Blocking?** no

## Pincode lookup

- **Screen / component:** Apply — Details (`/apply/details`)
- **Why:** Show city/state and fail early if no partner services that pincode (eligibility filter input).
- **Method + path:** `GET /api/v1/geo/pincode/{pincode}`
- **Request:** path `pincode: string (6)`; no body
- **Response:** `{ "pincode": "string", "city": "string", "state": "string", "serviceable": boolean, "unserviceableProducts": "string[]" }` Example: `{ "pincode": "400051", "city": "Mumbai", "state": "Maharashtra", "serviceable": true, "unserviceableProducts": [] }`
- **States:** Loading: city placeholder. Empty: unknown pincode. Error: 4xx invalid, 5xx retry.
- **Blocking?** no

## Save application profile

- **Screen / component:** Apply — Details (`/apply/details`); also Edit details from consent / CIBIL details
- **Why:** Underwriting inputs: age (from DOB), income, pincode, ticket, employment. Material change (PAN, income, pincode, amount, employment, DOB) must clear CIBIL + lender responses and re-run consent.
- **Method + path:** `PATCH /api/v1/applications/{applicationId}/profile`
- **Request:** `{ "email": "string", "pincode": "string", "pan": "string", "monthlyIncome": "number", "loanAmount": "number", "purpose": "medical" | "travel" | "education" | "wedding" | "home" | "business" | "other", "employmentType": "salaried" | "self_employed" | "business" | "student" | "homemaker" | "other", "dateOfBirth": "string (YYYY-MM-DD)" }`
- **Response:** `{ "applicationId": "string", "status": "consent_pending", "city": "string", "age": "number" }` Example: `{ "applicationId": "SU-240918-1842", "status": "consent_pending", "city": "Mumbai", "age": 32 }`
- **States:** Loading: button pending. Empty: N/A. Error: underage, invalid DOB, income bounds, amount &lt; 5000, invalid email/PAN/pincode.
- **Blocking?** yes

## Send CIBIL OTP

- **Screen / component:** Apply — Consent (`/apply/consent`)
- **Why:** Second OTP before bureau pull. Soft enquiry; copy must say it will not affect the score.
- **Method + path:** `POST /api/v1/apply/cibil-otp/send`
- **Request:** `{ "applicationId": "string", "mobile": "string" }`
- **Response:** `{ "ok": true, "otpSent": true, "resendAfterSeconds": 30 }` Example: `{ "ok": true, "otpSent": true, "resendAfterSeconds": 30 }`
- **States:** Loading: “Sending…”. Error: rate-limit, SMS failure.
- **Blocking?** yes

## Record consents + verify CIBIL OTP

- **Screen / component:** Apply — Consent (`/apply/consent`)
- **Why:** Timestamped proof of bureau pull, lender-share, T&Cs (already accepted on step 1), optional WhatsApp, plus CIBIL OTP.
- **Method + path:** `POST /api/v1/applications/{applicationId}/consents`
- **Request:** `{ "cibilOtp": "string (6)", "bureauPull": true, "shareWithLenders": true, "termsAndPrivacy": true, "whatsapp": false, "policyVersions": { "terms": "string", "privacy": "string", "disclaimer": "string" } }`
- **Response:** `{ "consentId": "string", "recordedAt": "iso8601", "applicationStatus": "processing" }` Example: `{ "consentId": "cns_88", "recordedAt": "2026-09-08T10:05:00+05:30", "applicationStatus": "processing" }`
- **States:** Loading: “Recording…”. Empty: N/A. Error: OTP not sent / wrong OTP, missing required ticks, stale policy version.
- **Blocking?** yes

## Start eligibility job

- **Screen / component:** Apply — Processing (`/apply/processing`)
- **Why:** Run lender pipeline: filter age/income/pincode → dedupe → create lead if new → push lenders/NBFCs by priority (rate-limited) → persist outcomes.
- **Method + path:** `POST /api/v1/applications/{applicationId}/eligibility`
- **Request:** `{ }` (auth + applicationId in path)
- **Response:** `{ "jobId": "string", "status": "queued" | "running", "pollAfterMs": 1500 }` Example: `{ "jobId": "job_55", "status": "queued", "pollAfterMs": 1500 }`
- **States:** Loading: progress copy (“Checking duplicates…”, “Pushing to lenders…”, “Saving lender responses…”). Empty: N/A. Error: consent missing, already completed, partner timeout.
- **Blocking?** yes

## Poll eligibility job

- **Screen / component:** Apply — Processing → then `/apply/cibil`
- **Why:** Replace the fake timer with a real job. `offerCount` is **accept count only**. `no_offer` means zero accepts (rejects/dedupes may still exist on the file).
- **Method + path:** `GET /api/v1/eligibility-jobs/{jobId}`
- **Request:** none
- **Response:** `{ "jobId": "string", "status": "queued" | "running" | "eligible" | "no_offer" | "failed", "applicationId": "string", "offerCount": "number", "score": "number | null", "band": "string | null" }` Example: `{ "jobId": "job_55", "status": "eligible", "applicationId": "SU-240918-1842", "offerCount": 2, "score": 746, "band": "Good" }`
- **States:** Loading: looping status lines. Empty: N/A. Error: `failed` with retry; network error with retry. Always route to `/apply/cibil` (both tabs), not only to a no-offer page.
- **Blocking?** yes

## CIBIL snapshot (last page score card)

- **Screen / component:** Apply — CIBIL (`/apply/cibil`) and details (`/apply/cibil/details`)
- **Why:** Score + band + factors after consented soft pull. Tapping the score card opens full details. Does not change the score.
- **Method + path:** `GET /api/v1/applications/{applicationId}/cibil`
- **Request:** none
- **Response:** `{ "score": "number", "band": "string", "updated": "string", "utilisation": "number", "accounts": "number", "onTime": "number", "enquiries90d": "number", "paymentHistory": "number", "accountsList": [{ "name": "string", "type": "string", "status": "string", "opened": "string" }], "issues": [{ "title": "string", "why": "string", "fix": "string", "weight": "high" | "medium" | "low" }] }` Example: `{ "score": 746, "band": "Good", "updated": "Today", "utilisation": 28, "accounts": 6, "onTime": 0.97, "enquiries90d": 1, "paymentHistory": 96, "accountsList": [], "issues": [] }`
- **States:** Loading: gauge skeleton. Empty: back to consent. Error: bureau down.
- **Blocking?** yes (for last page)

## List offers (accept only)

- **Screen / component:** Apply — CIBIL last page, Loan offers tab (`/apply/cibil`); Dashboard — Available offers
- **Why:** Named lender cards. **Must return only `outcome: "accept"`.** Do not return reject/dedupe rows to the client.
- **Method + path:** `GET /api/v1/applications/{applicationId}/offers`
- **Request:** none
- **Response:** `{ "applicationId": "string", "validUntil": "iso8601", "acceptCount": "number", "offers": [{ "offerId": "string", "lenderId": "string", "lenderName": "string", "productName": "string", "amount": "number", "tenureMonths": "number", "roiPercent": "number", "processingFeeText": "string", "emi": "number", "disbursalText": "string", "highlights": "string[]", "recommended": "boolean" }] }` Example: `{ "applicationId": "SU-240918-1842", "validUntil": "2026-09-22T18:00:00+05:30", "acceptCount": 1, "offers": [{ "offerId": "off_01", "lenderId": "ln_aarohan", "lenderName": "Aarohan Finance", "productName": "Short Term Personal Loan", "amount": 80000, "tenureMonths": 12, "roiPercent": 18.5, "processingFeeText": "2% + GST", "emi": 7346, "disbursalText": "24–48 hrs after KYC", "highlights": ["No foreclosure in first 45 days"], "recommended": true }] }`
- **States:** Loading: card skeletons. Empty (`offers: []`): Loan offers tab empty state — heading “No loan offer. No worries.” body about checking history and making changes **by Credit Cure**. Do not say “not eligible” as the headline. Credit Cure tab still available. Error: retry banner; do not invent rates.
- **Blocking?** yes (for the loan tab)

## Lender responses (ops / not shown in UI)

- **Screen / component:** Internal / future ops. Web UI does **not** list these.
- **Why:** Persist every lender/NBFC push: accept, reject, dedupe, priority, rate-limit skips.
- **Method + path:** `GET /api/v1/applications/{applicationId}/lender-responses`
- **Request:** none (restrict to ops roles; do not call from customer web)
- **Response:** `{ "applicationId": "string", "responses": [{ "lenderId": "string", "lenderName": "string", "priority": "number", "outcome": "accept" | "reject" | "dedupe", "reason": "string | null", "offerId": "string | null" }] }` Example: `{ "applicationId": "SU-240918-1842", "responses": [{ "lenderId": "ln_aarohan", "lenderName": "Aarohan Finance", "priority": 1, "outcome": "accept", "reason": null, "offerId": "off_01" }, { "lenderId": "ln_kaveri", "lenderName": "Kaveri Capital", "priority": 3, "outcome": "dedupe", "reason": "Open file already exists", "offerId": null }] }`
- **States:** N/A on customer UI.
- **Blocking?** no

## No-accept payload (optional)

- **Screen / component:** Apply — Loan offers empty state on `/apply/cibil` (not a separate last page)
- **Why:** Optional reason for ops / Credit Cure copy. Customer-facing copy stays warm; do not lead with “not eligible”.
- **Method + path:** `GET /api/v1/applications/{applicationId}/outcome`
- **Request:** none
- **Response:** `{ "status": "no_offer", "acceptCount": 0, "reasonCode": "string | null", "reasonMessage": "string | null", "retryAfterDays": "number | null", "suggestedProductSlugs": "string[]" }` Example: `{ "status": "no_offer", "acceptCount": 0, "reasonCode": "NO_ACCEPT", "reasonMessage": null, "retryAfterDays": 30, "suggestedProductSlugs": ["sudhar", "builder", "report"] }`
- **States:** Empty: generic Credit Cure copy. Error: still show empty loan tab + Credit Cure.
- **Blocking?** no

## List Credit Cure add-ons

- **Screen / component:** Apply — Credit Cure tab (`/apply/cibil`); `/apply/addons`
- **Why:** Paid plans when there is no accept, or optional score lift. Product name is **Credit Cure** (slug may stay `sudhar` for compatibility).
- **Method + path:** `GET /api/v1/addons`
- **Request:** query `{ "applicationId": "string | null" }`
- **Response:** `{ "items": [{ "slug": "sudhar" | "builder" | "report", "name": "string", "price": "number", "tagline": "string" }] }` Example: `{ "items": [{ "slug": "sudhar", "name": "Credit Cure", "price": 99, "tagline": "4-week plan to fix the habits that drag the score." }, { "slug": "builder", "name": "Credit builder loan", "price": 500, "tagline": "₹500 reported instalment line." }, { "slug": "report", "name": "Full credit report", "price": 99, "tagline": "Every factor and what to fix first." }] }`
- **States:** Loading: cards. Empty: hide tab body. Error: retry.
- **Blocking?** no

## Purchase add-on (demo pay)

- **Screen / component:** `/apply/addons/{slug}` → `/apply/addons/{slug}/done`
- **Why:** Record Credit Cure / builder / report purchase against the application.
- **Method + path:** `POST /api/v1/applications/{applicationId}/addons/{slug}/purchase`
- **Request:** `{ "amount": "number" }`
- **Response:** `{ "ok": true, "slug": "string", "purchasedAt": "iso8601" }` Example: `{ "ok": true, "slug": "sudhar", "purchasedAt": "2026-09-10T18:00:00+05:30" }`
- **States:** Loading: pay button. Error: already purchased, payment fail.
- **Blocking?** no

## Select offer / continue to lender

- **Screen / component:** Offer cards — “Apply with {lender}”
- **Why:** Record choice and return a redirect URL into the partner KYC journey. Only valid for an `accept` offerId.
- **Method + path:** `POST /api/v1/offers/{offerId}/select`
- **Request:** `{ "applicationId": "string" }`
- **Response:** `{ "redirectUrl": "string", "lenderSessionId": "string", "expiresAt": "iso8601" }` Example: `{ "redirectUrl": "https://kyc.partner.example/start?x=…", "lenderSessionId": "ls_1", "expiresAt": "2026-09-08T11:00:00+05:30" }`
- **States:** Loading: “Opening lender…”. Empty: N/A. Error: offer expired, already selected, lender unavailable, offer was not an accept.
- **Blocking?** yes

## Customer login send OTP

- **Screen / component:** Customer login (`/login`)
- **Why:** Passwordless access to dashboard. Customer is looked up **by mobile**.
- **Method + path:** `POST /api/v1/auth/otp/send`
- **Request:** `{ "mobile": "string", "purpose": "login" }`
- **Response:** `{ "ok": true, "resendAfterSeconds": 30 }` Example: `{ "ok": true, "resendAfterSeconds": 30 }`
- **States:** Loading: sending. Empty: N/A. Error: generic “if registered, OTP sent” preferred (do not leak whether the number exists), rate limit.
- **Blocking?** yes

## Customer login verify OTP

- **Screen / component:** Customer login — OTP step
- **Why:** Issue session for dashboard. Return that mobile’s name/profile. Do not return another customer’s file.
- **Method + path:** `POST /api/v1/auth/otp/verify`
- **Request:** `{ "mobile": "string", "otp": "string" }`
- **Response:** `{ "accessToken": "string", "refreshToken": "string", "expiresIn": 900, "customer": { "id": "string", "mobile": "string", "name": "string | null" } }` Example: `{ "accessToken": "eyJ…", "refreshToken": "rt_…", "expiresIn": 900, "customer": { "id": "cus_19", "mobile": "9876543210", "name": "Riya Sharma" } }`
- **States:** Loading: verifying. Empty: N/A. Error: invalid OTP.
- **Blocking?** yes

## Current customer

- **Screen / component:** Dashboard shell (auth gate)
- **Why:** Know who is logged in; restore name in header from this mobile.
- **Method + path:** `GET /api/v1/me`
- **Request:** none (Bearer)
- **Response:** `{ "id": "string", "mobile": "string", "name": "string | null", "email": "string | null" }` Example: `{ "id": "cus_19", "mobile": "9876543210", "name": "Riya Sharma", "email": "riya.sharma@email.com" }`
- **States:** Loading: dashboard skeleton. Empty: redirect login. Error: 401 → login.
- **Blocking?** yes

## Dashboard home summary

- **Screen / component:** Dashboard home (`/dashboard`)
- **Why:** Active application, credit snapshot, **accept-only** offer preview. Zero accepts → Credit Cure CTA, not leftover offers from another mobile.
- **Method + path:** `GET /api/v1/me/dashboard`
- **Request:** none
- **Response:** `{ "greetingName": "string | null", "activeApplication": { "id": "string", "product": "string", "amount": "number", "status": "string" } | null, "credit": { "score": "number | null", "band": "string | null", "updatedAt": "iso8601 | null" }, "offerPreview": [{ "offerId": "string", "lenderName": "string", "amount": "number", "emi": "number", "roiPercent": "number" }] }` Example: `{ "greetingName": "Riya", "activeApplication": { "id": "SU-240918-1842", "product": "Short Term Personal Loan", "amount": 80000, "status": "Offers ready" }, "credit": { "score": 746, "band": "Good", "updatedAt": "2026-09-02T00:00:00+05:30" }, "offerPreview": [{ "offerId": "off_01", "lenderName": "Aarohan Finance", "amount": 80000, "emi": 7346, "roiPercent": 18.5 }] }`
- **States:** Loading: three skeleton cards. Empty: CTA to `/apply`. No accepts: Credit Cure copy. Error: retry on home.
- **Blocking?** no

## List my applications

- **Screen / component:** My Applications (`/dashboard/applications`)
- **Why:** Table of files **for this mobile** only.
- **Method + path:** `GET /api/v1/me/applications`
- **Request:** query `{ "page": "number", "pageSize": "number" }`
- **Response:** `{ "items": [{ "id": "string", "product": "string", "amount": "number", "status": "string", "updatedAt": "iso8601", "lenderName": "string | null" }], "page": 1, "total": "number" }` Example: `{ "items": [{ "id": "SU-240918-1842", "product": "Short Term Personal Loan", "amount": 80000, "status": "Offers ready", "updatedAt": "2026-09-08T14:14:00+05:30", "lenderName": "Aarohan Finance" }], "page": 1, "total": 2 }`
- **States:** Loading: table skeleton. Empty: “No applications on this mobile”. Error: retry.
- **Blocking?** yes

## Application detail and timeline

- **Screen / component:** Application detail (`/dashboard/applications/{id}`)
- **Why:** Status timeline the customer can screenshot for support.
- **Method + path:** `GET /api/v1/applications/{applicationId}`
- **Request:** none
- **Response:** `{ "id": "string", "product": "string", "amount": "number", "status": "string", "lenderName": "string | null", "timeline": [{ "at": "iso8601", "title": "string", "detail": "string", "state": "done" | "current" | "upcoming" }] }` Example: `{ "id": "SU-240918-1842", "product": "Short Term Personal Loan", "amount": 80000, "status": "Offers ready", "lenderName": "Aarohan Finance", "timeline": [{ "at": "2026-09-08T13:02:00+05:30", "title": "Application started", "detail": "Mobile captured.", "state": "done" }] }`
- **States:** Loading: timeline placeholders. Empty: 404 page. Error: retry; 403 if not owner.
- **Blocking?** yes

## Get profile

- **Screen / component:** Profile (`/dashboard/profile`)
- **Why:** Show declared fields for **this mobile** (masked PAN/mobile).
- **Method + path:** `GET /api/v1/me/profile`
- **Request:** none
- **Response:** `{ "name": "string | null", "mobile": "string", "email": "string | null", "panMasked": "string | null", "dateOfBirth": "string | null", "pincode": "string | null", "employmentType": "string | null", "monthlyIncome": "number | null" }` Example: `{ "name": "Riya Sharma", "mobile": "9876543210", "email": "riya.sharma@email.com", "panMasked": "FQR••••4L", "dateOfBirth": "1994-06-12", "pincode": "400051", "employmentType": "salaried", "monthlyIncome": 72000 }`
- **States:** Loading: definition-list skeleton. Empty: dashes for missing fields. Error: retry.
- **Blocking?** no

## Update profile

- **Screen / component:** Profile (future edit); Support may need email
- **Why:** Change email / communication prefs without re-running PAN.
- **Method + path:** `PATCH /api/v1/me/profile`
- **Request:** `{ "email": "string | null", "whatsappOptIn": "boolean" }`
- **Response:** `{ "ok": true, "email": "string | null", "whatsappOptIn": "boolean" }` Example: `{ "ok": true, "email": "riya.sharma@email.com", "whatsappOptIn": false }`
- **States:** Loading: save button. Empty: N/A. Error: invalid email.
- **Blocking?** no

## Create support ticket

- **Screen / component:** Dashboard Support (`/dashboard/support`)
- **Why:** Logged-in help with optional application id.
- **Method + path:** `POST /api/v1/support/tickets`
- **Request:** `{ "applicationId": "string | null", "message": "string", "channel": "dashboard" }`
- **Response:** `{ "ticketId": "string", "status": "open", "createdAt": "iso8601" }` Example: `{ "ticketId": "tck_2041", "status": "open", "createdAt": "2026-09-08T15:00:00+05:30" }`
- **States:** Loading: sending. Empty: N/A. Error: validation / auth.
- **Blocking?** no

## Contact form

- **Screen / component:** Contact (`/contact`)
- **Why:** Public desk for non-logged-in people.
- **Method + path:** `POST /api/v1/contact`
- **Request:** `{ "name": "string", "email": "string", "mobile": "string", "topic": "application" | "offer" | "partner" | "other", "message": "string" }`
- **Response:** `{ "ok": true, "referenceId": "string" }` Example: `{ "ok": true, "referenceId": "ct_889" }`
- **States:** Loading: send. Empty: N/A. Error: validation, 429.
- **Blocking?** no

## Partner (NBFC / corporate) onboarding

- **Screen / component:** Partner registration (`/partners/register`)
- **Why:** Intake for regulated entities; not self-serve go-live. These partners are also lead sources into the lender pipeline.
- **Method + path:** `POST /api/v1/partners/onboarding`
- **Request:** `{ "legalName": "string", "type": "nbfc" | "bank" | "corporate", "registrationNumber": "string", "email": "string", "mobile": "string", "notes": "string" }`
- **Response:** `{ "caseId": "string", "status": "received" }` Example: `{ "caseId": "ptn_102", "status": "received" }`
- **States:** Loading: submit. Empty: N/A. Error: duplicate GST/RBI no., validation.
- **Blocking?** no

## DSA registration

- **Screen / component:** DSA registration (`/dsa/register`)
- **Why:** Capture agent leads for compliance review.
- **Method + path:** `POST /api/v1/dsa/registrations`
- **Request:** `{ "name": "string", "pan": "string", "mobile": "string", "email": "string", "city": "string", "gstin": "string | null", "notes": "string" }`
- **Response:** `{ "registrationId": "string", "status": "received" }` Example: `{ "registrationId": "dsa_441", "status": "received" }`
- **States:** Loading: submit. Empty: N/A. Error: invalid PAN, duplicate mobile.
- **Blocking?** no

## Credit score (public tool)

- **Screen / component:** Credit Score (`/credit-score`) and dashboard snapshot
- **Why:** Consented bureau score for the logged-in mobile. Apply journey uses the application CIBIL endpoint instead.
- **Method + path:** `POST /api/v1/credit/score`
- **Request:** `{ "consentId": "string", "mobile": "string", "pan": "string" }`
- **Response:** `{ "score": "number", "band": "string", "bureau": "string", "updatedAt": "iso8601" }` Example: `{ "score": 746, "band": "Good", "bureau": "CIBIL", "updatedAt": "2026-09-02T00:00:00+05:30" }`
- **States:** Loading: gauge skeleton. Empty: CTA to consent. Error: bureau down, consent missing.
- **Blocking?** no

## Credit report (public tool / full report add-on)

- **Screen / component:** Credit Report (`/credit-report`); apply CIBIL details; add-on `report`
- **Why:** Tradelines instead of fictional rows.
- **Method + path:** `GET /api/v1/credit/report`
- **Request:** query `{ "consentId": "string" }` or Bearer after score consent
- **Response:** `{ "generatedAt": "iso8601", "accounts": [{ "name": "string", "type": "string", "status": "open" | "closed", "dpd": "string", "limitOrAmount": "number | null" }], "enquiriesLast30Days": "number" }` Example: `{ "generatedAt": "2026-09-08T10:00:00+05:30", "accounts": [{ "name": "Aarohan Finance PL", "type": "Personal loan", "status": "open", "dpd": "000", "limitOrAmount": 120000 }], "enquiriesLast30Days": 1 }`
- **States:** Loading: table skeleton. Empty: “No tradelines”. Error: consent / bureau.
- **Blocking?** no

## Analytics event ingest (CRM or warehouse)

- **Screen / component:** Site-wide (`PageTracker` + apply funnel + lead forms)
- **Why:** Same payload as Google Analytics stage movement so CRM can store funnel steps without a second schema. Browser already POSTs here when `VITE_ANALYTICS_ENDPOINT` is set; GA4 is optional via `VITE_GA_MEASUREMENT_ID`.
- **Method + path:** `POST /api/v1/analytics/events`
- **Request:** `{ "event": "analytics", "event_name": "string", "client_id": "string", "session_id": "string", "timestamp_micros": "number", "params": { "funnel_name": "loan_apply | null", "funnel_step": "number | null", "funnel_step_name": "string | null", "page_location": "string", "page_path": "string", "page_title": "string", "engagement_time_msec": "number", "...": "extra GA-style params" } }`
- **Do not send:** PAN, full mobile, name, OTP, or other PII in `params`.
- **Event names:** `page_view`, `funnel_step`, `generate_lead`, `login`, `view_item`, `select_item`
- **Funnel `loan_apply` steps:** `1 apply_start` → `2 otp_verified` → `3 profile_submitted` → `4 consent_recorded` → `5 eligibility_completed` / `cibil_shown` → `6 offers_shown` (accept count &gt; 0) | `7 no_offer_shown` (accept count = 0, Credit Cure tab still shown). Page views on `/apply/*` also attach `funnel_step` / `funnel_step_name`.
- **Response:** `{ "ok": true, "accepted": true }` Example: `{ "ok": true, "accepted": true }`
- **States:** Fire-and-forget from the browser (`sendBeacon`). Empty: N/A. Error: retry not required on the client; events are also queued locally (`loansparrow.analytics.events`).
- **Blocking?** no

## Logout

- **Screen / component:** Dashboard — Log out
- **Why:** Invalidate refresh token. Client must also clear apply session (`loansparrow.apply`) and auth (`loansparrow.auth`) so the next customer (next mobile) does not see old details.
- **Method + path:** `POST /api/v1/auth/logout`
- **Request:** `{ "refreshToken": "string" }`
- **Response:** `{ "ok": true }` Example: `{ "ok": true }`
- **States:** Loading: button. Empty: N/A. Error: still clear local session.
- **Blocking?** no
