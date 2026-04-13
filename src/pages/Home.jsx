import { useRef, useState, useEffect } from "react";
import hero1 from "../assets/hero/hero1.jpg";
import hero2 from "../assets/hero/hero2.jpg";
import hero3 from "../assets/hero/hero3.jpg";
import hero4 from "../assets/hero/hero4.jpg";
import hero5 from "../assets/hero/hero5.jpg";
import { useNavigate } from "react-router-dom";

import aboutImg from "../assets/about/about1.jpg";

import gallery1 from "../assets/gallery/gallery1.jpg";
import gallery2 from "../assets/gallery/gallery2.jpg";
import gallery3 from "../assets/gallery/gallery3.jpg";
import gallery4 from "../assets/gallery/gallery4.jpg";
import gallery5 from "../assets/gallery/gallery5.jpg";
import gallery6 from "../assets/gallery/gallery6.jpg"



// ── Scroll helper ──────────────────────────────────────────────
const scrollTo = (ref) =>
  ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

// ── Data ───────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Gallery", "Services", "Prices", "Reviews", "Contact"];

const SERVICES = [
  {
    icon: "🌸",
    title: "Venue Curation",
    desc: "Hand-picked palaces, gardens, and heritage properties curated to match your dream aesthetic.",
  },
  {
    icon: "🍽️",
    title: "Catering Excellence",
    desc: "From royal Mughlai spreads to modern fusion buffets — menus crafted to delight every guest.",
  },
  {
    icon: "📸",
    title: "Photography & Film",
    desc: "Cinematic storytelling. Our photographers capture the tears, laughs, and stolen glances.",
  },
  {
    icon: "🌺",
    title: "Floral & Décor",
    desc: "Bespoke floral installations and mandap designs that transform any space into a fairytale.",
  },
  {
    icon: "🎶",
    title: "Entertainment",
    desc: "Live orchestras, DJs, and folk performers to keep the celebrations alive all night long.",
  },
  {
    icon: "💄",
    title: "Bridal Beauty",
    desc: "Award-winning makeup artists and mehndi professionals for every ritual and ceremony.",
  },
];

const PRICING = [
  {
    title: "Silver",
    price: "₹2.5L",
    features: ["Venue Assistance", "Basic Decor", "Vendor Coordination"],
  },
  {
    title: "Gold",
    price: "₹5L",
    features: ["Premium Decor", "Photography", "Catering Support"],
  },
  {
    title: "Platinum",
    price: "₹9L",
    features: ["Luxury Venue", "Full Planning", "Designer Decor"],
  },
  {
    title: "Royal",
    price: "₹15L",
    features: ["Destination Wedding", "Celebrity Artists", "Full Luxury"],
  },
  {
    title: "Elite",
    price: "₹25L",
    features: ["Palace Weddings", "International Planning", "VIP Experience"],
  },
];

function PricingCarousel() {
  const [items, setItems] = useState([...PRICING]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);

      // When close to end → extend list
      setItems((prevItems) => {
        if (index > prevItems.length - 5) {
          return [...prevItems, ...PRICING]; // append again
        }
        return prevItems;
      });

    }, 4000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="overflow-hidden py-10 w-full">
      <div
        className="flex gap-6 transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${index * (100 / 3)}%)`,
        }}
      >
        {items.map((plan, i) => {
          const isCenter = i === index + 1;

          return (
            <div key={i} className="w-1/4 flex-shrink-0">
              <div
                className={`h-full min-h-[400px] rounded-3xl border p-8 transition-all duration-300 ${
                  isCenter
                    ? "bg-white border-rose-400 scale-105 shadow-2xl"
                    : "bg-stone-50 border-stone-200"
                }`}
              >
                <p className="text-sm font-semibold text-rose-400 mb-2">
                  {plan.title}
                </p>

                <p className="text-4xl font-serif font-bold text-stone-800 mb-4">
                  {plan.price}
                </p>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="text-sm text-stone-600">
                      • {f}
                    </li>
                  ))}
                </ul>

                <button
                onClick={()=> navigate("/login")}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                    isCenter
                      ? "bg-rose-500 text-white hover:bg-rose-600"
                      : "bg-white border border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const GALLERY_IMAGES = [
  { url: gallery1, label: "Ceremony" },
  { url: gallery2, label: "Reception" },
  { url: gallery3, label: "Portraits" },
  { url: gallery4, label: "Décor" },
  { url: gallery5, label: "Rituals" },
  { url: gallery6, label: "Celebration" },
];

