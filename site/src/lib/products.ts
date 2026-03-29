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
  accentBg: string;
  muted: string;
  fonts: { display: string; body: string };
  palette: ProductPaletteItem[];
  features?: string[];
  type: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    slug: "oneschool",
    name: "OneSchool",
    domain: "oneschool.co.uk",
    tagline: "One platform. Every school.",
    oneliner:
      "A unified operating system for UK primary schools. Replaces fragmented MIS, safeguarding, SEND, curriculum, and communication tools with a single, designed-with-care platform.",
    category: "School Management Platform",
    status: "Define & Build",
    why: "16,000 UK primary schools run on fragmented systems built elsewhere. OneSchool is the permanent, designed-with-care alternative to VC-backed incumbents that will be sold within five years.",
    bg: "#F0F7FC",
    surface: "#D6EAF8",
    text: "#0A1A24",
    accent: "#1A5276",
    accentBg: "#D6EAF8",
    muted: "#3D7A9C",
    fonts: { display: "DM Serif Display", body: "DM Sans" },
    palette: [
      { name: "Ice", hex: "#F0F7FC" },
      { name: "Sky", hex: "#D6EAF8" },
      { name: "Deep", hex: "#0A1A24" },
      { name: "Teal", hex: "#1A5276" },
      { name: "Mist", hex: "#3D7A9C" },
    ],
    features: [
      "One login for MIS, safeguarding, SEND tracking, curriculum planning, and parent communication. No more switching between four systems that don't talk to each other.",
      "Built for UK primary schools specifically — DfE requirements, Ofsted readiness, and safeguarding workflows designed in from day one, not bolted on.",
      "Safeguarding files live in EazyAccess Vault. School reports formatted by PagePerfect. Teachers and parents log in through EazyAccess ID. Every product makes every other product stronger.",
    ],
    type: "Institutional B2B",
    featured: true,
  },
  {
    slug: "hushrealm",
    name: "HushRealm",
    domain: "hushrealm.co.uk",
    tagline: "Everything important. Safe. Silent. Yours.",
    oneliner:
      "UK's private document vault. Store your will, passport, insurance, medical records — encrypted, accessible only to you and who you choose.",
    category: "Private Document Vault",
    status: "Define & Build",
    why: "When someone dies and the family cannot find the will, that is a failure of infrastructure. HushRealm is that infrastructure — built once, trusted forever.",
    bg: "#F7F5FD",
    surface: "#ECEBFC",
    text: "#1A1830",
    accent: "#5B4FD4",
    accentBg: "#ECEBFC",
    muted: "#7874A8",
    fonts: { display: "DM Serif Display", body: "DM Sans" },
    palette: [
      { name: "Abyss", hex: "#05050D" },
      { name: "Midnight", hex: "#0D0D1A" },
      { name: "Ghost", hex: "#E8E4F0" },
      { name: "Iris", hex: "#5B4FD4" },
      { name: "Dusk", hex: "#3D3B5C" },
    ],
    features: [
      "Encrypted storage for the documents that matter most — will, passport, insurance, medical records. You decide who can access what, and when.",
      "Trusted nominees see only what you release. When life gets complicated, your family finds everything in one place instead of hunting through drawers and inboxes.",
      "UK-focused, GDPR-aware, and built for the long term. Less than a coffee a month. No ads, no data sale, no compromise.",
    ],
    type: "Consumer",
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
    bg: "#F3F7FB",
    surface: "#E4EDF6",
    text: "#0E1A24",
    accent: "#1B3D5C",
    accentBg: "#E4EDF6",
    muted: "#4E7090",
    fonts: { display: "DM Serif Display", body: "DM Sans" },
    palette: [
      { name: "Parchment", hex: "#F5F0E8" },
      { name: "Cream", hex: "#EDE6D8" },
      { name: "Ink", hex: "#1A1510" },
      { name: "Prussian", hex: "#1B3D5C" },
      { name: "Dust", hex: "#9C9488" },
    ],
    features: [
      "Proposals, reports, and guides that look like they were designed — not dumped from a template. Editorial precision without the designer price tag.",
      "Every word, every line, exactly where it should be. No more wrestling with Word or fighting Google Docs. Just clean, considered output.",
      "Publish in minutes. Share a link or export for print. The gap between rough draft and client-ready has never been smaller.",
    ],
    type: "Consumer & B2B",
  },
  {
    slug: "farmcompanion",
    name: "FarmCompanion",
    domain: "farmcompanion.co.uk",
    tagline: "Britain's farms, found.",
    oneliner:
      "The definitive directory of UK farms. Find, explore, and connect with British agriculture — from smallholders to estates.",
    category: "UK Farm Directory",
    status: "Build",
    why: "There is no trusted, well-designed central directory of UK farms. Farm tourism is growing. Direct sourcing is growing. FarmCompanion is the infrastructure layer this market is missing.",
    bg: "#F3F8F0",
    surface: "#E3EFE0",
    text: "#0E1C09",
    accent: "#3A6824",
    accentBg: "#E3EFE0",
    muted: "#537A43",
    fonts: { display: "DM Serif Display", body: "DM Sans" },
    palette: [
      { name: "Oat", hex: "#F2EDE3" },
      { name: "Wheat", hex: "#E8E0D0" },
      { name: "Soil", hex: "#1A1F12" },
      { name: "Leaf", hex: "#3A6824" },
      { name: "Sage", hex: "#8A8A78" },
    ],
    features: [
      "Find UK farms by location, type, and what they offer — farm shops, stays, experiences, direct sales. One place to explore British agriculture.",
      "Designed for discovery. No clutter, no noise. Farmers get a clear, honest listing; visitors get a map and a path to the gate.",
      "The infrastructure layer the market has been missing. Farm tourism and direct sourcing keep growing — FarmCompanion is the directory that makes both work.",
    ],
    type: "Community",
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
    bg: "#FBF8EF",
    surface: "#F4EDCC",
    text: "#1A1500",
    accent: "#9C7200",
    accentBg: "#F4EDCC",
    muted: "#856A00",
    fonts: { display: "DM Serif Display", body: "DM Sans" },
    palette: [
      { name: "Linen", hex: "#F7F2E8" },
      { name: "Warm White", hex: "#EEE6D5" },
      { name: "Forest", hex: "#1C1E14" },
      { name: "Sovereign Gold", hex: "#9C7200" },
      { name: "Flax", hex: "#8C8472" },
    ],
    features: [
      "Allowances, spending rules, and savings goals in one place. Parents set the rules; kids see what they have and what they're working toward.",
      "Not a bank — a layer on top of how your family already handles money. Visibility without complexity. Control without bureaucracy.",
      "Built for intention. Teach saving, spending, and giving with a tool that doesn't talk down to kids or overwhelm parents.",
    ],
    type: "Consumer",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}
