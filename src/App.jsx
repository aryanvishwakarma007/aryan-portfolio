import { useEffect, useRef, useState } from "react";

/* =========================================================
   ARYAN VISHWAKARMA — PREMIUM DATA × AI PORTFOLIO
   Single-file interactive experience
   ========================================================= */

const GITHUB_URL = "https://github.com/aryanvishwakarma007";
const LINKEDIN_URL = "YOUR_LINKEDIN_URL";
const EMAIL = "YOUR_REAL_EMAIL";

/* =========================================================
   DATA
   ========================================================= */

const skills = [
  { name: "Python", category: "CORE", x: 16, y: 22, orbit: 1 },
  { name: "SQL", category: "CORE", x: 76, y: 18, orbit: 2 },
  { name: "Power BI", category: "ANALYTICS", x: 84, y: 48, orbit: 3 },
  { name: "Excel", category: "ANALYTICS", x: 17, y: 67, orbit: 4 },
  { name: "Tableau", category: "VISUALIZATION", x: 61, y: 78, orbit: 5 },
  { name: "Machine Learning", category: "LEARNING", x: 42, y: 37, orbit: 6 },
  { name: "AI", category: "LEARNING", x: 67, y: 34, orbit: 7 },
  { name: "Prompt Engineering", category: "AI", x: 36, y: 82, orbit: 8 },
];

const projects = [
  {
    id: 1,
    title: "INSIGHTAI",
    subtitle: "AI Excel Analyzer & Dashboard Generator",
    description:
      "An intelligent analytics platform that transforms Excel or CSV data into meaningful insights, analytics and dashboard-ready information.",
    tags: ["Python", "FastAPI", "React", "Excel", "AI"],
    status: "BUILDING",
    featured: true,
    github: GITHUB_URL,
    demo: null,
    problem:
      "Business users often spend hours cleaning spreadsheets and manually creating reports.",
    approach:
      "The system receives structured data, analyzes columns and missing values, extracts useful patterns and prepares analytics-ready outputs.",
    features: [
      "Excel / CSV upload",
      "Automated data analysis",
      "Missing-value detection",
      "Data preview",
      "AI-assisted insights",
      "Dashboard generation",
    ],
  },
  {
    id: 2,
    title: "SALES & PROFIT",
    subtitle: "Business Intelligence Dashboard",
    description:
      "A business analytics dashboard focused on sales, profit, locations, categories and performance trends.",
    tags: ["Power BI", "Excel", "Data Visualization"],
    status: "PORTFOLIO",
    featured: false,
    github: GITHUB_URL,
    demo: null,
    problem:
      "Raw sales data makes it difficult to identify profitable products, regions and business trends.",
    approach:
      "Data is transformed into KPIs, charts and interactive business views for faster decision making.",
    features: [
      "Sales KPIs",
      "Profit analysis",
      "Regional analysis",
      "Category performance",
      "Interactive visuals",
    ],
  },
  {
    id: 3,
    title: "SQL BUSINESS",
    subtitle: "Business Analytics with PostgreSQL",
    description:
      "A collection of practical SQL analytics workflows covering joins, subqueries, aggregation and window functions.",
    tags: ["PostgreSQL", "SQL", "Analytics"],
    status: "LEARNING",
    featured: false,
    github: GITHUB_URL,
    demo: null,
    problem:
      "Business questions often require extracting meaningful patterns from relational databases.",
    approach:
      "SQL queries convert raw relational data into useful business metrics and ranked analytical results.",
    features: [
      "Complex joins",
      "GROUP BY analysis",
      "Subqueries",
      "Correlated queries",
      "Window functions",
      "Business KPIs",
    ],
  },
];

/* =========================================================
   GLOBAL STYLES
   ========================================================= */

const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Inter:wght@400;500;600;700;800;900&display=swap');

:root {
  --bg: #03050a;
  --bg2: #070b13;
  --text: #f5f7ff;
  --muted: #8994a9;
  --line: rgba(255,255,255,.09);
  --blue: #6595ff;
  --cyan: #55e8ff;
  --violet: #9b72ff;
  --glass: rgba(255,255,255,.045);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  background: var(--bg);
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Inter, Arial, sans-serif;
  overflow-x: hidden;
}

body::selection {
  background: rgba(90,140,255,.35);
}

button,
input,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 4px;
}

/* ---------- Main ---------- */

.portfolio {
  min-height: 100vh;
  position: relative;
  overflow-x: clip;
  background:
    radial-gradient(circle at 15% 15%, rgba(58,105,255,.11), transparent 28%),
    radial-gradient(circle at 88% 22%, rgba(0,220,255,.07), transparent 25%),
    radial-gradient(circle at 52% 90%, rgba(130,70,255,.09), transparent 32%),
    var(--bg);
}

.content {
  position: relative;
  z-index: 5;
}

.ambient-grid {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: .24;
  background-image:
    linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
  background-size: 70px 70px;
  mask-image: linear-gradient(to bottom, black, transparent 85%);
}

/* ---------- Canvas ---------- */

.particle-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.cursor-light {
  position: fixed;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 2;
  transform: translate(-50%, -50%);
  background:
    radial-gradient(
      circle,
      rgba(72,126,255,.10) 0%,
      rgba(70,120,255,.035) 32%,
      transparent 70%
    );
  filter: blur(8px);
  transition: left .12s ease-out, top .12s ease-out;
}

/* ---------- Scroll progress ---------- */

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  width: 100%;
  z-index: 2000;
  background: rgba(255,255,255,.035);
}

.scroll-progress span {
  display: block;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--blue),
    var(--cyan),
    var(--violet)
  );
  box-shadow:
    0 0 12px var(--blue),
    0 0 30px rgba(80,150,255,.45);
}

/* =========================================================
   NAVBAR
   ========================================================= */

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 78px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6%;
  border-bottom: 1px solid rgba(255,255,255,.055);
  background: rgba(3,5,10,.55);
  backdrop-filter: blur(24px) saturate(140%);
}

.logo {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: -1px;
}

