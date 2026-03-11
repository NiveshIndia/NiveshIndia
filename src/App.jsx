import { useState, useEffect } from "react";

const properties = [
  { id: 1, title: "Luxury 3BHK in Bandra West", city: "Mumbai", area: "Bandra West", price: 45000000, priceUSD: 540000, rent: 85000, rentUSD: 1020, yield: 2.3, sqft: 1850, type: "Apartment", status: "Ready to Move", builder: "Lodha Group", emoji: "🏙️", bedrooms: 3, appreciation: 12.4, verified: true, featured: true, tags: ["Sea View", "Gym", "Concierge"], description: "Ultra-premium apartment in the heart of Bandra with panoramic sea views. Minutes from Linking Road.", agentName: "Rajesh Sharma", rera: "P51900021823" },
  { id: 2, title: "Modern Villa in Whitefield", city: "Bangalore", area: "Whitefield", price: 28000000, priceUSD: 336000, rent: 65000, rentUSD: 780, yield: 2.8, sqft: 3200, type: "Villa", status: "Ready to Move", builder: "Prestige Group", emoji: "🏡", bedrooms: 4, appreciation: 15.2, verified: true, featured: true, tags: ["Private Pool", "Smart Home", "Club Access"], description: "Spacious independent villa in IT corridor. Ideal for NRI investment with strong rental demand.", agentName: "Priya Nair", rera: "PRM/KA/RERA/1251/310/PR" },
  { id: 3, title: "Sea-facing 2BHK in Juhu", city: "Mumbai", area: "Juhu", price: 35000000, priceUSD: 420000, rent: 70000, rentUSD: 840, yield: 2.4, sqft: 1400, type: "Apartment", status: "Under Construction", builder: "Oberoi Realty", emoji: "🌊", bedrooms: 2, appreciation: 11.8, verified: true, featured: false, tags: ["Sea View", "Infinity Pool", "Valet"], description: "Iconic address on Juhu beach. Delivery Dec 2025. RERA registered.", agentName: "Amit Patel", rera: "P51800046123" },
  { id: 4, title: "Smart 3BHK in Gachibowli", city: "Hyderabad", area: "Gachibowli", price: 12500000, priceUSD: 150000, rent: 45000, rentUSD: 540, yield: 4.3, sqft: 1750, type: "Apartment", status: "Ready to Move", builder: "My Home Group", emoji: "🏢", bedrooms: 3, appreciation: 18.5, verified: true, featured: true, tags: ["HITECH City", "Metro Access", "24/7 Security"], description: "High rental yield property near HITECH City. Best ROI in Hyderabad.", agentName: "Srinivas Rao", rera: "P02400003417" },
  { id: 5, title: "Premium 4BHK Chennai", city: "Chennai", area: "Boat Club Road", price: 22000000, priceUSD: 264000, rent: 55000, rentUSD: 660, yield: 3.0, sqft: 2600, type: "Apartment", status: "Ready to Move", builder: "Casagrand", emoji: "🌴", bedrooms: 4, appreciation: 9.6, verified: true, featured: false, tags: ["Golf Course View", "Clubhouse", "EV Charging"], description: "Prestigious address in Chennai's most sought-after locality.", agentName: "Lakshmi Krishnan", rera: "TN/29/Building/0186/2023" },
  { id: 6, title: "Investment Plot in Aerocity", city: "Delhi NCR", area: "Aerocity", price: 18000000, priceUSD: 216000, rent: 0, rentUSD: 0, yield: 0, sqft: 2000, type: "Plot", status: "Ready to Move", builder: "DLF", emoji: "📐", bedrooms: 0, appreciation: 22.1, verified: true, featured: false, tags: ["High Appreciation", "DMIC Zone", "Clear Title"], description: "Freehold plot in Delhi's fastest appreciating zone. 22% YoY appreciation.", agentName: "Vikram Singh", rera: "DLRERA2023P0001" },
  { id: 7, title: "Luxury Penthouse Koramangala", city: "Bangalore", area: "Koramangala", price: 55000000, priceUSD: 659000, rent: 120000, rentUSD: 1437, yield: 2.6, sqft: 4200, type: "Penthouse", status: "Ready to Move", builder: "Brigade Group", emoji: "🌆", bedrooms: 5, appreciation: 16.8, verified: true, featured: true, tags: ["Rooftop Pool", "Smart Home", "City Views"], description: "Ultra-luxury penthouse in Bangalore's tech corridor.", agentName: "Arjun Mehta", rera: "PRM/KA/RERA/1251/445/PR" },
  { id: 8, title: "Waterfront Villa Kochi", city: "Kochi", area: "Marine Drive", price: 32000000, priceUSD: 383000, rent: 80000, rentUSD: 958, yield: 3.0, sqft: 3800, type: "Villa", status: "Ready to Move", builder: "Sobha Realty", emoji: "⛵", bedrooms: 4, appreciation: 13.2, verified: true, featured: false, tags: ["Waterfront", "Private Jetty", "Smart Home"], description: "Stunning waterfront villa with private jetty. Perfect NRI holiday home.", agentName: "Ravi Nambiar", rera: "K-RERA/PRJ/2023/0012" },
];

