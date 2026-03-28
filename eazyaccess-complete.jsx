import { useState } from "react";

const portfolio = [
  {
    name: "HushRealm",
    domain: "hushrealm.co.uk",
    tagline: "Everything important. Safe. Silent. Yours.",
    oneliner: "UK's private document vault. Store your will, passport, insurance, medical records — encrypted, accessible only to you and who you choose.",
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
  },
  {
    name: "PagePerfect",
    domain: "pageperfect.studio",
    tagline: "Documents that look like someone cared.",
    oneliner: "Format and publish professional documents without a designer. Proposals, reports, guides — made beautiful in minutes.",
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
  },
  {
    name: "FarmCompanion",
    domain: "farmcompanion.co.uk",
    tagline: "Britain's farms, found.",
    oneliner: "The definitive directory of UK farms. Find, explore, and connect with British agriculture — from smallholders to estates.",
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
  },
  {
    name: "AllowanceGuard",
    domain: "allowanceguard.com",
    tagline: "Your family's money. Actually managed.",
    oneliner: "Family financial control — allowances, spending rules, savings goals, and visibility for parents. Not a bank. A financial operating system for families.",
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
  },
];

const nextjsSpec = {
  structure: [
    { path: "app/", desc: "Next.js 14 App Router root" },
    { path: "app/page.tsx", desc: "Homepage — hero, portfolio grid, about, footer" },
    { path: "app/products/page.tsx", desc: "Portfolio overview page" },
    { path: "app/products/[slug]/page.tsx", desc: "Individual product pages (hushrealm, pageperfect, etc.)" },
    { path: "app/about/page.tsx", desc: "Mission, story, founder" },
    { path: "app/press/page.tsx", desc: "Press kit, assets, contact" },
    { path: "components/ui/", desc: "Shared components — Button, Card, Nav, Footer" },
    { path: "components/brand/", desc: "Brand-specific components — ProductCard, PortfolioGrid, LogoMark" },
    { path: "lib/products.ts", desc: "Product data layer — all copy, colours, metadata" },
    { path: "styles/globals.css", desc: "CSS variables — full design token system" },
    { path: "public/brand/", desc: "Logo SVGs, brand assets, press kit files" },
  ],
  tokens: [
    { token: "--color-void", value: "#0A0A0C", usage: "Master background" },
    { token: "--color-bone", value: "#F0EBE1", usage: "Master text / light" },
    { token: "--color-ember", value: "#C8622A", usage: "Master accent" },
    { token: "--color-stone", value: "#8A8680", usage: "Secondary text" },
    { token: "--color-surface", value: "#141412", usage: "Card backgrounds" },
    { token: "--font-display", value: "DM Serif Display", usage: "All display headings" },
    { token: "--font-body", value: "DM Sans", usage: "All body text" },
    { token: "--font-mono", value: "Geist Mono", usage: "URLs, data, metadata" },
    { token: "--radius-card", value: "12px", usage: "All card radii" },
    { token: "--radius-button", value: "6px", usage: "All button radii" },
  ],
  pages: [
    {
      name: "Homepage",
      sections: [
        "Nav: Logo left, [Products] [About] [Press] right — minimal, sticky, blur backdrop",
        "Hero: Full viewport, void bg, massive DM Serif italic headline 'Access everything.' — centred, ember period",
        "Sub: One line in DM Sans 400 — 'A sovereign portfolio of tools for British life.'",
        "Single CTA: 'Explore the portfolio →' — no fill, ember border, ember text",
        "Portfolio grid: 2×2 card grid. Each card = full sub-brand bg colour, brand name, tagline, domain",
        "Hover state: card lifts, sub-brand accent border, sub-brand accent text glow",
        "Fourth card slot if <4 products: 'Something new is being built.' — no details",
        "About strip: 3-column — 'UK-built', 'Independently owned', 'No investors, no agenda'",
        "Footer: Logo, sub-brand links in mono, copyright, Privacy Policy",
      ],
    },
    {
      name: "Product Page (/products/[slug])",
      sections: [
        "Hero: sub-brand full-bleed bg, large product name, italic tagline",
        "Product description: What it is, who it's for, why it exists",
        "Feature overview: 3 core capabilities — no bullet points, editorial paragraphs",
        "CTA: Visit [productname].co.uk or 'Join the waitlist'",
        "'Part of the EazyAccess family' footer endorsement with back link",
      ],
    },
  ],
};

