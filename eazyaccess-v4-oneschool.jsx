import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;1,300;1,400;1,500&family=Outfit:wght@300;400;500;600;700&display=swap');`;

const tk = {
  bg: "#FDFCFA", surface: "#F4F1EC", surfaceDeep: "#EDE8E0",
  rule: "#DDD8D0", ruleLight: "#EDE9E3",
  ink: "#141210", inkMid: "#3D3A36", mid: "#6E6A64",
  faint: "#A8A49E", ghost: "#D4CFC8",
  accent: "#C8622A", accentDark: "#A84F20", accentBg: "#F6EDE4",
};

const products = [
  {
    name: "HushRealm", domain: "hushrealm.co.uk",
    category: "Private Document Vault",
    headline: ["Everything important.", "Safe. Silent. Yours."],
    body: "Encrypted storage for the documents that define your life. Will, passport, insurance, medical records — organised once, accessible forever, visible only to you.",
    accent: "#5B4FD4", accentBg: "#ECEBFC", bg: "#F7F5FD", text: "#1A1830", muted: "#7874A8",
    type: "Consumer",
  },
  {
    name: "PagePerfect", domain: "pageperfect.studio",
    category: "Document Publishing",
    headline: ["Documents that look", "like someone cared."],
    body: "Professional formatting without a designer. Proposals, reports, guides — produced beautifully in the time it currently takes to argue with Word.",
    accent: "#1B3D5C", accentBg: "#E4EDF6", bg: "#F3F7FB", text: "#0E1A24", muted: "#4E7090",
    type: "Consumer & B2B",
  },
  {
    name: "FarmCompanion", domain: "farmcompanion.co.uk",
    category: "UK Farm Directory",
    headline: ["Britain's farms,", "found."],
    body: "The definitive directory of UK farms. Find, explore and connect with British agriculture — from smallholders to great estates.",
    accent: "#3A6824", accentBg: "#E3EFE0", bg: "#F3F8F0", text: "#0E1C09", muted: "#537A43",
    type: "Community",
  },
  {
    name: "AllowanceGuard", domain: "allowanceguard.com",
    category: "Family FinTech",
    headline: ["Your family's money.", "Actually managed."],
    body: "Allowances, spending rules, savings goals — with full parental visibility. A financial operating system for families who want to be intentional.",
    accent: "#9C7200", accentBg: "#F4EDCC", bg: "#FBF8EF", text: "#1A1500", muted: "#856A00",
    type: "Consumer",
  },
  {
    name: "OneSchool", domain: "oneschool.co.uk",
    category: "School Management Platform",
    headline: ["One platform.", "Every school."],
    body: "A unified operating system for UK primary schools. Replaces fragmented MIS, safeguarding, SEND, curriculum, and communication tools with a single, designed-with-care platform.",
    accent: "#1A5276", accentBg: "#D6EAF8", bg: "#F0F7FC", text: "#0A1A24", muted: "#3D7A9C",
    type: "Institutional B2B",
    featured: true,
  },
];

const domains = [
  { n: "01", name: "Life Administration", desc: "Document vaults, digital legacy, Power of Attorney, family records. Every household has this problem. Almost no good software addresses it.", products: ["HushRealm", "AllowanceGuard"], arv: "£15–20M" },
  { n: "02", name: "Education", desc: "16,000 UK primary schools, all running fragmented systems built elsewhere. OneSchool is the permanent, designed-with-care alternative to VC-backed incumbents.", products: ["OneSchool"], arv: "£5–10M", featured: true },
  { n: "03", name: "Professional Publishing", desc: "Individuals, institutions, councils, law firms, NHS trusts — all producing documents that deserve better than Word.", products: ["PagePerfect"], arv: "£3–8M" },
  { n: "04", name: "British Land & Agriculture", desc: "British farms are specific, regulated, and community-embedded. No American product understands them.", products: ["FarmCompanion"], arv: "£2–5M" },
  { n: "05", name: "Small British Business", desc: "Millions of sole traders, independent retailers, and tradespeople using American accounting software with British fields bolted on.", products: [], arv: "£8–15M" },
  { n: "06", name: "British Property", desc: "Landlords, homeowners, and property managers navigating increasing regulatory complexity with fragmented, expensive tools.", products: [], arv: "£5–12M" },
  { n: "07", name: "Health Administration", desc: "The NHS provides excellent clinical care. The organisational layer — appointments, prescriptions, care coordination — is almost entirely unbuilt.", products: [], arv: "£5–10M" },
];

