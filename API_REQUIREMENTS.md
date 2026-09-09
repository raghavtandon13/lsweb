## Send application OTP

- **Screen / component:** Apply — Name + mobile (`/apply`, home Quick Apply)
- **Why:** Customer submits name and mobile and must accept Terms / Privacy / Disclaimer before OTP is sent.
- **Method + path:** `POST /api/v1/apply/otp/send`
- **Request:** `{ "mobile": "string (10-digit IN)", "name": "string", "purpose": "apply", "termsAccepted": true }`
- **Response:** `{ "ok": true, "otpSent": true, "resendAfterSeconds": 30, "sessionId": "string" }` Example: `{ "ok": true, "otpSent": true, "resendAfterSeconds": 30, "sessionId": "sess_7f3a" }`
- **States:** Loading: button “Sending…”. Empty: N/A. Error: inline message for invalid mobile, missing terms tick, rate-limit, or SMS failure. Do not send OTP if `termsAccepted` is not true.
- **Blocking?** yes

## Verify application OTP

- **Screen / component:** Apply — OTP (`/apply/verify`)
- **Why:** Prove possession of the mobile before PAN is treated as belonging to this session.
- **Method + path:** `POST /api/v1/apply/otp/verify`
- **Request:** `{ "sessionId": "string", "mobile": "string", "otp": "string (6)" }`
- **Response:** `{ "ok": true, "verified": true, "accessToken": "string", "refreshToken": "string", "expiresIn": 900, "customerId": "string" }` Example: `{ "ok": true, "verified": true, "accessToken": "eyJ…", "refreshToken": "rt_…", "expiresIn": 900, "customerId": "cus_19" }`
- **States:** Loading: “Verifying…”. Empty: N/A. Error: wrong OTP, expired, too many attempts — offer resend.
- **Blocking?** yes

## Create or resume application

- **Screen / component:** Apply — after OTP, used again on later steps
- **Why:** Persist the file so the customer can pause and see it under My Applications.
- **Method + path:** `POST /api/v1/applications`
- **Request:** `{ "mobile": "string", "pan": "string", "source": "web", "productHint": "string | null" }`
- **Response:** `{ "applicationId": "string", "status": "draft" | "profile_pending" | "consent_pending" | "processing" | "eligible" | "no_offer" | "expired", "createdAt": "iso8601" }` Example: `{ "applicationId": "SU-240918-1842", "status": "draft", "createdAt": "2026-09-08T10:00:00+05:30" }`
- **States:** Loading: skeleton on resume. Empty: start new. Error: PAN mismatch with existing customer, duplicate open file.
- **Blocking?** yes

## Validate PAN

- **Screen / component:** Apply — Mobile + PAN
- **Why:** Catch format and (if you have it) NSDL/name mismatch before OTP spend.
- **Method + path:** `POST /api/v1/kyc/pan/validate`
- **Request:** `{ "pan": "string" }`
- **Response:** `{ "valid": true, "pan": "string", "nameOnPan": "string | null", "status": "valid" | "invalid" | "not_found" }` Example: `{ "valid": true, "pan": "FQRPS1234L", "nameOnPan": "RIYA SHARMA", "status": "valid" }`
- **States:** Loading: field spinner. Empty: N/A. Error: invalid format vs not found vs service down.
- **Blocking?** no

## Pincode lookup

- **Screen / component:** Apply — Profile (`/apply/details`)
- **Why:** Show city/state and fail early if no partner services that pincode.
- **Method + path:** `GET /api/v1/geo/pincode/{pincode}`
- **Request:** path `pincode: string (6)`; no body
- **Response:** `{ "pincode": "string", "city": "string", "state": "string", "serviceable": boolean, "unserviceableProducts": "string[]" }` Example: `{ "pincode": "400051", "city": "Mumbai", "state": "Maharashtra", "serviceable": true, "unserviceableProducts": [] }`
- **States:** Loading: city placeholder. Empty: unknown pincode. Error: 4xx invalid, 5xx retry.
- **Blocking?** no

## Save application profile

- **Screen / component:** Apply — Pincode + income + employment + DOB
- **Why:** Underwriting inputs for eligibility.
- **Method + path:** `PATCH /api/v1/applications/{applicationId}/profile`
- **Request:** `{ "pincode": "string", "monthlyIncome": "number", "employmentType": "salaried" | "self_employed" | "business" | "student" | "homemaker" | "other", "dateOfBirth": "string (YYYY-MM-DD)" }`
- **Response:** `{ "applicationId": "string", "status": "consent_pending", "city": "string", "age": "number" }` Example: `{ "applicationId": "SU-240918-1842", "status": "consent_pending", "city": "Mumbai", "age": 32 }`
- **States:** Loading: button pending. Empty: N/A. Error: underage, invalid DOB, income bounds.
- **Blocking?** yes