// Components
const Pip = ({ color, size = 8 }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: color, flexShrink: 0 }} />
);

const Tag = ({ children, color = "#C8622A" }) => (
  <span style={{
    fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase",
    color, fontWeight: 600, fontFamily: "DM Sans, sans-serif",
  }}>{children}</span>
);

const Swatch = ({ hex, name, bg = "#0A0A0C" }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <div style={{
      height: "36px", borderRadius: "4px", background: hex,
      border: (hex === bg || Math.abs(parseInt(hex.slice(1), 16) - parseInt(bg.slice(1), 16)) < 200000) ? "1px solid rgba(255,255,255,0.08)" : "none",
    }} />
    <div style={{ fontFamily: "monospace", fontSize: "8px", color: "#504E5A", lineHeight: 1.4 }}>
      <div style={{ color: "#8A8680", fontWeight: 600 }}>{name}</div>
      <div>{hex}</div>
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState("portfolio");
  const [activeBrand, setActiveBrand] = useState(0);
  const [activeSpec, setActiveSpec] = useState("structure");

  const brand = portfolio[activeBrand];

  const tabs = [
    { id: "portfolio", label: "Portfolio" },
    { id: "hushrealm", label: "HushRealm Decision" },
    { id: "nextjs", label: "Next.js Build Spec" },
    { id: "launch", label: "Launch Sequence" },
  ];

  return (
    <div style={{ background: "#0A0A0C", minHeight: "100vh", fontFamily: "DM Sans, -apple-system, sans-serif", color: "#F0EBE1" }}>

      {/* NAV */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,10,12,0.96)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid #1A1A18",
        padding: "16px 36px", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
            <path d="M6 4H4V24H24V22" stroke="#C8622A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="square" />
            <path d="M10 4H24V18" stroke="#F0EBE1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="square" />
          </svg>
          <div>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 800, fontSize: "14px", letterSpacing: "-0.03em", color: "#F0EBE1" }}>
              EAZY<span style={{ color: "#C8622A" }}>ACCESS</span>
            </div>
            <div style={{ fontSize: "8px", letterSpacing: "0.18em", color: "#504E5A", textTransform: "uppercase" }}>Brand & Build System</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "2px", background: "#0F0F0D", borderRadius: "8px", padding: "3px" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setView(t.id)} style={{
              padding: "5px 14px", borderRadius: "5px", border: "none", cursor: "pointer",
              fontFamily: "DM Sans, sans-serif", fontSize: "11px", fontWeight: 500,
              transition: "all 0.2s",
              background: view === t.id ? "#C8622A" : "transparent",
              color: view === t.id ? "#F0EBE1" : "#8A8680",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "44px 36px", maxWidth: "960px", margin: "0 auto" }}>

        {/* ───────── PORTFOLIO VIEW ───────── */}
        {view === "portfolio" && (
          <div>
            <div style={{ marginBottom: "48px" }}>
              <Tag>Complete Portfolio · 4 Products</Tag>
              <div style={{ fontFamily: "DM Serif Display, Georgia, serif", fontStyle: "italic", fontSize: "clamp(36px,6vw,64px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: "#F0EBE1", margin: "16px 0 12px" }}>
                Tools for the real<br />parts of British life.
              </div>
              <div style={{ fontSize: "14px", color: "#8A8680", maxWidth: "440px", lineHeight: 1.7 }}>
                Each product solves a specific, underserved problem. Together they form a coherent portfolio — connected by craft, not category.
              </div>
            </div>

            {/* Brand selector */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "32px" }}>
              {portfolio.map((b, i) => (
                <button key={b.name} onClick={() => setActiveBrand(i)} style={{
                  padding: "14px 12px", borderRadius: "8px", border: "none", cursor: "pointer",
                  background: activeBrand === i ? b.accent + "22" : "#141412",
                  borderLeft: activeBrand === i ? `3px solid ${b.accent}` : "3px solid transparent",
                  textAlign: "left", transition: "all 0.25s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <Pip color={b.accent} size={6} />
                    <div style={{ fontSize: "10px", color: activeBrand === i ? b.accent : "#504E5A", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{b.status}</div>
                  </div>
                  <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "14px", color: activeBrand === i ? "#F0EBE1" : "#8A8680", letterSpacing: "-0.02em" }}>{b.name}</div>
                  <div style={{ fontSize: "9px", fontFamily: "monospace", color: "#504E5A", marginTop: "2px" }}>{b.domain}</div>
                </button>
              ))}
            </div>

            {/* Deep dive */}
            <div style={{
              background: brand.bg, borderRadius: "16px", padding: "36px",
              border: `1px solid ${brand.accent}33`,
              transition: "all 0.3s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: brand.accent, marginBottom: "8px", fontWeight: 600 }}>
                    {brand.category}
                  </div>
                  <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 800, fontSize: "32px", letterSpacing: "-0.03em", color: brand.text, lineHeight: 1 }}>
                    {brand.name}
                  </div>
                  <div style={{ fontFamily: "DM Serif Display, Georgia, serif", fontStyle: "italic", fontSize: "16px", color: brand.accent, marginTop: "6px" }}>
                    {brand.tagline}
                  </div>
                </div>
                <div style={{ fontFamily: "monospace", fontSize: "10px", color: brand.accent, opacity: 0.5 }}>
                  {brand.domain}
                </div>
              </div>

              <div style={{ fontSize: "14px", color: brand.text, opacity: 0.7, lineHeight: 1.75, marginBottom: "24px", maxWidth: "560px" }}>
                {brand.oneliner}
              </div>

              <div style={{
                padding: "16px 20px", borderRadius: "8px",
                background: brand.accent + "18",
                borderLeft: `2px solid ${brand.accent}`,
                fontSize: "12px", color: brand.text, opacity: 0.75, lineHeight: 1.7,
                marginBottom: "28px",
              }}>
                <span style={{ color: brand.accent, fontWeight: 600, opacity: 1 }}>Why it exists: </span>
                {brand.why}
              </div>

              {/* Palette */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px" }}>
                {brand.palette.map(p => (
                  <Swatch key={p.hex} hex={p.hex} name={p.name} bg={brand.bg} />
                ))}
              </div>
            </div>

            {/* Portfolio map */}
            <div style={{ marginTop: "40px", padding: "28px 24px", background: "#0F0F0D", borderRadius: "12px", borderTop: "2px solid #C8622A" }}>
              <div style={{ fontSize: "10px", color: "#C8622A", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, marginBottom: "16px" }}>
                Portfolio Synergy Map
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                {[
                  { a: "PagePerfect", b: "HushRealm", rel: "Create a document → store it privately and securely" },
                  { a: "AllowanceGuard", b: "HushRealm", rel: "Manage family finances → store financial documents safely" },
                  { a: "FarmCompanion", b: "PagePerfect", rel: "Listed farm → publish professional brochures and guides" },
                  { a: "AllowanceGuard", b: "FarmCompanion", rel: "Future: farm stays, local spending, community finance" },
                ].map(({ a, b, rel }) => (
                  <div key={a + b} style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "12px", background: "#141412", borderRadius: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#F0EBE1" }}>{a}</span>
                      <span style={{ fontSize: "10px", color: "#C8622A" }}>→</span>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#F0EBE1" }}>{b}</span>
                    </div>
                    <div style={{ fontSize: "11px", color: "#8A8680", lineHeight: 1.5 }}>{rel}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ───────── HUSHREALM DECISION VIEW ───────── */}
        {view === "hushrealm" && (
          <div>
            <Tag color="#6C5CE7">Strategic Product Decision</Tag>
            <div style={{ fontFamily: "DM Serif Display, Georgia, serif", fontStyle: "italic", fontSize: "clamp(32px,5vw,52px)", lineHeight: 1, letterSpacing: "-0.02em", color: "#F0EBE1", margin: "16px 0 8px" }}>
              What HushRealm<br />should become.
            </div>
            <div style={{ fontSize: "13px", color: "#8A8680", marginBottom: "40px", lineHeight: 1.7 }}>
              Three options were evaluated. One is decisively right. Here's the full reasoning.
            </div>

            {[
              {
                option: "A",
                name: "Private Document Vault",
                verdict: "BUILD THIS",
                verdictColor: "#2ECC71",
                desc: "An encrypted, private place to store the documents that matter most — will, passport, medical records, insurance, mortgage. Accessible to you and trusted nominees only.",
                pros: ["Name is perfect — a realm of hush for important things", "Synergy: PagePerfect creates docs, HushRealm stores them", "UK market: GDPR-aware, aging population, growing awareness of digital legacy", "Clear monetisation: £3–8/month subscription, family plans", "Underserved: no premium, well-designed product does this for consumers", "When someone dies or has an emergency, this product becomes essential"],
                cons: ["Requires serious encryption/security architecture", "Trust is hard-won — needs GDPR compliance front and centre"],
                fit: 98,
              },
              {
                option: "B",
                name: "Focus / Ambient Sound App",
                verdict: "DON'T BUILD",
                verdictColor: "#E55C5C",
                desc: "White noise, focus sounds, productivity audio. 'Enter the realm of quiet.'",
                pros: ["Name works superficially", "Growing market"],
                cons: ["Brain.fm, Endel, Calm already own this space", "No portfolio synergy whatsoever", "Commoditised — impossible to differentiate on sound alone", "No natural UK angle"],
                fit: 14,
              },
              {
                option: "C",
                name: "Secure Note / Message Drop",
                verdict: "TOO NICHE",
                verdictColor: "#F59E0B",
                desc: "Send confidential messages or files that expire. One-time links. No trace.",
                pros: ["Privacy angle fits", "B2B opportunity (law firms, HR, medical)"],
                cons: ["PrivNote and similar tools already exist", "B2B requires a different go-to-market than the rest of the portfolio", "Retention problem — not a daily use product", "Doesn't leverage the portfolio synergies"],
                fit: 42,
              },
            ].map((opt) => (
              <div key={opt.option} style={{
                marginBottom: "20px",
                background: opt.verdict === "BUILD THIS" ? "#6C5CE711" : "#141412",
                border: opt.verdict === "BUILD THIS" ? "1px solid #6C5CE755" : "1px solid #1A1A18",
                borderRadius: "12px", padding: "28px 24px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                      <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#504E5A" }}>Option {opt.option}</div>
                      <div style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", background: opt.verdictColor + "22", color: opt.verdictColor }}>
                        {opt.verdict}
                      </div>
                    </div>
                    <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "20px", color: "#F0EBE1", letterSpacing: "-0.02em" }}>{opt.name}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "28px", fontWeight: 800, color: opt.verdictColor, fontFamily: "DM Sans, sans-serif", letterSpacing: "-0.04em" }}>{opt.fit}<span style={{ fontSize: "14px", opacity: 0.5 }}>%</span></div>
                    <div style={{ fontSize: "9px", color: "#504E5A", letterSpacing: "0.1em", textTransform: "uppercase" }}>Portfolio fit</div>
                  </div>
                </div>
                <div style={{ fontSize: "13px", color: "#8A8680", lineHeight: 1.7, marginBottom: "16px" }}>{opt.desc}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    {opt.pros.map(p => (
                      <div key={p} style={{ fontSize: "11px", color: "#8A8680", padding: "4px 0", borderBottom: "1px solid #1A1A18", display: "flex", gap: "8px", lineHeight: 1.5 }}>
                        <span style={{ color: "#2ECC71", flexShrink: 0 }}>+</span>{p}
                      </div>
                    ))}
                  </div>
                  <div>
                    {opt.cons.map(c => (
                      <div key={c} style={{ fontSize: "11px", color: "#504E5A", padding: "4px 0", borderBottom: "1px solid #1A1A18", display: "flex", gap: "8px", lineHeight: 1.5 }}>
                        <span style={{ color: "#E55C5C", flexShrink: 0 }}>−</span>{c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ padding: "24px", background: "#0F0F0D", borderRadius: "12px", borderLeft: "2px solid #6C5CE7" }}>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "15px", color: "#F0EBE1", marginBottom: "10px" }}>The HushRealm Manifesto (one paragraph)</div>
              <div style={{ fontFamily: "DM Serif Display, Georgia, serif", fontStyle: "italic", fontSize: "16px", color: "#E8E4F0", lineHeight: 1.8, opacity: 0.85 }}>
                "You have a will. A passport. An insurance policy. A mortgage document. Medical records. Your children's birth certificates. 
                You probably have no idea where all of them are right now. Neither does anyone else. HushRealm is the private, encrypted vault 
                where the most important documents of your life live — organised, accessible, and passed on to the people who need them, 
                only when they need them. It costs less than a coffee a month. It could save your family weeks of chaos."
              </div>
            </div>
          </div>
        )}

        {/* ───────── NEXT.JS BUILD SPEC ───────── */}
        {view === "nextjs" && (
          <div>
            <Tag>Next.js 14 · Tailwind · App Router</Tag>
            <div style={{ fontFamily: "DM Serif Display, Georgia, serif", fontStyle: "italic", fontSize: "clamp(32px,5vw,52px)", lineHeight: 1, letterSpacing: "-0.02em", color: "#F0EBE1", margin: "16px 0 8px" }}>
              The complete build spec.
            </div>
            <div style={{ fontSize: "13px", color: "#8A8680", marginBottom: "36px", lineHeight: 1.7 }}>
              eazyaccess.org · Next.js 14 · App Router · Tailwind CSS · TypeScript. Hand this to any developer and they can start immediately.
            </div>

            <div style={{ display: "flex", gap: "4px", marginBottom: "24px" }}>
              {["structure", "tokens", "pages", "components"].map(s => (
                <button key={s} onClick={() => setActiveSpec(s)} style={{
                  padding: "6px 14px", borderRadius: "6px", border: "none", cursor: "pointer",
                  fontFamily: "DM Sans, sans-serif", fontSize: "11px", fontWeight: 500,
                  background: activeSpec === s ? "#C8622A" : "#141412",
                  color: activeSpec === s ? "#F0EBE1" : "#8A8680",
                  textTransform: "capitalize",
                }}>{s}</button>
              ))}
            </div>

            {activeSpec === "structure" && (
              <div style={{ background: "#0A0C0A", borderRadius: "12px", padding: "24px", fontFamily: "monospace", fontSize: "12px" }}>
                <div style={{ color: "#4A7C2F", marginBottom: "16px", fontSize: "10px", letterSpacing: "0.1em" }}>// eazyaccess.org · Project Structure</div>
                {nextjsSpec.structure.map(({ path, desc }) => (
                  <div key={path} style={{ padding: "6px 0", borderBottom: "1px solid #0F110F", display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    <div style={{ color: "#C8622A", minWidth: "280px" }}>{path}</div>
                    <div style={{ color: "#504E5A", fontSize: "11px", flex: 1 }}>// {desc}</div>
                  </div>
                ))}
              </div>
            )}

            {activeSpec === "tokens" && (
              <div>
                <div style={{ background: "#0A0C0A", borderRadius: "12px", padding: "24px", fontFamily: "monospace", fontSize: "12px", marginBottom: "16px" }}>
                  <div style={{ color: "#4A7C2F", marginBottom: "16px", fontSize: "10px", letterSpacing: "0.1em" }}>// styles/globals.css · Design Tokens</div>
                  <div style={{ color: "#8A8680", marginBottom: "8px" }}>:root {"{"}</div>
                  {nextjsSpec.tokens.map(({ token, value, usage }) => (
                    <div key={token} style={{ padding: "5px 0 5px 20px", borderBottom: "1px solid #0F110F", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      <span style={{ color: "#6C5CE7", minWidth: "220px" }}>{token}:</span>
                      <span style={{ color: "#F0EBE1" }}>{value};</span>
                      <span style={{ color: "#504E5A", fontSize: "10px" }}>/* {usage} */</span>
                    </div>
                  ))}
                  <div style={{ color: "#8A8680", marginTop: "8px" }}>{"}"}</div>
                </div>
                <div style={{ padding: "16px 20px", background: "#141412", borderRadius: "8px", fontSize: "11px", color: "#8A8680", lineHeight: 1.8 }}>
                  <strong style={{ color: "#F0EBE1", display: "block", marginBottom: "6px" }}>Token usage rule:</strong>
                  All sub-brand colours are added as scoped tokens on their respective page wrappers.
                  For example: <span style={{ fontFamily: "monospace", color: "#C8622A" }}>[data-brand="hushrealm"]</span> sets <span style={{ fontFamily: "monospace", color: "#6C5CE7" }}>--color-accent: #6C5CE7</span>.
                  This means every shared component (Button, Card, Nav) responds to the active brand automatically.
                </div>
              </div>
            )}

            {activeSpec === "pages" && (
              <div>
                {nextjsSpec.pages.map(page => (
                  <div key={page.name} style={{ marginBottom: "20px", background: "#141412", borderRadius: "12px", padding: "24px" }}>
                    <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "16px", color: "#F0EBE1", marginBottom: "16px", letterSpacing: "-0.02em" }}>
                      {page.name}
                    </div>
                    {page.sections.map((s, i) => {
                      const [label, ...rest] = s.split(": ");
                      return (
                        <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid #1A1A18", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                          <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#C8622A", minWidth: "120px", paddingTop: "2px" }}>{label.toUpperCase()}</div>
                          <div style={{ fontSize: "12px", color: "#8A8680", flex: 1, lineHeight: 1.6 }}>{rest.join(": ")}</div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {activeSpec === "components" && (
              <div>
                {[
                  {
                    name: "LogoMark",
                    file: "components/brand/LogoMark.tsx",
                    props: "size, variant ('light'|'dark'|'ember'), showWordmark",
                    desc: "The open-corner square SVG mark. Accepts variant for different backgrounds. Optional wordmark.",
                    code: `export const LogoMark = ({ size = 28, variant = 'light', showWordmark = true }) => (
  <div className="flex items-center gap-3">
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M6 4H4V24H24V22" stroke="#C8622A" strokeWidth="2.5" />
      <path d="M10 4H24V18" stroke={variant === 'light' ? '#F0EBE1' : '#0A0A0C'} strokeWidth="2.5" />
    </svg>
    {showWordmark && <span>EAZY<span style={{color:'#C8622A'}}>ACCESS</span></span>}
  </div>
)`,
                  },
                  {
                    name: "ProductCard",
                    file: "components/brand/ProductCard.tsx",
                    props: "brand (product object), href, featured",
                    desc: "Portfolio card. Uses brand's bg/accent/text tokens. Hover reveals tagline with accent colour. Links to product page or external domain.",
                    code: `export const ProductCard = ({ brand, href }) => (
  <Link href={href} data-brand={brand.slug}
    className="group relative rounded-xl p-7 transition-all duration-300
               hover:-translate-y-1 hover:shadow-2xl"
    style={{ background: brand.bg, border: \`1px solid \${brand.accent}22\` }}>
    <span className="text-[10px] tracking-widest uppercase" style={{color: brand.accent}}>
      {brand.category}
    </span>
    <h3 className="mt-2 text-2xl font-bold tracking-tight" style={{color: brand.text}}>
      {brand.name}
    </h3>
    <p className="mt-1 font-serif italic" style={{color: brand.accent}}>
      {brand.tagline}
    </p>
  </Link>
)`,
                  },
                  {
                    name: "Button",
                    file: "components/ui/Button.tsx",
                    props: "variant ('primary'|'ghost'|'ember'), size, href",
                    desc: "Primary: ember fill. Ghost: transparent with ember border. Never rounded-full — always rounded-md for the sharp, considered aesthetic.",
                    code: `export const Button = ({ variant = 'ghost', children, href }) => {
  const styles = {
    primary: 'bg-[#C8622A] text-[#F0EBE1] border-transparent hover:bg-[#B5571F]',
    ghost: 'bg-transparent text-[#C8622A] border-[#C8622A] hover:bg-[#C8622A] hover:text-[#F0EBE1]',
  }
  return (
    <Link href={href}
      className={\`px-6 py-2.5 rounded-md text-sm font-medium border
                  transition-all duration-200 \${styles[variant]}\`}>
      {children}
    </Link>
  )
}`,
                  },
                ].map(comp => (
                  <div key={comp.name} style={{ marginBottom: "20px", background: "#141412", borderRadius: "12px", overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid #1A1A18", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "15px", color: "#F0EBE1" }}>{comp.name}</div>
                        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#504E5A", marginTop: "2px" }}>{comp.file}</div>
                      </div>
                      <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#8A8680" }}>{comp.props}</div>
                    </div>
                    <div style={{ padding: "12px 20px", borderBottom: "1px solid #1A1A18", fontSize: "12px", color: "#8A8680", lineHeight: 1.6 }}>{comp.desc}</div>
                    <div style={{ background: "#0A0C0A", padding: "16px 20px", fontFamily: "monospace", fontSize: "11px", color: "#8A8680", lineHeight: 1.7, overflow: "auto" }}>
                      <pre style={{ margin: 0 }}>{comp.code}</pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ───────── LAUNCH SEQUENCE ───────── */}
        {view === "launch" && (
          <div>
            <Tag>UK-First · Code Build · Next.js</Tag>
            <div style={{ fontFamily: "DM Serif Display, Georgia, serif", fontStyle: "italic", fontSize: "clamp(32px,5vw,52px)", lineHeight: 1, letterSpacing: "-0.02em", color: "#F0EBE1", margin: "16px 0 8px" }}>
              The sequence.
            </div>
            <div style={{ fontSize: "13px", color: "#8A8680", marginBottom: "40px", lineHeight: 1.7 }}>
              eazyaccess.org launches first. It anchors the brand. Every sub-brand that follows is introduced with authority because the parent already exists.
            </div>

            {[
              {
                phase: "Phase 1",
                weeks: "Weeks 1–2",
                title: "Foundation",
                color: "#C8622A",
                tasks: [
                  { task: "Scaffold Next.js 14 repo", detail: "App Router, TypeScript, Tailwind, ESLint, Prettier — opinionated setup from day one" },
                  { task: "Install fonts", detail: "next/font with DM Serif Display + DM Sans from Google Fonts, Geist Mono from Vercel" },
                  { task: "Build design token system", detail: "globals.css with all CSS variables. Brand scoping via data-brand attributes. Zero hardcoded colours in components." },
                  { task: "Build LogoMark component", detail: "SVG logo in all variants. Test at 12px, 24px, 120px — must be crisp at all sizes." },
                  { task: "Build shared Layout", detail: "Nav + Footer as Server Components. Sticky nav with blur backdrop. Minimal footer with mono-font sub-brand links." },
                  { task: "Deploy holding page to eazyaccess.org", detail: "Single viewport. Logo. 'Access everything.' tagline. 'Coming soon' — nothing else. Live within 48 hours of starting." },
                ],
              },
              {
                phase: "Phase 2",
                weeks: "Weeks 3–5",
                title: "eazyaccess.org Full Build",
                color: "#6C5CE7",
                tasks: [
                  { task: "Homepage hero section", detail: "Full bleed void bg. Massive italic serif headline. Single CTA. Subtle ember grain texture overlay." },
                  { task: "Portfolio grid", detail: "2×2 ProductCard grid. Each card in sub-brand colours. Hover state lifts with accent glow. Fourth card = 'Coming.' with no details." },
                  { task: "About section", detail: "'UK-built. Independently owned.' Three short editorial paragraphs. No mission statement clichés." },
                  { task: "/products page", detail: "Full portfolio list with individual product deep-dives. Each linked to its own sub-brand site." },
                  { task: "/press page", detail: "Downloadable brand kit (SVGs, PNGs, colour codes). Press contact. One paragraph company description for journalists." },
                  { task: "SEO + metadata", detail: "next/metadata for all pages. OG images generated via next/og with brand typography. robots.txt, sitemap.xml." },
                  { task: "Analytics", detail: "Vercel Analytics (zero-config, privacy-respecting). No Google Analytics — this is a privacy-conscious brand." },
                ],
              },
              {
                phase: "Phase 3",
                weeks: "Weeks 6–9",
                title: "First Sub-Brand: PagePerfect",
                color: "#1C3D5A",
                tasks: [
                  { task: "Scaffold pageperfect.studio", detail: "Separate Next.js repo or monorepo — decide early. Shared component library if monorepo." },
                  { task: "Brand token switch", detail: "Apply PagePerfect palette (parchment bg, prussian accent) via data-brand='pageperfect' scope." },
                  { task: "Product homepage", detail: "Editorial aesthetic — heavy serif typography, generous whitespace, ink-on-parchment feel. Feature overview in long-form prose, not bullet points." },
                  { task: "Waitlist / early access", detail: "Simple email capture. Resend for email delivery. No third-party forms — built in Next.js API route, stored in a database (PlanetScale or Supabase)." },
                  { task: "'by EazyAccess' endorsement", detail: "Footer: [EazyAccess logomark] 'Part of the EazyAccess family' — links back to eazyaccess.org." },
                ],
              },
              {
                phase: "Phase 4",
                weeks: "Weeks 10–14",
                title: "FarmCompanion + HushRealm (Define)",
                color: "#4A7C2F",
                tasks: [
                  { task: "farmcompanion.co.uk MVP", detail: "Directory of UK farms. Static generation from a structured data source (start with JSON, migrate to CMS). Farm listing pages with Next.js dynamic routes." },
                  { task: "Farm data seeding", detail: "Source initial farm data: Open Farm Sunday register, Companies House, manual research. Aim: 200 farms at launch." },
                  { task: "Directory search", detail: "Client-side filtering by county, farm type, public access. Upgrade to Algolia when >1,000 listings." },
                  { task: "HushRealm: write the spec", detail: "Define full feature set for the private document vault. Encryption approach (AES-256 client-side). Trusted nominee system. UK GDPR compliance documentation." },
                  { task: "HushRealm: holding page", detail: "hushrealm.co.uk goes live with: brand aesthetic, product promise, email waitlist. Collect early interest before building." },
                ],
              },
              {
                phase: "Phase 5",
                weeks: "Ongoing",
                title: "Brand System Maintenance",
                color: "#B8860B",
                tasks: [
                  { task: "Brand Bible in Notion", detail: "Living document. Every token, every rule, every voice example. Linked from eazyaccess.org/press." },
                  { task: "Component library", detail: "If building multiple sub-brands in a monorepo: extract shared components to packages/ui. Versioned releases." },
                  { task: "AllowanceGuard", detail: "Define and build once the prior products are live and generating signal. The portfolio grows with evidence, not guesswork." },
                ],
              },
            ].map((phase) => (
              <div key={phase.phase} style={{ marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: phase.color, flexShrink: 0 }} />
                  <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#504E5A" }}>{phase.weeks}</div>
                  <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "16px", color: "#F0EBE1", letterSpacing: "-0.02em" }}>
                    {phase.phase}: {phase.title}
                  </div>
                </div>
                <div style={{ marginLeft: "22px", background: "#141412", borderRadius: "10px", overflow: "hidden", borderLeft: `2px solid ${phase.color}` }}>
                  {phase.tasks.map((t, i) => (
                    <div key={t.task} style={{ padding: "12px 16px", borderBottom: i < phase.tasks.length - 1 ? "1px solid #1A1A18" : "none", display: "flex", gap: "16px", flexWrap: "wrap" }}>
                      <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "12px", color: "#F0EBE1", minWidth: "180px" }}>{t.task}</div>
                      <div style={{ fontSize: "11px", color: "#8A8680", flex: 1, lineHeight: 1.6 }}>{t.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #141412", padding: "16px 36px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "40px" }}>
        <div style={{ fontFamily: "monospace", fontSize: "9px", color: "#2A2925", letterSpacing: "0.1em" }}>EAZYACCESS · BRAND & BUILD SYSTEM · CONFIDENTIAL</div>
        <div style={{ display: "flex", gap: "16px" }}>
          {portfolio.map(b => (
            <div key={b.name} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Pip color={b.accent} size={5} />
              <span style={{ fontFamily: "monospace", fontSize: "9px", color: "#2A2925" }}>{b.domain}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