.logo-dot {
  color: var(--blue);
  text-shadow: 0 0 20px var(--blue);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-link {
  border: 0;
  background: transparent;
  color: #929db1;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
  transition: .25s ease;
}

.nav-link:hover {
  color: white;
  transform: translateY(-2px);
  text-shadow: 0 0 18px rgba(100,150,255,.5);
}

.github-nav {
  padding: 11px 16px;
  border-radius: 10px;
  border: 1px solid rgba(110,160,255,.25);
  background:
    linear-gradient(
      135deg,
      rgba(90,130,255,.11),
      rgba(255,255,255,.025)
    );
  box-shadow:
    inset 0 1px rgba(255,255,255,.08),
    0 0 25px rgba(60,110,255,.06);
}

.menu-btn {
  display: none;
  border: 1px solid var(--line);
  color: white;
  background: rgba(255,255,255,.045);
  border-radius: 10px;
  padding: 9px 12px;
}

/* =========================================================
   BUTTON SYSTEM
   ========================================================= */

.button {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 22px;
  border-radius: 13px;
  border: 1px solid rgba(255,255,255,.12);
  transition:
    transform .25s ease,
    box-shadow .3s ease,
    border-color .3s ease,
    background .3s ease;
  isolation: isolate;
}

.button::before {
  content: "";
  position: absolute;
  inset: -100%;
  z-index: -1;
  background:
    conic-gradient(
      from 90deg,
      transparent,
      rgba(255,255,255,.35),
      transparent 25%
    );
  animation: buttonSweep 4s linear infinite;
}

.button::after {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: -1;
  border-radius: inherit;
  background: inherit;
}

.button:hover {
  transform: translateY(-5px) scale(1.025);
}

.button-primary {
  color: white;
  border-color: rgba(110,155,255,.7);
  background:
    linear-gradient(
      135deg,
      #315fff 0%,
      #6246ff 48%,
      #168bdc 100%
    );
  box-shadow:
    0 10px 40px rgba(65,90,255,.2),
    inset 0 1px rgba(255,255,255,.35);
}

.button-primary:hover {
  box-shadow:
    0 16px 55px rgba(65,100,255,.38),
    0 0 35px rgba(70,130,255,.18),
    inset 0 1px rgba(255,255,255,.4);
}

.button-secondary {
  color: #dce4f6;
  background: rgba(255,255,255,.035);
}

.button-secondary:hover {
  border-color: rgba(100,160,255,.45);
  background: rgba(80,120,255,.08);
  box-shadow: 0 15px 45px rgba(0,0,0,.25);
}

.button-icon {
  transition: transform .3s ease;
}

.button:hover .button-icon {
  transform: translateX(5px);
}

/* =========================================================
   HERO
   ========================================================= */

.hero {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  padding: 150px 7% 100px;
  perspective: 1200px;
}

.hero-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 40px;
  align-items: center;
}

.hero-copy {
  position: relative;
  z-index: 5;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #7ca9ff;
  font-family: "DM Mono", monospace;
  font-size: 10px;
  letter-spacing: 3px;
  margin-bottom: 25px;
}

.eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow:
    0 0 10px var(--cyan),
    0 0 25px var(--cyan);
  animation: blink 1.5s ease-in-out infinite;
}

.hero-title {
  font-size: clamp(58px, 8.8vw, 132px);
  line-height: .83;
  letter-spacing: -8px;
  font-weight: 900;
  max-width: 950px;
}

.hero-title .line {
  display: block;
}

.hero-title .gradient {
  background:
    linear-gradient(
      105deg,
      #ffffff 0%,
      #9bbdff 32%,
      #63e7ff 58%,
      #a17aff 85%
    );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% auto;
  animation: gradientMove 6s linear infinite;
}

.hero-description {
  max-width: 660px;
  margin-top: 35px;
  color: #929db2;
  font-size: 17px;
  line-height: 1.8;
}

.hero-description strong {
  color: white;
}

.hero-actions {
  display: flex;
  gap: 13px;
  flex-wrap: wrap;
  margin-top: 34px;
}

/* =========================================================
   3D AI CORE
   ========================================================= */

.hero-visual {
  position: relative;
  min-height: 620px;
  display: grid;
  place-items: center;
  transform-style: preserve-3d;
}

.ai-scene {
  position: relative;
  width: min(520px, 90vw);
  aspect-ratio: 1;
  transform-style: preserve-3d;
  animation: sceneFloat 7s ease-in-out infinite;
}

.ai-halo {
  position: absolute;
  inset: 7%;
  border-radius: 50%;
  background:
    radial-gradient(
      circle,
      rgba(60,125,255,.18),
      rgba(60,125,255,.055) 35%,
      transparent 68%
    );
  filter: blur(20px);
  transform: translateZ(-100px);
  animation: haloPulse 4s ease-in-out infinite;
}

.ai-core {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  transform:
    translate(-50%, -50%)
    translateZ(80px);
  background:
    radial-gradient(
      circle at 30% 25%,
      #d9f7ff 0%,
      #75c8ff 14%,
      #5275ff 36%,
      #382a91 64%,
      #080b23 100%
    );
  box-shadow:
    0 0 25px rgba(80,160,255,.75),
    0 0 75px rgba(60,110,255,.45),
    0 0 150px rgba(80,80,255,.25),
    inset -20px -25px 45px rgba(0,0,0,.5),
    inset 15px 10px 30px rgba(255,255,255,.22);
  animation: corePulse 3s ease-in-out infinite;
}

.ai-core::before {
  content: "";
  position: absolute;
  inset: 13px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.45);
  box-shadow: inset 0 0 25px rgba(130,200,255,.4);
}

.ai-core::after {
  content: "AI";
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 3px;
  color: white;
  text-shadow:
    0 0 12px #fff,
    0 0 35px #63cfff;
}

.orbit {
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  border: 1px solid rgba(115,170,255,.35);
  transform-style: preserve-3d;
}

.orbit-1 {
  width: 310px;
  height: 120px;
  margin: -60px 0 0 -155px;
  transform: rotateX(68deg) rotateZ(18deg);
  animation: orbitOne 10s linear infinite;
}

.orbit-2 {
  width: 390px;
  height: 170px;
  margin: -85px 0 0 -195px;
  transform: rotateX(62deg) rotateZ(-35deg);
  border-color: rgba(85,232,255,.25);
  animation: orbitTwo 14s linear infinite reverse;
}

.orbit-3 {
  width: 460px;
  height: 220px;
  margin: -110px 0 0 -230px;
  transform: rotateY(67deg) rotateZ(12deg);
  border-color: rgba(155,114,255,.24);
  animation: orbitThree 18s linear infinite;
}

.orbit-dot {
  position: absolute;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  top: 50%;
  left: 0;
  margin: -5px;
  background: #79d8ff;
  box-shadow:
    0 0 10px #79d8ff,
    0 0 30px #79d8ff;
}

.orbit-dot.violet {
  background: #b18bff;
  box-shadow:
    0 0 10px #b18bff,
    0 0 30px #8b61ff;
}

.orbit-dot.blue {
  background: #769cff;
  box-shadow:
    0 0 10px #769cff,
    0 0 30px #5275ff;
}

.data-label {
  position: absolute;
  padding: 8px 11px;
  border: 1px solid rgba(100,155,255,.18);
  background: rgba(5,9,18,.68);
  backdrop-filter: blur(12px);
  border-radius: 8px;
  color: #8ea8d9;
  font-family: "DM Mono", monospace;
  font-size: 8px;
  letter-spacing: 1.5px;
  box-shadow: 0 0 25px rgba(50,100,255,.08);
  animation: labelFloat 4s ease-in-out infinite;
}

.label-1 {
  top: 16%;
  left: 6%;
}

.label-2 {
  top: 28%;
  right: 0;
  animation-delay: -1.5s;
}

.label-3 {
  bottom: 20%;
  left: 4%;
  animation-delay: -2.4s;
}

.label-4 {
  bottom: 10%;
  right: 8%;
  animation-delay: -3s;
}

.ai-status {
  position: absolute;
  left: 50%;
  bottom: 6%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 9px;
  color: #687790;
  font-family: "DM Mono", monospace;
  font-size: 9px;
  letter-spacing: 2px;
  white-space: nowrap;
}