function useFade(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

const Rule = ({ color = tk.rule, my = 0 }) => <div style={{ height: 1, background: color, margin: `${my}px 0` }} />;
const Eyebrow = ({ children, color = tk.faint }) => (
  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color }}>{children}</div>
);
const Display = ({ children, size = "clamp(48px,7vw,88px)", color = tk.ink, style = {} }) => (
  <div style={{ fontFamily: "'Cormorant',serif", fontStyle: "italic", fontSize: size, fontWeight: 400, lineHeight: 0.92, letterSpacing: "-0.02em", color, ...style }}>{children}</div>
);
const Logo = ({ size = 20, dark = true }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M6 4H4V24H24V22" stroke={tk.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="square"/>
      <path d="M10 4H24V18" stroke={dark ? tk.ink : tk.bg} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="square"/>
    </svg>
    <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: size * 0.72, letterSpacing: "-0.025em", color: dark ? tk.ink : tk.bg }}>
      EAZY<span style={{ color: tk.accent }}>ACCESS</span>
    </span>
  </div>
);

function ProductCard({ p, i, featured = false }) {
  const [ref, vis] = useFade(0.08);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: p.bg, borderRadius: 16,
        padding: featured ? "36px 32px 32px" : "32px 28px 28px",
        border: `1px solid ${p.accent}${featured ? "33" : "1A"}`,
        boxShadow: hov ? `0 20px 56px ${p.accent}18, 0 4px 16px rgba(0,0,0,0.06)` : featured ? `0 4px 24px ${p.accent}14` : "0 2px 12px rgba(0,0,0,0.04)",
        transform: hov ? "translateY(-5px)" : "none",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        opacity: vis ? 1 : 0,
        transitionDelay: `${i * 70}ms`,
        gridColumn: featured ? "span 2" : "span 1",
        position: "relative",
      }}>
      {featured && (
        <div style={{
          position: "absolute", top: 20, right: 20,
          background: p.accent, color: "#FDFCFA",
          fontSize: 9, fontWeight: 600, letterSpacing: "0.15em",
          textTransform: "uppercase", padding: "4px 10px", borderRadius: 4,
          fontFamily: "'Outfit',sans-serif",
        }}>Institutional · B2B</div>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
        <div style={{ flex: 1 }}>
          <Eyebrow color={p.muted}>{p.category}</Eyebrow>
          <div style={{ marginTop: 16 }}>
            {p.headline.map((ln, j) => (
              <Display key={j} size={featured ? "clamp(32px,4vw,48px)" : "clamp(24px,3vw,36px)"}
                color={j === 0 ? p.text : p.accent} style={{ display: "block", lineHeight: 1.05 }}>
                {ln}
              </Display>
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: featured ? 14 : 13, fontWeight: 300, color: p.text, opacity: 0.6, lineHeight: 1.85, maxWidth: featured ? 560 : "100%" }}>
            {p.body}
          </div>
        </div>
        {featured && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, minWidth: 280 }}>
            {[
              { label: "UK Primary Schools", value: "16,000" },
              { label: "DfE Objectives Met", value: "3 of 3" },
              { label: "Tools Replaced", value: "4–7" },
              { label: "Pilot Partner", value: "Univ. of Birmingham" },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: "12px 14px", background: `${p.accent}0C`, borderRadius: 8, border: `1px solid ${p.accent}18` }}>
                <div style={{ fontFamily: "'Cormorant',serif", fontStyle: "italic", fontSize: 22, fontWeight: 400, color: p.accent, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 10, fontWeight: 400, color: p.muted, marginTop: 4, lineHeight: 1.4 }}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${p.accent}18`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.accent }} />
          <span style={{ fontFamily: "monospace", fontSize: 10, color: p.muted, letterSpacing: "0.04em" }}>{p.domain}</span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 500, color: p.accent, opacity: hov ? 1 : 0, transition: "opacity 0.25s" }}>Visit →</span>
      </div>
    </div>
  );
}

function DomainRow({ d, i, vis }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "24px 0", borderBottom: `1px solid ${tk.ruleLight}`,
        display: "grid", gridTemplateColumns: "48px 1fr 140px 180px",
        gap: "0 32px", alignItems: "start",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(10px)",
        transition: `all 0.6s ease ${i * 55}ms`,
        background: hov ? tk.surface : "transparent",
        margin: "0 -24px", padding: hov ? "24px 24px" : "24px 0",
        borderRadius: hov ? 8 : 0,
        cursor: "default",
      }}>
      <div style={{ fontFamily: "'Cormorant',serif", fontStyle: "italic", fontSize: 24, fontWeight: 300, color: tk.ghost, lineHeight: 1.2, paddingTop: 2 }}>{d.n}</div>
      <div>
        <div style={{
          fontFamily: "'Cormorant',serif", fontStyle: "italic",
          fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 400,
          color: d.featured ? tk.accent : tk.ink, letterSpacing: "-0.01em",
          lineHeight: 1.1, marginBottom: 8,
        }}>
          {d.name}
          {d.featured && <span style={{ marginLeft: 10, fontSize: 10, fontFamily: "'Outfit',sans-serif", fontStyle: "normal", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: tk.accent, verticalAlign: "middle", background: tk.accentBg, padding: "2px 8px", borderRadius: 3 }}>Active</span>}
        </div>
        <div style={{ fontSize: 13, fontWeight: 300, color: tk.mid, lineHeight: 1.75, maxWidth: 480 }}>{d.desc}</div>
        {d.products.length > 0 && (
          <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
            {d.products.map(name => {
              const p = products.find(x => x.name === name);
              return p ? (
                <span key={name} style={{ fontSize: 10, fontWeight: 500, color: p.accent, background: p.accentBg, padding: "3px 10px", borderRadius: 20, border: `1px solid ${p.accent}22` }}>{name}</span>
              ) : null;
            })}
          </div>
        )}
        {d.products.length === 0 && (
          <div style={{ marginTop: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 400, color: tk.ghost, fontFamily: "'Outfit',sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>Planned · Building or Acquiring</span>
          </div>
        )}
      </div>
      <div style={{ textAlign: "right", paddingTop: 4 }}>
        <div style={{ fontFamily: "'Cormorant',serif", fontStyle: "italic", fontSize: 20, fontWeight: 400, color: d.featured ? tk.accent : tk.inkMid }}>{d.arv}</div>
        <div style={{ fontSize: 9, color: tk.faint, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>ARR potential</div>
      </div>
      <div style={{ paddingTop: 4 }}>
        <div style={{ width: "100%", height: 3, background: tk.ruleLight, borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", background: d.featured ? tk.accent : tk.ghost, width: d.products.length > 0 ? "60%" : "15%", borderRadius: 2, transition: "width 0.6s ease" }} />
        </div>
        <div style={{ fontSize: 9, color: tk.faint, marginTop: 4 }}>{d.products.length > 0 ? "Active" : "Pipeline"}</div>
      </div>
    </div>
  );
}

export default function EazyAccessV4() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const refs = { products: useRef(null), thesis: useRef(null), domains: useRef(null), never: useRef(null) };
  const scrollTo = k => refs[k]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const [heroRef, heroVis] = useFade(0.05);
  const [thesisRef, thesisVis] = useFade(0.1);
  const [domRef, domVis] = useFade(0.08);
  const [neverRef, neverVis] = useFade(0.1);
  const [footRef, footVis] = useFade(0.05);

  const S = ({ children, py = 96, bg }) => (
    <section style={{ background: bg || tk.bg }}>
      <div style={{ padding: `${py}px 40px`, maxWidth: 960, margin: "0 auto" }}>{children}</div>
    </section>
  );

  return (
    <>
      <style>{FONTS}</style>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        body { background: ${tk.bg}; }
        .nav-a { background:none;border:none;cursor:pointer;font-family:'Outfit',sans-serif;font-size:13px;font-weight:400;color:${tk.mid};transition:color 0.2s;letter-spacing:0.01em; }
        .nav-a:hover { color:${tk.ink}; }
        .cta { display:inline-block;padding:11px 28px;border-radius:6px;border:1.5px solid ${tk.accent};background:transparent;font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;color:${tk.accent};letter-spacing:0.02em;cursor:pointer;transition:all 0.25s; }
        .cta:hover { background:${tk.accent};color:${tk.bg}; }
        .ghost-btn { background:none;border:none;cursor:pointer;font-family:'Outfit',sans-serif;font-size:13px;color:${tk.faint};transition:color 0.2s; }
        .ghost-btn:hover { color:${tk.ink}; }
      `}</style>

      <div style={{ fontFamily: "'Outfit',sans-serif", color: tk.ink, background: tk.bg }}>

        {/* NAV */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, height: 56,
          background: scrollY > 48 ? "rgba(253,252,250,0.95)" : "transparent",
          backdropFilter: scrollY > 48 ? "blur(24px)" : "none",
          borderBottom: scrollY > 48 ? `1px solid ${tk.rule}` : "1px solid transparent",
          transition: "all 0.4s ease",
          display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px",
        }}>
          <Logo size={19} />
          <div style={{ display: "flex", gap: 32 }}>
            {[["Products","products"],["Domains","domains"],["Thesis","thesis"],["Our promise","never"]].map(([l,k]) => (
              <button key={k} className="nav-a" onClick={() => scrollTo(k)}>{l}</button>
            ))}
          </div>
          <button className="cta" style={{ padding: "7px 20px", fontSize: 12 }} onClick={() => scrollTo("products")}>
            Explore →
          </button>
        </nav>

        {/* HERO */}
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 40px 80px", maxWidth: 960, margin: "0 auto", position: "relative" }}>
          <div ref={heroRef} style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(20px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
            <Eyebrow>eazyaccess.org · est. 2025 · United Kingdom</Eyebrow>
            <div style={{ marginTop: 28 }}>
              <Display size="clamp(72px,11vw,116px)" color={tk.ink}>Access</Display>
              <Display size="clamp(72px,11vw,116px)" color={tk.accent}>everything.</Display>
            </div>
            <div style={{ marginTop: 32, fontSize: 17, fontWeight: 300, color: tk.mid, lineHeight: 1.8, maxWidth: 540 }}>
              A permanent portfolio of software built for the serious, practical parts of British life.
              Five products today. Thirty within fifteen years. Never for sale.
            </div>
            <div style={{ marginTop: 44, display: "flex", gap: 24, alignItems: "center" }}>
              <button className="cta" onClick={() => scrollTo("products")}>Explore our products</button>
              <button className="ghost-btn" onClick={() => scrollTo("thesis")}>Our thesis →</button>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 44, left: 40, display: "flex", alignItems: "center", gap: 12, opacity: heroVis ? 0.4 : 0, transition: "opacity 1.2s ease 0.6s" }}>
            <div style={{ width: 1, height: 36, background: tk.rule }} />
            <Eyebrow>Scroll</Eyebrow>
          </div>
        </section>

        <Rule color={tk.ruleLight} />

        {/* PRODUCTS */}
        <S py={96}>
          <div ref={refs.products} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52 }}>
            <div>
              <Eyebrow>The portfolio · 5 products</Eyebrow>
              <Display size="clamp(36px,5vw,56px)" style={{ marginTop: 16 }}>Five products.</Display>
              <Display size="clamp(36px,5vw,56px)" color={tk.accent}>One permanent home.</Display>
            </div>
            <div style={{ fontSize: 12, fontWeight: 300, color: tk.faint, maxWidth: 220, textAlign: "right", lineHeight: 1.8 }}>
              Consumer, institutional, and community tools — all built for the realities of British life.
            </div>
          </div>

          {/* OneSchool featured at top */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {products.map((p, i) => <ProductCard key={p.name} p={p} i={i} featured={p.featured} />)}
          </div>

          {/* Platform synergy note */}
          <div style={{ marginTop: 24, padding: "20px 24px", background: tk.surface, borderRadius: 10, border: `1px solid ${tk.rule}`, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 3, height: 40, background: tk.accent, borderRadius: 2, flexShrink: 0 }} />
            <div style={{ fontSize: 13, fontWeight: 300, color: tk.mid, lineHeight: 1.7 }}>
              <strong style={{ color: tk.ink, fontWeight: 600 }}>Platform synergy: </strong>
              OneSchool's safeguarding files live in EazyAccess Vault. School reports are formatted in PagePerfect.
              Teachers and parents log in through EazyAccess ID. Every product makes every other product more valuable.
            </div>
          </div>
        </S>

        <Rule color={tk.ruleLight} />

        {/* DOMAINS */}
        <S py={96}>
          <div ref={refs.domains}>
            <div ref={domRef} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
              <div>
                <Eyebrow>Seven domains</Eyebrow>
                <Display size="clamp(32px,4.5vw,52px)" style={{ marginTop: 16 }}>Where we build.</Display>
                <Display size="clamp(32px,4.5vw,52px)" color={tk.accent}>And what it's worth.</Display>
              </div>
              <p style={{ fontSize: 12, fontWeight: 300, color: tk.faint, maxWidth: 200, textAlign: "right", lineHeight: 1.8 }}>
                Each domain is underserved. Each has durable, recurring revenue. None requires a single large bet.
              </p>
            </div>

            {/* Revenue total bar */}
            <div style={{ marginBottom: 32, padding: "20px 24px", background: tk.surface, borderRadius: 10, border: `1px solid ${tk.rule}`, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }}>
              {[
                { label: "Total addressable revenue", value: "£43–80M", sub: "Across 7 domains" },
                { label: "Active products", value: "5", sub: "Building now" },
                { label: "Domain target", value: "7", sub: "Over 15 years" },
                { label: "Model", value: "Build & Acquire", sub: "From revenue, no investors" },
              ].map(({ label, value, sub }) => (
                <div key={label}>
                  <Eyebrow color={tk.ghost}>{label}</Eyebrow>
                  <div style={{ fontFamily: "'Cormorant',serif", fontStyle: "italic", fontSize: 26, fontWeight: 400, color: tk.accent, marginTop: 4, marginBottom: 2 }}>{value}</div>
                  <div style={{ fontSize: 10, fontWeight: 300, color: tk.faint }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Column headers */}
            <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 140px 180px", gap: "0 32px", padding: "0 0 12px" }}>
              <div /><Eyebrow>Domain</Eyebrow><Eyebrow style={{ textAlign: "right" }}>ARR potential</Eyebrow><Eyebrow>Status</Eyebrow>
            </div>
            <Rule color={tk.rule} />
            {domains.map((d, i) => <DomainRow key={d.n} d={d} i={i} vis={domVis} />)}
          </div>
        </S>

        <Rule color={tk.ruleLight} />

        {/* THESIS */}
        <S py={112}>
          <div ref={refs.thesis}>
            <div ref={thesisRef} style={{ opacity: thesisVis ? 1 : 0, transform: thesisVis ? "none" : "translateY(20px)", transition: "all 0.9s ease" }}>
              <Eyebrow>What we actually are</Eyebrow>
              <div style={{ marginTop: 40, paddingLeft: 32, borderLeft: `2px solid ${tk.accent}`, marginBottom: 48 }}>
                <Display size="clamp(28px,3.8vw,46px)" color={tk.ink} style={{ lineHeight: 1.1 }}>
                  We are the permanent home<br />
                  <span style={{ color: tk.accent }}>for British software.</span>
                </Display>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px 80px", marginBottom: 64 }}>
                {[
                  { h: "Not a startup.", b: "Startups optimise for acquisition or IPO. Every product you have ever loved that got worse was a startup that exited. We are not that." },
                  { h: "Not a fund.", b: "We build and acquire software businesses using product revenue and hold them permanently. The only clock we operate on: is this better than it was last year?" },
                  { h: "Constellation Software, made British.", b: "Patient capital. Permanent ownership. A design standard and philosophical identity that Constellation never needed. That is our specific differentiation." },
                  { h: "The gap we fill.", b: "No British-owned, design-led software organisation serves the unglamorous necessities of British life. Every tool is American, VC-backed, and being quietly prepared for sale. That gap is ours." },
                ].map(({ h, b }) => (
                  <div key={h}>
                    <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 15, color: tk.inkMid, marginBottom: 10, letterSpacing: "-0.01em" }}>{h}</div>
                    <p style={{ fontSize: 13, fontWeight: 300, color: tk.mid, lineHeight: 1.9 }}>{b}</p>
                  </div>
                ))}
              </div>

              {/* Revenue path */}
              <div style={{ padding: "32px 36px", background: tk.surface, borderRadius: 12, border: `1px solid ${tk.rule}`, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
                {[
                  { phase: "Now",         metric: "5 products",  sub: "Being built" },
                  { phase: "Year 3",      metric: "£5M ARR",     sub: "OneSchool scaling" },
                  { phase: "Year 6–10",   metric: "£25M ARR",    sub: "Acquisitions + platform" },
                  { phase: "Year 10–15",  metric: "£100M ARR",   sub: "British institution" },
                ].map(({ phase, metric, sub }, i) => (
                  <div key={phase} style={{ padding: "0 28px", borderLeft: i > 0 ? `1px solid ${tk.rule}` : "none" }}>
                    <Eyebrow color={tk.ghost}>{phase}</Eyebrow>
                    <div style={{ fontFamily: "'Cormorant',serif", fontStyle: "italic", fontSize: 28, fontWeight: 400, color: tk.accent, marginTop: 6, marginBottom: 4 }}>{metric}</div>
                    <div style={{ fontSize: 11, fontWeight: 300, color: tk.faint }}>{sub}</div>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 12, fontSize: 11, fontWeight: 300, color: tk.faint, textAlign: "right" }}>
                Note: Year 3 revised upward from £2M — OneSchool alone targets £3.2–6.4M ARR at 10% UK primary school penetration.
              </p>
            </div>
          </div>
        </S>

        {/* NEVER SELL */}
        <section style={{ background: tk.ink }} ref={refs.never}>
          <div ref={neverRef} style={{ maxWidth: 960, margin: "0 auto", padding: "112px 40px", opacity: neverVis ? 1 : 0, transform: neverVis ? "none" : "translateY(20px)", transition: "all 0.9s ease" }}>
            <Eyebrow color={tk.accent}>The only promise that matters</Eyebrow>
            <Display size="clamp(40px,6vw,72px)" color="#FDFCFA" style={{ marginTop: 28, lineHeight: 1.0 }}>
              We will never sell.
            </Display>
            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 80px", maxWidth: 760 }}>
              <p style={{ fontSize: 14, fontWeight: 300, color: "#8A8680", lineHeight: 1.9 }}>
                Every product you have ever loved that got worse was acquired by a company that prioritised its own growth over your experience. That is the inevitable logic of companies built to be sold. We are not built to be sold.
              </p>
              <p style={{ fontSize: 14, fontWeight: 300, color: "#8A8680", lineHeight: 1.9 }}>
                OneSchool will not be acquired by Capita or absorbed into a Microsoft product suite. HushRealm will not be sunset after a Series B. AllowanceGuard will not be pivoted into a fintech aggregator. We own these products permanently.
              </p>
            </div>
            <div style={{ marginTop: 52, display: "flex", gap: 48 }}>
              {[
                { label: "Founded", value: "UK" },
                { label: "Investment taken", value: "None" },
                { label: "Products sold", value: "Never" },
                { label: "Data sold", value: "Never" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <Eyebrow color="#504E4A">{label}</Eyebrow>
                  <div style={{ fontFamily: "'Cormorant',serif", fontStyle: "italic", fontSize: 28, fontWeight: 400, color: tk.accent, marginTop: 4 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: tk.ink, borderTop: "1px solid #1A1810" }}>
          <div ref={footRef} style={{ maxWidth: 960, margin: "0 auto", padding: "56px 40px 40px", opacity: footVis ? 1 : 0, transition: "opacity 0.7s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 40 }}>
              <div>
                <Logo size={20} dark={false} />
                <p style={{ marginTop: 16, fontSize: 13, fontWeight: 300, color: "#6E6A60", lineHeight: 1.85, maxWidth: 300 }}>
                  A permanent portfolio of British software. Five products. Seven domains. Thirty within fifteen years. Never for sale.
                </p>
              </div>
              <div>
                <Eyebrow color="#3D3A34">Products</Eyebrow>
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  {products.map(p => (
                    <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.accent, flexShrink: 0 }} />
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: "#6E6A60" }}>{p.domain}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Eyebrow color="#3D3A34">Company</Eyebrow>
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Philosophy", "Products", "For founders", "Press", "Contact"].map(l => (
                    <span key={l} style={{ fontSize: 13, fontWeight: 300, color: "#6E6A60", cursor: "pointer" }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ height: 1, background: "#222018", marginBottom: 24 }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#3D3A34", letterSpacing: "0.08em" }}>© 2025 EAZYACCESS LTD · UNITED KINGDOM</div>
              <div style={{ display: "flex", gap: 24 }}>
                {["Privacy", "Terms", "Press kit"].map(l => (
                  <span key={l} style={{ fontSize: 11, fontWeight: 300, color: "#3D3A34", cursor: "pointer" }}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