## Record consents

- **Screen / component:** Apply — Consent / disclosure (`/apply/consent`)
- **Why:** Timestamped proof of bureau, lender-share, T&Cs, optional WhatsApp.
- **Method + path:** `POST /api/v1/applications/{applicationId}/consents`
- **Request:** `{ "bureauPull": true, "shareWithLenders": true, "termsAndPrivacy": true, "whatsapp": false, "policyVersions": { "terms": "string", "privacy": "string", "disclaimer": "string" } }`
- **Response:** `{ "consentId": "string", "recordedAt": "iso8601", "applicationStatus": "processing" }` Example: `{ "consentId": "cns_88", "recordedAt": "2026-09-08T10:05:00+05:30", "applicationStatus": "processing" }`
- **States:** Loading: “Recording…”. Empty: N/A. Error: missing required ticks, stale policy version.
- **Blocking?** yes

## Start eligibility job

- **Screen / component:** Apply — Eligibility processing (`/apply/processing`)
- **Why:** Kick off partner matching; UI polls until offers or no-offer.
- **Method + path:** `POST /api/v1/applications/{applicationId}/eligibility`
- **Request:** `{ }` (auth + applicationId in path)
- **Response:** `{ "jobId": "string", "status": "queued" | "running", "pollAfterMs": 1500 }` Example: `{ "jobId": "job_55", "status": "queued", "pollAfterMs": 1500 }`
- **States:** Loading: progress copy. Empty: N/A. Error: consent missing, already completed, partner timeout message.
- **Blocking?** yes

## Poll eligibility job

- **Screen / component:** Apply — Eligibility processing
- **Why:** Replace the fake timer with a real job; route to offers or no-offer.
- **Method + path:** `GET /api/v1/eligibility-jobs/{jobId}`
- **Request:** none
- **Response:** `{ "jobId": "string", "status": "queued" | "running" | "eligible" | "no_offer" | "failed", "applicationId": "string", "offerCount": "number", "reasonCode": "string | null", "reasonMessage": "string | null" }` Example: `{ "jobId": "job_55", "status": "eligible", "applicationId": "SU-240918-1842", "offerCount": 3, "reasonCode": null, "reasonMessage": null }`
- **States:** Loading: looping status lines. Empty: N/A. Error: `failed` with retry; network error with retry.
- **Blocking?** yes

## List offers for application

- **Screen / component:** Apply — Eligible offers (`/apply/offers`) and Dashboard — Available offers
- **Why:** Named lender cards with amount, tenor, ROI, fee, EMI, flags.
- **Method + path:** `GET /api/v1/applications/{applicationId}/offers`
- **Request:** none
- **Response:** `{ "applicationId": "string", "validUntil": "iso8601", "offers": [{ "offerId": "string", "lenderId": "string", "lenderName": "string", "productName": "string", "amount": "number", "tenureMonths": "number", "roiPercent": "number", "processingFeeText": "string", "emi": "number", "disbursalText": "string", "highlights": "string[]", "recommended": "boolean" }] }` Example: `{ "applicationId": "SU-240918-1842", "validUntil": "2026-09-22T18:00:00+05:30", "offers": [{ "offerId": "off_01", "lenderId": "ln_aarohan", "lenderName": "Aarohan Finance", "productName": "Short Term Personal Loan", "amount": 80000, "tenureMonths": 12, "roiPercent": 18.5, "processingFeeText": "2% + GST", "emi": 7346, "disbursalText": "24–48 hrs after KYC", "highlights": ["No foreclosure in first 45 days"], "recommended": true }] }`
- **States:** Loading: card skeletons. Empty: treat as no-offer screen. Error: retry banner; do not invent rates.
- **Blocking?** yes

## No-offer payload