.status-live {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #5ff0bc;
  box-shadow: 0 0 12px #5ff0bc;
  animation: blink 1.2s infinite;
}

/* =========================================================
   SECTIONS
   ========================================================= */

section:not(.hero) {
  padding: 130px 7%;
  position: relative;
}

.section-head {
  max-width: 800px;
  margin-bottom: 58px;
}

.section-number {
  color: #668fff;
  font-family: "DM Mono", monospace;
  font-size: 9px;
  letter-spacing: 3px;
  margin-bottom: 18px;
}

.section-head h2 {
  font-size: clamp(43px, 6vw, 82px);
  line-height: .92;
  letter-spacing: -5px;
  font-weight: 900;
}

.section-head p {
  max-width: 650px;
  margin-top: 23px;
  color: #818da2;
  font-size: 16px;
  line-height: 1.8;
}

/* =========================================================
   GLASS
   ========================================================= */

.glass {
  position: relative;
  border: 1px solid rgba(255,255,255,.075);
  background:
    linear-gradient(
      145deg,
      rgba(255,255,255,.055),
      rgba(255,255,255,.012)
    );
  backdrop-filter: blur(22px) saturate(130%);
  border-radius: 24px;
  box-shadow:
    inset 0 1px rgba(255,255,255,.045),
    0 30px 90px rgba(0,0,0,.16);
}

.glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background:
    linear-gradient(
      120deg,
      transparent 25%,
      rgba(255,255,255,.035) 50%,
      transparent 75%
    );
  background-size: 220% 100%;
  animation: glassShine 8s linear infinite;
}

/* =========================================================
   ABOUT
   ========================================================= */

.about-grid {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 22px;
}

.about-card {
  padding: 44px;
}

.about-card p {
  color: #a1adbf;
  line-height: 1.95;
  font-size: 16px;
}

.about-card p + p {
  margin-top: 22px;
}