const marketData = [
  { city: "Bangalore", trend: "+15.2%", demand: "Extreme", yieldRange: "3.0–4.5%", outlook: "Strongly Bullish", color: "#4CAF82" },
  { city: "Hyderabad", trend: "+18.5%", demand: "Very High", yieldRange: "3.5–5.0%", outlook: "Strongly Bullish", color: "#4CAF82" },
  { city: "Mumbai", trend: "+12.4%", demand: "High", yieldRange: "2.2–2.8%", outlook: "Bullish", color: "#C9A96E" },
  { city: "Delhi NCR", trend: "+10.1%", demand: "High", yieldRange: "2.0–3.5%", outlook: "Bullish", color: "#C9A96E" },
  { city: "Chennai", trend: "+9.6%", demand: "Moderate", yieldRange: "2.5–3.5%", outlook: "Moderate", color: "#4A9EFF" },
  { city: "Kochi", trend: "+13.2%", demand: "High", yieldRange: "2.8–3.5%", outlook: "Bullish", color: "#C9A96E" },
];

const USD_TO_INR = 83.5;
const fUSD = (v) => v >= 1000000 ? `$${(v/1000000).toFixed(1)}M` : `$${v.toLocaleString()}`;
const fINR = (v) => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : `₹${(v/100000).toFixed(1)}L`;
const C = { bg:"#08090F", surface:"#0E1118", card:"#131929", border:"#1C2436", accent:"#C9A96E", accentL:"#E8C98A", accentDim:"rgba(201,169,110,0.12)", text:"#F0EDE8", muted:"#8892A4", dim:"#3A4558", green:"#4CAF82", greenDim:"rgba(76,175,130,0.12)", blue:"#4A9EFF", blueDim:"rgba(74,158,255,0.10)" };
const font = "'Cormorant Garamond', Georgia, serif";