const REVIEWS = [
  {
    name: "Priya & Rohan Sharma",
    location: "Mumbai",
    stars: 5,
    text: "Vivaah turned our vision into a breathtaking reality. Every single detail — from the marigold garlands to the candlelit reception — was perfection. We didn't have to worry about a thing.",
    avatar: "PR",
    color: "bg-rose-100 text-rose-600",
  },
  {
    name: "Ananya & Karan Mehta",
    location: "Delhi",
    stars: 5,
    text: "The team at Vivaah felt like family from day one. Our guests are still talking about the pheras décor. Worth every single rupee — they exceeded every expectation we had.",
    avatar: "AK",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Sneha & Arjun Nair",
    location: "Bangalore",
    stars: 5,
    text: "Managing a 500-person wedding felt impossible until Vivaah stepped in. Flawless coordination, stunning florals, and the photographer they recommended made us cry rewatching our video.",
    avatar: "SA",
    color: "bg-stone-200 text-stone-600",
  },
  {
    name: "Divya & Rahul Iyer",
    location: "Chennai",
    stars: 5,
    text: "From the mehendi ceremony to the sangeet, every event was perfectly planned. Vivaah's attention to detail is unmatched. Our dream wedding became our reality.",
    avatar: "DR",
    color: "bg-rose-100 text-rose-600",
  },
];

const STATS = [
  { value: "2,400+", label: "Weddings Planned" },
  { value: "98%", label: "Happy Couples" },
  { value: "12", label: "Cities Covered" },
  { value: "8 yrs", label: "Of Excellence" },
];

