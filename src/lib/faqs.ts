export const faqs = [
  {
    category: "About LoanSparrow",
    items: [
      {
        q: "Is LoanSparrow a bank or an NBFC?",
        a: "LoanSparrow is a digital marketplace. We do not lend our own book on this website. Loans, cards, and overdrafts are provided by partner NBFCs and banks, who take the credit decision and with whom you sign the agreement.",
      },
      {
        q: "Do you charge the customer a fee?",
        a: "LoanSparrow does not charge a browsing or eligibility-check fee. A partner lender may levy processing, documentation, or foreclosure fees — these are shown on the offer before you accept.",
      },
      {
        q: "Who sees my PAN and bank data?",
        a: "After you consent, we share what is needed with the lenders you choose to apply to, and with regulated infrastructure (KYC, bureau, Account Aggregator) as disclosed on the consent screen.",
      },
    ],
  },
  {
    category: "Eligibility & offers",
    items: [
      {
        q: "Why did I get ‘no suitable offer’?",
        a: "Partners may decline on bureau, income, pincode, employment type, or ticket size. It is not always a judgement on you — it is a match against their credit policy. You can reapply after 30 days or try a secured product (gold / FD).",
      },
      {
        q: "Does checking eligibility affect my CIBIL score?",
        a: "The matching step is a soft CIBIL enquiry — it will not affect your score. A hard pull happens only if you accept a lender’s offer and continue KYC with them.",
      },
      {
        q: "How long is an offer valid?",
        a: "Typically 7–15 days, as printed on the offer card. Rates can move if the bureau refreshes or if you change the requested amount.",
      },
    ],
  },
  {
    category: "Application journey",
    items: [
      {
        q: "What do I need to start?",
        a: "A mobile number you can receive OTP on, and your PAN. Next we ask pincode, monthly income, employment type, and date of birth — then consents.",
      },
      {
        q: "Can I pause and return?",
        a: "Yes. Log in with the same mobile. Incomplete applications sit under My Applications until they expire or you resume.",
      },
      {
        q: "How do I know a lender is genuine?",
        a: "Every live offer names the regulated entity, their logo, and key facts (APR, fee, tenor). You complete KYC on their stack or a regulated VKYC partner — never by paying an individual on UPI for ‘file movement’.",
      },
    ],
  },
  {
    category: "After disbursal",
    items: [
      {
        q: "Who do I pay EMIs to?",
        a: "To the lender whose name is on your agreement, via the NACH / UPI / virtual account they issue. LoanSparrow’s dashboard is a window; it is not the repayment destination unless explicitly stated.",
      },
      {
        q: "How do I raise a complaint?",
        a: "Use in-app Support, email support@loansparrow.in, or the Grievance Redressal page. If we (or the lender) do not resolve within the stated TAT, the RBI Ombudsman route is explained there.",
      },
    ],
  },
];

export const homeFaqs = faqs.flatMap((g) => g.items).slice(0, 5);
