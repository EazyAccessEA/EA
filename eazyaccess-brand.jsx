import { useState } from "react";

const brandSystem = {
  master: {
    name: "EazyAccess",
    tagline: "Access everything.",
    sub: "A sovereign portfolio of tools for your digital life.",
    palette: [
      { name: "Void", hex: "#0A0A0C", role: "Primary Background" },
      { name: "Bone", hex: "#F0EBE1", role: "Primary Text / Light" },
      { name: "Warm Mid", hex: "#2A2925", role: "Surface / Card" },
      { name: "Ember", hex: "#C8622A", role: "Master Accent" },
      { name: "Stone", hex: "#8A8680", role: "Secondary Text" },
    ],
    fonts: {
      display: "Clash Display",
      body: "DM Sans",
      editorial: "DM Serif Display",
    },
  },
  brands: [
    {
      name: "HushRealm",
      tagline: "Where silence is a feature.",
      desc: "Private digital sanctuary. Noise removed. Signal preserved.",
      category: "Privacy & Security",
      palette: [
        { name: "Deep Night", hex: "#070710", role: "Background" },
        { name: "Ghost White", hex: "#EBE8F4", role: "Text" },
        { name: "Dusk", hex: "#1A1830", role: "Surface" },
        { name: "Wisteria", hex: "#7C6FCD", role: "Accent" },
        { name: "Fog", hex: "#504E72", role: "Muted" },
      ],
      accent: "#7C6FCD",
      bg: "#070710",
      text: "#EBE8F4",
    },
    {
      name: "PagePerfect",
      tagline: "The page, perfected.",
      desc: "Editorial precision. Every word, every line, exactly right.",
      category: "Content & Publishing",
      palette: [
        { name: "Parchment", hex: "#F8F4EE", role: "Background" },
        { name: "Ink", hex: "#141210", role: "Text" },
        { name: "Cream", hex: "#EDE8DF", role: "Surface" },
        { name: "Prussian", hex: "#1B3A5C", role: "Accent" },
        { name: "Warm Grey", hex: "#9B9590", role: "Muted" },
      ],
      accent: "#1B3A5C",
      bg: "#F8F4EE",
      text: "#141210",
    },
    {
      name: "AllowanceGuard",
      tagline: "Your family's financial instincts, sharpened.",
      desc: "Not a bank app. A family financial operating system.",
      category: "Family FinTech",
      palette: [
        { name: "Warm White", hex: "#F7F2EB", role: "Background" },
        { name: "Forest", hex: "#1C2B1A", role: "Text" },
        { name: "Linen", hex: "#EDE5D8", role: "Surface" },
        { name: "Gold", hex: "#C49A28", role: "Accent" },
        { name: "Earth", hex: "#7A6E5F", role: "Muted" },
      ],
      accent: "#C49A28",
      bg: "#F7F2EB",
      text: "#1C2B1A",
    },
  ],
};

const Swatch = ({ color }) => (
  <div className="flex flex-col gap-1">
    <div
      className="w-full rounded"
      style={{
        backgroundColor: color.hex,
        height: "52px",
        border: color.hex === "#F8F4EE" || color.hex === "#F7F2EB" || color.hex === "#F0EBE1" ? "1px solid rgba(0,0,0,0.1)" : "none",
      }}
    />
    <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#8A8680", lineHeight: 1.4 }}>
      <div style={{ color: "#F0EBE1", fontWeight: 600 }}>{color.name}</div>
      <div>{color.hex}</div>
      <div style={{ fontSize: "9px" }}>{color.role}</div>
    </div>
  </div>
);