// ── Star rating component ──────────────────────────────────────
const Stars = ({ count = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// ══════════════════════════════════════════════════════════════
export default function HomePage() {
  const homeRef    = useRef(null);
  const aboutRef   = useRef(null);
  const galleryRef = useRef(null);
  const servicesRef= useRef(null);
  const pricesRef  = useRef(null);
  const reviewsRef = useRef(null);
  const contactRef = useRef(null);

  const refs = { Home: homeRef, About: aboutRef, Gallery: galleryRef, Services: servicesRef, Prices: pricesRef, Reviews: reviewsRef, Contact: contactRef };

  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [contactForm, setContact] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("token")));
  const [userName, setUserName] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user"))?.name || ""; }
    catch { return ""; }
  });
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateAuth = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("token")));
      try { setUserName(JSON.parse(localStorage.getItem("user"))?.name || ""); }
      catch { setUserName(""); }
    };
    const handleClickOutside = (event) => {
      if (profileOpen && profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    updateAuth();
    window.addEventListener("storage", updateAuth);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("storage", updateAuth);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  const heroImages = [hero1, hero2, hero3, hero4, hero5];
const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, 5000);

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleContact = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="font-sans text-stone-800 bg-white overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => scrollTo(homeRef)} className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-rose-500 tracking-tight">Vivaah</span>
            <span className={`text-xs font-medium tracking-widest uppercase hidden sm:block transition-colors ${scrolled ? "text-stone-400" : "text-white/70"}`}>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(refs[link])}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150
                  ${scrolled
                    ? "text-stone-600 hover:text-rose-500 hover:bg-rose-50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-2 relative">
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button onClick={() => setProfileOpen((prev) => !prev)}
                  className="w-10 h-10 rounded-full bg-rose-500 text-white font-semibold flex items-center justify-center text-sm shadow-lg transition-all hover:bg-rose-400">
                  {userName ? userName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() : "U"}
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-xl z-50">
                    <div className="px-4 py-3 border-b border-stone-100">
                      <p className="text-sm font-semibold text-stone-900 truncate">{userName || "User"}</p>
                    </div>
                    <div className="flex flex-col gap-2 p-3">
                      <button onClick={() => { setProfileOpen(false); navigate("/dashboard"); }}
                        className="w-full text-left rounded-2xl px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-all">
                        My Dashboard
                      </button>
                      <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href = "/"; }}
                        className="w-full text-left rounded-2xl px-3 py-2 text-sm font-semibold text-rose-500 hover:bg-rose-50 transition-all">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <a href="/login" className={`text-sm font-semibold px-4 py-2 rounded-full transition-all duration-150
                  ${scrolled ? "text-stone-700 hover:text-rose-500" : "text-white/90 hover:text-white"}`}>
                  Login
                </a>
                <a href="/register" className="text-sm font-semibold px-5 py-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-all duration-150 shadow-sm">
                  Register
                </a>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden p-2 rounded-lg ${scrolled ? "text-stone-700" : "text-white"}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 space-y-1 shadow-lg">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => { scrollTo(refs[link]); setMenuOpen(false); }}
                className="block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:bg-rose-50 hover:text-rose-500 transition-all"
              >
                {link}
              </button>
            ))}
            <div className="flex gap-2 pt-3 border-t border-stone-100 mt-2">
              {isAuthenticated ? (
                <>
                  <button onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}
                    className="flex-1 text-center text-sm font-semibold py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50">
                    Dashboard
                  </button>
                  <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href = "/"; }}
                    className="flex-1 text-center text-sm font-semibold py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="flex-1 text-center text-sm font-semibold py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50">Login</a>
                  <a href="/register" className="flex-1 text-center text-sm font-semibold py-2.5 rounded-xl bg-rose-500 text-white hover:bg-rose-600">Register</a>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      
      <section ref={homeRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🔥 Background Slider */}
      <div className="absolute inset-0">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-rose-300 text-xs font-semibold tracking-[0.4em] uppercase mb-6 animate-pulse">
          India's Premium Wedding Planners
        </p>

        <h1 className="text-6xl md:text-8xl font-serif font-bold text-white leading-none mb-4 tracking-tight">
          Vivaah
        </h1>

        <p className="text-xl md:text-2xl font-light text-white/80 mb-3 italic tracking-wide">
          Where Every Love Story Becomes Legend
        </p>

        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-20 bg-rose-400/60" />
          <span className="text-rose-300 text-sm">✦</span>
          <div className="h-px w-20 bg-rose-400/60" />
        </div>

        <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Crafting timeless celebrations for over 2,400 couples across India. Your dream wedding, planned to perfection.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => scrollTo(servicesRef)}
            className="px-8 py-4 bg-rose-500 text-white text-sm font-semibold rounded-full hover:bg-rose-400 transition-all duration-200 shadow-lg hover:shadow-rose-500/30"
          >
            Explore Our Services
          </button>

          <button
            onClick={() => scrollTo(contactRef)}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200"
          >
            Plan My Wedding
          </button>
        </div>
      </div>

      {/* Slider indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide ? "bg-rose-400 w-6" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

    </section>
      {/* ── STATS STRIP ────────────────────────────────────────── */}
      <div className="bg-stone-900 py-8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-serif font-bold text-rose-400 mb-1">{s.value}</p>
              <p className="text-xs text-stone-400 uppercase tracking-widest font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ──────────────────────────────────────────────── */}
      <section ref={aboutRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-16 items-center">
          {/* Image collage */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                //src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80"
                src = {aboutImg}
                alt="Wedding couple"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-stone-100 max-w-[200px]">
              <p className="text-3xl font-serif font-bold text-rose-500">8+</p>
              <p className="text-xs text-stone-500 leading-relaxed mt-1">Years of crafting perfect weddings across India</p>
            </div>
            {/* Floating tag */}
            <div className="absolute top-6 -left-4 bg-rose-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
              ✦ Trusted by 2,400+ Couples
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-400 mb-3">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 leading-tight mb-6">
              We believe every<br />
              <span className="italic text-rose-400">love story</span> deserves<br />
              a perfect stage.
            </h2>
            <p className="text-stone-500 leading-relaxed mb-5">
              Founded in 2016, Vivaah was born from a simple belief — that weddings aren't just events, they're the most important chapters of a person's life. We started as a small team of three passionate planners in Mumbai, and today we operate across 12 cities with a family of 80+ dedicated professionals.
            </p>
            <p className="text-stone-500 leading-relaxed mb-8">
              From intimate 50-person ceremonies to grand celebrations of 2,000 guests, we bring the same obsessive attention to detail, the same warmth, and the same promise: your day will be nothing short of extraordinary.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Pan-India Coverage", "Dedicated Planners", "Transparent Pricing", "24/7 Support"].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-rose-50 text-rose-600 text-xs font-semibold rounded-full border border-rose-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────── */}
      <section ref={servicesRef} className="py-10 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-400 mb-3">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
              Everything your wedding needs,<br />
              <span className="italic text-rose-400">under one roof.</span>
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto text-sm leading-relaxed">
              From the first consultation to the final farewell, we manage every detail so you can be fully present in every moment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="group bg-white rounded-3xl border border-stone-100 p-7 hover:border-rose-200 hover:shadow-xl hover:shadow-rose-50 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-2xl mb-5 group-hover:bg-rose-100 transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-base font-bold text-stone-800 mb-2">{s.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────── */}
      <section ref={pricesRef} className="py-10 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Heading */}
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-400 mb-3">
              Pricing Plans
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
              Choose your perfect<br />
              <span className="italic text-rose-400">wedding package.</span>
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto text-sm leading-relaxed">
              Transparent pricing tailored for every kind of celebration.
            </p>
          </div>

          {/* Carousel */}
          <PricingCarousel />

        </div>
      </section>

      {/* ── GALLERY ────────────────────────────────────────────── */}
      <section ref={galleryRef} className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-400 mb-3">Our Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
              Moments frozen in<br />
              <span className="italic text-rose-400">timeless beauty.</span>
            </h2>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={img.label}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5]"
              >
                <img
                  src={img.url}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white text-sm font-semibold tracking-wide">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ────────────────────────────────────────────── */}
      <section ref={reviewsRef} className="py-10 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-400 mb-3">Love Stories</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Words from our<br />
              <span className="italic text-rose-400">happy couples.</span>
            </h2>
            <p className="text-stone-400 max-w-md mx-auto text-sm">
              Over 2,400 weddings later, the smiles haven't stopped — and neither has the love.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-stone-800 rounded-3xl border border-stone-700 p-6 flex flex-col gap-4 hover:border-rose-500/40 hover:bg-stone-750 transition-all duration-200">
                <Stars />
                <p className="text-stone-300 text-sm leading-relaxed flex-1">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-stone-700">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${r.color}`}>
                    {r.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">{r.name}</p>
                    <p className="text-stone-500 text-xs mt-0.5">{r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-rose-500 py-10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Your forever starts here.
          </h2>
          <p className="text-rose-100 mb-8 text-base leading-relaxed">
            Let's sit down together, understand your dream, and make it come alive. No obligation, no pressure — just a conversation about love.
          </p>
          <button
            onClick={() => scrollTo(contactRef)}
            className="px-10 py-4 bg-white text-rose-600 text-sm font-bold rounded-full hover:bg-rose-50 transition-all duration-200 shadow-xl"
          >
            Get a Free Consultation
          </button>
        </div>
      </div>

      {/* ── CONTACT ────────────────────────────────────────────── */}
      <section ref={contactRef} className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-16 items-start">

          {/* Info column */}
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-rose-400 mb-1">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 leading-tight mb-1">
              Let's plan your<br />
              <span className="italic text-rose-400">dream wedding.</span>
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-5">
              Whether you have a date, a venue, or just a feeling — reach out. Our planners respond within 24 hours and initial consultations are completely free.
            </p>

            <div className="space-y-2">
              {[
                { icon: "📍", label: "Office", value: "Vivaah HQ, Bandra West, Mumbai 400050" },
                { icon: "📞", label: "Phone", value: "+91 98765 43210" },
                { icon: "✉️", label: "Email", value: "hello@vivaah.in" },
                { icon: "🕐", label: "Hours", value: "Mon–Sat, 10am – 7pm IST" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-xl bg-rose-50 flex items-center justify-center text-base flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 font-semibold uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-sm text-stone-700 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-stone-50 rounded-3xl border border-stone-100 p-1">
            {submitted ? (
              <div className="py-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-10 rounded-full bg-rose-100 flex items-center justify-center text-3xl mb-5">💌</div>
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-1">Thank you!</h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  We've received your message and will get back to you within 24 hours. Excited to plan something beautiful with you!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs font-semibold text-rose-500 hover:text-rose-600 underline underline-offset-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContact} className="space-y-5">
                <h3 className="text-lg font-serif font-bold text-stone-800 mb-0">Send us a message</h3>
                <p className="text-xs text-stone-400 mb-1">We'll get back to you within 24 hours.</p>

                <div className="grid sm:grid-cols-2 gap-1">
                  <div>
                    <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">Your Name</label>
                    <input
                      required
                      placeholder="Priya Sharma"
                      value={contactForm.name}
                      onChange={(e) => setContact({ ...contactForm, name: e.target.value })}
                      className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2 text-stone-800 text-sm placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">Phone</label>
                    <input
                      placeholder="+91 98765 43210"
                      value={contactForm.phone}
                      onChange={(e) => setContact({ ...contactForm, phone: e.target.value })}
                      className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2 text-stone-800 text-sm placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="you@email.com"
                    value={contactForm.email}
                    onChange={(e) => setContact({ ...contactForm, email: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2 text-stone-800 text-sm placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1.5">Tell us about your wedding</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Approximate date, city, guest count, and anything else you'd like us to know..."
                    value={contactForm.message}
                    onChange={(e) => setContact({ ...contactForm, message: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2 text-stone-800 text-sm placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-900 text-white text-sm font-semibold py-2 rounded-xl hover:bg-rose-500 transition-all duration-200 tracking-wide shadow-sm"
                >
                  Send Message ✦
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="bg-stone-900 text-stone-400 py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <p className="text-2xl font-serif font-bold text-rose-400 mb-2">Vivaah</p>
              <p className="text-xs italic text-stone-500 mb-4">Where Every Love Story Becomes Legend</p>
              <p className="text-xs leading-relaxed text-stone-500 max-w-xs">
                India's most trusted wedding planning platform. From venue selection to floral design — we make magic happen.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-300 mb-4">Navigate</p>
              <div className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <button key={link} onClick={() => scrollTo(refs[link])} className="block text-xs text-stone-500 hover:text-rose-400 transition-colors">
                    {link}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-300 mb-4">Account</p>
              <div className="space-y-2">
                <a href="/login" className="block text-xs text-stone-500 hover:text-rose-400 transition-colors">Login</a>
                <a href="/register" className="block text-xs text-stone-500 hover:text-rose-400 transition-colors">Register</a>
                <a href="/dashboard" className="block text-xs text-stone-500 hover:text-rose-400 transition-colors">Dashboard</a>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-600">© 2025 Vivaah Weddings. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <div className="h-px w-16 bg-stone-700" />
              <span className="text-rose-500 text-sm">✦</span>
              <div className="h-px w-16 bg-stone-700" />
            </div>
            <p className="text-xs text-stone-600">Made with love in India 🇮🇳</p>
          </div>
        </div>
      </footer>

    </div>
  );
}