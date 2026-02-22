import { useState, useEffect, useRef } from "react";

/* ── Google Fonts injected via style tag ── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: #080b12; }
    .syne { font-family: 'Syne', sans-serif; }
    .grad-text {
      background: linear-gradient(135deg, #34d399, #38bdf8);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .grad-border {
      border: 1px solid transparent;
      background-clip: padding-box;
      position: relative;
    }
    .card-glow:hover { box-shadow: 0 0 40px rgba(52,211,153,0.12); }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scaleIn { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
    @keyframes slideRight { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
    .anim-fadeUp { animation: fadeUp 0.7s ease forwards; }
    .anim-scaleIn { animation: scaleIn 0.6s ease forwards; }
    .anim-float { animation: float 5s ease-in-out infinite; }
    .delay-1 { animation-delay: 0.1s; opacity: 0; }
    .delay-2 { animation-delay: 0.25s; opacity: 0; }
    .delay-3 { animation-delay: 0.4s; opacity: 0; }
    .delay-4 { animation-delay: 0.55s; opacity: 0; }
    .delay-5 { animation-delay: 0.7s; opacity: 0; }
    .nav-link { position: relative; }
    .nav-link::after {
      content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
      height: 1px; background: #34d399; transform: scaleX(0);
      transition: transform 0.25s ease;
    }
    .nav-link:hover::after { transform: scaleX(1); }
    .skill-bar { height: 3px; background: rgba(255,255,255,0.06); border-radius: 99px; overflow: hidden; }
    .skill-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg,#34d399,#38bdf8); transition: width 1.2s ease; }
    .timeline-dot::before {
      content: ''; position: absolute; left: -1px; top: 0; bottom: 0;
      width: 1px; background: linear-gradient(to bottom, #34d399, transparent);
    }
    .tag { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 11px; font-weight: 500; letter-spacing: 0.04em; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #080b12; }
    ::-webkit-scrollbar-thumb { background: #34d399; border-radius: 99px; }
    .mesh-bg {
      background: radial-gradient(ellipse 80% 60% at 20% 30%, rgba(52,211,153,0.07) 0%, transparent 70%),
                  radial-gradient(ellipse 60% 50% at 80% 70%, rgba(56,189,248,0.06) 0%, transparent 70%),
                  #080b12;
    }
    .grid-pattern {
      background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
      background-size: 48px 48px;
    }
    input, textarea { outline: none; }
    input:focus, textarea:focus { border-color: #34d399 !important; }
  `}</style>
);

/* ── Icons (inline SVG) ── */
const IconGitHub = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const IconLinkedIn = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const IconMail = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
  </svg>
);

const IconPhone = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
  </svg>
);

const IconLocation = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/>
  </svg>
);

const IconCode = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>
  </svg>
);