export default function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState([1, 4]);
  const [filterCity, setFilterCity] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [search, setSearch] = useState("");
  const [calcBudget, setCalcBudget] = useState(300000);
  const [calcYears, setCalcYears] = useState(5);
  const [calcRental, setCalcRental] = useState(true);
  const [toast, setToast] = useState("");
  const [detailTab, setDetailTab] = useState("overview");
  const [mob, setMob] = useState(window.innerWidth < 768);

  useEffect(() => {
    const check = () => setMob(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };
  const toggleSave = (id) => { setSaved(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]); showToast(saved.includes(id) ? "Removed from watchlist" : "Added to watchlist ✓"); };
  const cities = ["All","Mumbai","Bangalore","Hyderabad","Delhi NCR","Chennai","Kochi"];
  const types = ["All","Apartment","Villa","Plot","Penthouse"];
  const filtered = properties.filter(p => (filterCity==="All"||p.city===filterCity) && (filterType==="All"||p.type===filterType) && (search===""||p.title.toLowerCase().includes(search.toLowerCase())||p.city.toLowerCase().includes(search.toLowerCase())));
  const appreciation = calcBudget * USD_TO_INR * (Math.pow(1.14,calcYears)-1);
  const rentalIncome = calcRental ? calcBudget * USD_TO_INR * 0.035 * calcYears : 0;
  const totalReturn = appreciation + rentalIncome;
  const roi = ((totalReturn/(calcBudget*USD_TO_INR))*100).toFixed(0);

  const Toast = () => toast ? <div style={{position:"fixed",top:80,left:"50%",transform:"translateX(-50%)",background:C.accent,color:"#08090F",borderRadius:12,padding:"10px 24px",fontSize:13,fontWeight:700,zIndex:999,whiteSpace:"nowrap",fontFamily:font}}>{toast}</div> : null;

  const Chip = ({label, active, onClick}) => <div onClick={onClick} style={{padding:"5px 14px",borderRadius:20,border:`1px solid ${active?C.accent:C.border}`,background:active?C.accentDim:"transparent",color:active?C.accent:C.muted,fontSize:12,cursor:"pointer",fontFamily:font,whiteSpace:"nowrap"}}>{label}</div>;

  const StatBox = ({label, val, color}) => (
    <div style={{flex:1,background:color==="gold"?C.accentDim:color==="green"?C.greenDim:C.blueDim,borderRadius:10,padding:mob?"7px 8px":"10px 12px",border:`1px solid ${color==="gold"?"rgba(201,169,110,0.2)":color==="green"?"rgba(76,175,130,0.15)":"rgba(74,158,255,0.15)"}`}}>
      <div style={{fontSize:9,letterSpacing:"0.1em",color:C.muted,textTransform:"uppercase",marginBottom:2,fontFamily:font}}>{label}</div>
      <div style={{fontSize:mob?13:15,fontWeight:700,color:color==="gold"?C.accent:color==="green"?C.green:C.blue,fontFamily:font}}>{val}</div>
    </div>
  );

  const PropertyCard = ({p}) => (
    <div onClick={()=>{setSelected(p);setPage("detail");setDetailTab("overview");}} style={{background:C.card,borderRadius:mob?16:20,border:`1px solid ${C.border}`,overflow:"hidden",cursor:"pointer"}}>
      <div style={{height:mob?140:180,background:"linear-gradient(135deg,#1a2840,#0d1520)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:mob?52:64,position:"relative"}}>
        {p.emoji}
        {p.verified&&<div style={{position:"absolute",top:10,left:10,background:C.green,color:"#fff",fontSize:10,padding:"3px 8px",borderRadius:20,fontWeight:700}}>✓ RERA</div>}
        {p.featured&&<div style={{position:"absolute",top:10,left:p.verified?66:10,background:C.accent,color:"#08090F",fontSize:10,padding:"3px 8px",borderRadius:20,fontWeight:700}}>FEATURED</div>}
        <div onClick={e=>{e.stopPropagation();toggleSave(p.id);}} style={{position:"absolute",top:8,right:10,fontSize:22,cursor:"pointer"}}>{saved.includes(p.id)?"❤️":"🤍"}</div>
      </div>
      <div style={{padding:mob?"12px 14px":"16px 20px"}}>
        <div style={{fontSize:mob?15:17,fontWeight:600,marginBottom:3,fontFamily:font}}>{p.title}</div>
        <div style={{fontSize:12,color:C.muted,marginBottom:12,fontFamily:font}}>📍 {p.area}, {p.city} · {p.sqft.toLocaleString()} sq ft</div>
        <div style={{display:"flex",gap:8}}>
          <StatBox label="Price" val={fUSD(p.priceUSD)} color="gold"/>
          <StatBox label="Yield" val={p.yield>0?`${p.yield}%`:"Capital"} color="blue"/>
          <StatBox label="Growth" val={`+${p.appreciation}%`} color="green"/>
        </div>
      </div>
    </div>
  );

  const DesktopNav = () => (
    <nav style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"0 40px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64,position:"sticky",top:0,zIndex:100,backdropFilter:"blur(20px)"}}>
      <div onClick={()=>setPage("home")} style={{cursor:"pointer"}}>
        <div style={{fontSize:22,fontWeight:700,color:C.accent,letterSpacing:"0.05em",fontFamily:font}}>NiveshIndia</div>
        <div style={{fontSize:9,letterSpacing:"0.3em",color:C.muted,textTransform:"uppercase",fontFamily:font}}>NRI Property Platform</div>
      </div>
      <div style={{display:"flex",gap:6}}>
        {[{id:"home",l:"Properties"},{id:"market",l:"Market"},{id:"calculator",l:"ROI Calculator"},{id:"saved",l:`Watchlist (${saved.length})`}].map(n=>(
          <div key={n.id} onClick={()=>setPage(n.id)} style={{padding:"8px 16px",borderRadius:8,background:page===n.id?C.accentDim:"transparent",color:page===n.id?C.accent:C.muted,border:`1px solid ${page===n.id?"rgba(201,169,110,0.3)":"transparent"}`,cursor:"pointer",fontSize:13,fontFamily:font}}>{n.l}</div>
        ))}
      </div>
      <button onClick={()=>showToast("Agent signup coming soon!")} style={{background:`linear-gradient(135deg,${C.accent},${C.accentL})`,color:"#08090F",border:"none",borderRadius:10,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:font}}>List Property</button>
    </nav>
  );

  const MobileNav = () => (
    <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.surface,borderTop:`1px solid ${C.border}`,display:"flex",padding:"10px 0 22px",zIndex:100}}>
      {[{id:"home",icon:"🏠",l:"Explore"},{id:"market",icon:"📊",l:"Market"},{id:"calculator",icon:"🧮",l:"ROI"},{id:"saved",icon:"❤️",l:"Saved"}].map(n=>(
        <div key={n.id} onClick={()=>setPage(n.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",opacity:page===n.id?1:0.4}}>
          <span style={{fontSize:22}}>{n.icon}</span>
          <span style={{fontSize:9,letterSpacing:"0.1em",color:page===n.id?C.accent:C.muted,textTransform:"uppercase",fontFamily:font}}>{n.l}</span>
        </div>
      ))}
    </div>
  );

  const MobileHeader = () => (
    <div style={{padding:"14px 16px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,background:C.bg,zIndex:50}}>
      <div><div style={{fontSize:20,fontWeight:700,color:C.accent,fontFamily:font}}>NiveshIndia</div><div style={{fontSize:9,letterSpacing:"0.25em",color:C.muted,textTransform:"uppercase",fontFamily:font}}>NRI Property Platform</div></div>
      <span style={{fontSize:20}}>🇺🇸</span>
    </div>
  );

  const pad = mob ? "16px 14px 100px" : "32px 40px";
  const grid = {display:"grid",gridTemplateColumns:mob?"1fr":"repeat(auto-fill,minmax(320px,1fr))",gap:mob?12:18};

  // DETAIL
  if (page==="detail" && selected) {
    const p = selected;
    return (
      <div style={{background:C.bg,minHeight:"100vh",color:C.text,fontFamily:font}}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <Toast/>
        {mob ? (
          <div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,background:C.bg,zIndex:50,borderBottom:`1px solid ${C.border}`}}>
            <div onClick={()=>setPage("home")} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>←</div>
            <div style={{flex:1}}><div style={{fontSize:15,fontWeight:600}}>{p.city}</div><div style={{fontSize:11,color:C.muted}}>{p.area} · {p.type}</div></div>
            <div onClick={()=>toggleSave(p.id)} style={{fontSize:22,cursor:"pointer"}}>{saved.includes(p.id)?"❤️":"🤍"}</div>
          </div>
        ) : <DesktopNav/>}
        <div style={{height:mob?200:360,background:"linear-gradient(135deg,#1a2840,#0d1a30)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:mob?72:120,position:"relative"}}>
          {p.emoji}
          <div style={{position:"absolute",bottom:14,left:20,display:"flex",gap:8,flexWrap:"wrap"}}>
            {p.tags.map(t=><span key={t} style={{background:"rgba(8,9,15,0.85)",color:C.accent,fontSize:11,padding:"4px 10px",borderRadius:6,border:`1px solid ${C.border}`,fontFamily:font}}>{t}</span>)}
          </div>
          {p.verified&&<div style={{position:"absolute",top:14,right:20,background:C.green,color:"#fff",fontSize:11,padding:"4px 10px",borderRadius:20,fontWeight:700}}>✓ VERIFIED</div>}
          {!mob&&<button onClick={()=>setPage("home")} style={{position:"absolute",top:14,left:20,background:"rgba(8,9,15,0.8)",color:C.text,border:`1px solid ${C.border}`,borderRadius:10,padding:"8px 16px",cursor:"pointer",fontFamily:font,fontSize:14}}>← Back</button>}
        </div>
        <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,background:C.surface,position:"sticky",top:mob?65:64,zIndex:40}}>
          {["overview","financials","agent"].map(t=>(
            <div key={t} onClick={()=>setDetailTab(t)} style={{flex:1,textAlign:"center",padding:mob?"10px":"14px",fontSize:mob?11:13,letterSpacing:"0.1em",textTransform:"uppercase",color:detailTab===t?C.accent:C.muted,borderBottom:`2px solid ${detailTab===t?C.accent:"transparent"}`,cursor:"pointer",fontFamily:font}}>{t}</div>
          ))}
        </div>
        <div style={{maxWidth:mob?"100%":1100,margin:"0 auto",padding:mob?"16px 16px 120px":"32px 40px",display:"grid",gridTemplateColumns:mob?"1fr":"1fr 340px",gap:28}}>
          <div>
            {detailTab==="overview"&&(
              <>
                <div style={{fontSize:mob?22:30,fontWeight:700,marginBottom:4}}>{p.title}</div>
                <div style={{color:C.muted,marginBottom:20,fontSize:14}}>📍 {p.area}, {p.city}</div>
                <div style={{background:C.card,borderRadius:16,padding:20,marginBottom:20,border:`1px solid ${C.border}`}}>
                  <div style={{fontSize:10,color:C.muted,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:6}}>Investment Amount</div>
                  <div style={{fontSize:mob?28:36,fontWeight:700,color:C.accent}}>{fUSD(p.priceUSD)}</div>
                  <div style={{fontSize:15,color:C.muted,marginBottom:16}}>{fINR(p.price)}</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                    {[{l:"Monthly Rent",v:p.rentUSD>0?`$${p.rentUSD.toLocaleString()}`:"N/A",c:C.green},{l:"Gross Yield",v:p.yield>0?`${p.yield}%`:"Capital",c:C.green},{l:"YoY Growth",v:`+${p.appreciation}%`,c:C.blue}].map(s=>(
                      <div key={s.l}><div style={{fontSize:10,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.l}</div><div style={{fontSize:18,fontWeight:700,color:s.c}}>{s.v}</div></div>
                    ))}
                  </div>
                </div>
                <div style={{fontSize:15,color:C.muted,lineHeight:1.8,marginBottom:20}}>{p.description}</div>
                {[["Type",p.type],["Size",`${p.sqft.toLocaleString()} sq ft`],["Bedrooms",p.bedrooms>0?`${p.bedrooms} BHK`:"N/A"],["Status",p.status],["Builder",p.builder],["RERA No.",`✓ ${p.rera}`]].map(([k,v])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${C.border}`,fontSize:14}}>
                    <span style={{color:C.muted}}>{k}</span>
                    <span style={{color:k==="Status"?(p.status==="Ready to Move"?C.green:C.accent):k==="RERA No."?C.green:C.text}}>{v}</span>
                  </div>
                ))}
              </>
            )}
            {detailTab==="financials"&&(
              <>
                <div style={{fontSize:22,fontWeight:600,marginBottom:20}}>Price Appreciation Projections</div>
                {[1,3,5,10].map(yr=>{
                  const val=p.priceUSD*Math.pow(1+p.appreciation/100,yr);
                  return <div key={yr} style={{background:C.card,borderRadius:14,padding:18,marginBottom:10,border:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><div style={{fontSize:12,color:C.muted}}>After {yr} year{yr>1?"s":""}</div><div style={{fontSize:24,fontWeight:700,color:C.accent}}>{fUSD(Math.round(val))}</div></div>
                    <div style={{textAlign:"right"}}><div style={{fontSize:12,color:C.muted}}>Capital Gain</div><div style={{fontSize:18,color:C.green,fontWeight:700}}>+{fUSD(Math.round(val-p.priceUSD))}</div></div>
                  </div>;
                })}
                <div style={{background:C.accentDim,borderRadius:14,padding:18,border:`1px solid rgba(201,169,110,0.2)`,marginTop:16}}>
                  <div style={{fontSize:11,color:C.accent,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:8}}>NRI Tax Note</div>
                  <div style={{fontSize:14,color:C.muted,lineHeight:1.8}}>Long-term capital gains (3yr+) taxed at 20% with indexation. DTAA between India & USA prevents double taxation. Rental income repatriable via NRO account.</div>
                </div>
              </>
            )}
            {detailTab==="agent"&&(
              <>
                <div style={{background:C.card,borderRadius:16,padding:24,border:`1px solid ${C.border}`,textAlign:"center",marginBottom:20}}>
                  <div style={{fontSize:56,marginBottom:12}}>👤</div>
                  <div style={{fontSize:22,fontWeight:600}}>{p.agentName}</div>
                  <div style={{fontSize:13,color:C.green,margin:"6px 0"}}>✓ NRI Specialist · Verified Agent</div>
                  <div style={{fontSize:14,color:C.muted}}>10+ years experience · {p.city}</div>
                </div>
                {[{l:"📞 Schedule a Call",msg:"Connecting you to agent..."},{l:"🎥 Book Virtual Tour",msg:"Virtual tour booked!"},{l:"📄 Request Documents",msg:"Documents requested!"}].map(b=>(
                  <button key={b.l} onClick={()=>showToast(b.msg)} style={{width:"100%",padding:"14px",borderRadius:14,marginBottom:10,fontFamily:font,fontSize:15,cursor:"pointer",background:b.l.includes("Call")?`linear-gradient(135deg,${C.accent},${C.accentL})`:"transparent",color:b.l.includes("Call")?"#08090F":C.accent,border:b.l.includes("Call")?"none":`1.5px solid ${C.accent}`,fontWeight:b.l.includes("Call")?700:500}}>{b.l}</button>
                ))}
                <div style={{background:C.accentDim,borderRadius:14,padding:18,border:`1px solid rgba(201,169,110,0.2)`,marginTop:8}}>
                  <div style={{fontSize:11,color:C.accent,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:10}}>Our NRI Promise</div>
                  {["RERA verified listings only","Remote purchase assistance","Power of Attorney support","NRO/NRE account guidance","Post-purchase management"].map(pt=>(
                    <div key={pt} style={{fontSize:14,color:C.muted,padding:"7px 0",borderBottom:`1px solid rgba(201,169,110,0.1)`}}>✓ {pt}</div>
                  ))}
                </div>
              </>
            )}
          </div>
          {!mob&&(
            <div style={{position:"sticky",top:100,alignSelf:"start"}}>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:24}}>
                <div style={{fontSize:32,fontWeight:700,color:C.accent,marginBottom:4}}>{fUSD(p.priceUSD)}</div>
                <div style={{fontSize:15,color:C.muted,marginBottom:22}}>{fINR(p.price)}</div>
                <button onClick={()=>showToast("Request sent!")} style={{width:"100%",padding:"14px",background:`linear-gradient(135deg,${C.accent},${C.accentL})`,color:"#08090F",border:"none",borderRadius:12,fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:font,marginBottom:10}}>Get Investment Details</button>
                <button onClick={()=>showToast("Tour booked!")} style={{width:"100%",padding:"13px",background:"transparent",color:C.accent,border:`1.5px solid ${C.accent}`,borderRadius:12,fontSize:15,cursor:"pointer",fontFamily:font,marginBottom:10}}>Book Virtual Tour</button>
                <button onClick={()=>toggleSave(p.id)} style={{width:"100%",padding:"13px",background:"transparent",color:C.muted,border:`1px solid ${C.border}`,borderRadius:12,fontSize:14,cursor:"pointer",fontFamily:font}}>{saved.includes(p.id)?"❤️ Saved to Watchlist":"🤍 Add to Watchlist"}</button>
                <div style={{borderTop:`1px solid ${C.border}`,paddingTop:16,marginTop:10}}>
                  {[["Type",p.type],["Size",`${p.sqft.toLocaleString()} sq ft`],["Builder",p.builder],["Status",p.status]].map(([k,v])=>(
                    <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",fontSize:13}}>
                      <span style={{color:C.muted}}>{k}</span><span style={{color:k==="Status"?(p.status==="Ready to Move"?C.green:C.accent):C.text}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {mob&&(
          <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.surface,borderTop:`1px solid ${C.border}`,padding:"12px 16px 28px",display:"flex",gap:10}}>
            <button onClick={()=>showToast("Request sent!")} style={{flex:1,padding:"14px",background:`linear-gradient(135deg,${C.accent},${C.accentL})`,color:"#08090F",border:"none",borderRadius:14,fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:font}}>Get Details</button>
            <button onClick={()=>toggleSave(p.id)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"14px 18px",fontSize:20,cursor:"pointer"}}>{saved.includes(p.id)?"❤️":"🤍"}</button>
          </div>
        )}
        {mob&&<MobileNav/>}
      </div>
    );
  }

  return (
    <div style={{background:C.bg,minHeight:"100vh",color:C.text,fontFamily:font}}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <Toast/>
      {mob ? <MobileHeader/> : <DesktopNav/>}

      {page==="home"&&(
        <>
          {!mob&&(
            <div style={{background:"linear-gradient(135deg,#0E1830 0%,#08090F 70%)",padding:"80px 40px",borderBottom:`1px solid ${C.border}`}}>
              <div style={{maxWidth:1200,margin:"0 auto"}}>
                <div style={{fontSize:11,letterSpacing:"0.3em",color:C.accent,textTransform:"uppercase",marginBottom:18}}>✦ India's Premier NRI Investment Platform</div>
                <div style={{fontSize:56,fontWeight:700,lineHeight:1.15,marginBottom:20,maxWidth:680}}>Invest in India's<br/><span style={{color:C.accent}}>Booming Real Estate</span><br/>From Anywhere in the World</div>
                <div style={{fontSize:19,color:C.muted,maxWidth:520,lineHeight:1.7,marginBottom:36}}>Verified properties. USD pricing. Expert NRI guidance. Your dream Indian home — bought remotely, stress-free.</div>
                <div>
                  <button style={{background:`linear-gradient(135deg,${C.accent},${C.accentL})`,color:"#08090F",border:"none",borderRadius:12,padding:"16px 32px",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:font,marginRight:12}}>Explore Properties</button>
                  <button onClick={()=>setPage("calculator")} style={{background:"transparent",color:C.accent,border:`1.5px solid ${C.accent}`,borderRadius:12,padding:"16px 32px",fontSize:16,cursor:"pointer",fontFamily:font}}>Calculate ROI</button>
                </div>
              </div>
            </div>
          )}
          <div style={{maxWidth:1200,margin:"0 auto",padding:pad}}>
            <div style={{display:"grid",gridTemplateColumns:mob?"repeat(3,1fr)":"repeat(6,1fr)",gap:mob?8:14,marginBottom:mob?20:32}}>
              {[{icon:"🏠",val:"240+",l:"Listings"},{icon:"✈️",val:"12K+",l:"NRI Buyers"},{icon:"📈",val:"14%",l:"Avg Return"},{icon:"🏙️",val:"8",l:"Cities"},{icon:"✓",val:"100%",l:"RERA Verified"},{icon:"💰",val:"$13B",l:"NRI Market"}].slice(0,mob?3:6).map(s=>(
                <div key={s.l} style={{background:C.card,borderRadius:14,padding:mob?"12px 8px":"20px 14px",border:`1px solid ${C.border}`,textAlign:"center"}}>
                  <div style={{fontSize:mob?20:26}}>{s.icon}</div>
                  <div style={{fontSize:mob?18:22,fontWeight:700,color:C.accent,fontFamily:font}}>{s.val}</div>
                  <div style={{fontSize:mob?9:11,color:C.muted,letterSpacing:"0.08em",fontFamily:font}}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{background:C.surface,borderRadius:16,padding:mob?"12px":"18px 20px",border:`1px solid ${C.border}`,marginBottom:mob?18:26}}>
              <div style={{display:"flex",alignItems:"center",background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,padding:"8px 14px",gap:8,marginBottom:12}}>
                <span style={{color:C.muted}}>🔍</span>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search city, area, property..." style={{background:"transparent",border:"none",outline:"none",color:C.text,fontSize:14,width:"100%",fontFamily:font}}/>
                {search&&<span onClick={()=>setSearch("")} style={{color:C.muted,cursor:"pointer"}}>✕</span>}
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
                {cities.map(c=><Chip key={c} label={c} active={filterCity===c} onClick={()=>setFilterCity(c)}/>)}
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {types.map(t=><Chip key={t} label={t} active={filterType===t} onClick={()=>setFilterType(t)}/>)}
              </div>
            </div>
            {!search&&filterCity==="All"&&filterType==="All"&&(
              <>
                <div style={{fontSize:11,letterSpacing:"0.2em",color:C.muted,textTransform:"uppercase",marginBottom:mob?14:18,fontFamily:font}}>✦ Featured Investments</div>
                <div style={{...grid,marginBottom:mob?24:32}}>{filtered.filter(p=>p.featured).map(p=><PropertyCard key={p.id} p={p}/>)}</div>
              </>
            )}
            <div style={{fontSize:11,letterSpacing:"0.2em",color:C.muted,textTransform:"uppercase",marginBottom:mob?14:18,fontFamily:font}}>All Properties · {filtered.length} found</div>
            <div style={grid}>{filtered.map(p=><PropertyCard key={p.id} p={p}/>)}</div>
            {filtered.length===0&&<div style={{textAlign:"center",padding:"60px 20px",color:C.muted}}><div style={{fontSize:48,marginBottom:12}}>🔍</div><div style={{fontSize:20}}>No properties found</div></div>}
          </div>
        </>
      )}

      {page==="market"&&(
        <div style={{maxWidth:1200,margin:"0 auto",padding:pad}}>
          <div style={{fontSize:mob?26:36,fontWeight:700,color:C.accent,marginBottom:6,fontFamily:font}}>Market Intelligence</div>
          <div style={{fontSize:14,color:C.muted,marginBottom:28}}>Real-time India real estate insights for NRI investors</div>
          <div style={{background:C.accentDim,borderRadius:18,padding:mob?18:28,marginBottom:24,border:`1px solid rgba(201,169,110,0.2)`}}>
            <div style={{fontSize:10,color:C.accent,letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:8,fontFamily:font}}>NRI Investment 2025</div>
            <div style={{fontSize:mob?32:44,fontWeight:700,fontFamily:font}}>$13.1 Billion</div>
            <div style={{fontSize:14,color:C.muted,marginTop:6}}>Annual NRI investment in Indian real estate · Up 22% YoY</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(2,1fr)",gap:14,marginBottom:24}}>
            {marketData.map(m=>(
              <div key={m.city} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:mob?16:22}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <div><div style={{fontSize:mob?18:22,fontWeight:600,fontFamily:font}}>{m.city}</div><div style={{fontSize:12,color:C.muted}}>Avg yield: {m.yieldRange}</div></div>
                  <div style={{textAlign:"right"}}><div style={{fontSize:mob?20:24,fontWeight:700,color:m.color,fontFamily:font}}>{m.trend}</div><div style={{fontSize:10,color:C.muted}}>YoY growth</div></div>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <span style={{background:C.blueDim,color:C.blue,borderRadius:6,padding:"3px 10px",fontSize:11,fontFamily:font}}>Demand: {m.demand}</span>
                  <span style={{background:m.color===C.green?C.greenDim:C.accentDim,color:m.color,borderRadius:6,padding:"3px 10px",fontSize:11,fontFamily:font}}>{m.outlook}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:mob?18:24}}>
            <div style={{fontSize:16,fontWeight:600,color:C.accent,marginBottom:14,fontFamily:font}}>Why NRIs Choose Indian Real Estate</div>
            {["Rupee depreciation = automatically higher USD returns","10–22% annual appreciation in top cities","Rental income fully repatriable to USA","DTAA treaty prevents double taxation","Booming tech cities driving unprecedented demand","Lower entry price vs US/UK/Australia property"].map(pt=>(
              <div key={pt} style={{fontSize:14,color:C.muted,padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>✓ {pt}</div>
            ))}
          </div>
        </div>
      )}

      {page==="calculator"&&(
        <div style={{maxWidth:1200,margin:"0 auto",padding:pad}}>
          <div style={{fontSize:mob?26:36,fontWeight:700,color:C.accent,marginBottom:6,fontFamily:font}}>ROI Calculator</div>
          <div style={{fontSize:14,color:C.muted,marginBottom:28}}>Project your India property investment returns</div>
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:20}}>
            <div>
              {[{label:"Investment Budget",val:fUSD(calcBudget),sub:`≈ ${fINR(calcBudget*USD_TO_INR)}`,color:C.accent,min:50000,max:2000000,step:10000,current:calcBudget,set:setCalcBudget,minL:"$50K",maxL:"$2M"},{label:"Investment Period",val:`${calcYears} Years`,sub:"",color:C.blue,min:1,max:15,step:1,current:calcYears,set:setCalcYears,minL:"1 yr",maxL:"15 yrs"}].map(s=>(
                <div key={s.label} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:mob?16:24,marginBottom:14}}>
                  <div style={{fontSize:10,color:C.muted,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:8,fontFamily:font}}>{s.label}</div>
                  <div style={{fontSize:mob?26:34,fontWeight:700,color:s.color,fontFamily:font}}>{s.val}</div>
                  {s.sub&&<div style={{fontSize:13,color:C.muted,marginBottom:8}}>{s.sub}</div>}
                  <input type="range" min={s.min} max={s.max} step={s.step} value={s.current} onChange={e=>s.set(+e.target.value)} style={{width:"100%",accentColor:s.color,cursor:"pointer",margin:"10px 0"}}/>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.dim}}><span>{s.minL}</span><span>{s.maxL}</span></div>
                </div>
              ))}
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:mob?16:24,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontSize:15,fontWeight:600,fontFamily:font}}>Include Rental Income</div><div style={{fontSize:13,color:C.muted}}>~3.5% annual yield</div></div>
                <div onClick={()=>setCalcRental(v=>!v)} style={{width:48,height:28,borderRadius:14,background:calcRental?C.accent:C.border,cursor:"pointer",position:"relative",transition:"background 0.2s"}}>
                  <div style={{position:"absolute",top:3,left:calcRental?22:3,width:22,height:22,borderRadius:11,background:"#fff",transition:"left 0.2s"}}/>
                </div>
              </div>
            </div>
            <div>
              <div style={{background:C.accentDim,border:`1px solid rgba(201,169,110,0.25)`,borderRadius:16,padding:mob?18:26}}>
                <div style={{fontSize:10,color:C.accent,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:20,fontFamily:font}}>Projected Returns</div>
                {[{l:"Capital Appreciation",v:fUSD(Math.round(appreciation/USD_TO_INR)),s:fINR(appreciation)},...(calcRental?[{l:"Rental Income",v:fUSD(Math.round(rentalIncome/USD_TO_INR)),s:fINR(rentalIncome)}]:[])].map(r=>(
                  <div key={r.l} style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
                    <span style={{color:C.muted,fontSize:14,fontFamily:font}}>{r.l}</span>
                    <div style={{textAlign:"right"}}><div style={{color:C.green,fontWeight:700,fontSize:16,fontFamily:font}}>{r.v}</div><div style={{color:C.dim,fontSize:11}}>{r.s}</div></div>
                  </div>
                ))}
                <div style={{borderTop:`1px solid rgba(201,169,110,0.2)`,paddingTop:18,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:17,fontWeight:600,fontFamily:font}}>Total Return</span>
                  <div style={{textAlign:"right"}}><div style={{fontSize:mob?24:30,fontWeight:700,color:C.accent,fontFamily:font}}>{fUSD(Math.round(totalReturn/USD_TO_INR))}</div><div style={{fontSize:12,color:C.muted}}>{fINR(totalReturn)}</div></div>
                </div>
                <div style={{textAlign:"center",marginTop:20}}>
                  <span style={{background:C.green,color:"#fff",borderRadius:20,padding:"8px 24px",fontSize:16,fontWeight:700,fontFamily:font}}>+{roi}% ROI over {calcYears} years</span>
                </div>
              </div>
              <div style={{fontSize:11,color:C.dim,textAlign:"center",marginTop:14,lineHeight:1.7}}>Based on India's avg 14% annual appreciation. Past performance does not guarantee future results.</div>
            </div>
          </div>
        </div>
      )}

      {page==="saved"&&(
        <div style={{maxWidth:1200,margin:"0 auto",padding:pad}}>
          <div style={{fontSize:mob?26:36,fontWeight:700,color:C.accent,marginBottom:6,fontFamily:font}}>Watchlist</div>
          <div style={{fontSize:14,color:C.muted,marginBottom:28}}>{saved.length} properties saved</div>
          {saved.length===0 ? (
            <div style={{textAlign:"center",padding:"80px 20px",color:C.muted}}><div style={{fontSize:56,marginBottom:16}}>🤍</div><div style={{fontSize:22,fontFamily:font}}>No saved properties yet</div><div style={{fontSize:14,marginTop:8}}>Tap the heart icon on any property to save it</div></div>
          ) : (
            <div style={grid}>{properties.filter(p=>saved.includes(p.id)).map(p=><PropertyCard key={p.id} p={p}/>)}</div>
          )}
        </div>
      )}

      {mob&&<MobileNav/>}
    </div>
  );
}
