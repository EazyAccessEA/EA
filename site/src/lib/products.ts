export interface ProductPaletteItem {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  name: string;
  domain: string;
  tagline: string;
  oneliner: string;
  category: string;
  status: string;
  why: string;
  bg: string;
  surface: string;
  text: string;
  accent: string;
  muted: string;
  fonts: { display: string; body: string };
  palette: ProductPaletteItem[];
  /** Optional: 3 editorial feature paragraphs for product page */
  features?: string[];
}

export const products: Product[] = [
  {
    slug: "hushrealm",
    name: "HushRealm",
    domain: "hushrealm.co.uk",
    tagline: "Everything important. Safe. Silent. Yours.",
    oneliner:
      "UK's private document vault. Store your will, passport, insurance, medical records — encrypted, accessible only to you and who you choose.",
    category: "Privacy & Document Safety",
    status: "Define & Build",
    why: "PagePerfect creates docs. HushRealm keeps them safe. When life gets complicated — illness, death, emergency — everything is in one place. That's the product.",
    bg: "#05050D",
    surface: "#0D0D1A",
    text: "#E8E4F0",
    accent: "#6C5CE7",
    muted: "#3D3B5C",
    fonts: { display: "DM Serif Display", body: "DM Sans" },
    palette: [
      { name: "Abyss", hex: "#05050D" },
      { name: "Midnight", hex: "#0D0D1A" },
      { name: "Ghost", hex: "#E8E4F0" },
      { name: "Iris", hex: "#6C5CE7" },
      { name: "Dusk", hex: "#3D3B5C" },
    ],
    features: [
      "Encrypted storage for the documents that matter most — will, passport, insurance, medical records. You decide who can access what, and when.",
      "Trusted nominees see only what you release. When life gets complicated, your family finds everything in one place instead of hunting through drawers and inboxes.",
      "UK-focused, GDPR-aware, and built for the long term. Less than a coffee a month. No ads, no data sale, no compromise.",
    ],
  },
  {
    slug: "pageperfect",
    name: "PagePerfect",
    domain: "pageperfect.studio",
    tagline: "Documents that look like someone cared.",
    oneliner:
      "Format and publish professional documents without a designer. Proposals, reports, guides — made beautiful in minutes.",
    category: "Document Publishing",
    status: "Build",
    why: "Every professional has documents that look amateur. Word formatting is a nightmare. PagePerfect is the gap between Google Docs and hiring a designer.",
    bg: "#F5F0E8",
    surface: "#EDE6D8",
    text: "#1A1510",
    accent: "#1C3D5A",
    muted: "#9C9488",
    fonts: { display: "DM Serif Display", body: "DM Sans" },
    palette: [
      { name: "Parchment", hex: "#F5F0E8" },
      { name: "Cream", hex: "#EDE6D8" },
      { name: "Ink", hex: "#1A1510" },
      { name: "Prussian", hex: "#1C3D5A" },
      { name: "Dust", hex: "#9C9488" },
    ],
    features: [
      "Proposals, reports, and guides that look like they were designed — not dumped from a template. Editorial precision without the designer price tag.",
      "Every word, every line, exactly where it should be. No more wrestling with Word or fighting Google Docs. Just clean, considered output.",
      "Publish in minutes. Share a link or export for print. The gap between rough draft and client-ready has never been smaller.",
    ],
  },
  {
    slug: "farmcompanion",
    name: "FarmCompanion",
    domain: "farmcompanion.co.uk",
    tagline: "Britain's farms, found.",
    oneliner:
      "The definitive directory of UK farms. Find, explore, and connect with British agriculture — from smallholders to estates.",
    category: "UK Agriculture Directory",
    status: "Build",
    why: "There is no trusted, well-designed central directory of UK farms. Farm tourism is growing. Direct sourcing is growing. FarmCompanion is the infrastructure layer this market is missing.",
    bg: "#F2EDE3",
    surface: "#E8E0D0",
    text: "#1A1F12",
    accent: "#4A7C2F",
    muted: "#8A8A78",
    fonts: { display: "DM Serif Display", body: "DM Sans" },
    palette: [
      { name: "Oat", hex: "#F2EDE3" },
      { name: "Wheat", hex: "#E8E0D0" },
      { name: "Soil", hex: "#1A1F12" },
      { name: "Leaf", hex: "#4A7C2F" },
      { name: "Sage", hex: "#8A8A78" },
    ],
    features: [
      "Find UK farms by location, type, and what they offer — farm shops, stays, experiences, direct sales. One place to explore British agriculture.",
      "Designed for discovery. No clutter, no noise. Farmers get a clear, honest listing; visitors get a map and a path to the gate.",
      "The infrastructure layer the market has been missing. Farm tourism and direct sourcing keep growing — FarmCompanion is the directory that makes both work.",
    ],
  },
  {
    slug: "allowanceguard",
    name: "AllowanceGuard",
    domain: "allowanceguard.com",
    tagline: "Your family's money. Actually managed.",
    oneliner:
      "Family financial control — allowances, spending rules, savings goals, and visibility for parents. Not a bank. A financial operating system for families.",
    category: "Family FinTech",
    status: "Define",
    why: "Parents have no proper tool to manage children's money with intention. Banks are too complex. Cash is invisible. AllowanceGuard is the missing middle.",
    bg: "#F7F2E8",
    surface: "#EEE6D5",
    text: "#1C1E14",
    accent: "#B8860B",
    muted: "#8C8472",
    fonts: { display: "DM Serif Display", body: "DM Sans" },
    palette: [
      { name: "Linen", hex: "#F7F2E8" },
      { name: "Warm White", hex: "#EEE6D5" },
      { name: "Forest", hex: "#1C1E14" },
      { name: "Sovereign Gold", hex: "#B8860B" },
      { name: "Flax", hex: "#8C8472" },
    ],
    features: [
      "Allowances, spending rules, and savings goals in one place. Parents set the rules; kids see what they have and what they're working toward.",
      "Not a bank — a layer on top of how your family already handles money. Visibility without complexity. Control without bureaucracy.",
      "Built for intention. Teach saving, spending, and giving with a tool that doesn't talk down to kids or overwhelm parents.",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}