.direction-card {
  min-height: 300px;
  padding: 34px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.direction-orb {
  position: absolute;
  right: -70px;
  top: -70px;
  width: 230px;
  height: 230px;
  border-radius: 50%;
  background:
    radial-gradient(
      circle at 35% 30%,
      rgba(100,180,255,.4),
      rgba(70,90,255,.08) 40%,
      transparent 70%
    );
  filter: blur(4px);
}

.direction-label {
  position: relative;
  color: #758096;
  font-family: "DM Mono", monospace;
  font-size: 9px;
  letter-spacing: 2px;
}

.direction-main {
  position: relative;
  font-size: 52px;
  font-weight: 900;
  letter-spacing: -3px;
  background: linear-gradient(100deg, white, #6ca7ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* =========================================================
   SKILLS
   ========================================================= */

.skills-box {
  min-height: 650px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(
      circle at center,
      rgba(50,100,255,.09),
      transparent 35%
    ),
    rgba(255,255,255,.025);
}

.skills-box::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(
      transparent 49.8%,
      rgba(100,155,255,.055) 50%,
      transparent 50.2%
    ),
    linear-gradient(
      90deg,
      transparent 49.8%,
      rgba(100,155,255,.055) 50%,
      transparent 50.2%
    );
  background-size: 120px 120px;
}

.skill-center {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 190px;
  height: 190px;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  text-align: center;
  border-radius: 50%;
  border: 1px solid rgba(105,160,255,.3);
  background:
    radial-gradient(
      circle,
      rgba(70,115,255,.24),
      rgba(5,9,20,.93) 70%
    );
  box-shadow:
    0 0 60px rgba(60,110,255,.16),
    inset 0 0 45px rgba(70,120,255,.1);
  z-index: 4;
}

.skill-center strong {
  display: block;
  font-size: 22px;
  letter-spacing: -1px;
}

.skill-center small {
  color: #66738c;
  font-family: "DM Mono", monospace;
  font-size: 8px;
  letter-spacing: 2px;
}

.skill-node {
  position: absolute;
  transform: translate(-50%, -50%);
  padding: 13px 18px;
  border: 1px solid rgba(100,150,255,.18);
  border-radius: 999px;
  color: #c6d3ec;
  background:
    linear-gradient(
      135deg,
      rgba(15,27,55,.88),
      rgba(7,11,22,.82)
    );
  backdrop-filter: blur(12px);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .4px;
  transition:
    transform .35s cubic-bezier(.2,.8,.2,1),
    box-shadow .35s,
    border-color .35s,
    color .35s;
  z-index: 5;
  animation: skillFloat 5s ease-in-out infinite;
}

.skill-node::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background:
    linear-gradient(
      135deg,
      rgba(100,170,255,.6),
      transparent 40%,
      rgba(155,100,255,.45)
    );
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity .3s;
}

.skill-node:hover,
.skill-node.active {
  transform:
    translate(-50%, -50%)
    translateZ(30px)
    scale(1.18);
  color: white;
  border-color: rgba(110,170,255,.55);
  box-shadow:
    0 0 25px rgba(70,130,255,.25),
    0 12px 35px rgba(0,0,0,.35);
}

.skill-node:hover::before,
.skill-node.active::before {
  opacity: 1;
}

.skill-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.skill-line {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 37%;
  height: 1px;
  transform-origin: left center;
  background:
    linear-gradient(
      90deg,
      rgba(90,140,255,.25),
      transparent
    );
}

/* =========================================================
   JOURNEY
   ========================================================= */

.journey {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.journey-card {
  min-height: 270px;
  padding: 30px;
  overflow: hidden;
  transition:
    transform .35s ease,
    border-color .35s ease,
    box-shadow .35s ease;
}

.journey-card:hover {
  transform: translateY(-9px) rotateX(2deg);
  border-color: rgba(100,155,255,.3);
  box-shadow: 0 30px 70px rgba(0,0,0,.25);
}

.journey-card.current {
  background:
    radial-gradient(
      circle at 100% 0%,
      rgba(70,120,255,.14),
      transparent 45%
    ),
    linear-gradient(
      145deg,
      rgba(255,255,255,.06),
      rgba(255,255,255,.015)
    );
  border-color: rgba(100,155,255,.35);
}

.journey-number {
  color: #638fff;
  font-family: "DM Mono", monospace;
  font-size: 10px;
}

.journey-card h3 {
  margin-top: 52px;
  font-size: 22px;
  letter-spacing: -.8px;
}

.journey-card p {
  margin-top: 15px;
  color: #7e8a9f;
  line-height: 1.7;
  font-size: 13px;
}

.current-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 5px 8px;
  border-radius: 99px;
  color: #cfe0ff;
  border: 1px solid rgba(100,155,255,.25);
  background: rgba(60,110,255,.12);
  font-family: "DM Mono", monospace;
  font-size: 7px;
  letter-spacing: 1.5px;
  box-shadow: 0 0 20px rgba(60,120,255,.15);
}

/* =========================================================
   PIPELINE
   ========================================================= */

.pipeline {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  align-items: center;
  gap: 10px;
}

.pipeline-item {
  position: relative;
  min-height: 155px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 18px;
  background:
    linear-gradient(
      145deg,
      rgba(255,255,255,.045),
      rgba(255,255,255,.015)
    );
  overflow: hidden;
  transition: .35s ease;
}

.pipeline-item:hover {
  transform: translateY(-7px);
  border-color: rgba(95,150,255,.35);
  box-shadow: 0 20px 55px rgba(0,0,0,.25);
}

.pipeline-number {
  color: #5f8cff;
  font-family: "DM Mono", monospace;
  font-size: 9px;
}

.pipeline-item strong {
  font-size: 14px;
  letter-spacing: 1px;
}

.pipeline-item span {
  color: #6f7b90;
  font-size: 10px;
}

.pipeline-arrow {
  color: #5f8cff;
  font-size: 24px;
  text-shadow: 0 0 18px rgba(80,130,255,.7);
  animation: arrowPulse 1.8s ease-in-out infinite;
}

/* =========================================================
   PROJECTS
   ========================================================= */

.projects {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.project-card {
  position: relative;
  min-height: 350px;
  padding: 34px;
  overflow: hidden;
  cursor: pointer;
  transform-style: preserve-3d;
  transition:
    transform .12s ease,
    border-color .3s,
    box-shadow .3s;
}

.project-card.featured {
  grid-column: 1 / -1;
  min-height: 450px;
}

.project-card::after {
  content: "";
  position: absolute;
  width: 350px;
  height: 350px;
  right: -150px;
  top: -150px;
  border-radius: 50%;
  background:
    radial-gradient(
      circle,
      rgba(60,120,255,.16),
      transparent 68%
    );
  filter: blur(5px);
  transition: .5s ease;
}

.project-card:hover::after {
  transform: scale(1.35);
}

.project-card:hover {
  border-color: rgba(100,155,255,.34);
  box-shadow:
    0 35px 100px rgba(0,0,0,.32),
    0 0 45px rgba(50,100,255,.06);
}

.project-top {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  position: relative;
  z-index: 2;
}

.project-index {
  color: #608cff;
  font-family: "DM Mono", monospace;
  font-size: 9px;
  letter-spacing: 2px;
}

.project-status {
  color: #78849a;
  border: 1px solid rgba(255,255,255,.09);
  padding: 6px 9px;
  border-radius: 99px;
  font-family: "DM Mono", monospace;
  font-size: 7px;
  letter-spacing: 1.5px;
}

.project-card h3 {
  position: relative;
  z-index: 2;
  margin-top: 58px;
  font-size: clamp(29px, 4vw, 58px);
  line-height: .95;
  letter-spacing: -3px;
}

.project-sub {
  position: relative;
  z-index: 2;
  margin-top: 10px;
  color: #72a0ff;
  font-size: 13px;
}

.project-description {
  position: relative;
  z-index: 2;
  max-width: 650px;
  margin-top: 20px;
  color: #858fa3;
  line-height: 1.75;
  font-size: 14px;
}

.tags {
  position: relative;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 23px;
}

.tag {
  padding: 7px 10px;
  color: #aab6cb;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 7px;
  background: rgba(255,255,255,.025);
  font-family: "DM Mono", monospace;
  font-size: 8px;
}

.project-actions {
  position: relative;
  z-index: 5;
  display: flex;
  gap: 9px;
  margin-top: 28px;
}

.small-button {
  border: 1px solid rgba(255,255,255,.1);
  background: rgba(255,255,255,.035);
  color: white;
  border-radius: 9px;
  padding: 10px 14px;
  font-size: 9px;
  font-weight: 800;
  transition: .3s;
}

.small-button:hover {
  border-color: rgba(100,160,255,.4);
  background: rgba(70,120,255,.09);
  transform: translateY(-3px);
}

/* Featured visual */

.featured-visual {
  position: absolute;
  right: 5%;
  top: 50%;
  width: 280px;
  height: 200px;
  transform: translateY(-50%) perspective(900px) rotateY(-15deg) rotateX(5deg);
  border: 1px solid rgba(105,160,255,.18);
  border-radius: 16px;
  background:
    linear-gradient(
      145deg,
      rgba(20,35,65,.8),
      rgba(5,9,18,.9)
    );
  box-shadow:
    -25px 30px 80px rgba(0,0,0,.35),
    0 0 50px rgba(50,110,255,.08);
  overflow: hidden;
}

.dashboard-top {
  height: 34px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 12px;
  border-bottom: 1px solid rgba(255,255,255,.07);
}

.dashboard-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #66748c;
}

.dashboard-grid {
  padding: 14px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
}

.dashboard-box {
  height: 48px;
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 6px;
  background: rgba(255,255,255,.025);
}

.dashboard-chart {
  grid-column: 1 / -1;
  height: 75px;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(
      to top,
      rgba(70,130,255,.06),
      transparent
    );
}

.chart-line {
  position: absolute;
  left: 8%;
  right: 5%;
  bottom: 25%;
  height: 2px;
  background:
    linear-gradient(
      90deg,
      #4f76ff,
      #60dfff,
      #9a73ff
    );
  transform: rotate(-5deg);
  box-shadow:
    0 0 10px rgba(80,150,255,.7);
  animation: chartMove 2.5s ease-in-out infinite;
}

/* =========================================================
   BUILDING
   ========================================================= */

.building {
  padding: 55px;
  text-align: center;
  overflow: hidden;
}

.building-core {
  position: absolute;
  width: 250px;
  height: 250px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background:
    radial-gradient(
      circle,
      rgba(80,130,255,.12),
      transparent 68%
    );
  filter: blur(12px);
}

.building h3 {
  position: relative;
  font-size: clamp(30px, 5vw, 48px);
  letter-spacing: -2px;
}

.building p {
  position: relative;
  max-width: 650px;
  margin: 16px auto 0;
  color: #818ca0;
  line-height: 1.8;
  font-size: 14px;
}

.building-line {
  position: relative;
  width: min(600px, 80%);
  height: 1px;
  margin: 32px auto 0;
  background:
    linear-gradient(
      90deg,
      transparent,
      #5c8cff,
      #5ee8ff,
      #9b70ff,
      transparent
    );
  box-shadow:
    0 0 20px rgba(80,130,255,.55);
  animation: buildingPulse 2.5s ease-in-out infinite;
}

/* =========================================================
   CONTACT
   ========================================================= */

.contact-grid {
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  gap: 20px;
}

.contact-card {
  padding: 40px;
}

.contact-card h3 {
  font-size: 32px;
  letter-spacing: -1.5px;
}

.contact-card > p {
  margin-top: 17px;
  color: #828da1;
  line-height: 1.8;
  font-size: 14px;
}

.socials {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 28px;
}

.social {
  padding: 10px 13px;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 9px;
  color: #aeb9cb;
  font-size: 9px;
  transition: .3s;
}

.social:hover {
  color: white;
  border-color: rgba(100,155,255,.4);
  background: rgba(70,120,255,.07);
  transform: translateY(-3px);
}

.contact-form {
  display: grid;
  gap: 12px;
}

.input,
.textarea {
  width: 100%;
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(0,0,0,.22);
  color: white;
  border-radius: 10px;
  padding: 15px;
  outline: none;
  transition: .25s;
}

.input::placeholder,
.textarea::placeholder {
  color: #5e687b;
}

.input:focus,
.textarea:focus {
  border-color: rgba(90,145,255,.6);
  box-shadow:
    0 0 25px rgba(50,110,255,.09),
    inset 0 0 15px rgba(50,100,255,.03);
}

.textarea {
  min-height: 155px;
  resize: vertical;
}

/* =========================================================
   FOOTER
   ========================================================= */

.footer {
  position: relative;
  z-index: 4;
  padding: 45px 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  border-top: 1px solid rgba(255,255,255,.06);
  color: #596477;
  font-family: "DM Mono", monospace;
  font-size: 8px;
  letter-spacing: 1px;
}

/* =========================================================
   MODAL
   ========================================================= */

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(0,0,0,.78);
  backdrop-filter: blur(18px);
  animation: fadeIn .2s ease;
}

