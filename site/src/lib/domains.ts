export interface Domain {
  number: string;
  name: string;
  description: string;
  products: string[];
  arrPotential: string;
  status: "active" | "pipeline";
  featured?: boolean;
}

export const domains: Domain[] = [
  {
    number: "01",
    name: "Life Administration",
    description:
      "Document vaults, digital legacy, Power of Attorney, family records. Every household has this problem. Almost no good software addresses it.",
    products: ["HushRealm", "AllowanceGuard"],
    arrPotential: "£15–20M",
    status: "active",
  },
  {
    number: "02",
    name: "Education",
    description:
      "16,000 UK primary schools, all running fragmented systems built elsewhere. OneSchool is the permanent, designed-with-care alternative to VC-backed incumbents.",
    products: ["OneSchool"],
    arrPotential: "£5–10M",
    status: "active",
    featured: true,
  },
  {
    number: "03",
    name: "Professional Publishing",
    description:
      "Individuals, institutions, councils, law firms, NHS trusts — all producing documents that deserve better than Word.",
    products: ["PagePerfect"],
    arrPotential: "£3–8M",
    status: "active",
  },
  {
    number: "04",
    name: "British Land & Agriculture",
    description:
      "British farms are specific, regulated, and community-embedded. No American product understands them.",
    products: ["FarmCompanion"],
    arrPotential: "£2–5M",
    status: "active",
  },
  {
    number: "05",
    name: "Small British Business",
    description:
      "Millions of sole traders, independent retailers, and tradespeople using American accounting software with British fields bolted on.",
    products: [],
    arrPotential: "£8–15M",
    status: "pipeline",
  },
  {
    number: "06",
    name: "British Property",
    description:
      "Landlords, homeowners, and property managers navigating increasing regulatory complexity with fragmented, expensive tools.",
    products: [],
    arrPotential: "£5–12M",
    status: "pipeline",
  },
  {
    number: "07",
    name: "Health Administration",
    description:
      "The NHS provides excellent clinical care. The organisational layer — appointments, prescriptions, care coordination — is almost entirely unbuilt.",
    products: [],
    arrPotential: "£5–10M",
    status: "pipeline",
  },
];