- **Screen / component:** Apply — No suitable offer (`/apply/no-offer`)
- **Why:** Show reason (when allowed) and recommended next products without implying a decline is personal failure.
- **Method + path:** `GET /api/v1/applications/{applicationId}/outcome`
- **Request:** none
- **Response:** `{ "status": "no_offer", "reasonCode": "string", "reasonMessage": "string", "retryAfterDays": "number | null", "suggestedProductSlugs": "string[]" }` Example: `{ "status": "no_offer", "reasonCode": "INCOME_BELOW_POLICY", "reasonMessage": "No partner priced this income and ticket.", "retryAfterDays": 30, "suggestedProductSlugs": ["gold", "card-against-fd"] }`
- **States:** Loading: same spinner as processing then this page. Empty: generic copy if reason withheld. Error: generic no-offer + retry eligibility.
- **Blocking?** no

## Select offer / continue to lender

- **Screen / component:** Offer cards — “Continue with {lender}”
- **Why:** Record choice and return a redirect URL into the partner KYC journey.
- **Method + path:** `POST /api/v1/offers/{offerId}/select`
- **Request:** `{ "applicationId": "string" }`
- **Response:** `{ "redirectUrl": "string", "lenderSessionId": "string", "expiresAt": "iso8601" }` Example: `{ "redirectUrl": "https://kyc.partner.example/start?x=…", "lenderSessionId": "ls_1", "expiresAt": "2026-09-08T11:00:00+05:30" }`
- **States:** Loading: “Opening lender…”. Empty: N/A. Error: offer expired, already selected, lender unavailable.
- **Blocking?** yes

## Customer login send OTP

- **Screen / component:** Customer login (`/login`)
- **Why:** Passwordless access to dashboard.
- **Method + path:** `POST /api/v1/auth/otp/send`
- **Request:** `{ "mobile": "string", "purpose": "login" }`
- **Response:** `{ "ok": true, "resendAfterSeconds": 30 }` Example: `{ "ok": true, "resendAfterSeconds": 30 }`
- **States:** Loading: sending. Empty: N/A. Error: unknown mobile (do not leak whether PAN exists — generic “if registered, OTP sent” preferred), rate limit.
- **Blocking?** yes

## Customer login verify OTP

- **Screen / component:** Customer login — OTP step
- **Why:** Issue session for dashboard.
- **Method + path:** `POST /api/v1/auth/otp/verify`
- **Request:** `{ "mobile": "string", "otp": "string" }`
- **Response:** `{ "accessToken": "string", "refreshToken": "string", "expiresIn": 900, "customer": { "id": "string", "mobile": "string", "name": "string | null" } }` Example: `{ "accessToken": "eyJ…", "refreshToken": "rt_…", "expiresIn": 900, "customer": { "id": "cus_19", "mobile": "9876543210", "name": "Riya Sharma" } }`
- **States:** Loading: verifying. Empty: N/A. Error: invalid OTP.
- **Blocking?** yes

## Current customer

- **Screen / component:** Dashboard shell (auth gate)
- **Why:** Know who is logged in; restore name in header.
- **Method + path:** `GET /api/v1/me`
- **Request:** none (Bearer)
- **Response:** `{ "id": "string", "mobile": "string", "name": "string | null", "email": "string | null" }` Example: `{ "id": "cus_19", "mobile": "9876543210", "name": "Riya Sharma", "email": "riya.sharma@email.com" }`
- **States:** Loading: dashboard skeleton. Empty: redirect login. Error: 401 → login.
- **Blocking?** yes

## Dashboard home summary

- **Screen / component:** Dashboard home (`/dashboard`)
- **Why:** Active application, credit snapshot, preview of offers.
- **Method + path:** `GET /api/v1/me/dashboard`
- **Request:** none
- **Response:** `{ "greetingName": "string | null", "activeApplication": { "id": "string", "product": "string", "amount": "number", "status": "string" } | null, "credit": { "score": "number | null", "band": "string | null", "updatedAt": "iso8601 | null" }, "offerPreview": [{ "offerId": "string", "lenderName": "string", "amount": "number", "emi": "number", "roiPercent": "number" }] }` Example: `{ "greetingName": "Riya", "activeApplication": { "id": "SU-240918-1842", "product": "Short Term Personal Loan", "amount": 80000, "status": "Offers ready" }, "credit": { "score": 746, "band": "Good", "updatedAt": "2026-09-02T00:00:00+05:30" }, "offerPreview": [{ "offerId": "off_01", "lenderName": "Aarohan Finance", "amount": 80000, "emi": 7346, "roiPercent": 18.5 }] }`
- **States:** Loading: three skeleton cards. Empty: CTA to `/apply`. Error: retry on home.
- **Blocking?** no

## List my applications

