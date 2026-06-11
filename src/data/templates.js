export const TEMPLATES = [
  // --- PAIR 1: Account Opening ---
  {
    id: "acct-us",
    name: "Account Opening - US Customer",
    category: "Account Opening",
    region: "US",
    pair: "acct-eu",
    lastModified: "2026-05-12",
    usedCount: 142,
    documents: [
      { name: "Client Agreement - US", pages: 8 },
      { name: "Intake Form - US", pages: 2 },
    ],
    recipients: [
      {
        role: "Client",
        authType: "Docusign ID Verification",
        authDetail:
          "The recipient will need to identify themselves using a valid government ID or eID, their CLEAR account or through Knowledge-Based Authentication.",
        action: "Needs to Sign",
      },
    ],
  },
  {
    id: "acct-eu",
    name: "Account Opening - EU Client",
    category: "Account Opening",
    region: "EU",
    pair: "acct-us",
    lastModified: "2026-05-14",
    usedCount: 88,
    documents: [
      { name: "Client Account Agreement - EU", pages: 8 },
      { name: "Intake Form - EU", pages: 2 },
      { name: "GDPR Privacy Policy", pages: 9 },
    ],
    recipients: [
      {
        role: "Client",
        authType: "Docusign ID Verification for EU Qualified",
        authDetail: "The recipient will need to identify themselves with a valid government ID.",
        action: "Needs to Sign",
      },
    ],
  },
  // --- PAIR 2: NDA ---
  {
    id: "nda-us",
    name: "Non-Disclosure Agreement - US",
    category: "NDA",
    region: "US",
    pair: "nda-eu",
    lastModified: "2026-04-20",
    usedCount: 310,
    documents: [
      { name: "Mutual NDA - US", pages: 4 },
    ],
    recipients: [
      { role: "Counterparty", authType: "Email Authentication", authDetail: "Standard email verification.", action: "Needs to Sign" },
      { role: "Internal Signatory", authType: "SMS Authentication", authDetail: "One-time passcode via SMS.", action: "Needs to Sign" },
    ],
  },
  {
    id: "nda-eu",
    name: "Non-Disclosure Agreement - EU",
    category: "NDA",
    region: "EU",
    pair: "nda-us",
    lastModified: "2026-04-22",
    usedCount: 195,
    documents: [
      { name: "Mutual NDA - EU", pages: 5 },
      { name: "GDPR Data Processing Addendum", pages: 3 },
    ],
    recipients: [
      { role: "Counterparty", authType: "Docusign ID Verification for EU Qualified", authDetail: "Valid government ID required.", action: "Needs to Sign" },
      { role: "Internal Signatory", authType: "SMS Authentication", authDetail: "One-time passcode via SMS.", action: "Needs to Sign" },
    ],
  },
  // --- PAIR 3: Employment Contract ---
  {
    id: "emp-us",
    name: "Employment Contract - US",
    category: "Employment",
    region: "US",
    pair: "emp-eu",
    lastModified: "2026-03-05",
    usedCount: 74,
    documents: [
      { name: "At-Will Employment Agreement", pages: 6 },
      { name: "Benefits Enrollment Form", pages: 3 },
    ],
    recipients: [
      { role: "New Hire", authType: "Email Authentication", authDetail: "Standard email verification.", action: "Needs to Sign" },
      { role: "HR Manager", authType: "Access Code", authDetail: "Shared access code.", action: "Needs to Sign" },
    ],
  },
  {
    id: "emp-eu",
    name: "Employment Contract - EU",
    category: "Employment",
    region: "EU",
    pair: "emp-us",
    lastModified: "2026-03-07",
    usedCount: 52,
    documents: [
      { name: "EU Employment Agreement", pages: 8 },
      { name: "Works Council Notice", pages: 2 },
      { name: "GDPR Employee Data Notice", pages: 4 },
    ],
    recipients: [
      { role: "New Hire", authType: "Docusign ID Verification for EU Qualified", authDetail: "Valid government ID required.", action: "Needs to Sign" },
      { role: "HR Manager", authType: "Access Code", authDetail: "Shared access code.", action: "Needs to Sign" },
    ],
  },
  // --- PAIR 4: Vendor Agreement ---
  {
    id: "vendor-us",
    name: "Vendor Agreement - Standard",
    category: "Vendor",
    region: "US",
    pair: "vendor-eu",
    lastModified: "2026-02-18",
    usedCount: 230,
    documents: [
      { name: "Master Vendor Agreement", pages: 12 },
      { name: "Statement of Work", pages: 5 },
    ],
    recipients: [
      { role: "Vendor Representative", authType: "Email Authentication", authDetail: "Standard email verification.", action: "Needs to Sign" },
      { role: "Procurement Lead", authType: "SMS Authentication", authDetail: "One-time passcode via SMS.", action: "Needs to Sign" },
    ],
  },
  {
    id: "vendor-eu",
    name: "Vendor Agreement - EU Enterprise",
    category: "Vendor",
    region: "EU",
    pair: "vendor-us",
    lastModified: "2026-02-20",
    usedCount: 118,
    documents: [
      { name: "EU Master Vendor Agreement", pages: 14 },
      { name: "Statement of Work", pages: 5 },
      { name: "Data Processing Agreement", pages: 7 },
    ],
    recipients: [
      { role: "Vendor Representative", authType: "Docusign ID Verification for EU Qualified", authDetail: "Valid government ID required.", action: "Needs to Sign" },
      { role: "Procurement Lead", authType: "SMS Authentication", authDetail: "One-time passcode via SMS.", action: "Needs to Sign" },
    ],
  },
];

export const TEMPLATE_PAIRS = [
  { usId: "acct-us", euId: "acct-eu", category: "Account Opening", combinedName: "Account Opening - Global (US + EU)" },
  { usId: "nda-us", euId: "nda-eu", category: "NDA", combinedName: "Non-Disclosure Agreement - Global" },
  { usId: "emp-us", euId: "emp-eu", category: "Employment", combinedName: "Employment Contract - Global" },
  { usId: "vendor-us", euId: "vendor-eu", category: "Vendor", combinedName: "Vendor Agreement - Global" },
];

export const AGREEMENTS = [
  { id: "env-001", subject: "Account Opening - Acme Corp", status: "completed", recipient: "james.wu@acmecorp.com", sent: "2026-05-30", completed: "2026-06-01", template: "acct-us" },
  { id: "env-002", subject: "NDA - Brightfield Partners", status: "sent", recipient: "sara.malik@brightfield.eu", sent: "2026-06-08", completed: null, template: "nda-eu" },
  { id: "env-003", subject: "Employment Contract - T. Rivera", status: "declined", recipient: "t.rivera@email.com", sent: "2026-06-05", completed: "2026-06-07", template: "emp-us" },
  { id: "env-004", subject: "Vendor Agreement - Nexus Ltd", status: "sent", recipient: "contracts@nexusltd.eu", sent: "2026-06-10", completed: null, template: "vendor-eu" },
  { id: "env-005", subject: "NDA - DataSync Inc", status: "completed", recipient: "legal@datasync.com", sent: "2026-05-20", completed: "2026-05-22", template: "nda-us" },
];