.modal {
  width: min(900px, 100%);
  max-height: 88vh;
  overflow-y: auto;
  padding: 40px;
  animation: modalIn .4s cubic-bezier(.2,.8,.2,1);
}

.close-button {
  position: absolute;
  top: 17px;
  right: 17px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.1);
  color: white;
  background: rgba(255,255,255,.04);
  transition: .3s;
}

.close-button:hover {
  transform: rotate(90deg);
  border-color: rgba(100,155,255,.5);
  background: rgba(70,120,255,.1);
}

.modal h2 {
  font-size: clamp(38px, 6vw, 70px);
  letter-spacing: -4px;
}

.modal h4 {
  margin-top: 32px;
  color: #6595ff;
  font-family: "DM Mono", monospace;
  font-size: 9px;
  letter-spacing: 2px;
}

.modal p {
  margin-top: 10px;
  color: #919caf;
  line-height: 1.8;
  font-size: 14px;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 15px;
}

.feature {
  padding: 12px;
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 9px;
  color: #a8b4c7;
  font-size: 11px;
  background: rgba(255,255,255,.018);
}

.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

/* =========================================================
   ANIMATIONS
   ========================================================= */

@keyframes blink {
  50% { opacity: .35; transform: scale(.8); }
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

@keyframes buttonSweep {
  to { transform: rotate(360deg); }
}

@keyframes sceneFloat {
  50% { transform: translateY(-12px) rotateX(2deg) rotateY(-2deg); }
}

@keyframes haloPulse {
  50% { transform: translateZ(-100px) scale(1.1); opacity: .7; }
}

@keyframes corePulse {
  50% {
    transform:
      translate(-50%, -50%)
      translateZ(95px)
      scale(1.05);
    box-shadow:
      0 0 35px rgba(80,160,255,.9),
      0 0 100px rgba(60,110,255,.5),
      0 0 170px rgba(80,80,255,.3),
      inset -20px -25px 45px rgba(0,0,0,.5);
  }
}

@keyframes orbitOne {
  to {
    transform:
      rotateX(68deg)
      rotateZ(378deg);
  }
}

@keyframes orbitTwo {
  to {
    transform:
      rotateX(62deg)
      rotateZ(-395deg);
  }
}

@keyframes orbitThree {
  to {
    transform:
      rotateY(67deg)
      rotateZ(372deg);
  }
}

@keyframes labelFloat {
  50% { transform: translateY(-8px); }
}

@keyframes skillFloat {
  50% { margin-top: -7px; }
}

@keyframes arrowPulse {
  50% { transform: translateX(5px); opacity: .5; }
}

@keyframes chartMove {
  50% {
    transform: rotate(3deg) translateY(-7px);
  }
}

@keyframes buildingPulse {
  50% {
    opacity: .3;
    transform: scaleX(.8);
  }
}

@keyframes glassShine {
  0% { background-position: 200% 0; }
  45%,100% { background-position: -100% 0; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(.96) rotateX(5deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1) rotateX(0);
  }
}

/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1050px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    min-height: 500px;
  }

  .hero-copy {
    text-align: center;
  }

  .eyebrow {
    justify-content: center;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .about-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .journey {
    grid-template-columns: repeat(2, 1fr);
  }

  .featured-visual {
    opacity: .35;
    right: 3%;
  }
}

@media (max-width: 800px) {
  .navbar {
    height: 68px;
  }

  .menu-btn {
    display: block;
  }

  .nav-links {
    position: absolute;
    display: none;
    top: 76px;
    left: 15px;
    right: 15px;
    padding: 18px;
    flex-direction: column;
    align-items: stretch;
    gap: 5px;
    border: 1px solid rgba(255,255,255,.09);
    border-radius: 16px;
    background: rgba(5,8,15,.96);
    backdrop-filter: blur(25px);
    box-shadow: 0 25px 70px rgba(0,0,0,.45);
  }

  .nav-links.open {
    display: flex;
  }

  .nav-link {
    padding: 13px;
    text-align: left;
  }

  section:not(.hero) {
    padding: 95px 5%;
  }

  .hero {
    padding: 120px 5% 70px;
  }

  .hero-title {
    font-size: clamp(52px, 17vw, 90px);
    letter-spacing: -5px;
  }

  .hero-visual {
    min-height: 430px;
  }

  .ai-scene {
    transform: scale(.78);
  }

  .skills-box {
    min-height: 500px;
  }

  .skill-center {
    width: 135px;
    height: 135px;
  }

  .skill-node {
    font-size: 8px;
    padding: 9px 11px;
  }

  .projects {
    grid-template-columns: 1fr;
  }

  .project-card.featured {
    grid-column: auto;
  }

  .featured-visual {
    display: none;
  }

  .pipeline {
    grid-template-columns: 1fr;
  }

  .pipeline-arrow {
    transform: rotate(90deg);
    justify-self: center;
  }
}