- **Screen / component:** My Applications (`/dashboard/applications`)
- **Why:** Table of files for this customer.
- **Method + path:** `GET /api/v1/me/applications`
- **Request:** query `{ "page": "number", "pageSize": "number" }`
- **Response:** `{ "items": [{ "id": "string", "product": "string", "amount": "number", "status": "string", "updatedAt": "iso8601", "lenderName": "string | null" }], "page": 1, "total": "number" }` Example: `{ "items": [{ "id": "SU-240918-1842", "product": "Short Term Personal Loan", "amount": 80000, "status": "Offers ready", "updatedAt": "2026-09-08T14:14:00+05:30", "lenderName": "Aarohan Finance" }], "page": 1, "total": 2 }`
- **States:** Loading: table skeleton. Empty: “No files yet” + check eligibility. Error: retry.
- **Blocking?** yes

## Application detail and timeline

- **Screen / component:** Application detail (`/dashboard/applications/{id}`)
- **Why:** Status timeline the customer can screenshot for support.
- **Method + path:** `GET /api/v1/applications/{applicationId}`
- **Request:** none
- **Response:** `{ "id": "string", "product": "string", "amount": "number", "status": "string", "lenderName": "string | null", "timeline": [{ "at": "iso8601", "title": "string", "detail": "string", "state": "done" | "current" | "upcoming" }] }` Example: `{ "id": "SU-240918-1842", "product": "Short Term Personal Loan", "amount": 80000, "status": "Offers ready", "lenderName": "Aarohan Finance", "timeline": [{ "at": "2026-09-08T13:02:00+05:30", "title": "Application started", "detail": "Mobile and PAN captured.", "state": "done" }] }`
- **States:** Loading: timeline placeholders. Empty: 404 page. Error: retry; 403 if not owner.
- **Blocking?** yes

## Get profile

- **Screen / component:** Profile (`/dashboard/profile`)
- **Why:** Show declared KYC-ish fields (masked PAN/mobile).
- **Method + path:** `GET /api/v1/me/profile`
- **Request:** none
- **Response:** `{ "name": "string | null", "mobile": "string", "email": "string | null", "panMasked": "string", "dateOfBirth": "string | null", "pincode": "string | null", "employmentType": "string | null", "monthlyIncome": "number | null" }` Example: `{ "name": "Riya Sharma", "mobile": "9876543210", "email": "riya.sharma@email.com", "panMasked": "FQR••••4L", "dateOfBirth": "1994-06-12", "pincode": "400051", "employmentType": "salaried", "monthlyIncome": 72000 }`
- **States:** Loading: definition-list skeleton. Empty: collect missing fields CTA. Error: retry.
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
- **Why:** Intake for regulated entities; not self-serve go-live.
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

## Credit score

- **Screen / component:** Credit Score (`/credit-score`) and dashboard snapshot
- **Why:** Replace the sample 746 with a consented bureau score.
- **Method + path:** `POST /api/v1/credit/score`
- **Request:** `{ "consentId": "string", "mobile": "string", "pan": "string" }`
- **Response:** `{ "score": "number", "band": "string", "bureau": "string", "updatedAt": "iso8601" }` Example: `{ "score": 746, "band": "Good", "bureau": "CIBIL", "updatedAt": "2026-09-02T00:00:00+05:30" }`
- **States:** Loading: gauge skeleton. Empty: CTA to consent. Error: bureau down, consent missing.
- **Blocking?** no

## Credit report

- **Screen / component:** Credit Report (`/credit-report`)
- **Why:** Tradelines table instead of fictional rows.
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
- **Funnel `loan_apply` steps:** `1 apply_start` → `2 otp_verified` → `3 profile_submitted` → `4 consent_recorded` → `5 eligibility_completed` → `6 offers_shown` | `7 no_offer_shown`. Page views on `/apply/*` also attach `funnel_step` / `funnel_step_name`.
- **Response:** `{ "ok": true, "accepted": true }` Example: `{ "ok": true, "accepted": true }`
- **States:** Fire-and-forget from the browser (`sendBeacon`). Empty: N/A. Error: retry not required on the client; events are also queued locally (`loansparrow.analytics.events`).
- **Blocking?** no

## Logout

- **Screen / component:** Dashboard — Log out
- **Why:** Invalidate refresh token.
- **Method + path:** `POST /api/v1/auth/logout`
- **Request:** `{ "refreshToken": "string" }`
- **Response:** `{ "ok": true }` Example: `{ "ok": true }`
- **States:** Loading: button. Empty: N/A. Error: still clear local session.
- **Blocking?** no
