import { useState, useEffect, useRef } from "react";

const properties = [
  {
    id: 1,
    title: "Luxury 3BHK in Bandra West",
    city: "Mumbai",
    area: "Bandra West",
    price: 45000000,
    priceUSD: 540000,
    rent: 85000,
    rentUSD: 1020,
    yield: 2.3,
    sqft: 1850,
    type: "Apartment",
    status: "Ready to Move",
    builder: "Lodha Group",
    images: ["🏙️"],
    bedrooms: 3,
    bathrooms: 3,
    appreciation: 12.4,
    neighborhood: "Premium",
    verified: true,
    featured: true,
    tags: ["Sea View", "Gym", "Concierge"],
    description: "Ultra-premium apartment in the heart of Bandra with panoramic sea views. Minutes from Linking Road.",
    agentName: "Rajesh Sharma",
    agentPhone: "+91 98765 43210",
    rera: "P51900021823",
  },
  {
    id: 2,
    title: "Modern Villa in Whitefield",
    city: "Bangalore",
    area: "Whitefield",
    price: 28000000,
    priceUSD: 336000,
    rent: 65000,
    rentUSD: 780,
    yield: 2.8,
    sqft: 3200,
    type: "Villa",
    status: "Ready to Move",
    builder: "Prestige Group",
    images: ["🏡"],
    bedrooms: 4,
    bathrooms: 4,
    appreciation: 15.2,
    neighborhood: "Tech Hub",
    verified: true,
    featured: true,
    tags: ["Private Pool", "Smart Home", "Club Access"],
    description: "Spacious independent villa in IT corridor. Ideal for NRI investment with strong rental demand from tech professionals.",
    agentName: "Priya Nair",
    agentPhone: "+91 87654 32109",
    rera: "PRM/KA/RERA/1251/310/PR",
  },
  {
    id: 3,
    title: "Sea-facing 2BHK in Juhu",
    city: "Mumbai",
    area: "Juhu",
    price: 35000000,
    priceUSD: 420000,
    rent: 70000,
    rentUSD: 840,
    yield: 2.4,
    sqft: 1400,
    type: "Apartment",
    status: "Under Construction",
    builder: "Oberoi Realty",
    images: ["🌊"],
    bedrooms: 2,
    bathrooms: 2,
    appreciation: 11.8,
    neighborhood: "Beachfront",
    verified: true,
    featured: false,
    tags: ["Sea View", "Infinity Pool", "Valet"],
    description: "Iconic address on Juhu beach. Delivery Dec 2025. RERA registered.",
    agentName: "Amit Patel",
    agentPhone: "+91 76543 21098",
    rera: "P51800046123",
  },
  {
    id: 4,
    title: "Smart 3BHK in Gachibowli",
    city: "Hyderabad",
    area: "Gachibowli",
    price: 12500000,
    priceUSD: 150000,
    rent: 45000,
    rentUSD: 540,
    yield: 4.3,
    sqft: 1750,
    type: "Apartment",
    status: "Ready to Move",
    builder: "My Home Group",
    images: ["🏢"],
    bedrooms: 3,
    bathrooms: 2,
    appreciation: 18.5,
    neighborhood: "Financial District",
    verified: true,
    featured: true,
    tags: ["HITECH City", "Metro Access", "24/7 Security"],
    description: "High rental yield property near HITECH City. Best ROI in Hyderabad. Tenants already in place.",
    agentName: "Srinivas Rao",
    agentPhone: "+91 65432 10987",
    rera: "P02400003417",
  },
  {
    id: 5,
    title: "Premium 4BHK in Boat Club Road",
    city: "Chennai",
    area: "Boat Club Road",
    price: 22000000,
    priceUSD: 264000,
    rent: 55000,
    rentUSD: 660,
    yield: 3.0,
    sqft: 2600,
    type: "Apartment",
    status: "Ready to Move",
    builder: "Casagrand",
    images: ["🌴"],
    bedrooms: 4,
    bathrooms: 3,
    appreciation: 9.6,
    neighborhood: "OMR Corridor",
    verified: true,
    featured: false,
    tags: ["Golf Course View", "Clubhouse", "EV Charging"],
    description: "Prestigious address in Chennai's most sought-after locality. Steps from the best schools and hospitals.",
    agentName: "Lakshmi Krishnan",
    agentPhone: "+91 54321 09876",
    rera: "TN/29/Building/0186/2023",
  },
  {
    id: 6,
    title: "Investment Plot in Aerocity",
    city: "Delhi NCR",
    area: "Aerocity",
    price: 18000000,
    priceUSD: 216000,
    rent: 0,
    rentUSD: 0,
    yield: 0,
    sqft: 2000,
    type: "Plot",
    status: "Ready to Move",
    builder: "DLF",
    images: ["📐"],
    bedrooms: 0,
    bathrooms: 0,
    appreciation: 22.1,
    neighborhood: "Airport Zone",
    verified: true,
    featured: false,
    tags: ["High Appreciation", "DMIC Zone", "Clear Title"],
    description: "Freehold plot in Delhi's fastest appreciating zone. Airport proximity driving 22% YoY appreciation.",
    agentName: "Vikram Singh",
    agentPhone: "+91 43210 98765",
    rera: "DLRERA2023P0001",
  },
];

