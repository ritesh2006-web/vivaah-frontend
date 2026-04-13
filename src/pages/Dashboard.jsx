import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/* ─── Icon primitive ─────────────────────────────────────────────────────── */
const Icon = ({ d, size = "w-5 h-5", stroke = 1.5 }) => (
  <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke} d={d} />
  </svg>
);

const ICONS = {
  home:     "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  clip:     "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  users:    "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  check:    "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  chart:    "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  bell:     "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  logout:   "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  close:    "M6 18L18 6M6 6l12 12",
  menu:     "M4 6h16M4 12h16M4 18h16",
  ok:       "M5 13l4 4L19 7",
  clock:    "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  trash:    "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
};

/* ─── Design tokens ──────────────────────────────────────────────────────── */
const inp = [
  "w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm text-[#0f172a]",
  "placeholder-[#94a3b8] outline-none transition-all duration-200",
  "focus:border-[#fb7185] focus:bg-white focus:ring-4 focus:ring-[#fecdd3]/60",
].join(" ");
const lbl = "block text-[11px] font-bold tracking-[0.12em] uppercase text-[#64748b] mb-1.5";
const btn = [
  "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white",
  "bg-gradient-to-r from-[#fb7185] to-[#f43f5e] shadow-md shadow-[#fb7185]/30",
  "transition-all duration-200 hover:shadow-lg hover:shadow-[#fb7185]/40 hover:-translate-y-0.5 active:translate-y-0",
].join(" ");
const card = "bg-white rounded-2xl border border-[#e2e8f0] shadow-sm shadow-[#cbd5e1]/20";
const row  = "hover:bg-[#f8fafc] transition-colors duration-150";
const div0 = "border-b border-[#e2e8f0]";