const SubBrandCard = ({ brand, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: active ? brand.bg : "#161614",
      border: active ? `1px solid ${brand.accent}` : "1px solid #2A2925",
      borderRadius: "12px",
      padding: "28px 24px",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      transform: active ? "translateY(-4px)" : "none",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
      <div
        style={{
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: active ? brand.accent : "#504E5A",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 500,
        }}
      >
        {brand.category}
      </div>
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: active ? brand.accent : "#2A2925",
          transition: "background 0.3s",
        }}
      />
    </div>
    <div
      style={{
        fontFamily: "'Clash Display', 'DM Sans', sans-serif",
        fontSize: "22px",
        fontWeight: 700,
        color: active ? brand.text : "#F0EBE1",
        marginBottom: "6px",
        letterSpacing: "-0.02em",
      }}
    >
      {brand.name}
    </div>
    <div
      style={{
        fontFamily: "DM Serif Display, Georgia, serif",
        fontSize: "13px",
        fontStyle: "italic",
        color: active ? brand.accent : "#8A8680",
        marginBottom: "12px",
      }}
    >
      {brand.tagline}
    </div>
    <div
      style={{
        fontSize: "12px",
        color: active ? brand.text : "#8A8680",
        fontFamily: "DM Sans, sans-serif",
        lineHeight: 1.6,
        opacity: active ? 0.75 : 0.6,
      }}
    >
      {brand.desc}
    </div>
  </div>
);