const marketData = {
  Mumbai: { trend: "+12.4%", demand: "Very High", avgYield: "2.2–2.8%", outlook: "Bullish" },
  Bangalore: { trend: "+15.2%", demand: "Extreme", avgYield: "3.0–4.5%", outlook: "Strongly Bullish" },
  Hyderabad: { trend: "+18.5%", demand: "High", avgYield: "3.5–5.0%", outlook: "Strongly Bullish" },
  "Delhi NCR": { trend: "+10.1%", demand: "High", avgYield: "2.0–3.5%", outlook: "Bullish" },
  Chennai: { trend: "+9.6%", demand: "Moderate", avgYield: "2.5–3.5%", outlook: "Moderate" },
  Pune: { trend: "+13.8%", demand: "High", avgYield: "3.0–4.2%", outlook: "Bullish" },
};

const USD_TO_INR = 83.5;

function formatINR(val) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  return `₹${val.toLocaleString("en-IN")}`;
}

function formatUSD(val) {
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
  return `$${val.toLocaleString()}`;
}

const COLORS = {
  bg: "#0A0D14",
  surface: "#111520",
  card: "#161C2D",
  border: "#1E2940",
  accent: "#C9A96E",
  accentLight: "#E8C98A",
  accentDim: "rgba(201,169,110,0.15)",
  text: "#F0EDE8",
  textMuted: "#8892A4",
  textDim: "#4A5568",
  green: "#4CAF82",
  greenDim: "rgba(76,175,130,0.15)",
  blue: "#4A9EFF",
  blueDim: "rgba(74,158,255,0.12)",
  red: "#FF6B6B",
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({ city: "All", type: "All", minYield: 0, currency: "USD" });
  const [savedProperties, setSavedProperties] = useState([1, 4]);
  const [activeTab, setActiveTab] = useState("overview");
  const [calcValues, setCalcValues] = useState({ budget: 300000, years: 5, rental: true });
  const [searchQuery, setSearchQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const cities = ["All", "Mumbai", "Bangalore", "Hyderabad", "Delhi NCR", "Chennai", "Pune"];
  const types = ["All", "Apartment", "Villa", "Plot"];

  const filtered = properties.filter(p => {
    const cityOk = filters.city === "All" || p.city === filters.city;
    const typeOk = filters.type === "All" || p.type === filters.type;
    const yieldOk = p.yield >= filters.minYield;
    const searchOk = searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.area.toLowerCase().includes(searchQuery.toLowerCase());
    return cityOk && typeOk && yieldOk && searchOk;
  });

  function toggleSave(id) {
    setSavedProperties(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    triggerAlert(savedProperties.includes(id) ? "Removed from watchlist" : "Added to watchlist ✓");
  }

  function triggerAlert(msg) {
    setAlertMsg(msg);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  }

  function calcROI() {
    const budgetINR = calcValues.budget * USD_TO_INR;
    const appreciation = budgetINR * Math.pow(1.14, calcValues.years) - budgetINR;
    const rentalIncome = calcValues.rental ? (budgetINR * 0.035 * calcValues.years) : 0;
    const total = appreciation + rentalIncome;
    return {
      appreciation: formatINR(appreciation),
      appreciationUSD: formatUSD(appreciation / USD_TO_INR),
      rental: formatINR(rentalIncome),
      rentalUSD: formatUSD(rentalIncome / USD_TO_INR),
      total: formatINR(total),
      totalUSD: formatUSD(total / USD_TO_INR),
      roi: ((total / budgetINR) * 100).toFixed(0),
    };
  }

  const roi = calcROI();

  const s = {
    app: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      background: COLORS.bg,
      minHeight: "100vh",
      color: COLORS.text,
      maxWidth: 430,
      margin: "0 auto",
      position: "relative",
      overflow: "hidden",
    },
    header: {
      padding: "20px 20px 0",
      background: `linear-gradient(180deg, ${COLORS.surface} 0%, transparent 100%)`,
      position: "sticky",
      top: 0,
      zIndex: 50,
      backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${COLORS.border}`,
    },
    headerTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    logo: {
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "0.05em",
      color: COLORS.accent,
      fontFamily: "'Cormorant Garamond', Georgia, serif",
    },
    logoSub: {
      fontSize: 9,
      letterSpacing: "0.3em",
      color: COLORS.textMuted,
      textTransform: "uppercase",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
    },
    iconBtn: {
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 12,
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: 18,
    },
    searchBar: {
      display: "flex",
      alignItems: "center",
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 14,
      padding: "10px 16px",
      marginBottom: 16,
      gap: 10,
    },
    searchInput: {
      background: "transparent",
      border: "none",
      outline: "none",
      color: COLORS.text,
      fontSize: 15,
      flex: 1,
      fontFamily: "'Cormorant Garamond', Georgia, serif",
    },
    filterRow: {
      display: "flex",
      gap: 8,
      overflowX: "auto",
      paddingBottom: 16,
      scrollbarWidth: "none",
    },
    filterChip: (active) => ({
      padding: "6px 14px",
      borderRadius: 20,
      border: `1px solid ${active ? COLORS.accent : COLORS.border}`,
      background: active ? COLORS.accentDim : "transparent",
      color: active ? COLORS.accent : COLORS.textMuted,
      fontSize: 12,
      letterSpacing: "0.08em",
      cursor: "pointer",
      whiteSpace: "nowrap",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
    }),
    content: {
      padding: "16px 16px 100px",
    },
    sectionTitle: {
      fontSize: 13,
      letterSpacing: "0.2em",
      color: COLORS.textMuted,
      textTransform: "uppercase",
      marginBottom: 16,
      marginTop: 8,
    },
    featuredCard: {
      background: `linear-gradient(135deg, ${COLORS.card} 0%, #1a2035 100%)`,
      borderRadius: 20,
      border: `1px solid ${COLORS.border}`,
      overflow: "hidden",
      marginBottom: 12,
      cursor: "pointer",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    featuredImg: {
      height: 160,
      background: `linear-gradient(135deg, #1a2840 0%, #0d1520 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 60,
      position: "relative",
    },
    badge: (color) => ({
      position: "absolute",
      top: 12,
      left: 12,
      background: color === "gold" ? COLORS.accent : COLORS.green,
      color: color === "gold" ? "#0A0D14" : "#fff",
      fontSize: 10,
      letterSpacing: "0.1em",
      padding: "3px 10px",
      borderRadius: 20,
      fontWeight: 700,
      textTransform: "uppercase",
    }),
    saveBtn: {
      position: "absolute",
      top: 12,
      right: 12,
      background: "rgba(10,13,20,0.7)",
      border: "none",
      borderRadius: 20,
      padding: "4px 10px",
      cursor: "pointer",
      fontSize: 18,
      backdropFilter: "blur(10px)",
    },
    cardBody: {
      padding: "14px 16px",
    },
    cardTitle: {
      fontSize: 17,
      fontWeight: 600,
      marginBottom: 4,
      color: COLORS.text,
    },
    cardLocation: {
      fontSize: 13,
      color: COLORS.textMuted,
      marginBottom: 12,
    },
    cardStats: {
      display: "flex",
      gap: 8,
    },
    statBox: (accent) => ({
      flex: 1,
      background: accent ? COLORS.accentDim : COLORS.blueDim,
      borderRadius: 10,
      padding: "8px 10px",
      border: `1px solid ${accent ? "rgba(201,169,110,0.2)" : "rgba(74,158,255,0.15)"}`,
    }),
    statLabel: {
      fontSize: 10,
      letterSpacing: "0.12em",
      color: COLORS.textMuted,
      textTransform: "uppercase",
      marginBottom: 2,
    },
    statVal: (accent) => ({
      fontSize: 15,
      fontWeight: 700,
      color: accent ? COLORS.accent : COLORS.blue,
    }),
    listCard: {
      background: COLORS.card,
      borderRadius: 16,
      border: `1px solid ${COLORS.border}`,
      padding: "14px",
      marginBottom: 10,
      display: "flex",
      gap: 12,
      cursor: "pointer",
    },
    listEmoji: {
      width: 56,
      height: 56,
      borderRadius: 12,
      background: `linear-gradient(135deg, #1a2840, #0d1520)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 28,
      flexShrink: 0,
    },
    yieldBadge: (val) => ({
      display: "inline-block",
      background: val >= 4 ? COLORS.greenDim : val >= 3 ? COLORS.accentDim : COLORS.blueDim,
      color: val >= 4 ? COLORS.green : val >= 3 ? COLORS.accent : COLORS.blue,
      borderRadius: 6,
      padding: "2px 8px",
      fontSize: 11,
      fontWeight: 700,
    }),
    navBar: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 430,
      background: COLORS.surface,
      borderTop: `1px solid ${COLORS.border}`,
      display: "flex",
      padding: "12px 0 20px",
      zIndex: 100,
    },
    navItem: (active) => ({
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
      cursor: "pointer",
      opacity: active ? 1 : 0.4,
    }),
    navLabel: (active) => ({
      fontSize: 10,
      letterSpacing: "0.1em",
      color: active ? COLORS.accent : COLORS.textMuted,
      textTransform: "uppercase",
    }),
    // Detail screen
    detailHeader: {
      padding: "20px 20px 16px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      position: "sticky",
      top: 0,
      background: COLORS.bg,
      zIndex: 50,
      borderBottom: `1px solid ${COLORS.border}`,
    },
    backBtn: {
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 12,
      width: 36,
      height: 36,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: 16,
    },
    tab: (active) => ({
      flex: 1,
      textAlign: "center",
      padding: "10px",
      fontSize: 12,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: active ? COLORS.accent : COLORS.textMuted,
      borderBottom: `2px solid ${active ? COLORS.accent : "transparent"}`,
      cursor: "pointer",
    }),
    infoRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 0",
      borderBottom: `1px solid ${COLORS.border}`,
      fontSize: 15,
    },
    ctaBtn: {
      background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
      color: "#0A0D14",
      border: "none",
      borderRadius: 16,
      padding: "16px",
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: "0.05em",
      cursor: "pointer",
      width: "100%",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
    },
    outlineBtn: {
      background: "transparent",
      color: COLORS.accent,
      border: `1.5px solid ${COLORS.accent}`,
      borderRadius: 16,
      padding: "14px",
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: "0.05em",
      cursor: "pointer",
      width: "100%",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
    },
    calcCard: {
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
    },
    slider: {
      width: "100%",
      accentColor: COLORS.accent,
      cursor: "pointer",
      margin: "8px 0",
    },
    resultBox: {
      background: COLORS.accentDim,
      border: `1px solid rgba(201,169,110,0.3)`,
      borderRadius: 14,
      padding: 16,
      marginTop: 12,
    },
    marketCard: {
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 16,
      padding: 16,
      marginBottom: 10,
    },
    alert: {
      position: "fixed",
      top: 80,
      left: "50%",
      transform: "translateX(-50%)",
      background: COLORS.accent,
      color: "#0A0D14",
      borderRadius: 12,
      padding: "10px 20px",
      fontSize: 13,
      fontWeight: 700,
      zIndex: 999,
      letterSpacing: "0.05em",
      transition: "opacity 0.3s",
      whiteSpace: "nowrap",
    },
  };

  // DETAIL SCREEN
  if (screen === "detail" && selectedProperty) {
    const p = selectedProperty;
    const isSaved = savedProperties.includes(p.id);
    return (
      <div style={s.app}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {showAlert && <div style={s.alert}>{alertMsg}</div>}
        <div style={s.detailHeader}>
          <div style={s.backBtn} onClick={() => setScreen("home")}>←</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{p.city}</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted }}>{p.area} · {p.type}</div>
          </div>
          <div style={{ ...s.iconBtn, background: isSaved ? COLORS.accentDim : COLORS.card }} onClick={() => toggleSave(p.id)}>
            {isSaved ? "❤️" : "🤍"}
          </div>
        </div>

        {/* Hero */}
        <div style={{ height: 200, background: "linear-gradient(135deg, #1a2840, #0d1a30)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, position: "relative" }}>
          {p.images[0]}
          <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 6 }}>
            {p.tags.map(t => (
              <span key={t} style={{ background: "rgba(10,13,20,0.8)", color: COLORS.accent, fontSize: 10, padding: "3px 8px", borderRadius: 6, border: `1px solid ${COLORS.border}`, letterSpacing: "0.05em" }}>{t}</span>
            ))}
          </div>
          {p.verified && <div style={{ position: "absolute", top: 12, right: 12, background: COLORS.green, color: "#fff", fontSize: 10, padding: "3px 8px", borderRadius: 20, fontWeight: 700 }}>✓ VERIFIED</div>}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.border}` }}>
          {["overview", "financials", "agent"].map(tab => (
            <div key={tab} style={s.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>
              {tab}
            </div>
          ))}
        </div>

        <div style={{ padding: "16px 20px 120px", overflowY: "auto", maxHeight: "calc(100vh - 380px)" }}>
          {activeTab === "overview" && (
            <>
              <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{p.title}</div>
              <div style={{ color: COLORS.textMuted, marginBottom: 16, fontSize: 15 }}>📍 {p.area}, {p.city}</div>

              {/* Price block */}
              <div style={{ background: COLORS.card, borderRadius: 16, padding: 16, marginBottom: 16, border: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 13, color: COLORS.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Investment</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.accent }}>{formatUSD(p.priceUSD)}</div>
                <div style={{ fontSize: 16, color: COLORS.textMuted }}>{formatINR(p.price)}</div>
                <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.1em", textTransform: "uppercase" }}>Monthly Rent</div>
                    <div style={{ fontSize: 16, color: COLORS.green, fontWeight: 600 }}>{p.rentUSD > 0 ? `$${p.rentUSD.toLocaleString()}` : "N/A"}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.1em", textTransform: "uppercase" }}>Gross Yield</div>
                    <div style={{ fontSize: 16, color: COLORS.green, fontWeight: 600 }}>{p.yield > 0 ? `${p.yield}%` : "Capital Gain"}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.1em", textTransform: "uppercase" }}>YoY Growth</div>
                    <div style={{ fontSize: 16, color: COLORS.blue, fontWeight: 600 }}>+{p.appreciation}%</div>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 15, color: COLORS.textMuted, lineHeight: 1.7, marginBottom: 16 }}>{p.description}</div>

              <div style={s.infoRow}><span style={{ color: COLORS.textMuted }}>Type</span><span>{p.type}</span></div>
              <div style={s.infoRow}><span style={{ color: COLORS.textMuted }}>Size</span><span>{p.sqft.toLocaleString()} sq ft</span></div>
              {p.bedrooms > 0 && <div style={s.infoRow}><span style={{ color: COLORS.textMuted }}>Bedrooms</span><span>{p.bedrooms} BHK</span></div>}
              <div style={s.infoRow}><span style={{ color: COLORS.textMuted }}>Status</span><span style={{ color: p.status === "Ready to Move" ? COLORS.green : COLORS.accent }}>{p.status}</span></div>
              <div style={s.infoRow}><span style={{ color: COLORS.textMuted }}>Builder</span><span>{p.builder}</span></div>
              <div style={{ ...s.infoRow, border: "none" }}><span style={{ color: COLORS.textMuted }}>RERA No.</span><span style={{ fontSize: 12, color: COLORS.green }}>✓ {p.rera}</span></div>
            </>
          )}

          {activeTab === "financials" && (
            <>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>5-Year Projection</div>
              {[1, 3, 5, 10].map(yr => {
                const val = p.priceUSD * Math.pow(1 + p.appreciation / 100, yr);
                const gain = val - p.priceUSD;
                return (
                  <div key={yr} style={{ background: COLORS.card, borderRadius: 12, padding: 14, marginBottom: 8, border: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, color: COLORS.textMuted }}>After {yr} year{yr > 1 ? "s" : ""}</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.accent }}>{formatUSD(Math.round(val))}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: COLORS.textMuted }}>Capital Gain</div>
                      <div style={{ fontSize: 16, color: COLORS.green, fontWeight: 600 }}>+{formatUSD(Math.round(gain))}</div>
                    </div>
                  </div>
                );
              })}

              <div style={{ marginTop: 16, background: COLORS.accentDim, borderRadius: 14, padding: 16, border: `1px solid rgba(201,169,110,0.2)` }}>
                <div style={{ fontSize: 13, color: COLORS.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>NRI Tax Note</div>
                <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.7 }}>Long-term capital gains (3yr+) taxed at 20% with indexation. DTAA between India & USA prevents double taxation. Rental income repatriable via NRO account.</div>
              </div>
            </>
          )}

          {activeTab === "agent" && (
            <>
              <div style={{ background: COLORS.card, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.border}`, textAlign: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>👤</div>
                <div style={{ fontSize: 20, fontWeight: 600 }}>{p.agentName}</div>
                <div style={{ fontSize: 13, color: COLORS.green, marginBottom: 4 }}>✓ NRI Specialist · Verified Agent</div>
                <div style={{ fontSize: 13, color: COLORS.textMuted }}>10+ years experience · {p.city}</div>
              </div>
              <button style={s.ctaBtn} onClick={() => triggerAlert("Connecting you to agent...")}>📞 Schedule a Call</button>
              <div style={{ height: 10 }} />
              <button style={s.outlineBtn} onClick={() => triggerAlert("Virtual tour booked!")}>🎥 Book Virtual Tour</button>
              <div style={{ height: 10 }} />
              <button style={s.outlineBtn} onClick={() => triggerAlert("Documents requested!")}>📄 Request Documents</button>

              <div style={{ marginTop: 20, background: COLORS.accentDim, borderRadius: 14, padding: 16, border: `1px solid rgba(201,169,110,0.2)` }}>
                <div style={{ fontSize: 13, color: COLORS.accent, marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase" }}>Our Promise to NRIs</div>
                <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.8 }}>
                  ✓ RERA verified listings only<br />
                  ✓ Remote purchase assistance<br />
                  ✓ Power of Attorney support<br />
                  ✓ NRO/NRE account guidance<br />
                  ✓ Post-purchase management
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // SAVED SCREEN
  if (screen === "saved") {
    const saved = properties.filter(p => savedProperties.includes(p.id));
    return (
      <div style={s.app}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {showAlert && <div style={s.alert}>{alertMsg}</div>}
        <div style={{ padding: "24px 20px 16px", borderBottom: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.accent }}>Watchlist</div>
          <div style={{ fontSize: 14, color: COLORS.textMuted }}>{saved.length} properties saved</div>
        </div>
        <div style={{ padding: "16px 16px 100px" }}>
          {saved.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: COLORS.textMuted }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🤍</div>
              <div style={{ fontSize: 18 }}>No saved properties yet</div>
              <div style={{ fontSize: 14, marginTop: 8 }}>Tap the heart icon to save properties</div>
            </div>
          ) : saved.map(p => (
            <div key={p.id} style={s.listCard} onClick={() => { setSelectedProperty(p); setScreen("detail"); setActiveTab("overview"); }}>
              <div style={s.listEmoji}>{p.images[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 6 }}>📍 {p.area}, {p.city}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.accent }}>{formatUSD(p.priceUSD)}</span>
                  {p.yield > 0 && <span style={s.yieldBadge(p.yield)}>{p.yield}% yield</span>}
                </div>
              </div>
              <div style={{ fontSize: 20, cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); toggleSave(p.id); }}>❤️</div>
            </div>
          ))}
        </div>
        <NavBar screen={screen} setScreen={setScreen} s={s} />
      </div>
    );
  }

  // CALCULATOR SCREEN
  if (screen === "calculator") {
    return (
      <div style={s.app}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={{ padding: "24px 20px 16px", borderBottom: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.accent }}>ROI Calculator</div>
          <div style={{ fontSize: 14, color: COLORS.textMuted }}>India property investment returns</div>
        </div>
        <div style={{ padding: "16px 16px 100px" }}>
          <div style={s.calcCard}>
            <div style={{ fontSize: 13, color: COLORS.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Investment Budget</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.accent, marginBottom: 4 }}>{formatUSD(calcValues.budget)}</div>
            <div style={{ fontSize: 14, color: COLORS.textMuted }}>≈ {formatINR(calcValues.budget * USD_TO_INR)}</div>
            <input type="range" style={s.slider} min={50000} max={2000000} step={10000} value={calcValues.budget}
              onChange={e => setCalcValues(v => ({ ...v, budget: +e.target.value }))} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.textDim }}>
              <span>$50K</span><span>$2M</span>
            </div>
          </div>

          <div style={s.calcCard}>
            <div style={{ fontSize: 13, color: COLORS.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Investment Period</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.blue, marginBottom: 4 }}>{calcValues.years} Years</div>
            <input type="range" style={s.slider} min={1} max={15} step={1} value={calcValues.years}
              onChange={e => setCalcValues(v => ({ ...v, years: +e.target.value }))} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.textDim }}>
              <span>1 yr</span><span>15 yrs</span>
            </div>
          </div>

          <div style={{ ...s.calcCard, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Include Rental Income</div>
              <div style={{ fontSize: 13, color: COLORS.textMuted }}>~3.5% annual yield</div>
            </div>
            <div
              style={{ width: 48, height: 28, borderRadius: 14, background: calcValues.rental ? COLORS.accent : COLORS.border, cursor: "pointer", position: "relative", transition: "background 0.2s" }}
              onClick={() => setCalcValues(v => ({ ...v, rental: !v.rental }))}
            >
              <div style={{ position: "absolute", top: 3, left: calcValues.rental ? 22 : 3, width: 22, height: 22, borderRadius: 11, background: "#fff", transition: "left 0.2s" }} />
            </div>
          </div>

          {/* Results */}
          <div style={s.resultBox}>
            <div style={{ fontSize: 13, color: COLORS.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>Projected Returns</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ color: COLORS.textMuted, fontSize: 14 }}>Capital Appreciation</span>
              <span style={{ color: COLORS.green, fontWeight: 700 }}>{roi.appreciationUSD}</span>
            </div>
            {calcValues.rental && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ color: COLORS.textMuted, fontSize: 14 }}>Rental Income</span>
                <span style={{ color: COLORS.green, fontWeight: 700 }}>{roi.rentalUSD}</span>
              </div>
            )}
            <div style={{ borderTop: `1px solid rgba(201,169,110,0.2)`, paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 16, fontWeight: 600 }}>Total Return</span>
              <span style={{ fontSize: 22, fontWeight: 700, color: COLORS.accent }}>{roi.totalUSD}</span>
            </div>
            <div style={{ textAlign: "center", marginTop: 10 }}>
              <span style={{ background: COLORS.green, color: "#fff", borderRadius: 20, padding: "4px 16px", fontSize: 14, fontWeight: 700 }}>+{roi.roi}% ROI over {calcValues.years} years</span>
            </div>
          </div>

          <div style={{ marginTop: 16, fontSize: 12, color: COLORS.textDim, textAlign: "center", lineHeight: 1.6 }}>
            Based on India's avg 14% annual appreciation. Past performance does not guarantee future results. Consult a financial advisor.
          </div>
        </div>
        <NavBar screen={screen} setScreen={setScreen} s={s} />
      </div>
    );
  }

  // MARKET SCREEN
  if (screen === "market") {
    return (
      <div style={s.app}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={{ padding: "24px 20px 16px", borderBottom: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.accent }}>Market Insights</div>
          <div style={{ fontSize: 14, color: COLORS.textMuted }}>India real estate intelligence</div>
        </div>
        <div style={{ padding: "16px 16px 100px" }}>
          <div style={{ background: COLORS.accentDim, borderRadius: 16, padding: 16, marginBottom: 16, border: `1px solid rgba(201,169,110,0.2)` }}>
            <div style={{ fontSize: 13, color: COLORS.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>NRI Investment 2025</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>$13.1 Billion</div>
            <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 4 }}>NRI investment in Indian real estate annually · Up 22% YoY</div>
          </div>

          {Object.entries(marketData).map(([city, data]) => (
            <div key={city} style={s.marketCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{city}</div>
                  <div style={{ fontSize: 13, color: COLORS.textMuted }}>Avg yield: {data.avgYield}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.green }}>{data.trend}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>YoY growth</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ background: COLORS.blueDim, color: COLORS.blue, borderRadius: 6, padding: "3px 10px", fontSize: 12, border: `1px solid rgba(74,158,255,0.15)` }}>Demand: {data.demand}</span>
                <span style={{ background: data.outlook.includes("Strongly") ? COLORS.greenDim : COLORS.accentDim, color: data.outlook.includes("Strongly") ? COLORS.green : COLORS.accent, borderRadius: 6, padding: "3px 10px", fontSize: 12 }}>{data.outlook}</span>
              </div>
            </div>
          ))}

          <div style={{ ...s.marketCard, background: COLORS.accentDim, border: `1px solid rgba(201,169,110,0.2)` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.accent, marginBottom: 8 }}>Why NRIs Prefer Indian Real Estate</div>
            {["Rupee depreciation = higher USD returns", "Strong 10–22% annual appreciation", "Rental income repatriable to USA", "DTAA prevents double taxation", "Booming tech cities driving demand"].map(point => (
              <div key={point} style={{ fontSize: 14, color: COLORS.textMuted, padding: "5px 0", borderBottom: `1px solid rgba(201,169,110,0.1)` }}>✓ {point}</div>
            ))}
          </div>
        </div>
        <NavBar screen={screen} setScreen={setScreen} s={s} />
      </div>
    );
  }

  // HOME SCREEN
  return (
    <div style={s.app}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet" />
      {showAlert && <div style={s.alert}>{alertMsg}</div>}

      <div style={s.header}>
        <div style={s.headerTop}>
          <div>
            <div style={s.logo}>NiveshIndia</div>
            <div style={s.logoSub}>Premium NRI Property Platform</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={s.iconBtn} onClick={() => triggerAlert("Notifications coming soon!")}>🔔</div>
            <div style={{ ...s.iconBtn, background: COLORS.accentDim, border: `1px solid rgba(201,169,110,0.3)` }}>
              <span style={{ fontSize: 14 }}>🇺🇸</span>
            </div>
          </div>
        </div>
        <div style={s.searchBar}>
          <span style={{ color: COLORS.textMuted }}>🔍</span>
          <input style={s.searchInput} placeholder="Search city, area, property type..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)} />
          {searchQuery && <span style={{ color: COLORS.textMuted, cursor: "pointer" }} onClick={() => setSearchQuery("")}>✕</span>}
        </div>
        <div style={s.filterRow}>
          {cities.map(c => (
            <div key={c} style={s.filterChip(filters.city === c)} onClick={() => setFilters(f => ({ ...f, city: c }))}>{c}</div>
          ))}
        </div>
      </div>

      <div style={s.content}>
        {/* Stats Banner */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {[
            { label: "Listed", val: "240+", icon: "🏠" },
            { label: "NRI Buyers", val: "12K+", icon: "✈️" },
            { label: "Avg Return", val: "14%", icon: "📈" },
          ].map(stat => (
            <div key={stat.label} style={{ flex: 1, background: COLORS.card, borderRadius: 14, padding: "12px 10px", border: `1px solid ${COLORS.border}`, textAlign: "center" }}>
              <div style={{ fontSize: 20 }}>{stat.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.accent }}>{stat.val}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.08em" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured */}
        {filtered.filter(p => p.featured).length > 0 && (
          <>
            <div style={s.sectionTitle}>✦ Featured Investments</div>
            {filtered.filter(p => p.featured).map(p => (
              <div key={p.id} style={s.featuredCard} onClick={() => { setSelectedProperty(p); setScreen("detail"); setActiveTab("overview"); }}>
                <div style={s.featuredImg}>
                  {p.images[0]}
                  <div style={s.badge("gold")}>Featured</div>
                  <button style={s.saveBtn} onClick={(e) => { e.stopPropagation(); toggleSave(p.id); }}>
                    {savedProperties.includes(p.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div style={s.cardBody}>
                  <div style={s.cardTitle}>{p.title}</div>
                  <div style={s.cardLocation}>📍 {p.area}, {p.city} · {p.sqft.toLocaleString()} sq ft</div>
                  <div style={s.cardStats}>
                    <div style={s.statBox(true)}>
                      <div style={s.statLabel}>Price (USD)</div>
                      <div style={s.statVal(true)}>{formatUSD(p.priceUSD)}</div>
                    </div>
                    {p.yield > 0 ? (
                      <div style={s.statBox(false)}>
                        <div style={s.statLabel}>Yield</div>
                        <div style={s.statVal(false)}>{p.yield}% p.a.</div>
                      </div>
                    ) : (
                      <div style={s.statBox(false)}>
                        <div style={s.statLabel}>Appreciation</div>
                        <div style={s.statVal(false)}>+{p.appreciation}%</div>
                      </div>
                    )}
                    <div style={{ ...s.statBox(false), background: COLORS.greenDim, border: "1px solid rgba(76,175,130,0.15)" }}>
                      <div style={s.statLabel}>Growth</div>
                      <div style={{ ...s.statVal(false), color: COLORS.green }}>+{p.appreciation}%</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* All Listings */}
        <div style={s.sectionTitle}>All Properties · {filtered.length} found</div>
        {/* Type filters */}
        <div style={{ ...s.filterRow, marginBottom: 16 }}>
          {types.map(t => (
            <div key={t} style={s.filterChip(filters.type === t)} onClick={() => setFilters(f => ({ ...f, type: t }))}>{t}</div>
          ))}
          {[{ label: "High Yield 4%+", val: 4 }, { label: "Any Yield", val: 0 }].map(opt => (
            <div key={opt.label} style={s.filterChip(filters.minYield === opt.val)} onClick={() => setFilters(f => ({ ...f, minYield: opt.val }))}>{opt.label}</div>
          ))}
        </div>

        {filtered.map(p => (
          <div key={p.id} style={s.listCard} onClick={() => { setSelectedProperty(p); setScreen("detail"); setActiveTab("overview"); }}>
            <div style={s.listEmoji}>{p.images[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 6 }}>📍 {p.area}, {p.city}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: COLORS.accent }}>{formatUSD(p.priceUSD)}</span>
                {p.yield > 0 && <span style={s.yieldBadge(p.yield)}>{p.yield}% yield</span>}
                <span style={{ fontSize: 12, color: COLORS.green }}>+{p.appreciation}% growth</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <div style={{ fontSize: 20, cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); toggleSave(p.id); }}>
                {savedProperties.includes(p.id) ? "❤️" : "🤍"}
              </div>
              {p.verified && <span style={{ fontSize: 11, color: COLORS.green }}>✓ RERA</span>}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: COLORS.textMuted }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 16 }}>No properties found</div>
            <div style={{ fontSize: 13, marginTop: 8 }}>Try different filters</div>
          </div>
        )}
      </div>

      <NavBar screen={screen} setScreen={setScreen} s={s} />
    </div>
  );
}

function NavBar({ screen, setScreen, s }) {
  const items = [
    { id: "home", icon: "🏠", label: "Explore" },
    { id: "market", icon: "📊", label: "Market" },
    { id: "calculator", icon: "🧮", label: "Calculator" },
    { id: "saved", icon: "❤️", label: "Saved" },
  ];
  return (
    <div style={s.navBar}>
      {items.map(item => (
        <div key={item.id} style={s.navItem(screen === item.id)} onClick={() => setScreen(item.id)}>
          <span style={{ fontSize: 22 }}>{item.icon}</span>
          <span style={s.navLabel(screen === item.id)}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