/* ─── Status pill ────────────────────────────────────────────────────────── */
const Pill = ({ v }) => {
  const s = {
    Completed:     "bg-[#ecfdf5] text-[#166534] border border-[#bbf7d0]",
    Accepted:      "bg-[#ecfdf5] text-[#166534] border border-[#bbf7d0]",
    Confirmed:     "bg-[#ecfdf5] text-[#166534] border border-[#bbf7d0]",
    "In Progress": "bg-[#fdf2f8] text-[#be123c] border border-[#fecdd3]",
    Pending:       "bg-[#fff1f2] text-[#f43f5e] border border-[#fecdd3]",
    Declined:      "bg-[#fee2e2] text-[#b91c1c] border border-[#fecaca]",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${s[v] ?? "bg-[#f5f0ee] text-[#8a7470]"}`}>{v}</span>;
};

/* ─── Section form header ────────────────────────────────────────────────── */
const FH = ({ t }) => (
  <h3 className="flex items-center gap-2.5 text-[15px] font-semibold text-[#0f172a]" style={{ fontFamily:"'Cormorant Garamond',serif" }}>
    <span className="w-0.5 h-5 rounded-full inline-block flex-shrink-0" style={{ background:"linear-gradient(180deg,#fb7185,#f43f5e)" }} />
    {t}
  </h3>
);

/* ─── Empty state ────────────────────────────────────────────────────────── */
function Empty({ icon, title, sub, wrap = false }) {
  const inner = (
    <div className="py-14 flex flex-col items-center text-center px-6">
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background:"#fff1f2", border:"1px solid #fecdd3" }}>
        <svg className="w-7 h-7" style={{ color:"#fb7185" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
        </svg>
      </div>
      <p className="text-sm font-semibold text-[#475569] mb-1">{title}</p>
      <p className="text-xs text-[#64748b]">{sub}</p>
    </div>
  );
  return wrap ? <div className={card}>{inner}</div> : inner;
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function Dashboard({ token, user, onLogout }) {
  const [tab,    setTab]    = useState("Dashboard");
  const [events, setEvents] = useState([]);
  const [tasks,  setTasks]  = useState([]);
  const [vdors,  setVdors]  = useState([]);
  const [vens,   setVens]   = useState([]);
  const [books,  setBooks]  = useState([]);
  const [guests, setGuests] = useState([]);
  const [report, setReport] = useState([]);
  const [busy,   setBusy]   = useState(true);
  const [msg,    setMsg]    = useState("");
  const [sbOpen, setSbOpen] = useState(false);

  const sEv = Array.isArray(events) ? events : [];
  const sTk = Array.isArray(tasks)  ? tasks  : [];
  const sVd = Array.isArray(vdors)  ? vdors  : [];
  const sVn = Array.isArray(vens)   ? vens   : [];
  const sBk = Array.isArray(books)  ? books  : [];
  const sGu = Array.isArray(guests) ? guests : [];
  const sRp = Array.isArray(report) ? report : [];

  const [nEv, setNEv] = useState({ title:"", date:"", budget:"" });
  const [nBk, setNBk] = useState({ event_id:"", vendor_id:"", booking_date:"" });
  const [nVb, setNVb] = useState({ event_id:"", venue_id:"" });
  const [nGu, setNGu] = useState({ event_id:"", name:"", rsvp_status:"Pending", meal_pref:"Vegetarian" });
  const [nTk, setNTk] = useState({ event_id:"", task_name:"", deadline:"", status:"Pending" });
  const [editingEventId, setEditingEventId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fmt = (ds) => {
    if (!ds) return "";
    const d = new Date(ds);
    return `${String(d.getDate()).padStart(2,"0")}-${String(d.getMonth()+1).padStart(2,"0")}-${d.getFullYear()}`;
  };
  const fmtP = (v) => { const a = v.price??v.starting_price??v.budget??v.rate??v.rates; return a?`₹${Number(a).toLocaleString("en-IN")}`:"On Request"; };
  const fmtC = (v) => v.phone??v.contact??v.phone_number??"—";
  const venueImages = [
    "https://image.wedmegood.com/resized/450X/uploads/member/25565819/1769503008_IMG_5954.JPEG?auto=format&fit=crop&w=900&q=80",
    "https://image.wedmegood.com/resized/450X/uploads/member/33392/1772777313_ChatGPT_Image_Mar_6__2026__11_38_24_AM.png?auto=format&fit=crop&w=900&q=80",
    "https://image.wedmegood.com/resized/450X/uploads/member/70722/1771909357_finch_1.png?auto=format&fit=crop&w=900&q=80",
    "https://image.wedmegood.com/resized/450X/uploads/member/26373072/1772449130_192__Drone_Image___Lawn.jpg?auto=format&fit=crop&w=900&q=80",
    "https://image.wedmegood.com/resized/450X/uploads/member/79884/1745827534_5fd9b5ec_879c_49b8_87b5_1286268fda97.jpg?auto=format&fit=crop&w=900&q=80",
    "https://image.wedmegood.com/resized/450X/uploads/project/316604/1758015628_image535.jpg?auto=format&fit=crop&w=900&q=80",
    "https://image.wedmegood.com/resized/450X/uploads/member/32457/1771917494_treat_2.png?crop=9,82,1472,828",
    "https://image.wedmegood.com/resized/450X/uploads/member/801865/1774247953_wadala_1.jpg?crop=8,151,1343,755",
    "https://image.wedmegood.com/resized/450X/uploads/member/24659109/1775544494_white_forest.png?crop=9,119,1516,853",
    "https://image.wedmegood.com/resized/450X/uploads/member/4677791/1736756414_WhatsApp_Image_2025_01_13_at_1.42.55_PM__1_.jpeg?crop=9,24,1580,889",
    "https://image.wedmegood.com/resized/450X/uploads/member/1896944/1756096575_02___abh___Facade___Opt_2___Arch.jpg?crop=185,0,1845,1038",
  ];
  const bkEv = (b) => b.event_id??b.event?.id??b.event_name;
  const bkVd = (b) => b.vendor_id??b.vendor?.id??b.vendor_name;
  const bkPr = (b) => {
    const ep = b.price??b.amount??b.cost;
    if (ep!=null) return Number(ep)||0;
    const vid = bkVd(b);
    const v = sVd.find(x=>String(x.id)===String(vid)||String(x.name)?.toLowerCase()===String(vid)?.toLowerCase());
    return Number(v?.price??v?.starting_price??v?.budget??v?.rate??v?.rates??0)||0;
  };
  const totalSpent = (r) => {
    let eid = typeof r==="object"?r.event_id??r.id??r.title:r;
    // vendor cost
    const vendorTotal = sBk
      .filter(b => String(bkEv(b) ?? "").toLowerCase() === String(eid ?? "").toLowerCase())
      .reduce((s, b) => s + bkPr(b), 0);
    // venue cost
    const event = sEv.find(e =>
      String(e.id) === String(eid) ||
      String(e.title).toLowerCase() === String(eid).toLowerCase()
    );
    const venue = sVn.find(v => String(v.id) === String(event?.venue_id));

    const venuePrice = Number(venue?.price || 0);

    return vendorTotal + venuePrice;
  };

  useEffect(() => {
    if (token) { axios.defaults.headers.common["Authorization"]=`Bearer ${token}`; load(); }
  },[token]);

  const load = async () => {
    setBusy(true);
    try {
      const [a,b,c,d,e,f,g] = await Promise.all([
        axios.get(`${API_URL}/api/events`),
        axios.get(`${API_URL}/api/venues`),
        axios.get(`${API_URL}/api/vendors`),
        axios.get(`${API_URL}/api/bookings`),
        axios.get(`${API_URL}/api/guests`),
        axios.get(`${API_URL}/api/tasks`),
        axios.get(`${API_URL}/api/reports`),
      ]);
      setEvents(a.data); setVens(b.data); setVdors(c.data);
      setBooks(d.data);  setGuests(e.data); setTasks(f.data); setReport(g.data);
    } catch(err) { setMsg("Failed to load: "+(err.response?.data?.error||err.message)); }
    finally { setBusy(false); }
  };

  const post = async (url, body, ok, reset) => {
    try { await axios.post(url, body); setMsg(ok); reset(); load(); }
    catch(err) { setMsg("Error: "+(err.response?.data?.error||err.message)); }
  };

  const hEv  = async (e) => {
    e.preventDefault();
    if (editingEventId) {
      try {
        await axios.put(`${API_URL}/api/events/${editingEventId}`, nEv);
        setMsg("Event updated!");
        setEditingEventId(null);
        setNEv({ title:"", date:"", budget:"" });
        load();
      } catch(err) {
        setMsg("Error: "+(err.response?.data?.error||err.message));
      }
      return;
    }
    post(`${API_URL}/api/events`, nEv, "Event created!", ()=>setNEv({title:"",date:"",budget:""}));
  };

  const hBk  = (e) => { e.preventDefault(); post(`${API_URL}/api/bookings`,    nBk, "Vendor booked!",    ()=>setNBk({event_id:"",vendor_id:"",booking_date:""})); };
  const hVb  = (e) => { e.preventDefault(); post(`${API_URL}/api/venues/book`, nVb, "Venue booked!",     ()=>setNVb({event_id:"",venue_id:""})); };
  const hGu  = (e) => { e.preventDefault(); post(`${API_URL}/api/guests`,      nGu, "Guest added!",      ()=>setNGu({event_id:"",name:"",rsvp_status:"Pending",meal_pref:"Vegetarian"})); };

  const hTk  = async (e) => {
    e.preventDefault();
    if (editingTaskId) {
      try {
        await axios.put(`${API_URL}/api/tasks/${editingTaskId}`, nTk);
        setMsg("Task updated!");
        setEditingTaskId(null);
        setNTk({ event_id:"", task_name:"", deadline:"", status:"Pending" });
        load();
      } catch(err) {
        setMsg("Error: "+(err.response?.data?.error||err.message));
      }
      return;
    }
    post(`${API_URL}/api/tasks`,       nTk, "Task added!",       ()=>setNTk({event_id:"",task_name:"",deadline:"",status:"Pending"}));
  };

  const hDel = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try { await axios.delete(`${API_URL}/api/events/${id}`); setMsg("Event deleted."); load(); }
    catch(err) { setMsg("Delete failed: "+(err.response?.data?.error||err.message)); }
  };

  const handleEditEvent = (ev) => {
    setEditingEventId(ev.id);
    setNEv({ title: ev.title||"", date: ev.date||"", budget: ev.budget||"" });
    setTab("Events");
  };

  const cancelEventEdit = () => {
    setEditingEventId(null);
    setNEv({ title:"", date:"", budget:"" });
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm("Cancel this vendor booking?")) return;
    try { await axios.delete(`${API_URL}/api/bookings/${id}`); setMsg("Vendor booking canceled."); load(); }
    catch(err) { setMsg("Cancel failed: "+(err.response?.data?.error||err.message)); }
  };

  const handleUpdateGuestStatus = async (id, status) => {
    try { await axios.put(`${API_URL}/api/guests/${id}`, { rsvp_status: status }); setMsg("Guest RSVP status updated."); load(); }
    catch(err) { setMsg("Update failed: "+(err.response?.data?.error||err.message)); }
  };

  const handleDeleteGuest = async (id) => {
    if (!window.confirm("Delete this guest?")) return;
    try { await axios.delete(`${API_URL}/api/guests/${id}`); setMsg("Guest deleted."); load(); }
    catch(err) { setMsg("Delete failed: "+(err.response?.data?.error||err.message)); }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setNTk({ event_id: task.event_id||"", task_name: task.task_name||"", deadline: task.deadline||"", status: task.status||"Pending" });
    setTab("Tasks");
  };

  const cancelTaskEdit = () => {
    setEditingTaskId(null);
    setNTk({ event_id:"", task_name:"", deadline:"", status:"Pending" });
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try { await axios.delete(`${API_URL}/api/tasks/${id}`); setMsg("Task deleted."); load(); }
    catch(err) { setMsg("Delete failed: "+(err.response?.data?.error||err.message)); }
  };

  const nav = [
    {n:"Dashboard",   i:ICONS.home},
    {n:"Events",      i:ICONS.calendar},
    {n:"Vendor Booking", i:ICONS.clip},
    {n:"Venue Booking",  i:ICONS.bell},
    {n:"Guests",      i:ICONS.users},
    {n:"Tasks",       i:ICONS.check},
    {n:"Reports",     i:ICONS.chart},
  ];

  /* loading */
  if (busy) return (
    <div className="min-h-screen flex items-center justify-center" style={{background:"linear-gradient(135deg,#f8fafc,#f1f5f9,#f8fafc)"}}>
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-[3px] border-[#e2e8f0]"/>
          <div className="absolute inset-0 rounded-full border-[3px] border-t-[#f43f5e] animate-spin"/>
          <div className="absolute inset-[5px] rounded-full flex items-center justify-center" style={{background:"linear-gradient(135deg,#fb7185,#f43f5e)"}}>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>
        <div className="text-center">
          <p className="text-[#f43f5e] font-semibold tracking-widest uppercase text-sm" style={{fontFamily:"'Cormorant Garamond',serif"}}>Vivaah</p>
          <p className="text-[#64748b] text-xs tracking-wider mt-1">Preparing your wedding dashboard…</p>
        </div>
      </div>
    </div>
  );

  /* ─────────────────────── RENDER ──────────────────────────────────────── */
  return (
    <div className="min-h-screen flex" style={{background:"#f8fafc",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#f8fafc}::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:99px}`}</style>

      {/* overlay */}
      {sbOpen && <div className="fixed inset-0 z-40 lg:hidden" style={{background:"rgba(15,23,42,0.15)",backdropFilter:"blur(4px)"}} onClick={()=>setSbOpen(false)}/>}

      {/* ══ SIDEBAR ══ */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col border-r transform transition-transform duration-300 ease-out ${sbOpen?"translate-x-0":"-translate-x-full lg:translate-x-0"}`}
        style={{background:"#fff",borderColor:"#e2e8f0",boxShadow:"4px 0 20px rgba(148,163,184,0.12)"}}>

        {/* brand */}
        <div className="px-6 py-5 border-b" style={{borderColor:"#e2e8f0"}}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
      
              <div>
                <p className="text-2xl font-serif font-bold text-rose-500 tracking-tight" >Vivaah</p>
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#64748b]">Wedding Planner</p>
              </div>
            </div>
            <button onClick={()=>setSbOpen(false)} className="lg:hidden p-1 rounded-lg hover:bg-[#fee2e2] text-[#64748b] transition-colors">
              <Icon d={ICONS.close} size="w-4 h-4"/>
            </button>
          </div>
        </div>

        {/* nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#94a3b8] px-3 pb-2">Menu</p>
          {nav.map(({n,i}) => {
            const a = tab === n;
            return (
              <button key={n} onClick={()=>{setTab(n);setSbOpen(false);}}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer text-left"
                style={a ? {background:"linear-gradient(135deg,#fff1f2,#fee2e2)",color:"#f43f5e",border:"1px solid rgba(244,63,94,0.2)",boxShadow:"0 2px 8px rgba(244,63,94,0.12)"} : {color:"#475569",border:"1px solid transparent"}}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all"
                  style={a?{background:"linear-gradient(135deg,#fb7185,#f43f5e)",boxShadow:"0 2px 6px rgba(244,63,94,0.4)"}:{background:"transparent"}}>
                  <svg className="w-3.5 h-3.5" style={{color:a?"white":"#94a3b8"}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={a?2:1.5} d={i}/>
                  </svg>
                </div>
                <span className={a?"font-semibold":""}>{n}</span>
                {a && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{background:"#f43f5e"}}/>}
              </button>
            );
          })}
        </nav>

        {/* user */}
        <div className="p-3 border-t" style={{borderColor:"#f8fafc"}}>
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl" style={{background:"#f8fafc",border:"1px solid #e2e8f0"}}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0" style={{background:"linear-gradient(135deg,#f43f5e,#fb7185)"}}>
              {user?.name?.charAt(0)?.toUpperCase()||"U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#0f172a] truncate">{user?.name||"User"}</p>
              <p className="text-[10px] text-[#64748b] truncate">{user?.email||"—"}</p>
            </div>
            <button onClick={onLogout} className="p-1.5 rounded-lg hover:bg-white text-[#64748b] hover:text-[#f43f5e] transition-all">
              <Icon d={ICONS.logout} size="w-3.5 h-3.5"/>
            </button>
          </div>
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">

        {/* topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 border-b"
          style={{background:"rgba(255,255,255,0.88)",backdropFilter:"blur(16px)",borderColor:"#e2e8f0"}}>
          <div className="flex items-center gap-4">
            <button onClick={()=>setSbOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-[#fff1f2] text-[#64748b] transition-colors">
              <Icon d={ICONS.menu} size="w-5 h-5" stroke={2}/>
            </button>
            <div>
              <h1 className="text-[18px] font-serif font-bold text-rose-500 tracking-tight">{tab}</h1>
              <p className="text-[11px] text-[#64748b]">
                {new Date().toLocaleDateString("en-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-[#e2e8f0] bg-white text-sm font-medium text-[#475569] hover:bg-[#fff1f2] hover:text-[#f43f5e] transition-colors">
              Home
            </a>
            <button className="relative p-2 rounded-xl hover:bg-[#fff1f2] text-[#64748b] hover:text-[#f43f5e] transition-colors">
              <Icon d={ICONS.bell}/>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white" style={{background:"#f43f5e"}}/>
            </button>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{background:"linear-gradient(135deg,#f43f5e,#fb7185)"}}>
              {user?.name?.charAt(0)?.toUpperCase()||"U"}
            </div>
          </div>
        </header>

        {/* alert */}
        {msg && (
          <div className="mx-5 mt-4">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium border ${msg.toLowerCase().includes("error")||msg.toLowerCase().includes("fail")?"bg-[#fdf0f0] text-[#dc2626] border-[#f0c0c0]":"bg-[#eef7f0] text-[#3a8a50] border-[#c2e4cb]"}`}>
              <Icon d={msg.toLowerCase().includes("error")||msg.toLowerCase().includes("fail")?"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z":ICONS.ok} size="w-4 h-4 flex-shrink-0" stroke={2}/>
              <span className="flex-1">{msg}</span>
              <button onClick={()=>setMsg("")} className="p-0.5 rounded-lg hover:bg-black/5 transition-colors">
                <Icon d={ICONS.close} size="w-3.5 h-3.5" stroke={2}/>
              </button>
            </div>
          </div>
        )}

        {/* pages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">

          {/* ── DASHBOARD ── */}
          {tab==="Dashboard" && (
            <div className="space-y-5">
              {/* hero */}
              <div className="relative overflow-hidden rounded-2xl p-7 text-white" style={{background:"linear-gradient(130deg,#f43f5e 0%,#fb7185 55%,#db2777 100%)",boxShadow:"0 8px 32px rgba(244,63,94,0.25)"}}>
                <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full" style={{background:"rgba(255,255,255,0.07)"}}/>
                <div className="absolute bottom-0 right-0 w-28 h-28 rounded-tl-full" style={{background:"rgba(255,255,255,0.05)"}}/>
                <div className="absolute top-4 right-24 w-12 h-12 rounded-full border-2" style={{borderColor:"rgba(255,255,255,0.15)"}}/>
                <div className="absolute top-7 right-32 w-7 h-7 rounded-full border-2" style={{borderColor:"rgba(255,255,255,0.1)"}}/>
                <div className="relative">
                  <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-2" style={{color:"rgba(255,255,255,0.7)"}}>✦ Welcome back</p>
                  <h2 className="text-[28px] font-medium mb-1" style={{fontFamily:"'Cormorant Garamond',serif"}}>{user?.name||"Planner"}</h2>
                  <p className="text-sm" style={{color:"rgba(255,255,255,0.8)"}}>
                    <strong className="text-white">{sEv.length}</strong> active events &nbsp;·&nbsp; <strong className="text-white">{sGu.length}</strong> guests registered
                  </p>
                </div>
              </div>

              {/* kpi */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {label:"Total Events",   val:sEv.length, ib:"#fff1f2", ic:"#f43f5e", acc:"#f43f5e", icon:ICONS.calendar},
                  {label:"Total Guests",   val:sGu.length, ib:"#fdf4ee", ic:"#c48a50", acc:"#c48a50", icon:ICONS.users},
                  {label:"Total Tasks",    val:sTk.length, ib:"#eef7f0", ic:"#3a8a50", acc:"#3a8a50", icon:ICONS.check},
                  {label:"Total Vendor Bookings", val:sBk.length, ib:"#f1f5f9", ic:"#f43f5e", acc:"#f43f5e", icon:ICONS.clip},
                ].map((s,i) => (
                  <div key={i} className={`${card} p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:s.ib}}>
                        <svg className="w-5 h-5" style={{color:s.ic}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={s.icon}/>
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#c4b0a8]">{s.label}</span>
                    </div>
                    <p className="text-[32px] font-semibold leading-none" style={{fontFamily:"'Cormorant Garamond',serif",color:s.acc}}>{s.val}</p>
                    <div className="mt-3 h-0.5 rounded-full w-8" style={{background:s.acc,opacity:0.3}}/>
                  </div>
                ))}
              </div>

              {/* recent */}
              <div className="grid lg:grid-cols-2 gap-4">
                <div className={card}>
                  <div className={`flex items-center justify-between px-5 py-3.5 ${div0}`}>
                    <h3 className="text-[13px] font-semibold text-[#0f172a]">Upcoming Events</h3>
                    <button onClick={()=>setTab("Events")} className="text-[11px] font-semibold text-[#f43f5e] hover:text-[#fb7185] transition-colors">View all →</button>
                  </div>
                  {sEv.length===0 ? <p className="py-8 text-center text-sm text-[#c4b0a8]">No events yet</p> :
                    sEv.slice(0,4).map(ev=>(
                      <div key={ev.id} className={`flex items-center justify-between px-5 py-3.5 ${div0} last:border-0 ${row}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:"#fff1f2"}}>
                            <svg style={{width:14,height:14,color:"#f43f5e"}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={ICONS.calendar}/>
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#0f172a]">{ev.title}</p>
                            <p className="text-[11px] text-[#64748b]">{ev.venue_name||"—"}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] text-[#475569]">{fmt(ev.date)}</p>
                          <p className="text-[11px] font-bold text-[#f43f5e]">₹{Number(ev.budget).toLocaleString("en-IN")}</p>
                        </div>
                      </div>
                    ))}
                </div>
                <div className={card}>
                  <div className={`flex items-center justify-between px-5 py-3.5 ${div0}`}>
                    <h3 className="text-[13px] font-semibold text-[#0f172a]">Recent Tasks</h3>
                    <button onClick={()=>setTab("Tasks")} className="text-[11px] font-semibold text-[#f43f5e] hover:text-[#fb7185] transition-colors">View all →</button>
                  </div>
                  {sTk.length===0 ? <p className="py-8 text-center text-sm text-[#c4b0a8]">No tasks yet</p> :
                    sTk.slice(0,4).map(t=>(
                      <div key={t.id} className={`flex items-center justify-between px-5 py-3.5 ${div0} last:border-0 ${row}`}>
                        <div className="flex items-center gap-3">
                          <span className={`w-2 h-2 rounded-full shrink-0`} style={{background:t.status==="Completed"?"#4aad6a":t.status==="In Progress"?"#d4a020":"#f43f5e"}}/>
                          <p className="text-sm font-medium text-[#0f172a]">{t.task_name}</p>
                        </div>
                        <Pill v={t.status}/>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* ── EVENTS ── */}
          {tab==="Events" && (
            <div className="space-y-4">
              <div className={`${card} p-5`}>
                <FH t="Create New Event"/>
                <form onSubmit={hEv} className="mt-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[{l:"Event Title",t:"text",k:"title",p:"e.g. Sharma–Mehta Wedding"},{l:"Event Date",t:"date",k:"date",p:""},{l:"Budget (₹)",t:"number",k:"budget",p:"0"}].map(f=>(
                      <div key={f.k}>
                        <label className={lbl}>{f.l}</label>
                        <input type={f.t} placeholder={f.p} value={nEv[f.k]}
                          onChange={e=>setNEv({...nEv,[f.k]:e.target.value})} className={inp} required/>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button type="submit" className={btn}>{editingEventId ? "Update Event" : "Create Event"}</button>
                    {editingEventId && (
                      <button type="button" onClick={cancelEventEdit} className="inline-flex items-center justify-center rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm font-semibold text-[#64748b] transition-all duration-200 hover:border-[#f43f5e] hover:text-[#f43f5e]">
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>
              <div className={card}>
                <div className={`flex items-center justify-between px-5 py-3.5 ${div0}`}>
                  <h3 className="text-[13px] font-semibold text-[#0f172a]">All Events <span className="text-[#64748b] font-normal ml-1">({sEv.length})</span></h3>
                </div>
                {sEv.length===0 ? <Empty icon={ICONS.calendar} title="No events yet" sub="Create your first event above"/> :
                  sEv.map(ev=>(
                    <div key={ev.id} className={`flex items-center justify-between gap-4 px-5 py-4 ${div0} last:border-0 ${row} group`}>
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{background:"linear-gradient(135deg,#fff1f2,#fecdd3)"}}>
                          <svg style={{width:17,height:17,color:"#f43f5e"}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={ICONS.calendar}/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0f172a]">{ev.title}</p>
                          <p className="text-[11px] text-[#64748b] mt-0.5">{ev.venue_name||"No venue assigned"}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[11px] text-[#9a7870]">📅 {fmt(ev.date)}</span>
                            <span className="text-[11px] font-bold text-[#f43f5e]">₹{Number(ev.budget).toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <button onClick={()=>handleEditEvent(ev)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-[#0f172a] bg-[#f8fafc] border border-[#e2e8f0] hover:bg-white transition-all">
                          Edit
                        </button>
                        <button onClick={()=>hDel(ev.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-[#dc2626] hover:bg-[#fdf0f0] transition-all">
                          <svg style={{width:13,height:13}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS.trash}/>
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ── VENDOR BOOKING ── */}
          {tab==="Vendor Booking" && (
            <div className="space-y-4">
              {/* vendor */}
              <div className={`${card} p-5`}>
                <FH t="Book a Vendor"/>
                <form onSubmit={hBk} className="mt-4 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={lbl}>Event</label>
                      <select value={nBk.event_id} onChange={e=>setNBk({...nBk,event_id:e.target.value,vendor_id:""})} className={inp} required>
                        <option value="">Select an event</option>
                        {sEv.map(e=><option key={e.id} value={e.id}>{e.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={lbl}>Booking Date</label>
                      <input type="date" value={nBk.booking_date} onChange={e=>setNBk({...nBk,booking_date:e.target.value})} className={inp} required/>
                    </div>
                  </div>
                  {nBk.event_id && (
                    <div>
                      <label className={lbl}>Select Vendor</label>
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 mt-2">
                        {sVd.map(v=>{
                          const sel=String(v.id)===String(nBk.vendor_id);
                          return (
                            <button key={v.id} type="button" onClick={()=>setNBk({...nBk,vendor_id:String(v.id)})}
                              className="text-left p-4 rounded-xl border-2 transition-all duration-200"
                              style={sel?{borderColor:"#f43f5e",background:"linear-gradient(135deg,#f8fafc,#fff1f2)",boxShadow:"0 4px 12px rgba(244,63,94,0.14)"}:{borderColor:"#e2e8f0",background:"white"}}>
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <p className="text-sm font-semibold text-[#0f172a]">{v.name}</p>
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{background:"#fff1f2",color:"#f43f5e"}}>{fmtP(v)}</span>
                              </div>
                              <p className="text-[11px] text-[#64748b]">{v.service_type??"Service"}</p>
                              <p className="text-[11px] text-[#64748b] mt-0.5">{fmtC(v)}</p>
                              <p className="text-[10px] font-bold tracking-widest uppercase mt-3" style={{color:sel?"#f43f5e":"#94a3b8"}}>
                                {sel?"✓ Selected":"Tap to select"}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <button type="submit" className={btn}>Confirm Vendor Booking</button>
                </form>
              </div>

              <div className={card}>
                <div className={`flex items-center justify-between px-5 py-3.5 ${div0}`}>
                  <h3 className="text-[13px] font-semibold text-[#0f172a]">All Vendor Bookings <span className="text-[#64748b] font-normal ml-1">({sBk.length})</span></h3>
                </div>
                {sBk.length===0 ? <Empty icon={ICONS.clip} title="No vendor bookings yet" sub="Book a vendor above"/> :
                  sBk.map(b=>(
                    <div key={b.id} className={`flex items-center gap-4 px-5 py-4 ${div0} last:border-0 ${row}`}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:"#f1f5f9"}}>
                        <svg style={{width:15,height:15,color:"#f43f5e"}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={ICONS.clip}/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-semibold text-[#0f172a]">{b.event_name}</p>
                            <p className="text-[11px] text-[#64748b] mt-0.5">{b.vendor_name}</p>
                          </div>
                          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{background:"#f1f5f9",color:"#f43f5e"}}>{b.service_type}</span>
                        </div>
                        <p className="text-[11px] text-[#64748b] mt-1">📅 {fmt(b.booking_date)}</p>
                      </div>
                      <button onClick={()=>handleCancelBooking(b.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-[#dc2626] hover:bg-[#fdf0f0] transition-all">
                        Cancel
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ── VENUE BOOKING ── */}
          {tab==="Venue Booking" && (
            <div className="space-y-4">
              <div className={`${card} p-5`}>
                <FH t="Book a Venue"/>
                <form onSubmit={hVb} className="mt-4 space-y-4">
                  <div>
                    <label className={lbl}>Event</label>
                    <select value={nVb.event_id} onChange={e=>setNVb({...nVb,event_id:e.target.value,venue_id:""})} className={inp} style={{maxWidth:280}} required>
                      <option value="">Select an event</option>
                      {sEv.map(e=><option key={e.id} value={e.id}>{e.title}</option>)}
                    </select>
                  </div>
                  {nVb.event_id && (
                    <div>
                      <label className={lbl}>Select Venue</label>
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 mt-2">
                        {sVn.map((v,i)=>{
                          const sel=String(v.id)===String(nVb.venue_id);
                          return (
                            <button key={v.id} type="button" onClick={()=>setNVb({...nVb,venue_id:String(v.id)})}
                              className="text-left overflow-hidden rounded-xl border-2 transition-all duration-200"
                              style={sel?{borderColor:"#f43f5e",boxShadow:"0 4px 12px rgba(244,63,94,0.14)"}:{borderColor:"#e2e8f0",background:"white"}}>
                              <div className="h-36 overflow-hidden">
                                <img src={venueImages[i % venueImages.length]} alt={v.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="p-4">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <p className="text-sm font-semibold text-[#0f172a]">{v.name}</p>
                                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{background:"#fff1f2",color:"#f43f5e"}}>{fmtP(v)}</span>
                                </div>
                                <p className="text-[11px] text-[#64748b]">📍 {v.location}</p>
                                <p className="text-[11px] text-[#64748b] mt-0.5">Capacity: {v.capacity}</p>
                                <p className="text-[10px] font-bold tracking-widest uppercase mt-3" style={{color:sel?"#f43f5e":"#94a3b8"}}>
                                  {sel?"✓ Selected":"Tap to select"}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <button type="submit" className={btn}>Confirm Venue Booking</button>
                </form>
              </div>
              <div className={card}>
                <div className={`flex items-center justify-between px-5 py-3.5 ${div0}`}>
                  <h3 className="text-[13px] font-semibold text-[#0f172a]">
                    Booked Venues
                  </h3>
                </div>

                {sEv.filter(e => e.venue_id).length === 0 ? (
                  <Empty icon={ICONS.bell} title="No venue bookings yet" sub="Book a venue above" />
                ) : (
                  sEv
                    .filter(e => e.venue_id)
                    .map(ev => {
                      const venue = sVn.find(v => String(v.id) === String(ev.venue_id));

                      return (
                        <div key={ev.id} className={`flex items-center gap-4 px-5 py-4 ${div0} last:border-0 ${row}`}>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#0f172a]">
                              {ev.title}
                            </p>
                            <p className="text-[11px] text-[#64748b]">
                              {venue?.name || "Venue not found"}
                            </p>
                          </div>

                          <span className="text-[11px] font-semibold text-[#f43f5e]">
                            ₹{Number(venue?.price || 0).toLocaleString("en-IN")}
                          </span>
                        </div>
                      );
                    })
                )}
              </div>

            </div>
          )}

          {/* ── GUESTS ── */}
          {tab==="Guests" && (
            <div className="space-y-4">
              <div className={`${card} p-5`}>
                <FH t="Add Guest"/>
                <form onSubmit={hGu} className="mt-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <label className={lbl}>Event</label>
                      <select value={nGu.event_id} onChange={e=>setNGu({...nGu,event_id:e.target.value})} className={inp} required>
                        <option value="">Select event</option>
                        {sEv.map(e=><option key={e.id} value={e.id}>{e.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={lbl}>Guest Name</label>
                      <input type="text" placeholder="Full name" value={nGu.name}
                        onChange={e=>setNGu({...nGu,name:e.target.value})} className={inp} required/>
                    </div>
                    <div>
                      <label className={lbl}>RSVP Status</label>
                      <select value={nGu.rsvp_status} onChange={e=>setNGu({...nGu,rsvp_status:e.target.value})} className={inp}>
                        {["Pending","Accepted","Declined"].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={lbl}>Meal Preference</label>
                      <select value={nGu.meal_pref} onChange={e=>setNGu({...nGu,meal_pref:e.target.value})} className={inp}>
                        {["Vegetarian","Non-Vegetarian"].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4"><button type="submit" className={btn}>Add Guest</button></div>
                </form>
              </div>

              {/* rsvp summary */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  {l:"Accepted",n:sGu.filter(g=>g.rsvp_status==="Accepted").length,dot:"#4aad6a",bg:"#eef7f0",border:"#c2e4cb",tc:"#3a8a50"},
                  {l:"Pending", n:sGu.filter(g=>g.rsvp_status==="Pending").length, dot:"#f43f5e",bg:"#fff1f2",border:"#f0c8c4",tc:"#f43f5e"},
                  {l:"Declined",n:sGu.filter(g=>g.rsvp_status==="Declined").length,dot:"#dc2626",bg:"#fdf0f0",border:"#f0c0c0",tc:"#dc2626"},
                ].map(s=>(
                  <div key={s.l} className="bg-white rounded-2xl border p-4 flex items-center gap-3" style={{borderColor:s.border}}>
                    <div className="w-2 h-10 rounded-full flex-shrink-0" style={{background:s.dot}}/>
                    <div>
                      <p className="text-2xl font-semibold" style={{fontFamily:"'Cormorant Garamond',serif",color:s.tc}}>{s.n}</p>
                      <p className="text-[11px] font-medium" style={{color:s.dot}}>{s.l}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={card}>
                <div className={`flex items-center justify-between px-5 py-3.5 ${div0}`}>
                  <h3 className="text-[13px] font-semibold text-[#0f172a]">All Guests <span className="text-[#64748b] font-normal ml-1">({sGu.length})</span></h3>
                </div>
                {sGu.length===0 ? <Empty icon={ICONS.users} title="No guests added" sub="Add your first guest above"/> :
                  sGu.map(g=>(
                    <div key={g.id} className={`flex items-center justify-between px-5 py-3.5 ${div0} last:border-0 ${row}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#f43f5e] flex-shrink-0" style={{background:"#fff1f2"}}>
                          {g.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0f172a]">{g.name}</p>
                          <p className="text-[11px] text-[#64748b]">{g.meal_pref}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select value={g.rsvp_status} onChange={e=>handleUpdateGuestStatus(g.id, e.target.value)} className="rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-[11px] text-[#0f172a] outline-none transition-all duration-200 hover:border-[#f43f5e]">
                          {['Pending','Accepted','Declined'].map(o=><option key={o} value={o}>{o}</option>)}
                        </select>
                        <button onClick={()=>handleDeleteGuest(g.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-[#dc2626] hover:bg-[#fdf0f0] transition-all">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ── TASKS ── */}
          {tab==="Tasks" && (
            <div className="space-y-4">
              <div className={`${card} p-5`}>
                <FH t="Add Task"/>
                <form onSubmit={hTk} className="mt-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <label className={lbl}>Event</label>
                      <select value={nTk.event_id} onChange={e=>setNTk({...nTk,event_id:e.target.value})} className={inp} required>
                        <option value="">Select event</option>
                        {sEv.map(e=><option key={e.id} value={e.id}>{e.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={lbl}>Task Name</label>
                      <input type="text" placeholder="e.g. Book florist" value={nTk.task_name}
                        onChange={e=>setNTk({...nTk,task_name:e.target.value})} className={inp} required/>
                    </div>
                    <div>
                      <label className={lbl}>Deadline</label>
                      <input type="date" value={nTk.deadline} onChange={e=>setNTk({...nTk,deadline:e.target.value})} className={inp} required/>
                    </div>
                    <div>
                      <label className={lbl}>Status</label>
                      <select value={nTk.status} onChange={e=>setNTk({...nTk,status:e.target.value})} className={inp}>
                        {["Pending","In Progress","Completed"].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button type="submit" className={btn}>{editingTaskId ? "Update Task" : "Add Task"}</button>
                    {editingTaskId && (
                      <button type="button" onClick={cancelTaskEdit} className="inline-flex items-center justify-center rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm font-semibold text-[#64748b] transition-all duration-200 hover:border-[#f43f5e] hover:text-[#f43f5e]">
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {sTk.length>0 && (()=>{
                const done=sTk.filter(t=>t.status==="Completed").length;
                const pct=Math.round((done/sTk.length)*100);
                return (
                  <div className={`${card} px-5 py-4`}>
                    <div className="flex items-center justify-between mb-2.5">
                      <p className="text-sm font-semibold text-[#0f172a]">Overall Progress</p>
                      <p className="text-sm font-bold text-[#f43f5e]">{done}/{sTk.length} · {pct}%</p>
                    </div>
                    <div className="h-2.5 rounded-full overflow-hidden" style={{background:"#fff1f2"}}>
                      <div className="h-full rounded-full transition-all duration-700" style={{width:`${pct}%`,background:"linear-gradient(90deg,#f43f5e,#fb7185)"}}/>
                    </div>
                  </div>
                );
              })()}

              <div className={card}>
                <div className={`flex items-center justify-between px-5 py-3.5 ${div0}`}>
                  <h3 className="text-[13px] font-semibold text-[#0f172a]">All Tasks <span className="text-[#64748b] font-normal ml-1">({sTk.length})</span></h3>
                </div>
                {sTk.length===0 ? <Empty icon={ICONS.check} title="No tasks added" sub="Create your first task above"/> :
                  sTk.map(t=>(
                    <div key={t.id} className={`flex items-center justify-between px-5 py-4 ${div0} last:border-0 ${row}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{background:t.status==="Completed"?"#eef7f0":t.status==="In Progress"?"#fef8ec":"#fff1f2"}}>
                          <svg style={{width:15,height:15,color:t.status==="Completed"?"#3a8a50":t.status==="In Progress"?"#a07020":"#f43f5e"}}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={t.status==="Completed"?ICONS.ok:ICONS.clock}/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0f172a]">{t.task_name}</p>
                          <p className="text-[11px] text-[#64748b] mt-0.5">Due: {fmt(t.deadline)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Pill v={t.status}/>
                        <button onClick={()=>handleEditTask(t)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-[#0f172a] bg-[#f8fafc] border border-[#e2e8f0] hover:bg-white transition-all">
                          Edit
                        </button>
                        <button onClick={()=>handleDeleteTask(t.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-[#dc2626] hover:bg-[#fdf0f0] transition-all">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ── REPORTS ── */}
          {tab==="Reports" && (
            <div className="grid gap-4 lg:grid-cols-2">
              {sRp.length===0
                ? <div className="lg:col-span-2"><Empty icon={ICONS.chart} title="No reports yet" sub="Create events to generate financial reports" wrap/></div>
                : sRp.map(r=>{
                    const spent=totalSpent(r);
                    const pct=r.budget>0?Math.min(Math.round((spent/r.budget)*100),100):0;
                    const rem=(r.budget??0)-spent;
                    const over=pct>=90;
                    return (
                      <div key={r.title} className={`${card} overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`}>
                        <div className="h-1 w-full" style={{background:"linear-gradient(90deg,#f43f5e,#fb7185,#db2777)"}}/>
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-5">
                            <div>
                              <h3 className="text-[18px] md:text-[20px] font-semibold text-[#0f172a]" style={{fontFamily:"'Cormorant Garamond',serif"}}>{r.title}</h3>
                              <p className="text-[12px] md:text-sm text-[#64748b] tracking-wide mt-0.5">Financial Summary</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:"#fff1f2"}}>
                              <svg style={{width:18,height:18,color:"#f43f5e"}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={ICONS.chart}/>
                              </svg>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3 mb-4">
                            {[
                              {l:"Budget",    v:`₹${(r.budget??0).toLocaleString("en-IN")}`, bg:"#f8fafc",tc:"#f43f5e"},
                              {l:"Spent",     v:`₹${spent.toLocaleString("en-IN")}`,          bg:"#fdf0f0",tc:"#dc2626"},
                              {l:"Remaining", v:`₹${rem.toLocaleString("en-IN")}`,            bg:"#eef7f0",tc:"#3a8a50"},
                            ].map(s=>(
                              <div key={s.l} className="rounded-2xl p-4 text-center" style={{background:s.bg}}>
                                <p className="text-[11px] font-bold tracking-widest uppercase text-[#64748b] mb-2">{s.l}</p>
                                <p className="text-[18px] md:text-[15px] font-semibold tracking-tight" style={{fontFamily:"'DM Sans',sans-serif",color:s.tc}}>{s.v}</p>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between px-4 py-3 rounded-2xl mb-4" style={{background:"#f8fafc",border:"1px solid #e2e8f0"}}>
                            <span className="text-sm font-semibold text-[#475569]">Total Guests</span>
                            <span className="text-[22px] md:text-[18px] font-semibold tracking-tight text-[#f43f5e]" style={{fontFamily:"'DM Sans',sans-serif"}}>
                              {(() => {
                                const evObj = sEv.find(e => e.title === r.title);
                                return evObj
                                  ? sGu.filter(g => String(g.event_id) === String(evObj.id)).length
                                  : (r.total_guests ?? 0);
                              })()}
                            </span>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm font-semibold mb-1.5">
                              <span className="text-[#64748b]">Budget Utilisation</span>
                              <span className="text-[14px] md:text-[15px] font-semibold" style={{color:over?"#dc2626":"#f43f5e"}}>{pct}%</span>
                            </div>
                            <div className="h-2.5 rounded-full overflow-hidden" style={{background:"#f8fafc"}}>
                              <div className="h-full rounded-full transition-all duration-700"
                                style={{width:`${pct}%`,background:over?"linear-gradient(90deg,#dc2626,#dc2626)":"linear-gradient(90deg,#f43f5e,#fb7185)"}}/>
                            </div>
                            {over && <p className="text-[12px] font-semibold text-[#dc2626] mt-1.5">⚠ Budget nearly exhausted</p>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}