export default function EazyAccessBrand() {
  const [activeTab, setActiveTab] = useState("master");
  const [activeBrand, setActiveBrand] = useState(0);

  const tabs = ["master", "subbrand", "type", "voice"];
  const tabLabels = { master: "Master Brand", subbrand: "Sub-Brands", type: "Typography", voice: "Brand Voice" };

  return (
    <div
      style={{
        background: "#0A0A0C",
        minHeight: "100vh",
        fontFamily: "DM Sans, -apple-system, sans-serif",
        color: "#F0EBE1",
        padding: "0",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #1C1C1A",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          background: "rgba(10,10,12,0.95)",
          backdropFilter: "blur(12px)",
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Logo mark: open square */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M6 4H4V24H24V22"
              stroke="#C8622A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="square"
            />
            <path
              d="M10 4H24V18"
              stroke="#F0EBE1"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="square"
            />
          </svg>
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                letterSpacing: "-0.03em",
                color: "#F0EBE1",
              }}
            >
              EAZY<span style={{ color: "#C8622A" }}>ACCESS</span>
            </div>
            <div style={{ fontSize: "9px", letterSpacing: "0.15em", color: "#8A8680", textTransform: "uppercase" }}>
              Brand System v1
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", background: "#141412", borderRadius: "8px", padding: "4px" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "6px 16px",
                borderRadius: "6px",
                border: "none",
                fontSize: "12px",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 500,
                letterSpacing: "0.01em",
                transition: "all 0.2s",
                background: activeTab === tab ? "#C8622A" : "transparent",
                color: activeTab === tab ? "#F0EBE1" : "#8A8680",
              }}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "48px 40px", maxWidth: "1000px", margin: "0 auto" }}>

        {/* MASTER BRAND TAB */}
        {activeTab === "master" && (
          <div>
            {/* Hero typography study */}
            <div
              style={{
                marginBottom: "64px",
                paddingBottom: "64px",
                borderBottom: "1px solid #1C1C1A",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C8622A",
                  marginBottom: "24px",
                  fontWeight: 500,
                }}
              >
                Positioning
              </div>
              <div
                style={{
                  fontSize: "clamp(48px, 8vw, 88px)",
                  fontFamily: "DM Serif Display, Georgia, serif",
                  fontStyle: "italic",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  marginBottom: "24px",
                  color: "#F0EBE1",
                }}
              >
                Access
                <br />
                <span style={{ color: "#C8622A" }}>everything.</span>
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "#8A8680",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 400,
                  maxWidth: "480px",
                  lineHeight: 1.7,
                }}
              >
                {brandSystem.master.sub}
              </div>
            </div>

            {/* Logomark study */}
            <div style={{ marginBottom: "64px", paddingBottom: "64px", borderBottom: "1px solid #1C1C1A" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8622A", marginBottom: "24px", fontWeight: 500 }}>
                Logo System
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
                {/* Dark version */}
                <div style={{ background: "#0A0A0C", padding: "40px 32px", borderRadius: "12px 0 0 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", minHeight: "160px", border: "1px solid #1C1C1A" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                      <path d="M6 4H4V24H24V22" stroke="#C8622A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="square"/>
                      <path d="M10 4H24V18" stroke="#F0EBE1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="square"/>
                    </svg>
                    <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.03em", color: "#F0EBE1" }}>
                      EAZY<span style={{ color: "#C8622A" }}>ACCESS</span>
                    </span>
                  </div>
                  <div style={{ fontSize: "9px", color: "#504E5A", letterSpacing: "0.15em", textTransform: "uppercase" }}>On Dark</div>
                </div>
                {/* Light version */}
                <div style={{ background: "#F0EBE1", padding: "40px 32px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", minHeight: "160px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                      <path d="M6 4H4V24H24V22" stroke="#C8622A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="square"/>
                      <path d="M10 4H24V18" stroke="#0A0A0C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="square"/>
                    </svg>
                    <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.03em", color: "#0A0A0C" }}>
                      EAZY<span style={{ color: "#C8622A" }}>ACCESS</span>
                    </span>
                  </div>
                  <div style={{ fontSize: "9px", color: "#8A8680", letterSpacing: "0.15em", textTransform: "uppercase" }}>On Light</div>
                </div>
                {/* Mark only */}
                <div style={{ background: "#C8622A", padding: "40px 32px", borderRadius: "0 12px 12px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", minHeight: "160px" }}>
                  <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                    <path d="M6 4H4V24H24V22" stroke="rgba(240,235,225,0.5)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="square"/>
                    <path d="M10 4H24V18" stroke="#F0EBE1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="square"/>
                  </svg>
                  <div style={{ fontSize: "9px", color: "rgba(240,235,225,0.6)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Mark Only</div>
                </div>
              </div>
              <div style={{ marginTop: "16px", fontSize: "11px", color: "#504E5A", lineHeight: 1.8 }}>
                The mark: an open-corner square — an access point. The corner that's missing is intentional. That's where you enter.
                The ember accent on "ACCESS" creates a visual anchor. The mark is bisected — amber for the open path, bone for the closed structure.
              </div>
            </div>

            {/* Colour palette */}
            <div>
              <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8622A", marginBottom: "24px", fontWeight: 500 }}>
                Master Palette
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
                {brandSystem.master.palette.map((c) => (
                  <Swatch key={c.name} color={c} />
                ))}
              </div>
              <div style={{ marginTop: "24px", padding: "20px 24px", background: "#141412", borderRadius: "8px", borderLeft: "2px solid #C8622A" }}>
                <div style={{ fontSize: "11px", color: "#8A8680", lineHeight: 1.8 }}>
                  <strong style={{ color: "#F0EBE1", display: "block", marginBottom: "6px" }}>Palette Rationale</strong>
                  Void is not black — it has warmth. Bone is not white — it has age and authority. Together they create a premium contrast that feels considered, 
                  not clinical. Ember is a fire colour in a dark room — it draws the eye without shouting. This palette appears nowhere in the standard SaaS world. 
                  That's intentional.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-BRANDS TAB */}
        {activeTab === "subbrand" && (
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8622A", marginBottom: "8px", fontWeight: 500 }}>
              Portfolio
            </div>
            <div style={{ fontSize: "28px", fontFamily: "DM Serif Display, Georgia, serif", fontStyle: "italic", color: "#F0EBE1", marginBottom: "40px", letterSpacing: "-0.01em" }}>
              Three worlds. One family.
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "40px" }}>
              {brandSystem.brands.map((brand, i) => (
                <SubBrandCard
                  key={brand.name}
                  brand={brand}
                  active={activeBrand === i}
                  onClick={() => setActiveBrand(i)}
                />
              ))}
            </div>

            {/* Selected brand deep dive */}
            {(() => {
              const brand = brandSystem.brands[activeBrand];
              return (
                <div style={{ background: brand.bg, borderRadius: "16px", padding: "40px", border: `1px solid ${brand.accent}22` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
                    <div>
                      <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: brand.accent, marginBottom: "8px" }}>
                        {brand.category} · by EazyAccess
                      </div>
                      <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 800, fontSize: "36px", letterSpacing: "-0.03em", color: brand.text, marginBottom: "4px" }}>
                        {brand.name}
                      </div>
                      <div style={{ fontFamily: "DM Serif Display, Georgia, serif", fontStyle: "italic", fontSize: "16px", color: brand.accent }}>
                        {brand.tagline}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", fontSize: "11px", color: brand.accent, opacity: 0.6, fontFamily: "monospace" }}>
                      {brand.accent}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px" }}>
                    {brand.palette.map((c) => (
                      <div key={c.name} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <div style={{
                          height: "44px",
                          borderRadius: "6px",
                          background: c.hex,
                          border: (c.hex === brand.bg) ? `1px solid ${brand.accent}33` : "none"
                        }} />
                        <div style={{ fontSize: "9px", fontFamily: "monospace", lineHeight: 1.4, color: brand.accent, opacity: 0.7 }}>
                          <div style={{ fontWeight: 700, color: brand.text }}>{c.name}</div>
                          <div>{c.hex}</div>
                          <div style={{ fontSize: "8px" }}>{c.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TYPOGRAPHY TAB */}
        {activeTab === "type" && (
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8622A", marginBottom: "40px", fontWeight: 500 }}>
              Type System
            </div>

            {/* Display */}
            <div style={{ marginBottom: "56px", paddingBottom: "56px", borderBottom: "1px solid #1C1C1A" }}>
              <div style={{ fontSize: "10px", color: "#504E5A", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
                Display / Serif — DM Serif Display
              </div>
              <div style={{ fontFamily: "DM Serif Display, Georgia, serif", fontStyle: "italic", fontSize: "clamp(40px, 7vw, 72px)", lineHeight: 1, letterSpacing: "-0.02em", color: "#F0EBE1", marginBottom: "12px" }}>
                Sovereign tools<br />for sovereign people.
              </div>
              <div style={{ fontSize: "11px", color: "#504E5A" }}>
                Used for: Hero headlines, editorial pull quotes, brand taglines, section openers.
                The italic is preferred — it has presence without aggression.
              </div>
            </div>

            {/* Sans */}
            <div style={{ marginBottom: "56px", paddingBottom: "56px", borderBottom: "1px solid #1C1C1A" }}>
              <div style={{ fontSize: "10px", color: "#504E5A", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
                Body / Functional — DM Sans
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
                <div>
                  <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "24px", letterSpacing: "-0.025em", color: "#F0EBE1", marginBottom: "8px" }}>
                    Your digital life,<br />on your terms.
                  </div>
                  <div style={{ fontSize: "10px", color: "#504E5A" }}>700 · Subheading</div>
                </div>
                <div>
                  <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 400, fontSize: "15px", color: "#8A8680", lineHeight: 1.75, marginBottom: "8px" }}>
                    EazyAccess builds tools that give control back to the people using them.
                    No extraction, no complexity, no compromise. Just clean, considered software
                    that works.
                  </div>
                  <div style={{ fontSize: "10px", color: "#504E5A" }}>400 · Body copy</div>
                </div>
              </div>
            </div>

            {/* Mono */}
            <div style={{ marginBottom: "56px", paddingBottom: "56px", borderBottom: "1px solid #1C1C1A" }}>
              <div style={{ fontSize: "10px", color: "#504E5A", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
                Utility / Data — Geist Mono
              </div>
              <div style={{ fontFamily: "Geist Mono, monospace", fontSize: "13px", color: "#C8622A", letterSpacing: "0.05em", lineHeight: 1.8 }}>
                <div>HUSHREALM.COM</div>
                <div>PAGEPERFECT.IO</div>
                <div>ALLOWANCEGUARD.COM</div>
                <div style={{ color: "#504E5A", marginTop: "8px" }}>by EazyAccess · eazyaccess.org</div>
              </div>
              <div style={{ marginTop: "12px", fontSize: "11px", color: "#504E5A" }}>
                Used for: URLs, data labels, technical metadata, product codes.
              </div>
            </div>

            {/* Scale */}
            <div>
              <div style={{ fontSize: "10px", color: "#504E5A", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
                Type Scale
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { label: "Display XL", size: "72px", weight: 400, font: "DM Serif Display, Georgia, serif", style: "italic", ex: "Access everything." },
                  { label: "Display L", size: "48px", weight: 400, font: "DM Serif Display, Georgia, serif", style: "italic", ex: "The page, perfected." },
                  { label: "Heading 1", size: "32px", weight: 700, font: "DM Sans, sans-serif", style: "normal", ex: "Privacy by design" },
                  { label: "Heading 2", size: "22px", weight: 600, font: "DM Sans, sans-serif", style: "normal", ex: "Three tools, one vision" },
                  { label: "Body", size: "15px", weight: 400, font: "DM Sans, sans-serif", style: "normal", ex: "Designed without compromise, built without shortcuts." },
                  { label: "Caption", size: "11px", weight: 500, font: "DM Sans, sans-serif", style: "normal", ex: "BRAND ASSETS · PORTFOLIO · PRESS" },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", alignItems: "baseline", gap: "24px", padding: "12px 0", borderBottom: "1px solid #141412" }}>
                    <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#504E5A", minWidth: "100px" }}>{row.label}</div>
                    <div style={{ fontFamily: row.font, fontSize: row.size, fontWeight: row.weight, fontStyle: row.style, color: "#F0EBE1", letterSpacing: row.size === "11px" ? "0.15em" : "-0.02em", textTransform: row.size === "11px" ? "uppercase" : "none" }}>{row.ex}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BRAND VOICE TAB */}
        {activeTab === "voice" && (
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8622A", marginBottom: "8px", fontWeight: 500 }}>
              Brand Voice
            </div>
            <div style={{ fontFamily: "DM Serif Display, Georgia, serif", fontStyle: "italic", fontSize: "28px", color: "#F0EBE1", marginBottom: "40px", letterSpacing: "-0.01em" }}>
              Confident. Direct. Earned.
            </div>

            {[
              {
                principle: "Say less than you could.",
                detail: "Every word earns its place. We don't explain ourselves twice. The product speaks.",
                do: ["Access everything.", "Privacy is a right, not a feature.", "Your money. Your rules."],
                dont: ["Our powerful suite of tools helps you...", "We're excited to announce that...", "Trusted by thousands of users worldwide."],
              },
              {
                principle: "Authority, not arrogance.",
                detail: "We know this space well. We don't need to prove it by talking about ourselves.",
                do: ["Built without shortcuts.", "Silence is a feature.", "Designed for people who think."],
                dont: ["Industry-leading", "Best-in-class", "World's #1 privacy tool"],
              },
              {
                principle: "Human, not corporate.",
                detail: "We sound like a brilliant person who respects your time — not a press release.",
                do: ["We made this for you.", "It just works.", "No noise. No junk. No compromise."],
                dont: ["Leveraging cutting-edge technology to deliver...", "Our customer-centric approach ensures...", "Synergistic portfolio of digital solutions"],
              },
              {
                principle: "The brand family, done right.",
                detail: "Each sub-brand has its own personality — but they all share the same quiet confidence.",
                do: ["HushRealm: sparse, dark, whispered", "PagePerfect: precise, editorial, considered", "AllowanceGuard: warm, direct, protective"],
                dont: ["Using identical voice across all three", "Overly 'fun' or 'playful' for any of them", "Generic fintech/SaaS copy"],
              },
            ].map((block) => (
              <div key={block.principle} style={{ marginBottom: "32px", padding: "28px 24px", background: "#141412", borderRadius: "12px", borderLeft: "2px solid #C8622A" }}>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "17px", color: "#F0EBE1", marginBottom: "8px", letterSpacing: "-0.02em" }}>
                  {block.principle}
                </div>
                <div style={{ fontSize: "13px", color: "#8A8680", marginBottom: "20px", lineHeight: 1.7 }}>
                  {block.detail}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#2ECC71", marginBottom: "10px", fontWeight: 600 }}>Write this</div>
                    {block.do.map((line) => (
                      <div key={line} style={{ fontSize: "12px", color: "#8A8680", padding: "6px 0", borderBottom: "1px solid #1C1C1A", lineHeight: 1.5 }}>
                        "{line}"
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#E55C5C", marginBottom: "10px", fontWeight: 600 }}>Not this</div>
                    {block.dont.map((line) => (
                      <div key={line} style={{ fontSize: "12px", color: "#504E5A", padding: "6px 0", borderBottom: "1px solid #1C1C1A", lineHeight: 1.5, textDecoration: "line-through", textDecorationColor: "#E55C5C44" }}>
                        "{line}"
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div style={{ borderTop: "1px solid #1C1C1A", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#504E5A", letterSpacing: "0.1em" }}>
          EAZYACCESS BRAND SYSTEM · CONFIDENTIAL
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {brandSystem.brands.map((b) => (
            <div key={b.name} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: b.accent }} />
              <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#504E5A", letterSpacing: "0.05em" }}>{b.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