@media (max-width: 600px) {
  .hero-description {
    font-size: 15px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .button {
    width: 100%;
  }

  .hero-visual {
    min-height: 350px;
  }

  .ai-scene {
    transform: scale(.6);
  }

  .journey {
    grid-template-columns: 1fr;
  }

  .about-card,
  .contact-card,
  .building,
  .modal {
    padding: 26px;
  }

  .section-head h2 {
    letter-spacing: -3px;
  }

  .project-card {
    padding: 25px;
  }

  .project-card h3 {
    margin-top: 45px;
  }

  .feature-list {
    grid-template-columns: 1fr;
  }

  .modal-actions {
    flex-direction: column;
  }

  .footer {
    padding: 35px 5%;
  }

  .cursor-light {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
`;

/* =========================================================
   LIVE 3D STAR / PARTICLE ENGINE
   ========================================================= */

function ParticleBackground({ mouse }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let width = 0;
    let height = 0;
    let stars = [];
    let shootingStars = [];

    const isMobile = window.innerWidth < 700;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = isMobile
        ? 100
        : Math.min(260, Math.max(150, Math.floor(width / 5)));

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        size: Math.random() * 1.6 + .25,
        speed: Math.random() * .55 + .08,
        twinkle: Math.random() * Math.PI * 2,
        hue: Math.random() > .82 ? "cyan" : "white",
      }));
    };

    const createShootingStar = () => {
      if (Math.random() > .018) return;

      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * height * .45,
        vx: -(Math.random() * 7 + 5),
        vy: Math.random() * 4 + 2,
        life: 0,
        maxLife: Math.random() * 35 + 35,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      /* Stars */
      stars.forEach((star) => {
        star.twinkle += .025;

        const pulse = .65 + Math.sin(star.twinkle) * .35;

        /* 3D parallax based on mouse */
        const depth = .25 + star.z * .85;

        let x =
          star.x +
          (mouse.x - width / 2) * .018 * depth;

        let y =
          star.y +
          (mouse.y - height / 2) * .012 * depth;

        if (x < -20) x = width + 20;
        if (x > width + 20) x = -20;
        if (y < -20) y = height + 20;
        if (y > height + 20) y = -20;

        star.x += Math.sin(star.twinkle * .2) * .015;
        star.y -= star.speed * (.35 + star.z);

        if (star.y < -10) {
          star.y = height + 10;
          star.x = Math.random() * width;
        }

        const size = star.size * (.5 + star.z * 1.5);

        if (star.hue === "cyan") {
          ctx.fillStyle = `rgba(100,220,255,${pulse * .75})`;
        } else {
          ctx.fillStyle = `rgba(210,225,255,${pulse * (.3 + star.z * .45)})`;
        }

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        /* Tiny glow for deeper stars */
        if (star.z > .78 && size > 1.2) {
          ctx.beginPath();
          ctx.arc(x, y, size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle =
            star.hue === "cyan"
              ? "rgba(80,210,255,.035)"
              : "rgba(150,190,255,.025)";
          ctx.fill();
        }
      });

      /* Connect nearby stars */
      if (!isMobile) {
        for (let i = 0; i < stars.length; i++) {
          const a = stars[i];

          for (let j = i + 1; j < stars.length; j++) {
            const b = stars[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 105 && a.z > .35 && b.z > .35) {
              const alpha =
                (1 - distance / 105) *
                Math.min(a.z, b.z) *
                .12;

              ctx.strokeStyle = `rgba(90,140,255,${alpha})`;
              ctx.lineWidth = .45;

              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      /* Mouse particle field */
      const mx = mouse.x;
      const my = mouse.y;

      if (mx > 0 && my > 0) {
        stars.forEach((star) => {
          const dx = mx - star.x;
          const dy = my - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 135) {
            const strength = (1 - distance / 135) * .018;

            star.x -= dx * strength;
            star.y -= dy * strength;

            ctx.strokeStyle = `rgba(90,170,255,${
              (1 - distance / 135) * .22
            })`;

            ctx.lineWidth = .6;

            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        });
      }

      /* Shooting stars */
      createShootingStar();

      shootingStars = shootingStars.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;

        const alpha = 1 - s.life / s.maxLife;

        const gradient = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.vx * 5,
          s.y - s.vy * 5
        );

        gradient.addColorStop(0, `rgba(120,220,255,${alpha})`);
        gradient.addColorStop(1, "rgba(120,180,255,0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.3;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - s.vx * 7,
          s.y - s.vy * 7
        );
        ctx.stroke();

        return s.life < s.maxLife;
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [mouse]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  );
}

/* =========================================================
   APP
   ========================================================= */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const heroRef = useRef(null);
  const sceneRef = useRef(null);

  /* ---------- Mouse ---------- */

  useEffect(() => {
    const move = (event) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });

      if (!sceneRef.current) return;

      const x =
        (event.clientX / window.innerWidth - .5) * 10;

      const y =
        (event.clientY / window.innerHeight - .5) * -10;

      sceneRef.current.style.transform =
        `rotateX(${y}deg) rotateY(${x}deg)`;
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  /* ---------- Scroll ---------- */

  useEffect(() => {
    const scroll = () => {
      const max =
        document.documentElement.scrollHeight -
        window.innerHeight;

      setScrollProgress(
        max > 0
          ? (window.scrollY / max) * 100
          : 0
      );
    };

    scroll();

    window.addEventListener("scroll", scroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  /* ---------- Modal ---------- */

  useEffect(() => {
    document.body.style.overflow =
      activeProject ? "hidden" : "";

    const escape = (event) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    window.addEventListener("keydown", escape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", escape);
    };
  }, [activeProject]);

  /* ---------- Inject CSS ---------- */

  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute(
      "data-aryan-portfolio",
      "true"
    );
    style.textContent = globalCSS;

    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  /* ---------- Navigation ---------- */

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    setMenuOpen(false);
  };

  /* ---------- Project tilt ---------- */

  const handleProjectMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width;

    const y =
      (event.clientY - rect.top) / rect.height;

    const rotateY = (x - .5) * 10;
    const rotateX = (y - .5) * -10;

    card.style.transform =
      `perspective(1000px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-7px)
       scale(1.01)`;
  };

  const resetProject = (event) => {
    event.currentTarget.style.transform =
      "";
  };

  /* ---------- Contact ---------- */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (EMAIL === "YOUR_REAL_EMAIL") {
      alert(
        "Please add your real email address in App.jsx first."
      );
      return;
    }

    const subject = encodeURIComponent(
      `Portfolio Contact from ${form.name}`
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href =
      `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="portfolio">
      <ParticleBackground mouse={mouse} />

      <div
        className="ambient-grid"
        aria-hidden="true"
      />

      <div
        className="cursor-light"
        style={{
          left: mouse.x,
          top: mouse.y,
        }}
        aria-hidden="true"
      />

      <div className="scroll-progress">
        <span
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      <div className="content">

        {/* =====================================================
            NAV
            ===================================================== */}

        <nav className="navbar">
          <button
            className="logo"
            onClick={() =>
              scrollToSection("home")
            }
            style={{
              background: "none",
              border: 0,
              color: "white",
            }}
          >
            ARYAN<span className="logo-dot">.</span>
          </button>

          <div
            className={`nav-links ${
              menuOpen ? "open" : ""
            }`}
          >
            <button
              className="nav-link"
              onClick={() =>
                scrollToSection("work")
              }
            >
              WORK
            </button>

            <button
              className="nav-link"
              onClick={() =>
                scrollToSection("skills")
              }
            >
              SKILLS
            </button>

            <button
              className="nav-link"
              onClick={() =>
                scrollToSection("journey")
              }
            >
              JOURNEY
            </button>

            <button
              className="nav-link"
              onClick={() =>
                scrollToSection("contact")
              }
            >
              CONTACT
            </button>

            <a
              className="nav-link github-nav"
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
            >
              GITHUB ↗
            </a>
          </div>

          <button
            className="menu-btn"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            aria-label="Toggle navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>

        <main>

          {/* =====================================================
              HERO
              ===================================================== */}

          <section
            className="hero"
            id="home"
            ref={heroRef}
          >
            <div className="hero-grid">

              <div className="hero-copy">

                <div className="eyebrow">
                  <span className="eyebrow-dot" />
                  DATA × AI × ENGINEERING
                </div>

                <h1 className="hero-title">
                  <span className="line">
                    HI, I'M
                  </span>

                  <span className="line gradient">
                    ARYAN.
                  </span>
                </h1>

                <p className="hero-description">
                  I turn{" "}
                  <strong>
                    data into insight
                  </strong>{" "}
                  and ideas into{" "}
                  <strong>
                    intelligent systems.
                  </strong>
                  <br />
                  Aspiring Data Analyst & AI/ML
                  Engineer — learning, building and
                  experimenting every day.
                </p>

                <div className="hero-actions">

                  <button
                    className="button button-primary"
                    onClick={() =>
                      scrollToSection("work")
                    }
                  >
                    EXPLORE MY WORK
                    <span className="button-icon">
                      ↓
                    </span>
                  </button>

                  <button
                    className="button button-secondary"
                    onClick={() =>
                      scrollToSection("contact")
                    }
                  >
                    LET'S CONNECT
                    <span className="button-icon">
                      ↗
                    </span>
                  </button>

                </div>

              </div>

              {/* 3D VISUAL */}

              <div className="hero-visual">

                <div
                  className="ai-scene"
                  ref={sceneRef}
                >

                  <div className="ai-halo" />

                  <div className="orbit orbit-1">
                    <span className="orbit-dot" />
                  </div>

                  <div className="orbit orbit-2">
                    <span className="orbit-dot violet" />
                  </div>

                  <div className="orbit orbit-3">
                    <span className="orbit-dot blue" />
                  </div>

                  <div className="ai-core" />

                  <div className="data-label label-1">
                    PYTHON / DATA
                  </div>

                  <div className="data-label label-2">
                    SQL / ANALYTICS
                  </div>

                  <div className="data-label label-3">
                    ML / MODELS
                  </div>

                  <div className="data-label label-4">
                    AI / SYSTEMS
                  </div>

                  <div className="ai-status">
                    <span className="status-live" />
                    SYSTEM ONLINE · BUILDING
                  </div>

                </div>

              </div>

            </div>
          </section>

          {/* =====================================================
              ABOUT
              ===================================================== */}

          <section id="about">

            <div className="section-head">
              <div className="section-number">
                01 / ABOUT
              </div>

              <h2>
                WHERE DATA
                <br />
                MEETS AI.
              </h2>

              <p>
                A student building a bridge
                between analytics, automation
                and artificial intelligence.
              </p>
            </div>

            <div className="about-grid">

              <div className="glass about-card">

                <p>
                  I'm Aryan Vishwakarma,
                  currently pursuing a Bachelor
                  in Information Technology and
                  building my skills across Data
                  Analytics and AI/ML.
                </p>

                <p>
                  My focus is practical:
                  understand the problem, work
                  with the data, build the system
                  and turn the result into
                  something useful.
                </p>

              </div>

              <div className="glass direction-card">

                <div className="direction-orb" />

                <div className="direction-label">
                  CURRENT DIRECTION
                </div>

                <div className="direction-main">
                  AI
                </div>

                <div className="direction-label">
                  DATA ANALYTICS
                  <br />
                  ↓
                  <br />
                  MACHINE LEARNING
                  <br />
                  ↓
                  <br />
                  AI ENGINEERING
                </div>

              </div>

            </div>
          </section>

          {/* =====================================================
              SKILLS
              ===================================================== */}

          <section id="skills">

            <div className="section-head">
              <div className="section-number">
                02 / SKILL UNIVERSE
              </div>

              <h2>
                MY TECH
                <br />
                UNIVERSE.
              </h2>

              <p>
                Explore the technologies
                surrounding my current learning
                path.
              </p>
            </div>

            <div className="glass skills-box">

              <div className="skill-lines">
                {skills.map((skill) => {
                  const dx =
                    skill.x - 50;
                  const dy =
                    skill.y - 50;

                  const angle =
                    Math.atan2(dy, dx) *
                    (180 / Math.PI);

                  const distance =
                    Math.sqrt(
                      dx * dx + dy * dy
                    );

                  return (
                    <div
                      key={`line-${skill.name}`}
                      className="skill-line"
                      style={{
                        transform:
                          `rotate(${angle}deg)`,
                        width:
                          `${distance}%`,
                      }}
                    />
                  );
                })}
              </div>

              <div className="skill-center">
                <div>
                  <strong>
                    {activeSkill
                      ? activeSkill.name
                      : "ARYAN"}
                  </strong>

                  <small>
                    {activeSkill
                      ? activeSkill.category
                      : "DATA × AI"}
                  </small>
                </div>
              </div>

              {skills.map((skill, index) => (
                <button
                  key={skill.name}
                  className={`skill-node ${
                    activeSkill?.name ===
                    skill.name
                      ? "active"
                      : ""
                  }`}
                  style={{
                    left: `${skill.x}%`,
                    top: `${skill.y}%`,
                    animationDelay:
                      `${index * -.45}s`,
                  }}
                  onMouseEnter={() =>
                    setActiveSkill(skill)
                  }
                  onMouseLeave={() =>
                    setActiveSkill(null)
                  }
                  onClick={() =>
                    setActiveSkill(
                      activeSkill?.name ===
                        skill.name
                        ? null
                        : skill
                    )
                  }
                >
                  {skill.name}
                </button>
              ))}

            </div>
          </section>

          {/* =====================================================
              JOURNEY
              ===================================================== */}

          <section id="journey">

            <div className="section-head">
              <div className="section-number">
                03 / JOURNEY
              </div>

              <h2>
                THE ROAD
                <br />
                AHEAD.
              </h2>
            </div>

            <div className="journey">

              <div className="glass journey-card">
                <div className="journey-number">
                  01
                </div>

                <h3>Foundations</h3>

                <p>
                  Python, programming logic,
                  Git, VS Code and core
                  development concepts.
                </p>
              </div>

              <div className="glass journey-card current">

                <span className="current-badge">
                  CURRENT
                </span>

                <div className="journey-number">
                  02
                </div>

                <h3>Data Analytics</h3>

                <p>
                  SQL, Excel, Power BI, Tableau,
                  visualization and business
                  analysis.
                </p>
              </div>

              <div className="glass journey-card">

                <div className="journey-number">
                  03
                </div>

                <h3>Machine Learning</h3>

                <p>
                  Statistics, NumPy, Pandas,
                  Scikit-learn and practical
                  ML projects.
                </p>
              </div>

              <div className="glass journey-card">

                <div className="journey-number">
                  04
                </div>

                <h3>AI Engineering</h3>

                <p>
                  LLMs, RAG, APIs, AI
                  applications, deployment and
                  intelligent systems.
                </p>
              </div>

            </div>
          </section>

          {/* =====================================================
              PIPELINE
              ===================================================== */}

          <section id="pipeline">

            <div className="section-head">
              <div className="section-number">
                04 / THINKING SYSTEM
              </div>

              <h2>
                DATA →
                <br />
                INTELLIGENCE.
              </h2>
            </div>

            <div className="pipeline">

              {[
                ["01", "DATA", "Raw information"],
                [
                  "02",
                  "ANALYSIS",
                  "Patterns & metrics",
                ],
                [
                  "03",
                  "INSIGHTS",
                  "Business meaning",
                ],
                [
                  "04",
                  "AI",
                  "Intelligent systems",
                ],
              ].map((item, index) => (
                <div
                  key={item[1]}
                  style={{
                    display: "contents",
                  }}
                >
                  <div className="pipeline-item">
                    <div className="pipeline-number">
                      {item[0]}
                    </div>

                    <strong>
                      {item[1]}
                    </strong>

                    <span>
                      {item[2]}
                    </span>
                  </div>

                  {index < 3 && (
                    <div className="pipeline-arrow">
                      →
                    </div>
                  )}
                </div>
              ))}

            </div>
          </section>

          {/* =====================================================
              PROJECTS
              ===================================================== */}

          <section id="work">

            <div className="section-head">
              <div className="section-number">
                05 / SELECTED WORK
              </div>

              <h2>
                THINGS I'M
                <br />
                BUILDING.
              </h2>

              <p>
                Projects focused on analytics,
                automation and the intersection
                of data and AI.
              </p>
            </div>

            <div className="projects">

              {projects.map(
                (project, index) => (
                  <article
                    key={project.id}
                    className={`glass project-card ${
                      project.featured
                        ? "featured"
                        : ""
                    }`}
                    onMouseMove={
                      handleProjectMove
                    }
                    onMouseLeave={
                      resetProject
                    }
                    onClick={() =>
                      setActiveProject(project)
                    }
                  >

                    <div className="project-top">

                      <div className="project-index">
                        PROJECT / 0
                        {index + 1}
                      </div>

                      <div className="project-status">
                        {project.status}
                      </div>

                    </div>

                    <h3>
                      {project.title}
                    </h3>

                    <div className="project-sub">
                      {project.subtitle}
                    </div>

                    <p className="project-description">
                      {project.description}
                    </p>

                    <div className="tags">
                      {project.tags.map(
                        (tag) => (
                          <span
                            className="tag"
                            key={tag}
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>

                    <div className="project-actions">

                      <button
                        className="small-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setActiveProject(
                            project
                          );
                        }}
                      >
                        VIEW PROJECT →
                      </button>

                      <a
                        className="small-button"
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                      >
                        GITHUB ↗
                      </a>

                    </div>

                    {project.featured && (
                      <div className="featured-visual">

                        <div className="dashboard-top">
                          <span className="dashboard-dot" />
                          <span className="dashboard-dot" />
                          <span className="dashboard-dot" />
                        </div>

                        <div className="dashboard-grid">

                          <div className="dashboard-box" />
                          <div className="dashboard-box" />
                          <div className="dashboard-box" />

                          <div className="dashboard-box dashboard-chart">
                            <div className="chart-line" />
                          </div>

                        </div>

                      </div>
                    )}

                  </article>
                )
              )}

            </div>
          </section>

          {/* =====================================================
              CURRENTLY BUILDING
              ===================================================== */}

          <section>

            <div className="glass building">

              <div className="building-core" />

              <div className="section-number">
                06 / CURRENTLY BUILDING
              </div>

              <h3>
                AI + DATA TOOLING
              </h3>

              <p>
                Exploring intelligent
                applications that combine data
                analysis, automation, APIs and
                AI models into useful products.
              </p>

              <div className="building-line" />

            </div>
          </section>

          {/* =====================================================
              CONTACT
              ===================================================== */}

          <section id="contact">

            <div className="section-head">

              <div className="section-number">
                07 / CONTACT
              </div>

              <h2>
                LET'S BUILD
                <br />
                SOMETHING.
              </h2>

              <p>
                Have an idea, project or
                opportunity? Send a message.
              </p>

            </div>

            <div className="contact-grid">

              <div className="glass contact-card">

                <h3>
                  Connect.
                </h3>

                <p>
                  I'm interested in learning,
                  building projects and
                  connecting with people working
                  around data, AI and technology.
                </p>

                <div className="socials">

                  <a
                    className="social"
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub ↗
                  </a>

                  <a
                    className="social"
                    href={
                      LINKEDIN_URL ===
                      "YOUR_LINKEDIN_URL"
                        ? "#"
                        : LINKEDIN_URL
                    }
                    target={
                      LINKEDIN_URL ===
                      "YOUR_LINKEDIN_URL"
                        ? undefined
                        : "_blank"
                    }
                    rel="noreferrer"
                    onClick={(event) => {
                      if (
                        LINKEDIN_URL ===
                        "YOUR_LINKEDIN_URL"
                      ) {
                        event.preventDefault();

                        alert(
                          "Add your LinkedIn URL in App.jsx."
                        );
                      }
                    }}
                  >
                    LinkedIn ↗
                  </a>

                </div>

              </div>

              <div className="glass contact-card">

                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                >

                  <input
                    className="input"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name:
                          event.target.value,
                      })
                    }
                  />

                  <input
                    className="input"
                    type="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        email:
                          event.target.value,
                      })
                    }
                  />

                  <textarea
                    className="textarea"
                    placeholder="Tell me about your idea..."
                    value={form.message}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        message:
                          event.target.value,
                      })
                    }
                  />

                  <button
                    className="button button-primary"
                    type="submit"
                  >
                    SEND MESSAGE
                    <span className="button-icon">
                      →
                    </span>
                  </button>

                </form>

              </div>

            </div>
          </section>

        </main>

        {/* =====================================================
            FOOTER
            ===================================================== */}

        <footer className="footer">

          <div>
            © 2026 ARYAN VISHWAKARMA
          </div>

          <div>
            DATA × AI × BUILD
          </div>

          <button
            onClick={() =>
              scrollToSection("home")
            }
            style={{
              border: 0,
              background: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            BACK TO TOP ↑
          </button>

        </footer>

      </div>

      {/* =======================================================
          PROJECT MODAL
          ======================================================= */}

      {activeProject && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setActiveProject(null)
          }
        >

          <div
            className="glass modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="close-button"
              onClick={() =>
                setActiveProject(null)
              }
              aria-label="Close project"
            >
              ✕
            </button>

            <div className="section-number">
              PROJECT DETAILS
            </div>

            <h2>
              {activeProject.title}
            </h2>

            <div className="project-sub">
              {activeProject.subtitle}
            </div>

            <div className="tags">
              {activeProject.tags.map(
                (tag) => (
                  <span
                    className="tag"
                    key={tag}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <h4>
              THE PROBLEM
            </h4>

            <p>
              {activeProject.problem}
            </p>

            <h4>
              THE APPROACH
            </h4>

            <p>
              {activeProject.approach}
            </p>

            <h4>
              FEATURES
            </h4>

            <div className="feature-list">
              {activeProject.features.map(
                (feature) => (
                  <div
                    className="feature"
                    key={feature}
                  >
                    ✓ {feature}
                  </div>
                )
              )}
            </div>

            <div className="modal-actions">

              <a
                href={activeProject.github}
                target="_blank"
                rel="noreferrer"
                className="button button-primary"
              >
                VIEW GITHUB ↗
              </a>

              {activeProject.demo ? (
                <a
                  href={activeProject.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="button button-secondary"
                >
                  LIVE DEMO ↗
                </a>
              ) : (
                <button
                  className="button button-secondary"
                  onClick={() =>
                    alert(
                      "Live demo coming soon."
                    )
                  }
                >
                  LIVE DEMO — COMING SOON
                </button>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;