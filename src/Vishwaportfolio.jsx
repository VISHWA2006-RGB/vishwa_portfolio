import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: #f8f9fa; overflow-x: hidden; }
    .syne { font-family: 'Syne', sans-serif; }

    /* ── Animations ── */
    @keyframes hFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes hFadeIn { from{opacity:0} to{opacity:1} }
    @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
    @keyframes ringPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.04)} }
    @keyframes spin { to { transform: rotate(360deg); } }

    .ha{animation:hFadeUp 0.6s 0.05s ease both}
    .hb{animation:hFadeUp 0.6s 0.18s ease both}
    .hc{animation:hFadeUp 0.6s 0.28s ease both}
    .hd{animation:hFadeUp 0.6s 0.40s ease both}
    .he{animation:hFadeUp 0.6s 0.52s ease both}
    .hphoto{animation:hFadeIn 0.9s 0.15s ease both;opacity:0}
    .badge-fl{animation:floatBadge 3.5s ease-in-out infinite}
    .ring-pulse{animation:ringPulse 4s ease-in-out infinite}

    /* ── Nav links ── */
    .nav-lp{position:relative;text-decoration:none;font-size:14px;font-weight:500;color:#374151;transition:color 0.2s;padding:2px 0;white-space:nowrap}
    .nav-lp:hover{color:#f97316}
    .nav-lp.active-lp{color:#f97316;font-weight:600}
    .nav-lp::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:2px;background:#f97316;border-radius:99px;transform:scaleX(0);transition:transform 0.25s;transform-origin:center}
    .nav-lp:hover::after,.nav-lp.active-lp::after{transform:scaleX(1)}

    /* ── Scrollbar ── */
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:#f8f9fa}
    ::-webkit-scrollbar-thumb{background:#f97316;border-radius:99px}

    /* ── Topo patterns ── */
    .topo-white path { stroke: white; }
    .topo-gray path { stroke: #d1d5db; }

    /* ── Skill card hover ── */
    .skill-card { transition: transform 0.22s, box-shadow 0.22s; cursor: default; }
    .skill-card:hover { transform: translateY(-6px); }

    /* ── Exp/proj card hover ── */
    .hover-card { transition: transform 0.25s, box-shadow 0.25s; }
    .hover-card:hover { transform: translateY(-4px); }

    /* ── About card hover ── */
    .about-card { transition: transform 0.25s, box-shadow 0.25s; }
    .about-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(249,115,22,0.15) !important; }

    input, textarea { outline: none; }
    input:focus, textarea:focus { border-color: #f97316 !important; }

    /* ══════════ MOBILE RESPONSIVE ══════════ */

    /* Hero */
    .hero-inner { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:4rem; width:100%; padding:2rem 0; }
    .hero-text { flex:1 1 420px; max-width:580px; }
    .hero-photo-wrap { flex-shrink:0; position:relative; width:320px; height:420px; display:flex; align-items:center; justify-content:center; }

    /* About grid */
    .about-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:1.5rem; }

    /* Skills row */
    .skills-row { display:flex; flex-wrap:wrap; justify-content:center; gap:1.25rem; }

    /* Exp card */
    .exp-card-inner { display:flex; flex-wrap:wrap; gap:0; }
    .exp-left { flex:1 1 280px; padding:2rem; }
    .exp-right { flex-shrink:0; width:180px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1rem; padding:1.75rem; }

    /* Project card */
    .proj-card-inner { display:flex; flex-wrap:wrap; gap:0; }
    .proj-img-panel { width:260px; flex-shrink:0; min-height:240px; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; position:relative; overflow:hidden; }
    .proj-details { flex:1 1 280px; padding:2rem; display:flex; flex-direction:column; gap:0.85rem; }

    /* Contact */
    .contact-inner { display:flex; flex-wrap:wrap; gap:2.5rem; align-items:flex-start; }
    .contact-left { flex:1 1 260px; min-width:240px; }
    .contact-right { flex:1 1 360px; }

    /* Footer */
    .footer-inner { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:1rem; }

    /* ── MOBILE ≤ 640px ── */
    @media (max-width: 640px) {
      .hero-inner { flex-direction:column; align-items:center; text-align:center; gap:1.5rem; padding:1.5rem 0; }
      .hero-photo-wrap { width:200px !important; height:200px !important; margin:0 auto; order:-1; }
      .hero-photo-wrap .outer-ring { width:210px !important; height:210px !important; }
      .hero-photo-wrap .pulse-ring { width:175px !important; height:175px !important; }
      .hero-photo-wrap .photo-circle { width:148px !important; height:148px !important; }
      .hero-photo-wrap .otw-badge { bottom:0px !important; right:-10px !important; font-size:11px !important; padding:5px 11px !important; }
      .hero-text { flex:none; width:100%; max-width:100%; order:1; }
      .hero-btns { justify-content:center !important; }

      .about-grid { grid-template-columns:1fr; }

      .exp-card-inner { flex-direction:column; }
      .exp-right { width:100%; border-left:none !important; border-top:1px solid rgba(0,0,0,0.07); flex-direction:row; padding:1.25rem 1.5rem; gap:1.25rem; }

      .proj-card-inner { flex-direction:column; }
      .proj-img-panel { width:100% !important; min-height:200px; border-right:none !important; border-bottom:1px solid rgba(0,0,0,0.07); }
      .proj-details { padding:1.5rem; }

      .contact-inner { flex-direction:column; }
      .footer-inner { flex-direction:column; text-align:center; }

      .section-pad { padding:4rem 1.25rem !important; }
      .hero-pad { padding:0 1.25rem !important; }
      .nav-pad { padding:0 1.25rem !important; }

      .hero-name { font-size:2rem !important; }
      .hero-role { font-size:1.3rem !important; }
      .section-h2 { font-size:1.7rem !important; }
      .category-h3 { font-size:1.3rem !important; }
      .exp-role-h3 { font-size:1rem !important; }
      .proj-title-h3 { font-size:1.05rem !important; }

      .skill-card { padding:1rem 1.1rem !important; min-width:80px !important; }
      .skill-card img { width:42px !important; height:42px !important; }
      .skill-card span { font-size:11px !important; }

      .cta-btn { padding:9px 20px !important; font-size:13px !important; }
      .mobile-hide { display:none !important; }
    }

    /* ── TABLET 641–900px ── */
    @media (min-width:641px) and (max-width:900px) {
      .hero-inner { justify-content:center; gap:2rem; }
      .hero-photo-wrap { width:260px; height:340px; }
      .exp-right { width:150px; }
      .proj-img-panel { width:220px; }
      .section-pad { padding:5rem 2rem !important; }
      .hero-pad { padding:0 2rem !important; }
    }
  `}</style>
);

/* ── Icons ── */
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

/* ── useInView ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}


/* ── Topo SVG ── */
const TopoSVG = ({ color = "#d1d5db" }) => (
  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none"}} preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={`topo-${color.replace('#','')}`} x="0" y="0" width="900" height="600" patternUnits="userSpaceOnUse">
        {[300,330,270,365,235,400,200].map((y,i) => (
          <path key={i} d={`M-200,${y} C${i*15},${y-80} ${100+i*10},${y+80} ${250+i*5},${y-10} C${400+i*5},${y-90} ${480+i*5},${y+60} ${650},${y-30} C${820},${y-120} ${900},${y+30} ${1100},${y-50}`}
            fill="none" stroke={color} strokeWidth={1.2 - i*0.05} />
        ))}
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#topo-${color.replace('#','')})`}/>
  </svg>
);

/* ── Section header ── */
const SectionHeader = ({ label, title, subtitle }) => (
  <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
    <p className="syne" style={{ fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#f97316", marginBottom:"0.6rem" }}>{label}</p>
    <h2 className="syne section-h2" style={{ fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:800, color:"#1e2a4a", lineHeight:1.1 }}>{title}</h2>
    {subtitle && <p className="syne" style={{ fontSize:"clamp(1.1rem,2vw,1.5rem)", fontWeight:700, color:"#f97316", marginTop:"0.5rem" }}>{subtitle}</p>}
  </div>
);

export default function VishwaPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name:"", email:"", message:"" });
  const [formSent, setFormSent] = useState(false);
  const [projectImages, setProjectImages] = useState({ proj1:null, proj2:null });
  const [skillsRef, skillsVisible] = useInView();

 useEffect(() => {
  const sectionIds = [
    "home",
    "about",
    "skills",
    "experience",
    "projects",
    "contact",
  ];

  const handleScroll = () => {
    const scrollPos = window.scrollY + 120;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const section = document.getElementById(sectionIds[i]);
      if (section && scrollPos >= section.offsetTop) {
        setActiveSection(sectionIds[i]);
        break;
      }
    }
  };

  handleScroll(); // ✅ Home active on load
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const handleSubmit = (e) => {
  e.preventDefault();

  emailjs
    .send(
      "service_avivu1f",     // e.g. service_xxxxxx
      "template_jyhjfga",    // e.g. template_xxxxxx
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
      "o_5CG65mddgFfxmTC"      // e.g. abc123XYZ
    )
    .then(
      () => {
        setFormSent(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormSent(false), 4000);
      },
      (error) => {
        alert("Failed to send message. Please try again.");
        console.error(error);
      }
    );
};

  const skillGroups = [
    { label:"Languages", accent:"#f97316", bg:"rgba(249,115,22,0.08)", border:"rgba(249,115,22,0.22)", shadow:"rgba(249,115,22,0.2)",
      items:[
        { name:"Java", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
        { name:"Python", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name:"SQL", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
      ]
    },
    { label:"Web Technologies", accent:"#2563eb", bg:"rgba(37,99,235,0.08)", border:"rgba(37,99,235,0.22)", shadow:"rgba(37,99,235,0.2)",
      items:[
        { name:"HTML5", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
        { name:"CSS3", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
        { name:"JavaScript", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
        { name:"React.js", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name:"REST APIs", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
      ]
    },
    { label:"Databases", accent:"#059669", bg:"rgba(5,150,105,0.08)", border:"rgba(5,150,105,0.22)", shadow:"rgba(5,150,105,0.2)",
      items:[
        { name:"MySQL", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
        { name:"JDBC", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
      ]
    },
    { label:"Core Concepts", accent:"#7c3aed", bg:"rgba(124,58,237,0.08)", border:"rgba(124,58,237,0.22)", shadow:"rgba(124,58,237,0.2)",
      items:[
        { name:"Data Structures", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name:"OOP", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
        { name:"OS", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
        { name:"Networks", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" },
      ]
    },
    { label:"Tools & Platforms", accent:"#6366f1", bg:"rgba(99,102,241,0.08)", border:"rgba(99,102,241,0.22)", shadow:"rgba(99,102,241,0.2)",
      items:[
        { name:"Git", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        { name:"GitHub", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
        { name:"VS Code", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
        { name:"Eclipse", logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eclipse/eclipse-original.svg" },
      ]
    },
  ];

  const experiences = [
    { role:"Web Application Development Intern", company:"ROBOWAVES", fullCompany:"ROBOWAVES (Test Yantra Software Solutions)", period:"Mar 2025 – Apr 2025", location:"Chennai",
      accent:"#f97316", bg:"rgba(249,115,22,0.07)", border:"rgba(249,115,22,0.2)", icon:"🤖",
      bullets:["Developed responsive web apps using HTML, CSS, JavaScript, and ReactJS","Built reusable React components for improved UI/UX consistency","Collaborated on feature branches using Git-based version control"] },
    { role:"Cloud Computing Intern", company:"DLK Technologies", fullCompany:"DLK Technologies", period:"Dec 2024 – Jan 2025", location:"Chennai",
      accent:"#2563eb", bg:"rgba(37,99,235,0.07)", border:"rgba(37,99,235,0.2)", icon:"☁️",
      bullets:["Gained hands-on experience with AWS EC2, S3, and Lambda fundamentals","Implemented cloud storage access control and basic security practices","Deployed and tested cloud-based applications in a live environment"] },
    { role:"Cyber Security Intern", company:"NSIC Technical Services Centre", fullCompany:"NSIC Technical Services Centre", period:"Jun 2024 – Jul 2024", location:"Chennai",
      accent:"#7c3aed", bg:"rgba(124,58,237,0.07)", border:"rgba(124,58,237,0.2)", icon:"🔐",
      bullets:["Performed network monitoring and security event analysis using Sophos tools","Conducted vulnerability analysis and endpoint security research","Prepared documentation with preventive security recommendations"] },
  ];

  const projects = [
  {
    title: "IntelliMeds Medical System",
    period: "Aug 2025 – Oct 2025",
    desc:
      "A telemedicine and prescription management platform that automates patient reminders via voice calls and provides analytics for medication adherence tracking.",
    tech: ["Python", "Streamlit", "MySQL", "Twilio"],
    accent: "#2563eb",
    bg: "rgba(37,99,235,0.07)",
    border: "rgba(37,99,235,0.2)",
    icon: "🏥",
    image: "/IINTELL.png",   // ✅ MANUAL IMAGE
    githubUrl: "https://github.com/VISHWA2006-RGB",
    highlights: [
      "Automated voice call reminders",
      "Prescription management dashboard",
      "Medication adherence analytics",
    ],
  },
  {
    title: "Defect Forge System",
    period: "Jan 2025 – Mar 2025",
    desc:
      "A CNN-based engine defect detection system using YOLO for image preprocessing and comparison with defect-free references, featuring a GUI for visualization.",
    tech: ["Python", "YOLO", "Tkinter"],
    accent: "#059669",
    bg: "rgba(5,150,105,0.07)",
    border: "rgba(5,150,105,0.2)",
    icon: "⚙️",
    image: "/DEFECT.png",   // ✅ MANUAL IMAGE
    githubUrl: "https://github.com/VISHWA2006-RGB",
    highlights: [
      "CNN-powered defect detection",
      "Image preprocessing pipeline",
      "Interactive GUI for upload & visualization",
    ],
  },
];

  return (
    <div style={{ color:"#e8e8f0", overflowX:"hidden" }}>
      <FontStyle />

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
  }}
>
  <div
    className="nav-pad"
    style={{
      maxWidth: 1280,
      margin: "0 auto",
      padding: "0 2rem",
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    {/* Logo */}
    <a
      href="#home"
      className="syne"
      style={{
        textDecoration: "none",
        fontSize: "1.2rem",
        fontWeight: 800,
        color: "#1e2a4a",
        letterSpacing: "-0.02em",
        flexShrink: 0,
      }}
    >
      VK
    </a>

    {/* Desktop Nav */}
    <ul
  className="mobile-hide"
  style={{
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    gap: 28,
    margin: 0,
    padding: 0,
  }}
>
  {["Home", "About", "Skills", "Experience", "Projects", "Contact"].map(
    (item) => {
      const id = item === "Home" ? "home" : item.toLowerCase();
      return (
        <li key={item}>
          <a
            href={`#${id}`}
            className={`nav-lp ${activeSection === id ? "active-lp" : ""}`}
            onClick={() => setActiveSection(id)}
          >
            {item}
          </a>
        </li>
      );
    }
  )}
</ul>

    {/* Mobile Burger */}
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="burger-btn"
      aria-label="Toggle menu"
      style={{
        background: "none",
        border: "1px solid #e5e7eb",
        cursor: "pointer",
        fontSize: 18,
        lineHeight: 1,
        padding: "6px 10px",
        borderRadius: 8,
        color: "#374151",
      }}
    >
      {menuOpen ? "✕" : "☰"}
    </button>
  </div>

  {menuOpen && (
  <div
    style={{
      background: "#fff",
      borderTop: "1px solid #f3f4f6",
      padding: "0.5rem 1.5rem 1rem",
    }}
  >
    {["Home", "About", "Skills", "Experience", "Projects", "Contact"].map(
      (item) => {
        const id = item === "Home" ? "home" : item.toLowerCase();
        return (
          <a
            key={item}
            href={`#${id}`}
            onClick={() => {
              setActiveSection(id);
              setMenuOpen(false);
            }}
            style={{
              display: "block",
              padding: "11px 0",
              color: activeSection === id ? "#f97316" : "#374151",
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 500,
              borderBottom: "1px solid #f9fafb",
            }}
          >
            {item}
          </a>
        );
      }
    )}
  </div>
)}

  {/* Responsive toggle */}
  <style>
    {`
      .burger-btn { display: flex; }
      @media (min-width: 641px) {
        .burger-btn { display: none; }
      }
    `}
  </style>
</nav>

     /* ═════════════════ HERO SECTION ═════════════════ */

<>
      <style>{`
        /* ── Topo pattern colours ── */
        .topo-svg path { stroke: rgba(255,255,255,0.18); fill: none; }
        .topo-svg path.bold { stroke: rgba(255,255,255,0.32); }

        /* ── Hero layout ── */
        .hero-content {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 4rem;
          width: 100%;
          padding: 2rem 0;
        }

        /* ── Photo ── */
        .hero-photo {
          flex-shrink: 0;
          position: relative;
          width: 420px;
          height: 520px;
          margin-right: -2rem;
        }
        .hero-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
          mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
        }
        .open-badge {
          position: absolute;
          bottom: 32px;
          right: 16px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border-radius: 50px;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #111;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.3);
          display: inline-block;
        }

        /* ── Text ── */
        .hero-text { flex: 1 1 420px; max-width: 580px; }
        .hero-text .hb { font-size: clamp(2.2rem,4.5vw,4.2rem); font-weight: 800; line-height: 1.08; margin-bottom: 0.2rem; color: #fff; }
        .hero-text .hc { font-size: clamp(1.4rem,2.8vw,2.4rem); font-weight: 700; line-height: 1.1; color: #fff; margin-bottom: 1.4rem; }
        .hero-text .hd { font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.9; max-width: 480px; margin-bottom: 2rem; }
        .he { display: flex; align-items: center; gap: 20px; margin-bottom: 2.5rem; flex-wrap: wrap; }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.55);
          text-decoration: none; transition: color 0.2s;
        }
        .btn-ghost:hover { color: #fff; }

        .btn-contact {
          display: inline-flex; align-items: center;
          padding: 12px 32px; border-radius: 50px; font-size: 15px; font-weight: 700;
          background: linear-gradient(135deg,#f97316,#ea580c); color: #fff;
          text-decoration: none;
          box-shadow: 0 6px 22px rgba(249,115,22,0.4); transition: all 0.22s;
        }
        .btn-contact:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(249,115,22,0.55);
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .hero-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.5rem;
            padding: 2rem 0;
          }
          .hero-photo {
            width: 250px !important;
            height: 350px !important;
            margin-right: 0 !important;
          }
          .hero-text { flex: unset; max-width: 100%; width: 100%; }
          .he { justify-content: center; }
        }
      `}</style>

      <div
        id="home"
        style={{
          minHeight: "100vh",
          paddingTop: 64,
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #1e40af 70%, #1a3aad 100%)",
        }}
      >

        {/* ── Organic Topography SVG Pattern ── */}
        <svg
          className="topo-svg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1440 900"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── Top-left cluster: large swirling concentric blobs ── */}
          <path strokeWidth="1.1" d="M-60,80 C20,20 160,10 240,70 C320,130 350,230 290,300 C230,370 120,390 50,330 C-20,270 -30,180 -60,80Z"/>
          <path strokeWidth="1" d="M-40,100 C30,45 150,35 225,90 C300,145 328,235 272,300 C216,365 115,382 50,325 C-15,268 -18,170 -40,100Z"/>
          <path strokeWidth="0.9" d="M-20,120 C45,68 142,58 212,110 C282,162 308,242 255,302 C202,362 110,376 52,322 C-6,268 -4,162 -20,120Z"/>
          <path strokeWidth="0.85" d="M0,138 C58,90 136,82 200,130 C264,178 288,250 238,304 C188,358 106,370 54,318 C2,266 8,154 0,138Z"/>
          <path strokeWidth="0.8" d="M18,155 C70,112 130,106 188,150 C246,194 268,258 221,306 C174,354 102,364 56,315 C10,266 18,148 18,155Z"/>
          <path className="bold" strokeWidth="1.5" d="M-80,60 C10,-10 180,-20 270,55 C360,130 395,250 325,335 C255,420 110,440 25,365 C-60,290 -50,160 -80,60Z"/>

          {/* ── Top-center: elongated wavy ridge ── */}
          <path strokeWidth="1" d="M300,20 C380,-10 500,5 580,40 C660,75 690,130 650,170 C610,210 520,210 440,185 C360,160 300,110 300,20Z"/>
          <path strokeWidth="0.9" d="M315,30 C390,2 502,16 577,49 C652,82 680,133 642,170 C604,207 518,206 440,182 C362,158 315,105 315,30Z"/>
          <path strokeWidth="0.85" d="M330,40 C400,14 504,27 574,58 C644,89 670,136 634,170 C598,204 516,202 442,179 C368,156 330,100 330,40Z"/>
          <path className="bold" strokeWidth="1.4" d="M280,10 C370,-25 510,-8 595,32 C680,72 715,135 670,180 C625,225 524,224 438,196 C352,168 280,120 280,10Z"/>

          {/* ── Top-right corner cluster: tight concentric ovals ── */}
          <path strokeWidth="1" d="M1200,30 C1260,-10 1360,0 1400,50 C1440,100 1430,180 1380,210 C1330,240 1240,230 1200,190 C1160,150 1155,80 1200,30Z"/>
          <path strokeWidth="0.9" d="M1210,42 C1265,5 1355,14 1392,60 C1429,106 1419,178 1372,206 C1325,234 1244,224 1206,186 C1168,148 1165,82 1210,42Z"/>
          <path strokeWidth="0.85" d="M1220,54 C1270,20 1350,28 1384,70 C1418,112 1408,176 1364,202 C1320,228 1248,218 1212,182 C1176,146 1175,84 1220,54Z"/>
          <path strokeWidth="0.8" d="M1232,66 C1276,35 1346,42 1376,80 C1406,118 1397,174 1356,198 C1315,222 1252,212 1218,178 C1184,144 1185,86 1232,66Z"/>
          <path className="bold" strokeWidth="1.4" d="M1188,18 C1254,-22 1368,-10 1410,44 C1452,98 1440,184 1386,216 C1332,248 1236,238 1194,196 C1152,154 1145,74 1188,18Z"/>

          {/* ── Small top-right dot cluster ── */}
          <path strokeWidth="0.9" d="M1380,160 C1400,145 1425,148 1435,162 C1445,176 1438,198 1420,205 C1402,212 1382,202 1378,186 C1374,170 1375,165 1380,160Z"/>
          <path strokeWidth="0.8" d="M1384,164 C1402,150 1423,153 1432,165 C1441,177 1435,196 1418,202 C1401,208 1384,199 1381,185 C1378,171 1380,167 1384,164Z"/>

          {/* ── Middle-left: large organic blob ── */}
          <path strokeWidth="1.1" d="M-80,420 C-20,340 100,310 200,340 C300,370 360,450 340,540 C320,630 220,680 120,660 C20,640 -50,580 -70,510 C-90,440 -80,420 -80,420Z"/>
          <path strokeWidth="1" d="M-60,430 C-5,355 108,326 205,355 C302,384 358,460 339,546 C320,632 224,678 127,659 C30,640 -36,581 -55,513 C-74,445 -60,430 -60,430Z"/>
          <path strokeWidth="0.9" d="M-42,440 C10,368 116,342 210,370 C304,398 356,470 338,552 C320,634 228,676 134,658 C40,640 -22,582 -40,516 C-58,450 -42,440 -42,440Z"/>
          <path strokeWidth="0.85" d="M-24,450 C24,381 124,358 215,385 C306,412 354,480 337,558 C320,636 232,674 141,657 C50,640 -8,583 -25,519 C-42,455 -24,450 -24,450Z"/>
          <path className="bold" strokeWidth="1.5" d="M-100,410 C-32,322 92,294 196,325 C300,356 364,442 342,538 C320,634 216,686 112,665 C8,644 -64,579 -85,505 C-106,431 -100,410 -100,410Z"/>

          {/* ── Center: big sweeping S-curve ridge ── */}
          <path strokeWidth="1.1" d="M400,300 C480,240 580,260 640,330 C700,400 680,500 610,550 C540,600 440,590 380,530 C320,470 320,360 400,300Z"/>
          <path strokeWidth="1" d="M412,312 C488,254 582,273 640,340 C698,407 678,502 611,550 C544,598 447,588 388,530 C329,472 328,366 412,312Z"/>
          <path strokeWidth="0.9" d="M424,324 C496,268 584,286 640,350 C696,414 676,504 612,550 C548,596 450,586 394,530 C338,474 336,372 424,324Z"/>
          <path strokeWidth="0.85" d="M435,336 C504,282 586,299 640,360 C694,421 674,506 613,550 C552,594 453,584 400,530 C347,476 344,378 435,336Z"/>
          <path className="bold" strokeWidth="1.5" d="M385,285 C470,222 578,244 642,320 C706,396 684,500 608,552 C532,604 428,594 366,530 C304,466 304,352 385,285Z"/>

          {/* ── Center-bottom: rounded rectangle cluster ── */}
          <path strokeWidth="1" d="M520,620 C560,580 640,570 700,590 C760,610 790,660 775,710 C760,760 700,785 640,778 C580,771 530,740 515,695 C500,650 500,645 520,620Z"/>
          <path strokeWidth="0.9" d="M530,630 C568,592 644,582 702,601 C760,620 788,667 774,714 C760,761 702,784 644,777 C586,770 537,740 523,697 C509,654 510,650 530,630Z"/>
          <path strokeWidth="0.85" d="M540,640 C576,604 648,594 704,612 C760,630 786,674 773,718 C760,762 704,783 648,776 C592,769 544,740 531,699 C518,658 520,655 540,640Z"/>
          <path strokeWidth="0.8" d="M550,650 C584,616 652,606 706,623 C760,640 784,681 772,722 C760,763 706,782 652,775 C598,768 551,740 539,701 C527,662 530,660 550,650Z"/>
          <path className="bold" strokeWidth="1.4" d="M508,608 C550,566 636,558 698,579 C760,600 792,653 776,706 C760,759 698,786 636,779 C574,772 522,740 505,691 C488,642 488,638 508,608Z"/>

          {/* ── Right side: large sweeping vertical blob ── */}
          <path strokeWidth="1.1" d="M1100,300 C1160,240 1270,240 1330,310 C1390,380 1390,480 1340,550 C1290,620 1190,640 1120,590 C1050,540 1030,440 1060,370 C1070,340 1090,318 1100,300Z"/>
          <path strokeWidth="1" d="M1110,312 C1168,254 1272,254 1330,321 C1388,388 1388,483 1340,551 C1292,619 1196,638 1128,590 C1060,542 1040,444 1069,374 C1079,344 1099,328 1110,312Z"/>
          <path strokeWidth="0.9" d="M1120,324 C1176,268 1274,268 1330,332 C1386,396 1386,486 1340,552 C1294,618 1202,636 1136,590 C1070,544 1050,448 1078,378 C1088,348 1108,338 1120,324Z"/>
          <path strokeWidth="0.85" d="M1130,336 C1184,282 1276,282 1330,343 C1384,404 1384,489 1340,553 C1296,617 1208,634 1144,590 C1080,546 1060,452 1087,382 C1097,352 1117,348 1130,336Z"/>
          <path className="bold" strokeWidth="1.5" d="M1088,285 C1152,222 1268,222 1330,298 C1392,374 1392,478 1340,549 C1288,620 1184,642 1112,590 C1040,538 1018,434 1050,360 C1062,328 1080,306 1088,285Z"/>

          {/* ── Bottom-left blob ── */}
          <path strokeWidth="1" d="M-40,700 C20,640 130,625 200,660 C270,695 300,770 270,840 C240,910 160,940 80,920 C0,900 -40,840 -50,780 C-60,720 -40,700 -40,700Z"/>
          <path strokeWidth="0.9" d="M-25,712 C32,654 136,639 204,673 C272,707 300,778 271,845 C242,912 164,940 86,921 C8,902 -30,843 -40,784 C-50,725 -25,712 -25,712Z"/>
          <path strokeWidth="0.85" d="M-10,724 C44,668 142,653 208,686 C274,719 300,786 272,850 C244,914 168,940 92,922 C16,904 -20,846 -30,788 C-40,730 -10,724 -10,724Z"/>
          <path className="bold" strokeWidth="1.4" d="M-58,688 C10,624 124,609 196,646 C268,683 300,762 269,835 C238,908 156,940 74,919 C-8,898 -50,837 -62,774 C-74,711 -58,688 -58,688Z"/>

          {/* ── Bottom-right small oval ── */}
          <path strokeWidth="0.9" d="M1300,820 C1330,800 1370,802 1390,820 C1410,838 1408,870 1385,882 C1362,894 1326,888 1310,868 C1294,848 1292,832 1300,820Z"/>
          <path strokeWidth="0.8" d="M1306,826 C1334,807 1368,809 1387,825 C1406,841 1404,869 1383,880 C1362,891 1328,885 1313,866 C1298,847 1298,836 1306,826Z"/>

          {/* ── Long flowing cross-contour lines (like the wave ridges in image) ── */}
          <path strokeWidth="1" d="M200,200 C300,170 420,190 520,230 C620,270 700,340 780,360 C860,380 960,350 1060,330 C1160,310 1260,320 1360,350"/>
          <path strokeWidth="0.85" d="M180,220 C282,192 404,210 506,250 C608,290 688,356 770,374 C852,392 954,362 1054,342 C1154,322 1256,332 1358,362"/>
          <path strokeWidth="0.8" d="M160,240 C264,214 388,230 492,270 C596,310 676,372 760,388 C844,404 948,374 1048,354 C1148,334 1252,344 1356,374"/>
          <path strokeWidth="1.1" d="M220,180 C318,148 438,170 536,210 C634,250 712,324 790,346 C868,368 966,338 1066,318 C1166,298 1264,308 1362,338"/>

          <path strokeWidth="0.9" d="M100,500 C200,465 330,460 450,490 C570,520 660,575 770,590 C880,605 980,580 1080,560 C1180,540 1290,540 1400,560"/>
          <path strokeWidth="0.8" d="M80,520 C182,487 314,480 436,510 C558,540 648,593 760,607 C872,621 972,596 1072,576 C1172,556 1284,556 1396,576"/>
          <path strokeWidth="0.75" d="M60,540 C164,509 298,500 422,530 C546,560 636,611 750,624 C864,637 964,612 1064,592 C1164,572 1278,572 1392,592"/>
          <path className="bold" strokeWidth="1.3" d="M120,480 C218,443 346,440 464,470 C582,500 672,557 780,573 C888,589 988,564 1088,544 C1188,524 1296,524 1404,544"/>
        </svg>

        {/* Content Container */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 2rem",
            minHeight: "calc(100vh - 64px)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="hero-content">

            {/* IMAGE */}
            <div className="hero-photo">
              <img src="/vichuw2.jpg" alt="Vishwa K" />
              <div className="open-badge">
                <span className="dot" />
                Open to work
              </div>
            </div>

            {/* TEXT */}
            <div className="hero-text">
              <h1 className="hb syne">Vishwa K,</h1>
              <h2 className="hc syne">Software Developer</h2>
              <p className="hd">
                Computer Science undergraduate skilled in Java, Python, and SQL
                with strong knowledge of data structures, OOP, and networks.
                Passionate about building scalable solutions.
              </p>
              <div className="he">
               <a
  href="/VISHWA_RESUME.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="btn-contact"
>
  View My Resume
</a>
                <a href="#contact" className="btn-contact">
                  Contact Me
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>

      {/* ══ ABOUT ══ */}
      <section id="about" className="section-pad" style={{ background:"#f8f9fa", padding:"6rem 2rem", position:"relative", overflow:"hidden" }}>
        <TopoSVG color="#d1d5db" />
        <div style={{ maxWidth:1280, margin:"0 auto", position:"relative", zIndex:1 }}>
          <SectionHeader label="About Me" title="Designing Solutions, Not Just Code" />
          <div className="about-grid">
            {[
              { icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/></svg>, title:"Developer", text:"Skilled in Java, Python, SQL, React.js with a strong grasp of data structures, OOP, and full-stack web development." },
              { icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/></svg>, title:"Education", text:"B.E. Computer Science & Engineering at Panimalar Engineering College, Chennai. Expected graduation May 2027." },
              { icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>, title:"Goal", text:"Seeking a Software Developer role to apply practical experience from cybersecurity, cloud computing, and web development internships." },
            ].map((card,i)=>(
              <div key={i} className="about-card" style={{
                background:"rgba(255,255,255,0.88)", backdropFilter:"blur(8px)",
                borderRadius:16, padding:"2rem",
                boxShadow:"0 2px 20px rgba(0,0,0,0.07)"
              }}>
                <div style={{ width:52, height:52, borderRadius:14, background:"rgba(249,115,22,0.1)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1.25rem" }}>{card.icon}</div>
                <h3 className="syne" style={{ fontSize:17, fontWeight:700, color:"#1e2a4a", marginBottom:"0.65rem" }}>{card.title}</h3>
                <p style={{ fontSize:14, color:"#64748b", lineHeight:1.8 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" ref={skillsRef} className="section-pad" style={{
        background:"#f8f9fa", padding:"6rem 2rem", position:"relative", overflow:"hidden",
        opacity:skillsVisible?1:0, transform:skillsVisible?"translateY(0)":"translateY(40px)",
        transition:"opacity 0.7s ease, transform 0.7s ease"
      }}>
        <TopoSVG color="#d1d5db" />
        <div style={{ maxWidth:1280, margin:"0 auto", position:"relative", zIndex:1 }}>
          <SectionHeader label="Technical Skills" title="Tools & Technologies I Work With" />
          {skillGroups.map(({ label, accent, bg, border, shadow, items }, gi) => (
            <div key={label} style={{ marginBottom:"3rem" }}>
              <h3 className="syne category-h3" style={{ fontSize:"clamp(1.3rem,2.5vw,2rem)", fontWeight:800, color:accent, textAlign:"center", marginBottom:"1.5rem" }}>{label}</h3>
              <div className="skills-row">
                {items.map(({ name, logo }) => (
                  <div key={name} className="skill-card" style={{
                    display:"flex", flexDirection:"column", alignItems:"center", gap:"0.5rem",
                    padding:"1.25rem 1.4rem",
                    background:"rgba(255,255,255,0.92)",
                    border:`1.5px solid ${border}`,
                    borderRadius:14,
                    boxShadow:`0 4px 16px ${bg}`,
                    minWidth:90
                  }}
                    onMouseEnter={e=>{ e.currentTarget.style.boxShadow=`0 14px 32px ${shadow}`; }}
                    onMouseLeave={e=>{ e.currentTarget.style.boxShadow=`0 4px 16px ${bg}`; }}
                  >
                    <img src={logo} alt={name} style={{ width:52, height:52, objectFit:"contain" }} onError={e=>e.target.style.display="none"} />
                    <span style={{ fontSize:12, fontWeight:700, color:"#1e2a4a", textAlign:"center", fontFamily:"'Syne',sans-serif", whiteSpace:"nowrap" }}>{name}</span>
                  </div>
                ))}
              </div>
              {gi < skillGroups.length - 1 && (
                <div style={{ height:1, background:"rgba(0,0,0,0.07)", margin:"2.5rem auto 0", maxWidth:500 }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section id="experience" className="section-pad" style={{ background:"#f8f9fa", padding:"6rem 2rem", position:"relative", overflow:"hidden" }}>
        <TopoSVG color="#d1d5db" />
        <div style={{ maxWidth:1280, margin:"0 auto", position:"relative", zIndex:1 }}>
          <SectionHeader label="Experience" title="My Professional Journey" subtitle="Internships" />
          <div style={{ display:"flex", flexDirection:"column", gap:"1.75rem" }}>
            {experiences.map((exp,i)=>(
              <div key={i} className="hover-card" style={{
                background:"rgba(255,255,255,0.88)", backdropFilter:"blur(8px)",
                borderRadius:20, overflow:"hidden",
                boxShadow:"0 2px 20px rgba(0,0,0,0.07)",
                border:`1.5px solid ${exp.border}`
              }}
                onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 16px 40px ${exp.bg.replace('0.07','0.2')}`}
                onMouseLeave={e=>e.currentTarget.style.boxShadow="0 2px 20px rgba(0,0,0,0.07)"}
              >
                <div className="exp-card-inner">
                  {/* Left */}
                  <div className="exp-left">
                    <span style={{ display:"inline-block", padding:"3px 12px", borderRadius:999, fontSize:11, fontWeight:700, letterSpacing:"0.04em", background:exp.bg, border:`1px solid ${exp.border}`, color:exp.accent, marginBottom:"0.85rem" }}>{exp.period}</span>
                    <h3 className="syne exp-role-h3" style={{ fontSize:"clamp(0.95rem,2vw,1.2rem)", fontWeight:800, color:"#1e2a4a", marginBottom:"0.35rem", lineHeight:1.3 }}>{exp.role}</h3>
                    <div style={{ fontSize:13, fontWeight:600, color:exp.accent, marginBottom:"0.25rem" }}>{exp.fullCompany}</div>
                    <div style={{ fontSize:12, color:"#94a3b8", marginBottom:"1rem" }}>📍 {exp.location}</div>
                    <ul style={{ paddingLeft:"1.1rem", margin:0 }}>
                      {exp.bullets.map((b,j)=>(
                        <li key={j} style={{ color:"#475569", fontSize:13.5, lineHeight:1.85, marginBottom:5 }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  {/* Right panel */}
                  <div className="exp-right" style={{ background:exp.bg, borderLeft:`1px solid ${exp.border}` }}>
                    <div style={{ width:80, height:80, borderRadius:"50%", background:"#fff", border:`3px solid ${exp.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, boxShadow:`0 8px 24px ${exp.bg.replace('0.07','0.25')}`, flexShrink:0 }}>{exp.icon}</div>
                    <div style={{ textAlign:"center" }}>
                      <div className="syne" style={{ fontSize:12, fontWeight:800, color:exp.accent, lineHeight:1.3 }}>{exp.company}</div>
                      <div style={{ fontSize:11, color:"#94a3b8", marginTop:3 }}>Internship</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      
<section
  id="projects"
  className="section-pad"
  style={{
    background: "#f8f9fa",
    padding: "6rem 2rem",
    position: "relative",
    overflow: "hidden",
    borderTop: "1px solid rgba(0,0,0,0.06)",
  }}
>
  <TopoSVG color="#d1d5db" />

  <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
    <SectionHeader label="Projects" title="What I've Built" />

    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {projects.map((proj, i) => {
        
        <img src={proj.image} alt={proj.title} />
        

        return (
          <div
            key={i}
            className="hover-card"
            style={{
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(8px)",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
              border: `1.5px solid ${proj.border}`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = `0 16px 40px ${proj.bg.replace(
                "0.07",
                "0.2"
              )}`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.07)")
            }
          >
            <div className="proj-card-inner">
              {/* Image panel */}
<div
  className="proj-img-panel"
  style={{
    background: proj.bg,
    borderRight: `1px solid ${proj.border}`,
    position: "relative",
    overflow: "hidden",
  }}
>
  <img
    src={proj.image}
    alt={proj.title}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      inset: 0,
    }}
  />
</div>

              {/* DETAILS */}
              <div className="proj-details">
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 700,
                        background: proj.bg,
                        border: `1px solid ${proj.border}`,
                        color: proj.accent,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {proj.period}
                    </span>

                    <h3
                      className="syne proj-title-h3"
                      style={{
                        fontSize: "clamp(1rem,2vw,1.35rem)",
                        fontWeight: 800,
                        color: "#1e2a4a",
                        lineHeight: 1.2,
                        margin: 0,
                      }}
                    >
                      {proj.title}
                    </h3>
                  </div>

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "7px 14px",
                      borderRadius: 8,
                      background: "#1e2a4a",
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: "'Syne',sans-serif",
                      transition: "background 0.2s, transform 0.2s",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = proj.accent;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#1e2a4a";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <IconGitHub size={14} /> GitHub
                  </a>
                </div>

                <p style={{ color: "#475569", fontSize: 13.5, lineHeight: 1.85 }}>
                  {proj.desc}
                </p>

                <div>
                  {proj.highlights.map((h, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 5,
                      }}
                    >
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: proj.accent,
                        }}
                      />
                      <span style={{ fontSize: 13, color: "#374151" }}>{h}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "4px 11px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 600,
                        background: proj.bg,
                        border: `1px solid ${proj.border}`,
                        color: proj.accent,
                        fontFamily: "'Syne',sans-serif",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="section-pad" style={{ background:"#f8f9fa", padding:"6rem 2rem", position:"relative", overflow:"hidden", borderTop:"1px solid rgba(0,0,0,0.06)" }}>
        <TopoSVG color="#d1d5db" />
        <div style={{ maxWidth:1280, margin:"0 auto", position:"relative", zIndex:1 }}>
          <SectionHeader label="Contact" title="Let's Connect" />
          <div className="contact-inner">
            {/* Left */}
            <div className="contact-left">
              <p style={{ color:"#64748b", fontSize:15, lineHeight:1.8, marginBottom:"2rem" }}>
                I'm actively looking for software development opportunities. Feel free to reach out!
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                {[
                  { icon:<IconMail size={18}/>, val:"vishwathansri93@gmail.com", href:"mailto:vishwathansri93@gmail.com" },
                  { icon:<IconPhone size={18}/>, val:"+91 9345577984", href:"tel:+919345577984" },
                  { icon:<IconLocation size={18}/>, val:"Chennai, Tamil Nadu", href:null },
                  { icon:<IconLinkedIn size={18}/>, val:"LinkedIn Profile", href:"https://www.linkedin.com/in/vishwa-k-07883b325/" },
                  { icon:<IconGitHub size={18}/>, val:"GitHub Profile", href:"https://github.com/VISHWA2006-RGB" },
                ].map(({ icon, val, href }, i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
                    <div style={{ width:44, height:44, borderRadius:12, flexShrink:0, background:"rgba(249,115,22,0.1)", border:"1px solid rgba(249,115,22,0.2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#f97316" }}>{icon}</div>
                    {href ? (
                      <a href={href} target={href.startsWith("http")?"_blank":undefined} rel="noreferrer"
                        style={{ color:"#374151", fontSize:14, textDecoration:"none", fontWeight:500, transition:"color 0.2s", wordBreak:"break-all" }}
                        onMouseEnter={e=>e.currentTarget.style.color="#f97316"}
                        onMouseLeave={e=>e.currentTarget.style.color="#374151"}>{val}</a>
                    ) : (
                      <span style={{ color:"#374151", fontSize:14, fontWeight:500 }}>{val}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="contact-right">
              <div style={{ background:"rgba(255,255,255,0.92)", backdropFilter:"blur(8px)", borderRadius:20, padding:"2rem", boxShadow:"0 4px 24px rgba(0,0,0,0.08)", border:"1px solid rgba(249,115,22,0.1)" }}>
                {formSent ? (
                  <div style={{ textAlign:"center", padding:"2.5rem 1rem" }}>
                    <div style={{ fontSize:48, marginBottom:"0.75rem" }}>✉️</div>
                    <div className="syne" style={{ fontSize:20, fontWeight:800, color:"#f97316", marginBottom:6 }}>Message Sent!</div>
                    <div style={{ color:"#64748b", fontSize:14 }}>Thanks for reaching out — I'll get back to you soon.</div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {[{ label:"Name", key:"name", type:"text", placeholder:"Your name" }, { label:"Email", key:"email", type:"email", placeholder:"you@example.com" }].map(({ label, key, type, placeholder })=>(
                      <div key={key} style={{ marginBottom:"1.1rem" }}>
                        <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#374151", marginBottom:7, fontFamily:"'Syne',sans-serif" }}>{label}</label>
                        <input type={type} required placeholder={placeholder} value={formData[key]}
                          onChange={e=>setFormData(p=>({...p,[key]:e.target.value}))}
                          style={{ width:"100%", padding:"12px 15px", borderRadius:10, fontSize:14, background:"#f1f5f9", border:"1.5px solid #e2e8f0", color:"#1e2a4a", transition:"border-color 0.2s", fontFamily:"'DM Sans',sans-serif" }}
                          onFocus={e=>e.target.style.borderColor="#f97316"}
                          onBlur={e=>e.target.style.borderColor="#e2e8f0"} />
                      </div>
                    ))}
                    <div style={{ marginBottom:"1.5rem" }}>
                      <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#374151", marginBottom:7, fontFamily:"'Syne',sans-serif" }}>Message</label>
                      <textarea required rows={5} placeholder="Your message..." value={formData.message}
                        onChange={e=>setFormData(p=>({...p,message:e.target.value}))}
                        style={{ width:"100%", padding:"12px 15px", borderRadius:10, fontSize:14, background:"#f1f5f9", border:"1.5px solid #e2e8f0", color:"#1e2a4a", resize:"vertical", transition:"border-color 0.2s", fontFamily:"'DM Sans',sans-serif" }}
                        onFocus={e=>e.target.style.borderColor="#f97316"}
                        onBlur={e=>e.target.style.borderColor="#e2e8f0"} />
                    </div>
                    <button type="submit" style={{
                      width:"100%", padding:"13px", borderRadius:10, fontSize:14, fontWeight:700,
                      background:"#f97316", color:"#fff", border:"none", cursor:"pointer",
                      fontFamily:"'Syne',sans-serif", transition:"background 0.2s, transform 0.2s, box-shadow 0.2s"
                    }}
                      onMouseEnter={e=>{e.currentTarget.style.background="#ea6c0a"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(249,115,22,0.35)";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="#f97316"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none";}}>
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
      <footer style={{ background:"#1e2a4a", borderTop:"1px solid rgba(255,255,255,0.08)", padding:"2.5rem 2rem" }}>
        <div className="footer-inner" style={{ maxWidth:1280, margin:"0 auto" }}>
          <div className="syne" style={{ fontWeight:800, fontSize:20, color:"#fff" }}>
            Vishwa<span style={{ color:"#f97316" }}>.K</span>
          </div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>
            © 2025 Vishwa K — Built with passion & purpose
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"1.25rem" }}>
            {[
              { icon:<IconGitHub size={20}/>, href:"https://github.com/VISHWA2006-RGB" },
              { icon:<IconLinkedIn size={20}/>, href:"https://www.linkedin.com/in/vishwa-k-07883b325/" },
              { icon:<IconMail size={20}/>, href:"mailto:vishwathansri93@gmail.com" },
            ].map(({ icon, href }, i)=>(
              <a key={i} href={href} target={href.startsWith("http")?"_blank":undefined} rel="noreferrer"
                style={{ color:"rgba(255,255,255,0.45)", transition:"color 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.color="#f97316"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.45)"}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}