/* ── useInView hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Section Wrapper ── */
const Section = ({ id, children, className = "" }) => {
  const [ref, visible] = useInView();
  return (
    <section id={id} ref={ref} className={`py-24 px-6 md:px-16 lg:px-28 max-w-7xl mx-auto ${className}`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      {children}
    </section>
  );
};

/* ── Section Label ── */
const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="w-8 h-px" style={{ background: "#34d399" }} />
    <span className="text-xs uppercase tracking-widest" style={{ color: "#34d399", fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>{children}</span>
  </div>
);

/* ── Skill Bar Component ── */
const SkillBar = ({ name, level, visible }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span style={{ color: "#c8c8d8", fontSize: 14 }}>{name}</span>
      <span style={{ color: "#34d399", fontSize: 13 }}>{level}%</span>
    </div>
    <div className="skill-bar">
      <div className="skill-fill" style={{ width: visible ? `${level}%` : "0%" }} />
    </div>
  </div>
);

/* ── Badge ── */
const Badge = ({ children, color = "teal" }) => {
  const colors = {
    teal: { bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.25)", text: "#34d399" },
    sky: { bg: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.25)", text: "#38bdf8" },
    pink: { bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.25)", text: "#f472b6" },
    amber: { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.25)", text: "#fbbf24" },
  };
  const c = colors[color] || colors.teal;
  return (
    <span className="tag" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
      {children}
    </span>
  );
};

/* ══════════════════════════════════════
   MAIN APP
══════════════════════════════════════ */
export default function VishwaPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [photoSrc, setPhotoSrc] = useState(null);
  const [projectImages, setProjectImages] = useState({ proj1: null, proj2: null });
  const [skillsRef, skillsVisible] = useInView();

  // Active section tracking
  useEffect(() => {
    const sections = ["home", "about", "skills", "experience", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setFormSent(false), 4000);
  };

  const navItems = ["About", "Skills", "Experience", "Projects", "Contact"];

  // Skills data with logos
  const skillGroups = [
    {
      label: "Languages", color: "teal",
      skills: [
        { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      ]
    },
    {
      label: "Web Technologies", color: "sky",
      skills: [
        { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "REST APIs", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      ]
    },
    {
      label: "Databases", color: "amber",
      skills: [
        { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "JDBC", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      ]
    },
    {
      label: "Core Concepts", color: "pink",
      skills: [
        { name: "Data Structures", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
        { name: "OOP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "Operating Systems", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
        { name: "Computer Networks", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
      ]
    },
  ];

  // Experience data
  const experiences = [
    {
      role: "Web Application Development Intern",
      company: "ROBOWAVES (Test Yantra Software Solutions)",
      period: "Mar 2025 – Apr 2025",
      location: "Chennai",
      color: "teal",
      bullets: [
        "Developed responsive web apps using HTML, CSS, JavaScript, and ReactJS",
        "Built reusable React components for improved UI/UX consistency",
        "Collaborated on feature branches using Git-based version control",
      ]
    },
    {
      role: "Cloud Computing Intern",
      company: "DLK Technologies",
      period: "Dec 2024 – Jan 2025",
      location: "Chennai",
      color: "sky",
      bullets: [
        "Gained hands-on experience with AWS EC2, S3, and Lambda fundamentals",
        "Implemented cloud storage access control and basic security practices",
        "Deployed and tested cloud-based applications in a live environment",
      ]
    },
    {
      role: "Cyber Security Intern",
      company: "NSIC Technical Services Centre",
      period: "Jun 2024 – Jul 2024",
      location: "Chennai",
      color: "pink",
      bullets: [
        "Performed network monitoring and security event analysis using Sophos tools",
        "Conducted vulnerability analysis and endpoint security research",
        "Prepared documentation with preventive security recommendations",
      ]
    },
  ];

  // Projects data
  const projects = [
    {
      title: "IntelliMeds Medical System",
      period: "Aug 2025 – Oct 2025",
      desc: "A telemedicine and prescription management platform that automates patient reminders via voice calls and provides analytics for medication adherence tracking.",
      tech: ["Python", "Streamlit", "MySQL", "Twilio"],
      color: "sky",
      icon: "🏥",
      highlights: ["Automated voice call reminders", "Prescription management dashboard", "Medication adherence analytics"],
    },
    {
      title: "Defect Forge System",
      period: "Jan 2025 – Mar 2025",
      desc: "A CNN-based engine defect detection system using YOLO for image preprocessing and comparison with defect-free references, featuring a GUI for visualization.",
      tech: ["Python", "YOLO", "Tkinter"],
      color: "teal",
      icon: "⚙️",
      highlights: ["CNN-powered defect detection", "Image preprocessing pipeline", "Interactive GUI for upload & visualization"],
    },
  ];

  const tools = ["Git", "GitHub", "VS Code", "Eclipse"];

  return (
    <div className="mesh-bg min-h-screen" style={{ color: "#e8e8f0" }}>
      <FontStyle />

      {/* ══ HERO STYLES ══ */}
      <style>{`
        @keyframes hFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes floatBadge2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes ringPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.03)} }
        .ha{animation:hFadeUp 0.6s 0.05s ease both}
        .hb{animation:hFadeUp 0.6s 0.18s ease both}
        .hc{animation:hFadeUp 0.6s 0.28s ease both}
        .hd{animation:hFadeUp 0.6s 0.40s ease both}
        .he{animation:hFadeUp 0.6s 0.52s ease both}
        .hf{animation:hFadeUp 0.6s 0.64s ease both}
        .hphoto{animation:hFadeIn 0.9s 0.15s ease both;opacity:0}
        .badge-fl{animation:floatBadge 3.5s ease-in-out infinite}
        .badge-fl2{animation:floatBadge2 4.5s 1s ease-in-out infinite}
        .ring-pulse{animation:ringPulse 4s ease-in-out infinite}
        .nav-lp{position:relative;text-decoration:none;font-size:14.5px;font-weight:500;color:#374151;transition:color 0.2s;padding:2px 0}
        .nav-lp:hover{color:#f97316}
        .nav-lp.active-lp{color:#f97316;font-weight:600}
        .nav-lp::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:2px;background:#f97316;border-radius:99px;transform:scaleX(0);transition:transform 0.25s;transform-origin:center}
        .nav-lp:hover::after,.nav-lp.active-lp::after{transform:scaleX(1)}
        .photo-ring-wrap{cursor:pointer;transition:transform 0.3s ease}
        .photo-ring-wrap:hover{transform:scale(1.02)}
        .ul-overlay{opacity:0;transition:opacity 0.3s}
        .photo-ring-wrap:hover .ul-overlay{opacity:1}
      `}</style>

      {/* ══ NAV ══ */}
      <nav
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: "#ffffff",
    boxShadow: "0 1px 0 rgba(0,0,0,0.07)",
    boxSizing: "border-box",
  }}
>
  {/* Main Bar */}
  <div
    style={{
      maxWidth: 1280,
      margin: "0 auto",
      padding: "0 2rem",
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxSizing: "border-box",
    }}
  >
    {/* Logo */}
    <a
      href="#home"
      className="syne"
      style={{
        textDecoration: "none",
        fontSize: "1.15rem",
        fontWeight: 800,
        color: "#1e2a4a",
        letterSpacing: "-0.01em",
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      Vishwa<span style={{ color: "#f97316", marginLeft: 2 }}>.K</span>
    </a>

    {/* Desktop Nav */}
    <ul
      className="hidden md:flex"
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        gap: 32,
      }}
    >
      {["Home", "About", "Skills", "Experience", "Projects", "Contact"].map(
        (item) => (
          <li key={item}>
            <a
              href={item === "Home" ? "#home" : `#${item.toLowerCase()}`}
              className={`nav-lp${
                activeSection ===
                (item === "Home" ? "home" : item.toLowerCase())
                  ? " active-lp"
                  : ""
              }`}
              style={{ lineHeight: 1 }}
            >
              {item}
            </a>
          </li>
        )
      )}
    </ul>

    {/* Right Controls */}
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      {/* CTA */}
      <a
        href="#contact"
        style={{
          padding: "10px 26px",
          borderRadius: 50,
          fontSize: 14,
          fontWeight: 700,
          background: "linear-gradient(135deg,#f97316,#ea6c0a)",
          color: "#fff",
          textDecoration: "none",
          fontFamily: "'Syne', sans-serif",
          boxShadow: "0 4px 16px rgba(249,115,22,0.3)",
          transition: "all 0.22s ease",
          whiteSpace: "nowrap",
          lineHeight: 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow =
            "0 8px 24px rgba(249,115,22,0.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 4px 16px rgba(249,115,22,0.3)";
        }}
      >
        Contact Me
      </a>

      {/* Mobile Toggle */}
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 22,
          lineHeight: 1,
          padding: 6,
        }}
        aria-label="Toggle menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div
      style={{
        background: "#ffffff",
        borderTop: "1px solid #f3f4f6",
        padding: "0.75rem 2rem",
      }}
    >
      {["Home", "About", "Skills", "Experience", "Projects", "Contact"].map(
        (item) => (
          <a
            key={item}
            href={item === "Home" ? "#home" : `#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block",
              padding: "12px 0",
              color: "#374151",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              borderBottom: "1px solid #f9fafb",
            }}
          >
            {item}
          </a>
        )
      )}
    </div>
  )}
</nav>

      {/* ══ HERO ══ */}
      <div id="home" style={{
        minHeight:"100vh",paddingTop:64,position:"relative",overflow:"hidden",
        background:"linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #1e40af 70%, #1a3aad 100%)"
      }}>

        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none",opacity:0.22}} preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topo" x="0" y="0" width="1200" height="700" patternUnits="userSpaceOnUse">
              <path d="M-200,350 C-50,260 80,420 230,320 C380,220 430,390 600,300 C770,210 820,370 990,280 C1160,190 1210,340 1400,260" fill="none" stroke="white" strokeWidth="1.4"/>
              <path d="M-200,320 C-40,235 90,395 245,295 C395,195 450,365 618,275 C788,185 838,345 1008,255 C1178,165 1228,315 1420,235" fill="none" stroke="white" strokeWidth="1.2"/>
              <path d="M-200,380 C-60,290 70,445 220,345 C368,245 420,415 590,325 C758,235 808,395 978,305 C1148,215 1198,365 1390,285" fill="none" stroke="white" strokeWidth="1.2"/>
              <path d="M-200,290 C-30,205 100,365 255,265 C408,165 460,340 630,250 C800,160 850,320 1020,230 C1190,140 1240,295 1430,215" fill="none" stroke="white" strokeWidth="1.1"/>
              <path d="M-200,415 C-70,325 60,475 210,375 C358,275 412,445 580,355 C748,265 798,420 968,330 C1138,240 1188,390 1380,310" fill="none" stroke="white" strokeWidth="1.1"/>
              <path d="M-200,255 C-20,170 110,330 268,232 C422,134 476,306 645,218 C814,130 864,290 1034,202 C1204,114 1254,268 1444,190" fill="none" stroke="white" strokeWidth="1"/>
              <path d="M-200,450 C-80,360 52,505 200,405 C348,305 402,475 570,385 C738,295 788,450 958,360 C1128,270 1178,418 1370,338" fill="none" stroke="white" strokeWidth="1"/>
              <path d="M-200,220 C-10,138 118,295 278,200 C436,105 490,275 658,188 C826,101 877,258 1047,172 C1217,86 1268,240 1458,162" fill="none" stroke="white" strokeWidth="0.95"/>
              <path d="M-200,488 C-90,398 44,540 192,440 C340,340 394,508 562,418 C730,328 780,482 950,392 C1120,302 1170,448 1362,368" fill="none" stroke="white" strokeWidth="0.95"/>
              <path d="M-200,185 C0,105 126,260 288,168 C448,76 504,244 671,158 C838,72 890,228 1060,142 C1230,56 1280,210 1470,132" fill="none" stroke="white" strokeWidth="0.9"/>
              <path d="M-200,525 C-100,435 36,572 184,472 C332,372 386,540 554,450 C722,360 772,514 942,424 C1112,334 1162,480 1354,400" fill="none" stroke="white" strokeWidth="0.9"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)"/>
        </svg>

        <div style={{
          position:"relative",zIndex:2,maxWidth:1280,margin:"0 auto",
          padding:"0 3rem",minHeight:"calc(100vh - 64px)",
          display:"flex",alignItems:"center"
        }}>
          <div style={{
            display:"flex",flexWrap:"wrap",alignItems:"center",
            justifyContent:"space-between",gap:"4rem",width:"100%",padding:"2rem 0"
          }}>

          {/* Photo */}
<div
  className="hphoto"
  style={{
    flexShrink: 0,
    position: "relative",
    width: 320,
    height: 420,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  {/* Outer ring */}
  <div
    style={{
      position: "absolute",
      width: 330,
      height: 330,
      borderRadius: "50%",
      border: "2px solid rgba(255,255,255,0.6)",
      pointerEvents: "none",
    }}
  />

  {/* Pulse ring */}
  <div
    className="ring-pulse"
    style={{
      position: "absolute",
      width: 270,
      height: 270,
      borderRadius: "50%",
      border: "2px solid rgba(249,115,22,0.7)",
      pointerEvents: "none",
    }}
  />

  {/* Image */}
  <div
    className="photo-ring-wrap"
    style={{
      position: "relative",
      zIndex: 2,
      width: 230,
      height: 230,
      borderRadius: "50%",
      overflow: "hidden",
      border: "3px solid rgba(255,255,255,0.85)",
      boxShadow:
        "0 0 0 6px rgba(255,255,255,0.07), 0 20px 60px rgba(0,0,0,0.35)",
      background: "#1e40af",
    }}
  >
    <img
      src="/vichuw2.jpg"
      alt="Vishwa K"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "top center",
        display: "block",
      }}
    />
  </div>
</div>

            {/* Text */}
            <div style={{flex:"1 1 420px",maxWidth:580}}>
              <h1 className="hb syne" style={{
                fontSize:"clamp(2.2rem,4.5vw,4.2rem)",fontWeight:800,
                lineHeight:1.08,marginBottom:"0.2rem",opacity:0,
                color:"#ffffff"
              }}>
                Vishwa K,
              </h1>

              <h1 className="hc syne" style={{
                fontSize:"clamp(1.4rem,2.8vw,2.4rem)",fontWeight:700,
                lineHeight:1.1,color:"#ffffff",marginBottom:"1.4rem",
                opacity:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"100%"
              }}>
                Software Developer
              </h1>

              <p className="hd" style={{
                fontSize:15,color:"rgba(255,255,255,0.5)",lineHeight:1.9,
                maxWidth:480,marginBottom:"2rem",opacity:0
              }}>
                Computer Science undergraduate skilled in Java, Python, and SQL with strong knowledge of data structures, OOP, and networks. Passionate about building scalable solutions.
              </p>

              <div className="he" style={{
                display:"flex",alignItems:"center",gap:20,
                marginBottom:"2.5rem",opacity:0,flexWrap:"wrap"
              }}>
                <a href="#projects" style={{
                  display:"inline-flex",alignItems:"center",gap:7,
                  fontSize:14,fontWeight:600,color:"rgba(255,255,255,0.5)",
                  textDecoration:"none",fontFamily:"'Syne',sans-serif",transition:"color 0.2s"
                }}
                  onMouseEnter={e=>e.currentTarget.style.color="#fff"}
                  onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.5)"}>
                  View My Work
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5m5-5H6"/>
                  </svg>
                </a>
                <a href="#contact" style={{
                  display:"inline-flex",alignItems:"center",
                  padding:"12px 32px",borderRadius:50,fontSize:15,fontWeight:700,
                  background:"linear-gradient(135deg,#f97316,#ea580c)",color:"#fff",
                  textDecoration:"none",fontFamily:"'Syne',sans-serif",
                  boxShadow:"0 6px 22px rgba(249,115,22,0.4)",transition:"all 0.22s"
                }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 30px rgba(249,115,22,0.55)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 6px 22px rgba(249,115,22,0.4)";}}>
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ ABOUT ══ */}
      <section id="about" style={{ background: "#f8f9fa", padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none"}} preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="aboutTopo" x="0" y="0" width="900" height="600" patternUnits="userSpaceOnUse">
              <path d="M-200,300 C0,220 100,380 250,290 C400,200 480,360 650,270 C820,180 900,330 1100,250" fill="none" stroke="#d1d5db" strokeWidth="1.2"/>
              <path d="M-200,330 C10,250 120,400 270,315 C420,230 500,385 670,295 C840,205 920,355 1120,275" fill="none" stroke="#d1d5db" strokeWidth="1"/>
              <path d="M-200,270 C-10,190 90,355 240,265 C390,175 460,335 630,245 C800,155 880,310 1080,225" fill="none" stroke="#d1d5db" strokeWidth="1"/>
              <path d="M-200,365 C20,285 140,430 295,345 C445,260 525,410 695,320 C865,230 940,375 1140,295" fill="none" stroke="#d1d5db" strokeWidth="0.9"/>
              <path d="M-200,235 C-20,155 80,320 225,235 C370,150 445,305 610,220 C775,135 860,285 1055,200" fill="none" stroke="#d1d5db" strokeWidth="0.9"/>
              <path d="M-200,400 C30,320 155,460 320,375 C470,290 550,435 720,345 C890,255 960,400 1160,320" fill="none" stroke="#d1d5db" strokeWidth="0.85"/>
              <path d="M-200,200 C-30,120 70,285 210,200 C350,115 430,270 595,185 C760,100 845,255 1040,170" fill="none" stroke="#d1d5db" strokeWidth="0.85"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#aboutTopo)"/>
        </svg>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p className="syne" style={{
              fontSize: 12, fontWeight: 700, letterSpacing: "0.15em",
              textTransform: "uppercase", color: "#f97316", marginBottom: "0.75rem"
            }}>About Me</p>
            <h2 className="syne" style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800,
              color: "#1e2a4a", lineHeight: 1.1
            }}>Designing Solutions, Not Just Code</h2>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem"
          }}>
            {[
              {
                icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/></svg>,
                title: "Developer",
                text: "Skilled in Java, Python, SQL, React.js with a strong grasp of data structures, OOP, and full-stack web development."
              },
              {
                icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/></svg>,
                title: "Education",
                text: "B.E. Computer Science & Engineering at Panimalar Engineering College, Chennai. Expected graduation May 2027."
              },
              {
                icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
                title: "Goal",
                text: "Seeking a Software Developer role to apply practical experience from cybersecurity, cloud computing, and web development internships."
              }
            ].map((card, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)",
                borderRadius: 16, padding: "2rem",
                boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
                transition: "transform 0.25s, box-shadow 0.25s"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(249,115,22,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.07)"; }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: "rgba(249,115,22,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem"
                }}>{card.icon}</div>
                <h3 className="syne" style={{ fontSize: 18, fontWeight: 700, color: "#1e2a4a", marginBottom: "0.75rem" }}>{card.title}</h3>
                <p style={{ fontSize: 14.5, color: "#64748b", lineHeight: 1.8 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" ref={skillsRef} style={{
        background: "#f8f9fa", position: "relative", overflow: "hidden",
        padding: "6rem 2rem",
        opacity: skillsVisible ? 1 : 0, transform: skillsVisible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease"
      }}>
        {/* Topo bg matching About */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none"}} preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="skillsTopo" x="0" y="0" width="900" height="600" patternUnits="userSpaceOnUse">
              <path d="M-200,300 C0,220 100,380 250,290 C400,200 480,360 650,270 C820,180 900,330 1100,250" fill="none" stroke="#d1d5db" strokeWidth="1.2"/>
              <path d="M-200,330 C10,250 120,400 270,315 C420,230 500,385 670,295 C840,205 920,355 1120,275" fill="none" stroke="#d1d5db" strokeWidth="1"/>
              <path d="M-200,270 C-10,190 90,355 240,265 C390,175 460,335 630,245 C800,155 880,310 1080,225" fill="none" stroke="#d1d5db" strokeWidth="1"/>
              <path d="M-200,365 C20,285 140,430 295,345 C445,260 525,410 695,320 C865,230 940,375 1140,295" fill="none" stroke="#d1d5db" strokeWidth="0.9"/>
              <path d="M-200,235 C-20,155 80,320 225,235 C370,150 445,305 610,220 C775,135 860,285 1055,200" fill="none" stroke="#d1d5db" strokeWidth="0.9"/>
              <path d="M-200,400 C30,320 155,460 320,375 C470,290 550,435 720,345 C890,255 960,400 1160,320" fill="none" stroke="#d1d5db" strokeWidth="0.85"/>
              <path d="M-200,200 C-30,120 70,285 210,200 C350,115 430,270 595,185 C760,100 845,255 1040,170" fill="none" stroke="#d1d5db" strokeWidth="0.85"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#skillsTopo)"/>
        </svg>

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Main header — centered, matching About */}
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <p className="syne" style={{
              fontSize: 12, fontWeight: 700, letterSpacing: "0.15em",
              textTransform: "uppercase", color: "#f97316", marginBottom: "0.75rem"
            }}>Technical Skills</p>
            <h2 className="syne" style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800,
              color: "#1e2a4a", lineHeight: 1.1
            }}>Tools & Technologies I Work With</h2>
          </div>

          {/* Each skill group */}
          {[
            {
              label: "Languages",
              accent: "#f97316",
              bg: "rgba(249,115,22,0.08)",
              border: "rgba(249,115,22,0.22)",
              shadow: "rgba(249,115,22,0.18)",
              items: [
                { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
                { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
                { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
              ]
            },
            {
              label: "Web Technologies",
              accent: "#2563eb",
              bg: "rgba(37,99,235,0.08)",
              border: "rgba(37,99,235,0.22)",
              shadow: "rgba(37,99,235,0.18)",
              items: [
                { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
                { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
                { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
                { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
                { name: "REST APIs", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
              ]
            },
            {
              label: "Databases",
              accent: "#059669",
              bg: "rgba(5,150,105,0.08)",
              border: "rgba(5,150,105,0.22)",
              shadow: "rgba(5,150,105,0.18)",
              items: [
                { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
                { name: "JDBC", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
              ]
            },
            {
              label: "Core Concepts",
              accent: "#7c3aed",
              bg: "rgba(124,58,237,0.08)",
              border: "rgba(124,58,237,0.22)",
              shadow: "rgba(124,58,237,0.18)",
              items: [
                { name: "Data Structures", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
                { name: "OOP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
                { name: "Operating Systems", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
                { name: "Computer Networks", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" },
              ]
            },
            {
              label: "Tools & Platforms",
              accent: "#6366f1",
              bg: "rgba(99,102,241,0.08)",
              border: "rgba(99,102,241,0.22)",
              shadow: "rgba(99,102,241,0.18)",
              items: [
                { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
                { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
                { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
                { name: "Eclipse", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eclipse/eclipse-original.svg" },
              ]
            },
          ].map(({ label, accent, bg, border, shadow, items }) => (
            <div key={label} style={{ marginBottom: "3.5rem" }}>
              {/* Category heading — centered, bold, large */}
              <h3 className="syne" style={{
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: accent,
                textAlign: "center",
                marginBottom: "1.75rem",
                letterSpacing: "-0.02em"
              }}>{label}</h3>

              {/* Logo cards row — centered */}
              <div style={{
                display: "flex", flexWrap: "wrap",
                justifyContent: "center", gap: "1.25rem"
              }}>
                {items.map(({ name, logo }) => (
                  <div key={name} style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", gap: "0.6rem",
                    padding: "1.4rem 1.6rem",
                    background: "rgba(255,255,255,0.92)",
                    border: `1.5px solid ${border}`,
                    borderRadius: 16,
                    boxShadow: `0 4px 16px ${bg}`,
                    minWidth: 100,
                    transition: "transform 0.22s, box-shadow 0.22s",
                    cursor: "default"
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 14px 32px ${shadow}`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 16px ${bg}`; }}
                  >
                    <img
                      src={logo} alt={name}
                      style={{ width: 56, height: 56, objectFit: "contain", display: "block" }}
                      onError={e => { e.target.style.display = "none"; }}
                    />
                    <span style={{
                      fontSize: 13, fontWeight: 700,
                      color: "#1e2a4a", textAlign: "center",
                      fontFamily: "'Syne', sans-serif",
                      whiteSpace: "nowrap"
                    }}>{name}</span>
                  </div>
                ))}
              </div>

              {/* Divider between groups (not after last) */}
              {label !== "Tools & Platforms" && (
                <div style={{ height: 1, background: "rgba(0,0,0,0.07)", margin: "3rem auto 0", maxWidth: 600 }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section id="experience" style={{ background: "#f8f9fa", padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
        {/* Topo bg matching About */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none"}} preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="expTopo" x="0" y="0" width="900" height="600" patternUnits="userSpaceOnUse">
              <path d="M-200,300 C0,220 100,380 250,290 C400,200 480,360 650,270 C820,180 900,330 1100,250" fill="none" stroke="#d1d5db" strokeWidth="1.2"/>
              <path d="M-200,330 C10,250 120,400 270,315 C420,230 500,385 670,295 C840,205 920,355 1120,275" fill="none" stroke="#d1d5db" strokeWidth="1"/>
              <path d="M-200,270 C-10,190 90,355 240,265 C390,175 460,335 630,245 C800,155 880,310 1080,225" fill="none" stroke="#d1d5db" strokeWidth="1"/>
              <path d="M-200,365 C20,285 140,430 295,345 C445,260 525,410 695,320 C865,230 940,375 1140,295" fill="none" stroke="#d1d5db" strokeWidth="0.9"/>
              <path d="M-200,235 C-20,155 80,320 225,235 C370,150 445,305 610,220 C775,135 860,285 1055,200" fill="none" stroke="#d1d5db" strokeWidth="0.9"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#expTopo)"/>
        </svg>

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Header — centered, matching About */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="syne" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#f97316", marginBottom: "0.75rem" }}>Experience</p>
            <h2 className="syne" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#1e2a4a", lineHeight: 1.1 }}>My Professional Journey</h2>
            <p className="syne" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 700, color: "#f97316", marginTop: "0.5rem" }}>Internships</p>
          </div>

          {/* Experience cards — left text, right company logo */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              {
                role: "Web Application Development Intern",
                company: "ROBOWAVES",
                fullCompany: "ROBOWAVES (Test Yantra Software Solutions)",
                period: "Mar 2025 – Apr 2025",
                location: "Chennai",
                accent: "#f97316",
                bg: "rgba(249,115,22,0.07)",
                border: "rgba(249,115,22,0.2)",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                companyIcon: "🤖",
                companyColor: "#f97316",
                bullets: [
                  "Developed responsive web apps using HTML, CSS, JavaScript, and ReactJS",
                  "Built reusable React components for improved UI/UX consistency",
                  "Collaborated on feature branches using Git-based version control",
                ]
              },
              {
                role: "Cloud Computing Intern",
                company: "DLK Technologies",
                fullCompany: "DLK Technologies",
                period: "Dec 2024 – Jan 2025",
                location: "Chennai",
                accent: "#2563eb",
                bg: "rgba(37,99,235,0.07)",
                border: "rgba(37,99,235,0.2)",
                companyIcon: "☁️",
                companyColor: "#2563eb",
                bullets: [
                  "Gained hands-on experience with AWS EC2, S3, and Lambda fundamentals",
                  "Implemented cloud storage access control and basic security practices",
                  "Deployed and tested cloud-based applications in a live environment",
                ]
              },
              {
                role: "Cyber Security Intern",
                company: "NSIC Technical Services Centre",
                fullCompany: "NSIC Technical Services Centre",
                period: "Jun 2024 – Jul 2024",
                location: "Chennai",
                accent: "#7c3aed",
                bg: "rgba(124,58,237,0.07)",
                border: "rgba(124,58,237,0.2)",
                companyIcon: "🔐",
                companyColor: "#7c3aed",
                bullets: [
                  "Performed network monitoring and security event analysis using Sophos tools",
                  "Conducted vulnerability analysis and endpoint security research",
                  "Prepared documentation with preventive security recommendations",
                ]
              },
            ].map((exp, i) => (
              <div key={i} style={{
                display: "flex", flexWrap: "wrap", gap: "2rem",
                background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)",
                borderRadius: 20, overflow: "hidden",
                boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
                border: `1.5px solid ${exp.border}`,
                transition: "transform 0.25s, box-shadow 0.25s"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${exp.bg.replace('0.07','0.2')}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.07)"; }}
              >
                {/* LEFT — experience details */}
                <div style={{ flex: "1 1 340px", padding: "2.5rem" }}>
                  {/* Period badge */}
                  <span style={{
                    display: "inline-block", padding: "3px 12px", borderRadius: 999,
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
                    background: exp.bg, border: `1px solid ${exp.border}`, color: exp.accent,
                    marginBottom: "1rem"
                  }}>{exp.period}</span>

                  <h3 className="syne" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 800, color: "#1e2a4a", marginBottom: "0.4rem", lineHeight: 1.3 }}>{exp.role}</h3>
                  <div style={{ fontSize: 14, fontWeight: 600, color: exp.accent, marginBottom: "0.3rem" }}>{exp.fullCompany}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: "1.25rem" }}>📍 {exp.location}</div>

                  <ul style={{ paddingLeft: "1.1rem", margin: 0 }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ color: "#475569", fontSize: 14, lineHeight: 1.85, marginBottom: 6 }}>{b}</li>
                    ))}
                  </ul>
                </div>

                {/* RIGHT — company visual panel */}
                <div style={{
                  flexShrink: 0, width: 200,
                  background: exp.bg,
                  borderLeft: `1px solid ${exp.border}`,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  gap: "1rem", padding: "2rem"
                }}>
                  <div style={{
                    width: 90, height: 90, borderRadius: "50%",
                    background: "#fff",
                    border: `3px solid ${exp.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 40,
                    boxShadow: `0 8px 24px ${exp.bg.replace('0.07','0.25')}`
                  }}>
                    {exp.companyIcon}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div className="syne" style={{ fontSize: 13, fontWeight: 800, color: exp.accent, lineHeight: 1.3 }}>{exp.company}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>Internship</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="projects" style={{ background: "#f8f9fa", padding: "6rem 2rem", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        {/* Topo bg */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none"}} preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="projTopo" x="0" y="0" width="900" height="600" patternUnits="userSpaceOnUse">
              <path d="M-200,300 C0,220 100,380 250,290 C400,200 480,360 650,270 C820,180 900,330 1100,250" fill="none" stroke="#d1d5db" strokeWidth="1.2"/>
              <path d="M-200,330 C10,250 120,400 270,315 C420,230 500,385 670,295 C840,205 920,355 1120,275" fill="none" stroke="#d1d5db" strokeWidth="1"/>
              <path d="M-200,400 C30,320 155,460 320,375 C470,290 550,435 720,345 C890,255 960,400 1160,320" fill="none" stroke="#d1d5db" strokeWidth="0.85"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#projTopo)"/>
        </svg>

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Header — centered, matching Experience */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="syne" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#f97316", marginBottom: "0.75rem" }}>Projects</p>
            <h2 className="syne" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#1e2a4a", lineHeight: 1.1 }}>What I've Built</h2>
          </div>

          {/* Project cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {[
              {
                title: "IntelliMeds Medical System",
                period: "Aug 2025 – Oct 2025",
                desc: "A telemedicine and prescription management platform that automates patient reminders via voice calls and provides analytics for medication adherence tracking.",
                tech: ["Python", "Streamlit", "MySQL", "Twilio"],
                accent: "#2563eb",
                bg: "rgba(37,99,235,0.07)",
                border: "rgba(37,99,235,0.2)",
                icon: "🏥",
                githubUrl: "https://github.com/VISHWA2006-RGB",
                imageKey: "proj1",
                highlights: ["Automated voice call reminders", "Prescription management dashboard", "Medication adherence analytics"],
              },
              {
                title: "Defect Forge System",
                period: "Jan 2025 – Mar 2025",
                desc: "A CNN-based engine defect detection system using YOLO for image preprocessing and comparison with defect-free references, featuring a GUI for visualization.",
                tech: ["Python", "YOLO", "Tkinter"],
                accent: "#059669",
                bg: "rgba(5,150,105,0.07)",
                border: "rgba(5,150,105,0.2)",
                icon: "⚙️",
                githubUrl: "https://github.com/VISHWA2006-RGB",
                imageKey: "proj2",
                highlights: ["CNN-powered defect detection", "Image preprocessing pipeline", "Interactive GUI for upload & visualization"],
              },
            ].map((proj, i) => {
              const imgSrc = projectImages[proj.imageKey];
              return (
                <div key={i} style={{
                  display: "flex", flexWrap: "wrap", gap: 0,
                  background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)",
                  borderRadius: 20, overflow: "hidden",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
                  border: `1.5px solid ${proj.border}`,
                  transition: "transform 0.25s, box-shadow 0.25s"
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${proj.bg.replace('0.07','0.2')}`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.07)"; }}
                >
                  {/* LEFT — project screenshot upload area */}
                  <div
                    style={{
                      width: 280, flexShrink: 0,
                      background: proj.bg,
                      borderRight: `1px solid ${proj.border}`,
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      cursor: "pointer", position: "relative", minHeight: 260,
                      overflow: "hidden"
                    }}
                    onClick={() => document.getElementById(`projImg-${proj.imageKey}`).click()}
                  >
                    {imgSrc ? (
                      <>
                        <img src={imgSrc} alt={proj.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", inset: 0 }}
                        />
                        <div style={{
                          position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)",
                          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                          opacity: 0, transition: "opacity 0.3s"
                        }}
                          onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                          onMouseLeave={e => e.currentTarget.style.opacity = "0"}
                        >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                          </svg>
                          <span style={{ color: "#fff", fontSize: 11, marginTop: 6, fontFamily: "'Syne',sans-serif" }}>Change Image</span>
                        </div>
                      </>
                    ) : (
                      <div style={{ textAlign: "center", padding: "2rem" }}>
                        <div style={{ fontSize: 52, marginBottom: "0.75rem" }}>{proj.icon}</div>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={proj.accent} strokeWidth="1.5" style={{ margin: "0 auto 8px" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                        </svg>
                        <p style={{ color: proj.accent, fontSize: 12, fontFamily: "'Syne',sans-serif", fontWeight: 600, margin: 0 }}>Upload Screenshot</p>
                        <p style={{ color: "#94a3b8", fontSize: 11, margin: "4px 0 0" }}>Click to add project image</p>
                      </div>
                    )}
                    <input id={`projImg-${proj.imageKey}`} type="file" accept="image/*" style={{ display: "none" }}
                      onChange={e => { const f = e.target.files[0]; if (f) setProjectImages(p => ({ ...p, [proj.imageKey]: URL.createObjectURL(f) })); }}
                    />
                  </div>

                  {/* RIGHT — project details */}
                  <div style={{ flex: "1 1 320px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                      <div>
                        <span style={{
                          display: "inline-block", padding: "3px 12px", borderRadius: 999,
                          fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
                          background: proj.bg, border: `1px solid ${proj.border}`, color: proj.accent,
                          marginBottom: "0.6rem"
                        }}>{proj.period}</span>
                        <h3 className="syne" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 800, color: "#1e2a4a", lineHeight: 1.2, margin: 0 }}>{proj.title}</h3>
                      </div>
                      {/* GitHub link button */}
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer"
                        style={{
                          display: "flex", alignItems: "center", gap: 7,
                          padding: "8px 16px", borderRadius: 8,
                          background: "#1e2a4a", color: "#fff",
                          textDecoration: "none", fontSize: 13, fontWeight: 600,
                          fontFamily: "'Syne',sans-serif",
                          transition: "background 0.2s, transform 0.2s",
                          flexShrink: 0
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = proj.accent; e.currentTarget.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#1e2a4a"; e.currentTarget.style.transform = "translateY(0)"; }}
                      >
                        <IconGitHub size={16} /> View on GitHub
                      </a>
                    </div>

                    <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.85, margin: 0 }}>{proj.desc}</p>

                    {/* Highlights */}
                    <div>
                      {proj.highlights.map((h, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: proj.accent, flexShrink: 0 }} />
                          <span style={{ fontSize: 13.5, color: "#374151" }}>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech badges */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "auto" }}>
                      {proj.tech.map(t => (
                        <span key={t} style={{
                          padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600,
                          background: proj.bg, border: `1px solid ${proj.border}`, color: proj.accent,
                          fontFamily: "'Syne',sans-serif"
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ background: "#f8f9fa", padding: "6rem 2rem", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        {/* Topo bg matching About */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none"}} preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contactTopo" x="0" y="0" width="900" height="600" patternUnits="userSpaceOnUse">
              <path d="M-200,300 C0,220 100,380 250,290 C400,200 480,360 650,270 C820,180 900,330 1100,250" fill="none" stroke="#d1d5db" strokeWidth="1.2"/>
              <path d="M-200,330 C10,250 120,400 270,315 C420,230 500,385 670,295 C840,205 920,355 1120,275" fill="none" stroke="#d1d5db" strokeWidth="1"/>
              <path d="M-200,270 C-10,190 90,355 240,265 C390,175 460,335 630,245 C800,155 880,310 1080,225" fill="none" stroke="#d1d5db" strokeWidth="1"/>
              <path d="M-200,365 C20,285 140,430 295,345 C445,260 525,410 695,320 C865,230 940,375 1140,295" fill="none" stroke="#d1d5db" strokeWidth="0.9"/>
              <path d="M-200,235 C-20,155 80,320 225,235 C370,150 445,305 610,220 C775,135 860,285 1055,200" fill="none" stroke="#d1d5db" strokeWidth="0.9"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contactTopo)"/>
        </svg>

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Header — centered, matching About */}
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p className="syne" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#f97316", marginBottom: "0.75rem" }}>Contact</p>
            <h2 className="syne" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#1e2a4a", lineHeight: 1.1 }}>Let's Connect</h2>
          </div>

          {/* Two-column layout */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", alignItems: "flex-start" }}>

            {/* LEFT — contact info */}
            <div style={{ flex: "1 1 300px", minWidth: 280 }}>
              <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.8, marginBottom: "2.5rem" }}>
                I'm actively looking for software development opportunities. Feel free to reach out!
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  {
                    icon: <IconMail size={20} />,
                    val: "vishwathansri93@gmail.com",
                    href: "mailto:vishwathansri93@gmail.com"
                  },
                  {
                    icon: <IconPhone size={20} />,
                    val: "+91 9345577984",
                    href: "tel:+919345577984"
                  },
                  {
                    icon: <IconLocation size={20} />,
                    val: "Chennai, Tamil Nadu",
                    href: null
                  },
                  {
                    icon: <IconLinkedIn size={20} />,
                    val: "LinkedIn",
                    href: "https://www.linkedin.com/in/vishwa-k-07883b325/"
                  },
                  {
                    icon: <IconGitHub size={20} />,
                    val: "GitHub",
                    href: "https://github.com/VISHWA2006-RGB"
                  },
                ].map(({ icon, val, href }, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                      background: "rgba(249,115,22,0.1)",
                      border: "1px solid rgba(249,115,22,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#f97316"
                    }}>{icon}</div>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                        style={{ color: "#374151", fontSize: 15, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#f97316"}
                        onMouseLeave={e => e.currentTarget.style.color = "#374151"}>{val}</a>
                    ) : (
                      <span style={{ color: "#374151", fontSize: 15, fontWeight: 500 }}>{val}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — contact form card */}
            <div style={{ flex: "1 1 420px" }}>
              <div style={{
                background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
                borderRadius: 20, padding: "2.5rem",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                border: "1px solid rgba(249,115,22,0.1)"
              }}>
                {formSent ? (
                  <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                    <div style={{ fontSize: 52, marginBottom: "1rem" }}>✉️</div>
                    <div className="syne" style={{ fontSize: 22, fontWeight: 800, color: "#f97316", marginBottom: 8 }}>Message Sent!</div>
                    <div style={{ color: "#64748b", fontSize: 15 }}>Thanks for reaching out — I'll get back to you soon.</div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {[
                      { label: "Name", key: "name", type: "text", placeholder: "Your name" },
                      { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
                    ].map(({ label, key, type, placeholder }) => (
                      <div key={key} style={{ marginBottom: "1.25rem" }}>
                        <label style={{
                          display: "block", fontSize: 14, fontWeight: 600,
                          color: "#374151", marginBottom: 8, fontFamily: "'Syne', sans-serif"
                        }}>{label}</label>
                        <input
                          type={type} required placeholder={placeholder}
                          value={formData[key]}
                          onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                          style={{
                            width: "100%", padding: "13px 16px", borderRadius: 10, fontSize: 15,
                            background: "#f1f5f9", border: "1.5px solid #e2e8f0",
                            color: "#1e2a4a", transition: "border-color 0.2s",
                            fontFamily: "'DM Sans', sans-serif"
                          }}
                          onFocus={e => e.target.style.borderColor = "#f97316"}
                          onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                        />
                      </div>
                    ))}

                    <div style={{ marginBottom: "1.75rem" }}>
                      <label style={{
                        display: "block", fontSize: 14, fontWeight: 600,
                        color: "#374151", marginBottom: 8, fontFamily: "'Syne', sans-serif"
                      }}>Message</label>
                      <textarea
                        required rows={5} placeholder="Your message..."
                        value={formData.message}
                        onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                        style={{
                          width: "100%", padding: "13px 16px", borderRadius: 10, fontSize: 15,
                          background: "#f1f5f9", border: "1.5px solid #e2e8f0",
                          color: "#1e2a4a", resize: "vertical", transition: "border-color 0.2s",
                          fontFamily: "'DM Sans', sans-serif"
                        }}
                        onFocus={e => e.target.style.borderColor = "#f97316"}
                        onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                      />
                    </div>

                    <button type="submit"
                      style={{
                        width: "100%", padding: "14px", borderRadius: 10, fontSize: 15, fontWeight: 700,
                        background: "#f97316", color: "#fff",
                        border: "none", cursor: "pointer", fontFamily: "'Syne', sans-serif",
                        letterSpacing: "0.02em",
                        transition: "background 0.2s, transform 0.2s, box-shadow 0.2s"
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#ea6c0a"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(249,115,22,0.35)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#f97316"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#1e2a4a", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "2.5rem 4rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div className="syne" style={{ fontWeight: 800, fontSize: 22, color: "#fff" }}>
            Vishwa<span style={{ color: "#f97316" }}>.K</span>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textAlign: "center" }}>
            © 2025 Vishwa K — Built with passion & purpose
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <a href="https://github.com/VISHWA2006-RGB" target="_blank" rel="noreferrer"
              style={{ color: "rgba(255,255,255,0.45)", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#f97316"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}>
              <IconGitHub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/vishwa-k-07883b325/" target="_blank" rel="noreferrer"
              style={{ color: "rgba(255,255,255,0.45)", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#f97316"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}>
              <IconLinkedIn size={20} />
            </a>
            <a href="mailto:vishwathansri93@gmail.com"
              style={{ color: "rgba(255,255,255,0.45)", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#f97316"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}>
              <IconMail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}