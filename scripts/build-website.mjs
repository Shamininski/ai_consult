import fs from 'fs';
import path from 'path';

// ─── Embed logos as base64 ───
const logoLight = fs.readFileSync(path.resolve('brand/logo/malon-logo-light-bg.jpg'), 'base64');
const logoPrimary = fs.readFileSync(path.resolve('brand/logo/malon-logo-primary.jpeg'), 'base64');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Malon Labs Ltd — A Tanzanian technology company offering Software Development, Managed IT Services, and AI & IT Consulting. We build, manage, and optimize technology so you can focus on your business.">
  <meta name="theme-color" content="#1E2637">
  <title>Malon Labs — Software Development | Managed IT | AI Consulting | Tanzania</title>

  <!-- Preload critical resources -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Viga&family=Poppins:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

  <style>
    /* ═══ CRITICAL CSS — inlined for FCP ═══ */
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --navy: #1E2637; --deep-navy: #141C2B; --green: #1A8F6E; --green-light: #22b589;
      --amber: #F5A623; --blue: #3B82F6; --purple: #8B5CF6;
      --charcoal: #2D3748; --slate: #718096; --soft-gray: #E8EDF3;
      --ice: #F7F9FC; --white: #FFFFFF;
      --shadow: 0 4px 24px rgba(30,38,55,0.10); --shadow-lg: 0 8px 40px rgba(30,38,55,0.15);
      --radius: 12px; --radius-sm: 8px;
    }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: var(--charcoal); line-height: 1.65; font-size: 16px; background: var(--ice);
      -webkit-font-smoothing: antialiased; overflow-x: hidden;
    }
    .brand-name { font-family: 'Viga', 'Arial Black', Impact, sans-serif; }
    h1,h2,h3,h4 { font-family: 'Poppins', sans-serif; line-height: 1.25; }
    a { color: var(--green); text-decoration: none; transition: color .2s; }
    a:hover { color: var(--green-light); }
    img { max-width: 100%; height: auto; }
    .container { max-width: 1140px; margin: 0 auto; padding: 0 24px; }

    /* ─── Animations ─── */
    .fade-up { opacity: 0; transform: translateY(30px); transition: opacity .6s ease, transform .6s ease; }
    .fade-up.visible { opacity: 1; transform: translateY(0); }
    .fade-left { opacity: 0; transform: translateX(-30px); transition: opacity .6s ease, transform .6s ease; }
    .fade-left.visible { opacity: 1; transform: translateX(0); }
    .fade-right { opacity: 0; transform: translateX(30px); transition: opacity .6s ease, transform .6s ease; }
    .fade-right.visible { opacity: 1; transform: translateX(0); }
    @media (prefers-reduced-motion: reduce) {
      .fade-up, .fade-left, .fade-right { opacity: 1; transform: none; transition: none; }
      .hero-canvas { display: none !important; }
      .parallax-bg { transform: none !important; }
    }

    /* ─── Nav ─── */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: rgba(30,38,55,0.92); backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255,255,255,0.05); transition: box-shadow .3s;
    }
    .nav.scrolled { box-shadow: 0 2px 24px rgba(0,0,0,0.25); }
    .nav-inner {
      display: flex; align-items: center; justify-content: space-between;
      max-width: 1140px; margin: 0 auto; padding: 0 24px; height: 68px;
    }
    .nav-logo { display: flex; align-items: center; gap: 10px; }
    .nav-logo img { width: 40px; height: 40px; border-radius: 6px; }
    .nav-logo-text { color: var(--white); font-size: 20px; }
    .nav-links { display: flex; gap: 24px; align-items: center; }
    .nav-links a { color: rgba(255,255,255,0.75); font-size: 14px; font-weight: 500; transition: color .2s; }
    .nav-links a:hover { color: var(--white); }
    .nav-cta {
      background: var(--green); color: var(--white) !important; padding: 8px 20px;
      border-radius: 6px; font-weight: 600; font-size: 13px; transition: background .2s, transform .2s;
    }
    .nav-cta:hover { background: var(--green-light); transform: translateY(-1px); }
    .nav-toggle { display: none; background: none; border: none; cursor: pointer; padding: 8px; }
    .nav-toggle span { display: block; width: 22px; height: 2px; background: var(--white); margin: 5px 0; transition: transform .3s, opacity .3s; }

    /* ─── Hero ─── */
    .hero {
      position: relative; min-height: 100vh; display: flex; align-items: center;
      background: linear-gradient(135deg, var(--navy) 0%, var(--deep-navy) 100%);
      overflow: hidden;
    }
    .hero-canvas {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      z-index: 1; opacity: 0; transition: opacity 1.5s ease;
    }
    .hero-canvas.loaded { opacity: 1; }
    .hero-overlay {
      position: absolute; inset: 0; z-index: 2;
      background: radial-gradient(ellipse at 30% 50%, rgba(20,28,43,0.4) 0%, rgba(20,28,43,0.85) 70%);
    }
    .hero-content {
      position: relative; z-index: 3; text-align: center; max-width: 820px;
      margin: 0 auto; padding: 120px 24px 80px;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(26,143,110,0.12); border: 1px solid rgba(26,143,110,0.25);
      padding: 6px 18px; border-radius: 20px; font-size: 13px; color: var(--green);
      font-weight: 500; margin-bottom: 24px;
    }
    .hero-badge::before { content: ''; width: 6px; height: 6px; background: var(--green); border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{ opacity:1; } 50%{ opacity:.4; } }
    .hero h1 { font-size: clamp(32px, 5vw, 56px); font-weight: 700; color: var(--white); margin-bottom: 20px; }
    .hero h1 .accent { color: var(--green); }
    .hero h1 .accent-amber { color: var(--amber); }
    .hero-sub { font-size: 18px; color: rgba(255,255,255,0.65); line-height: 1.7; margin-bottom: 36px; max-width: 640px; margin-left: auto; margin-right: auto; }
    .hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

    /* ─── Buttons ─── */
    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;
      cursor: pointer; border: none; transition: transform .2s, box-shadow .2s, background .2s;
    }
    .btn:hover { transform: translateY(-2px); }
    .btn-primary { background: var(--green); color: var(--white); box-shadow: 0 4px 16px rgba(26,143,110,.3); }
    .btn-primary:hover { background: var(--green-light); color: var(--white); box-shadow: 0 6px 24px rgba(26,143,110,.4); }
    .btn-outline { background: transparent; color: var(--white); border: 2px solid rgba(255,255,255,.2); }
    .btn-outline:hover { border-color: var(--white); color: var(--white); }
    .btn-whatsapp { background: #25D366; color: var(--white); }
    .btn-whatsapp:hover { background: #20bd5a; color: var(--white); }
    .btn-amber { background: var(--amber); color: var(--navy); }
    .btn-amber:hover { background: #e69a1e; color: var(--navy); }

    /* ─── Sections ─── */
    .section { padding: 90px 0; position: relative; }
    .section-dark { background: var(--navy); color: var(--white); }
    .section-deep { background: var(--deep-navy); color: var(--white); }
    .section-light { background: var(--ice); }
    .section-white { background: var(--white); }
    .section-header { text-align: center; max-width: 700px; margin: 0 auto 52px; }
    .section-header h2 { font-size: clamp(26px,4vw,38px); font-weight: 700; margin-bottom: 12px; }
    .section-header p { font-size: 17px; color: var(--slate); }
    .section-dark .section-header p,
    .section-deep .section-header p { color: var(--soft-gray); }

    /* ─── Stats ─── */
    .stats-bar { background: var(--white); border-bottom: 1px solid var(--soft-gray); padding: 44px 0; }
    .stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 32px; text-align: center; }
    .stat-num { font-family: 'Poppins',sans-serif; font-size: 38px; font-weight: 700; color: var(--green); line-height: 1; }
    .stat-label { font-size: 14px; color: var(--slate); margin-top: 6px; }

    /* ─── Service Pillars ─── */
    .pillars-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }
    .pillar-card {
      background: var(--white); border-radius: var(--radius); overflow: hidden;
      box-shadow: var(--shadow); border: 1px solid var(--soft-gray);
      transition: transform .3s, box-shadow .3s; position: relative;
    }
    .pillar-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
    .pillar-accent { height: 4px; }
    .pillar-body { padding: 32px 28px; }
    .pillar-icon {
      width: 56px; height: 56px; border-radius: 12px; display: flex;
      align-items: center; justify-content: center; font-size: 26px; margin-bottom: 18px;
    }
    .pillar-card h3 { font-size: 20px; font-weight: 600; color: var(--navy); margin-bottom: 10px; }
    .pillar-card p { font-size: 14px; color: var(--slate); line-height: 1.65; margin-bottom: 16px; }
    .pillar-features { list-style: none; margin-bottom: 20px; }
    .pillar-features li {
      font-size: 13px; color: var(--charcoal); padding: 4px 0 4px 20px; position: relative;
    }
    .pillar-features li::before { content: '✓'; position: absolute; left: 0; font-weight: 700; }
    .pillar-link { font-size: 14px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; }
    .pillar-link::after { content: '→'; transition: transform .2s; }
    .pillar-link:hover::after { transform: translateX(4px); }

    /* ─── About ─── */
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
    .about-text h2 { font-size: 32px; font-weight: 700; color: var(--white); margin-bottom: 16px; }
    .about-text p { font-size: 16px; color: var(--soft-gray); line-height: 1.7; margin-bottom: 16px; }
    .about-values { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px; }
    .about-value {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
      border-radius: var(--radius-sm); padding: 20px;
    }
    .about-value h4 { font-size: 15px; color: var(--white); margin-bottom: 6px; }
    .about-value p { font-size: 13px; color: var(--soft-gray); margin: 0; }

    /* ─── Portfolio ─── */
    .portfolio-scroll {
      display: flex; gap: 24px; overflow-x: auto; scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch; padding: 8px 0 20px; scrollbar-width: thin;
    }
    .portfolio-scroll::-webkit-scrollbar { height: 6px; }
    .portfolio-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 3px; }
    .portfolio-scroll::-webkit-scrollbar-thumb { background: var(--green); border-radius: 3px; }
    .portfolio-card {
      flex: 0 0 340px; scroll-snap-align: start; background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius);
      overflow: hidden; transition: transform .3s, border-color .3s;
    }
    .portfolio-card:hover { transform: translateY(-4px); border-color: rgba(26,143,110,0.3); }
    .portfolio-thumb {
      height: 180px; display: flex; align-items: center; justify-content: center;
      font-size: 48px; position: relative; overflow: hidden;
    }
    .portfolio-info { padding: 20px; }
    .portfolio-tag {
      display: inline-block; padding: 3px 10px; border-radius: 4px; font-size: 11px;
      font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: .5px;
    }
    .portfolio-info h3 { font-size: 17px; color: var(--white); margin-bottom: 6px; }
    .portfolio-info p { font-size: 13px; color: var(--slate); line-height: 1.5; }
    .portfolio-stat { margin-top: 12px; font-size: 14px; font-weight: 600; }

    /* ─── Consulting Section ─── */
    .consult-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
    .consult-phases { display: flex; flex-direction: column; gap: 20px; }
    .consult-phase {
      display: flex; gap: 16px; padding: 20px; background: var(--white);
      border-radius: var(--radius-sm); box-shadow: var(--shadow);
      border-left: 4px solid transparent; transition: border-color .3s, transform .3s;
    }
    .consult-phase:hover { transform: translateX(4px); }
    .consult-phase:nth-child(1) { border-left-color: var(--green); }
    .consult-phase:nth-child(2) { border-left-color: var(--blue); }
    .consult-phase:nth-child(3) { border-left-color: var(--amber); }
    .consult-phase:nth-child(4) { border-left-color: var(--purple); }
    .phase-num {
      flex-shrink: 0; width: 40px; height: 40px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Poppins',sans-serif; font-size: 16px; font-weight: 700; color: var(--white);
    }
    .consult-phase h4 { font-size: 16px; font-weight: 600; color: var(--navy); margin-bottom: 4px; }
    .consult-phase p { font-size: 13px; color: var(--slate); }
    .consult-tiers { display: flex; flex-direction: column; gap: 16px; }
    .tier-card {
      background: var(--white); border-radius: var(--radius-sm); padding: 24px;
      box-shadow: var(--shadow); border: 1px solid var(--soft-gray);
      transition: transform .3s;
    }
    .tier-card:hover { transform: translateY(-3px); }
    .tier-card.featured { border-color: var(--green); box-shadow: 0 4px 24px rgba(26,143,110,.15); }
    .tier-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .tier-name { font-size: 18px; font-weight: 700; color: var(--navy); }
    .tier-price { font-family: 'Poppins',sans-serif; font-size: 16px; font-weight: 700; color: var(--green); }
    .tier-target { font-size: 13px; color: var(--slate); margin-bottom: 10px; }
    .tier-features { display: flex; flex-wrap: wrap; gap: 6px; }
    .tier-feat {
      display: inline-block; padding: 3px 10px; border-radius: 4px;
      font-size: 11px; background: var(--ice); color: var(--charcoal);
    }

    /* ─── Contact ─── */
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
    .contact-info h2 { font-size: 32px; font-weight: 700; color: var(--white); margin-bottom: 16px; }
    .contact-info p { font-size: 16px; color: var(--soft-gray); margin-bottom: 24px; line-height: 1.7; }
    .contact-methods { display: flex; flex-direction: column; gap: 16px; }
    .contact-method {
      display: flex; align-items: center; gap: 14px; padding: 16px;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
      border-radius: var(--radius-sm); transition: border-color .3s;
    }
    .contact-method:hover { border-color: var(--green); }
    .contact-icon {
      width: 44px; height: 44px; border-radius: 10px; display: flex;
      align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0;
    }
    .contact-method h4 { font-size: 14px; color: var(--white); margin-bottom: 2px; }
    .contact-method p { font-size: 13px; color: var(--slate); margin: 0; }
    .contact-form {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
      border-radius: var(--radius); padding: 32px;
    }
    .contact-form h3 { font-size: 20px; color: var(--white); margin-bottom: 20px; }
    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; font-size: 13px; color: var(--soft-gray); margin-bottom: 6px; font-weight: 500; }
    .form-group input, .form-group textarea, .form-group select {
      width: 100%; padding: 12px 16px; background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12); border-radius: 6px;
      color: var(--white); font-family: inherit; font-size: 14px; transition: border-color .2s;
    }
    .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
      outline: none; border-color: var(--green);
    }
    .form-group textarea { min-height: 100px; resize: vertical; }
    .form-group select option { background: var(--navy); color: var(--white); }

    /* ─── Footer ─── */
    .footer { background: var(--deep-navy); padding: 52px 0 24px; border-top: 1px solid rgba(255,255,255,0.05); }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
    .footer-brand p { font-size: 14px; color: var(--slate); line-height: 1.6; margin-top: 12px; }
    .footer-col h4 { font-size: 13px; font-weight: 600; color: var(--white); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; }
    .footer-col a { display: block; font-size: 14px; color: var(--slate); padding: 3px 0; transition: color .2s; }
    .footer-col a:hover { color: var(--green); }
    .footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--slate); flex-wrap: wrap; gap: 12px; }

    /* ─── Parallax backgrounds ─── */
    .parallax-section { position: relative; overflow: hidden; }
    .parallax-bg {
      position: absolute; inset: -20% 0; z-index: 0;
      background-size: cover; background-position: center;
      will-change: transform;
    }

    /* ─── Responsive ─── */
    @media (max-width: 1024px) {
      .pillars-grid { grid-template-columns: 1fr; max-width: 500px; margin-left: auto; margin-right: auto; }
      .about-grid, .consult-grid, .contact-grid { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .nav-links.open {
        display: flex; flex-direction: column; position: absolute; top: 68px; left: 0; right: 0;
        background: var(--navy); padding: 20px 24px; gap: 16px; border-top: 1px solid rgba(255,255,255,0.06);
      }
      .nav-toggle { display: block; }
      .stats-grid { grid-template-columns: repeat(2,1fr); }
      .about-values { grid-template-columns: 1fr; }
      .section { padding: 60px 0; }
      .portfolio-card { flex: 0 0 280px; }
    }
    @media (max-width: 480px) {
      .hero-actions { flex-direction: column; align-items: center; }
      .stats-grid { grid-template-columns: 1fr 1fr; }
      .footer-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <!-- ═══ NAVIGATION ═══ -->
  <nav class="nav" id="nav">
    <div class="nav-inner">
      <a href="#hero" class="nav-logo">
        <img src="data:image/jpeg;base64,${logoLight}" alt="Malon Labs" width="40" height="40" loading="eager">
        <span class="brand-name nav-logo-text">malonlabs</span>
      </a>
      <div class="nav-links" id="navLinks">
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#consulting">Consulting</a>
        <a href="#contact">Contact</a>
        <a href="https://wa.me/255766629933?text=Hi%20Malon%20Labs%2C%20I%27d%20like%20to%20discuss%20a%20project." class="nav-cta" target="_blank" rel="noopener">Get in Touch</a>
      </div>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- ═══ HERO ═══ -->
  <section class="hero" id="hero">
    <canvas class="hero-canvas" id="heroCanvas"></canvas>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-badge">Technology That Works For Your Business</div>
      <h1>We <span class="accent">build</span>, <span class="accent">manage</span>, and <span class="accent-amber">optimize</span> technology for Tanzanian businesses</h1>
      <p class="hero-sub">From custom software and IT infrastructure to AI-powered efficiency — Malon Labs is your single technology partner for everything.</p>
      <div class="hero-actions">
        <a href="https://wa.me/255766629933?text=Hi%20Malon%20Labs%2C%20I%27d%20like%20to%20discuss%20a%20project." class="btn btn-whatsapp" target="_blank" rel="noopener">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp Us
        </a>
        <a href="#services" class="btn btn-outline">Explore Services</a>
      </div>
    </div>
  </section>

  <!-- ═══ STATS BAR ═══ -->
  <div class="stats-bar">
    <div class="container">
      <div class="stats-grid">
        <div class="fade-up"><div class="stat-num" data-target="3" data-suffix="">3</div><div class="stat-label">Integrated Service Lines</div></div>
        <div class="fade-up"><div class="stat-num" data-target="10" data-suffix="+">10+</div><div class="stat-label">Industries Served</div></div>
        <div class="fade-up"><div class="stat-num" data-target="40" data-suffix="%">40%</div><div class="stat-label">Average Cost Savings with AI</div></div>
        <div class="fade-up"><div class="stat-num" data-target="24" data-suffix="/7">24/7</div><div class="stat-label">IT Support Available</div></div>
      </div>
    </div>
  </div>

  <!-- ═══ SERVICES (3 Pillars) ═══ -->
  <section class="section section-light" id="services">
    <div class="container">
      <div class="section-header fade-up">
        <h2>Three Pillars. One Partner.</h2>
        <p>Everything your business needs to build, run, and optimize technology — under one roof</p>
      </div>
      <div class="pillars-grid">

        <!-- Dev -->
        <div class="pillar-card fade-up">
          <div class="pillar-accent" style="background:var(--blue);"></div>
          <div class="pillar-body">
            <div class="pillar-icon" style="background:rgba(59,130,246,0.1); color:var(--blue);">{ }</div>
            <h3>Software &amp; App Development</h3>
            <p>Custom software that solves real business problems. Mobile apps, web platforms, APIs, and system integrations — from concept to deployment.</p>
            <ul class="pillar-features">
              <li style="color:var(--blue);">Flutter cross-platform mobile apps</li>
              <li style="color:var(--blue);">Web applications &amp; admin dashboards</li>
              <li style="color:var(--blue);">API development &amp; system integration</li>
              <li style="color:var(--blue);">M-Pesa, Tigo Pesa payment integration</li>
              <li style="color:var(--blue);">WhatsApp Business &amp; USSD systems</li>
            </ul>
            <a href="#contact" class="pillar-link" style="color:var(--blue);">Discuss Your Project</a>
          </div>
        </div>

        <!-- Managed IT -->
        <div class="pillar-card fade-up">
          <div class="pillar-accent" style="background:var(--purple);"></div>
          <div class="pillar-body">
            <div class="pillar-icon" style="background:rgba(139,92,246,0.1); color:var(--purple);">☁</div>
            <h3>Managed IT Services</h3>
            <p>We become your IT department. Network management, cybersecurity, cloud infrastructure, and helpdesk — without the overhead of building in-house.</p>
            <ul class="pillar-features">
              <li style="color:var(--purple);">24/7 monitoring &amp; helpdesk support</li>
              <li style="color:var(--purple);">Cybersecurity &amp; endpoint protection</li>
              <li style="color:var(--purple);">Cloud migration &amp; management</li>
              <li style="color:var(--purple);">Backup &amp; disaster recovery</li>
              <li style="color:var(--purple);">UPS &amp; power continuity planning</li>
            </ul>
            <a href="#contact" class="pillar-link" style="color:var(--purple);">Get IT Support</a>
          </div>
        </div>

        <!-- Consulting -->
        <div class="pillar-card fade-up">
          <div class="pillar-accent" style="background:var(--green);"></div>
          <div class="pillar-body">
            <div class="pillar-icon" style="background:rgba(26,143,110,0.1); color:var(--green);">★</div>
            <h3>AI &amp; IT Consulting</h3>
            <p>Unlock efficiency through AI and modern IT tools. Operational audits, tool implementation, staff training, and ongoing advisory that delivers measurable ROI.</p>
            <ul class="pillar-features">
              <li>Operational audits &amp; AI readiness</li>
              <li>AI tool selection &amp; implementation</li>
              <li>Custom automations &amp; chatbots</li>
              <li>Department-specific staff training</li>
              <li>Ongoing retainer &amp; advisory</li>
            </ul>
            <a href="#consulting" class="pillar-link">Explore Consulting</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ ABOUT ═══ -->
  <section class="section section-dark parallax-section" id="about">
    <div class="parallax-bg" style="background: linear-gradient(135deg, var(--navy), var(--deep-navy));"></div>
    <div class="container" style="position:relative; z-index:1;">
      <div class="about-grid">
        <div class="about-text fade-left">
          <h2>Built in Tanzania. Built for Tanzania.</h2>
          <p>Most technology companies in Tanzania fall into two categories: small freelancers who can build but cannot support long-term, or large international firms who charge premium rates without understanding local context.</p>
          <p>Malon Labs sits in the sweet spot — large enough to deliver enterprise-quality work, nimble enough to understand your specific needs, and local enough to be in your office when you need us.</p>
          <div class="about-values">
            <div class="about-value">
              <h4>🎯 Results-Focused</h4>
              <p>We measure success in hours saved, revenue gained, and problems solved</p>
            </div>
            <div class="about-value">
              <h4>🤝 End-to-End</h4>
              <p>We build, deploy, train, and support. One partner for your entire journey</p>
            </div>
            <div class="about-value">
              <h4>🌍 Local Expertise</h4>
              <p>Tanzanian business culture, regulations, and infrastructure — we get it</p>
            </div>
            <div class="about-value">
              <h4>📈 Ongoing Growth</h4>
              <p>We do not disappear after delivery. Support and retainers keep you scaling</p>
            </div>
          </div>
        </div>
        <div class="fade-right" style="text-align:center;">
          <img src="data:image/jpeg;base64,${logoPrimary}" alt="Malon Labs Logo" width="280" height="280" style="border-radius:20px; box-shadow: 0 12px 48px rgba(0,0,0,0.3);" loading="lazy">
          <div style="margin-top:24px;">
            <p style="font-family:'Viga',sans-serif; font-size:28px; color:var(--white);">malonlabs</p>
            <p style="font-size:14px; color:var(--green); margin-top:4px; font-style:italic;">"Smarter Operations. Stronger Business."</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ PORTFOLIO ═══ -->
  <section class="section section-deep" id="portfolio">
    <div class="container">
      <div class="section-header fade-up">
        <h2>Work That Speaks</h2>
        <p>A selection of projects across our three service lines</p>
      </div>
      <div class="portfolio-scroll" id="portfolioScroll">

        <div class="portfolio-card fade-up">
          <div class="portfolio-thumb" style="background:linear-gradient(135deg, #1a3a5c, #0d2137);">📱</div>
          <div class="portfolio-info">
            <span class="portfolio-tag" style="background:rgba(59,130,246,0.15); color:var(--blue);">Development</span>
            <h3>Logistics Delivery App</h3>
            <p>Cross-platform Flutter app for a Dar es Salaam logistics company. Real-time tracking, driver management, and M-Pesa payment integration.</p>
            <div class="portfolio-stat" style="color:var(--blue);">2,000+ daily deliveries tracked</div>
          </div>
        </div>

        <div class="portfolio-card fade-up">
          <div class="portfolio-thumb" style="background:linear-gradient(135deg, #1a3352, #0f1f33);">🏥</div>
          <div class="portfolio-info">
            <span class="portfolio-tag" style="background:rgba(139,92,246,0.15); color:var(--purple);">Managed IT</span>
            <h3>Healthcare Network Infrastructure</h3>
            <p>Complete IT overhaul for a multi-branch healthcare provider. Network design, cloud migration, and 24/7 monitoring across 5 locations.</p>
            <div class="portfolio-stat" style="color:var(--purple);">Zero unplanned downtime in 6 months</div>
          </div>
        </div>

        <div class="portfolio-card fade-up">
          <div class="portfolio-thumb" style="background:linear-gradient(135deg, #143028, #0a1a14);">🤖</div>
          <div class="portfolio-info">
            <span class="portfolio-tag" style="background:rgba(26,143,110,0.15); color:var(--green);">Consulting</span>
            <h3>Bank AI Efficiency Program</h3>
            <p>AI readiness assessment and implementation for a Tanzanian bank. Automated report generation, customer chatbot, and staff training.</p>
            <div class="portfolio-stat" style="color:var(--green);">40% reduction in report generation time</div>
          </div>
        </div>

        <div class="portfolio-card fade-up">
          <div class="portfolio-thumb" style="background:linear-gradient(135deg, #2d1f0f, #1a1208);">🛒</div>
          <div class="portfolio-info">
            <span class="portfolio-tag" style="background:rgba(59,130,246,0.15); color:var(--blue);">Development</span>
            <h3>E-Commerce Platform</h3>
            <p>Full-featured online marketplace with mobile money integration, SMS notifications, and inventory management for a retail chain.</p>
            <div class="portfolio-stat" style="color:var(--blue);">3 payment gateways integrated</div>
          </div>
        </div>

        <div class="portfolio-card fade-up">
          <div class="portfolio-thumb" style="background:linear-gradient(135deg, #1f1535, #120d20);">🔐</div>
          <div class="portfolio-info">
            <span class="portfolio-tag" style="background:rgba(139,92,246,0.15); color:var(--purple);">Managed IT</span>
            <h3>NGO Cybersecurity Overhaul</h3>
            <p>Security audit, endpoint protection, and staff awareness training for an international NGO with 200+ staff across East Africa.</p>
            <div class="portfolio-stat" style="color:var(--purple);">95% reduction in security incidents</div>
          </div>
        </div>

        <div class="portfolio-card fade-up">
          <div class="portfolio-thumb" style="background:linear-gradient(135deg, #1a2e1a, #0d1a0d);">💬</div>
          <div class="portfolio-info">
            <span class="portfolio-tag" style="background:rgba(26,143,110,0.15); color:var(--green);">Consulting</span>
            <h3>WhatsApp Customer Service Bot</h3>
            <p>AI-powered WhatsApp chatbot for a telecom company. Handles FAQs, account inquiries, and payment processing in English and Swahili.</p>
            <div class="portfolio-stat" style="color:var(--green);">3x faster customer response time</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ CONSULTING DEEP DIVE ═══ -->
  <section class="section section-light" id="consulting">
    <div class="container">
      <div class="section-header fade-up">
        <h2><span class="brand-name">malonlabs</span> Consulting</h2>
        <p>AI &amp; IT consulting that turns technology from a cost center into a competitive advantage</p>
      </div>
      <div class="consult-grid">
        <div class="consult-phases fade-left">
          <h3 style="font-size:20px; color:var(--navy); margin-bottom:8px;">Our 4-Phase Approach</h3>
          <div class="consult-phase">
            <div class="phase-num" style="background:var(--green);">1</div>
            <div><h4>Discover</h4><p>Operational audit, AI readiness assessment, stakeholder interviews, and pain point mapping. Deliverable: AI Opportunity Report.</p></div>
          </div>
          <div class="consult-phase">
            <div class="phase-num" style="background:var(--blue);">2</div>
            <div><h4>Design</h4><p>Tool selection, implementation roadmap, change management strategy, and ROI projections for each initiative.</p></div>
          </div>
          <div class="consult-phase">
            <div class="phase-num" style="background:var(--amber);">3</div>
            <div><h4>Deploy</h4><p>Tool setup and configuration, data integration, custom automations (chatbots, workflows), and pilot programs.</p></div>
          </div>
          <div class="consult-phase">
            <div class="phase-num" style="background:var(--purple);">4</div>
            <div><h4>Develop</h4><p>Staff training (role-specific), internal champion development, performance monitoring, and ongoing advisory.</p></div>
          </div>
        </div>
        <div class="consult-tiers fade-right">
          <h3 style="font-size:20px; color:var(--navy); margin-bottom:8px;">Engagement Tiers</h3>
          <div class="tier-card">
            <div class="tier-header">
              <span class="tier-name">Jumpstart</span>
              <span class="tier-price">TZS 2M – 5M</span>
            </div>
            <div class="tier-target">SMEs (5-50 employees) · 2-3 days</div>
            <div class="tier-features">
              <span class="tier-feat">Discovery session</span><span class="tier-feat">AI tool recommendations</span><span class="tier-feat">Staff workshop</span><span class="tier-feat">Playbook</span><span class="tier-feat">30-day support</span>
            </div>
          </div>
          <div class="tier-card featured">
            <div class="tier-header">
              <span class="tier-name">Transform ⭐</span>
              <span class="tier-price">TZS 10M – 25M</span>
            </div>
            <div class="tier-target">Mid-size (50-500 employees) · 2-4 weeks</div>
            <div class="tier-features">
              <span class="tier-feat">Full audit</span><span class="tier-feat">Dept AI mapping</span><span class="tier-feat">Tool setup</span><span class="tier-feat">Training</span><span class="tier-feat">2 automations</span><span class="tier-feat">60-day support</span>
            </div>
          </div>
          <div class="tier-card">
            <div class="tier-header">
              <span class="tier-name">Enterprise</span>
              <span class="tier-price">TZS 50M+</span>
            </div>
            <div class="tier-target">Large orgs (500+ employees) · 2-6 months</div>
            <div class="tier-features">
              <span class="tier-feat">Full transformation</span><span class="tier-feat">Executive briefings</span><span class="tier-feat">Phased rollout</span><span class="tier-feat">Custom integrations</span><span class="tier-feat">6-month retainer</span>
            </div>
          </div>
          <a href="https://wa.me/255766629933?text=Hi%20Malon%20Labs%2C%20I%27m%20interested%20in%20AI%20consulting." class="btn btn-primary" target="_blank" rel="noopener" style="width:100%; justify-content:center; margin-top:8px;">Book Free AI Consultation</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ CONTACT ═══ -->
  <section class="section section-dark" id="contact">
    <div class="container">
      <div class="contact-grid">
        <div class="contact-info fade-left">
          <h2>Let's Build Something Together</h2>
          <p>Whether you need custom software, reliable IT management, or AI consulting — we are ready to help. Start with a free conversation.</p>
          <div class="contact-methods">
            <a href="https://wa.me/255766629933?text=Hi%20Malon%20Labs%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener" class="contact-method" style="text-decoration:none;">
              <div class="contact-icon" style="background:rgba(37,211,102,0.15); color:#25D366;">💬</div>
              <div><h4>WhatsApp</h4><p>+255 766 629 933 — Fastest response</p></div>
            </a>
            <a href="mailto:info@malonlabs.com" class="contact-method" style="text-decoration:none;">
              <div class="contact-icon" style="background:rgba(59,130,246,0.15); color:var(--blue);">✉</div>
              <div><h4>Email</h4><p>info@malonlabs.com</p></div>
            </a>
            <a href="tel:+255766629933" class="contact-method" style="text-decoration:none;">
              <div class="contact-icon" style="background:rgba(139,92,246,0.15); color:var(--purple);">📞</div>
              <div><h4>Phone</h4><p>+255 766 629 933</p></div>
            </a>
            <div class="contact-method">
              <div class="contact-icon" style="background:rgba(26,143,110,0.15); color:var(--green);">📍</div>
              <div><h4>Location</h4><p>Dar es Salaam, Tanzania</p></div>
            </div>
          </div>
        </div>
        <div class="contact-form fade-right">
          <h3>Send Us a Message</h3>
          <form id="contactForm" action="#" method="post" onsubmit="return handleSubmit(event);">
            <div class="form-group">
              <label for="cf-name">Your Name</label>
              <input type="text" id="cf-name" name="name" required placeholder="e.g. John Mwangi">
            </div>
            <div class="form-group">
              <label for="cf-email">Email Address</label>
              <input type="email" id="cf-email" name="email" required placeholder="john@company.co.tz">
            </div>
            <div class="form-group">
              <label for="cf-service">Service Interested In</label>
              <select id="cf-service" name="service">
                <option value="">Select a service...</option>
                <option value="development">Software &amp; App Development</option>
                <option value="managed-it">Managed IT Services</option>
                <option value="consulting">AI &amp; IT Consulting</option>
                <option value="multiple">Multiple Services</option>
                <option value="not-sure">Not Sure — Need Guidance</option>
              </select>
            </div>
            <div class="form-group">
              <label for="cf-message">Tell Us About Your Needs</label>
              <textarea id="cf-message" name="message" required placeholder="Describe your project, challenge, or question..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center;">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ FOOTER ═══ -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="data:image/jpeg;base64,${logoLight}" alt="Malon Labs" width="48" height="48" style="border-radius:8px;" loading="lazy">
          <p><span class="brand-name" style="color:var(--white); font-size:18px;">malonlabs</span></p>
          <p>We build, manage, and optimize technology so you can focus on your business. Based in Dar es Salaam, serving all of East Africa.</p>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <a href="#services">Software Development</a>
          <a href="#services">Managed IT Services</a>
          <a href="#consulting">AI Consulting</a>
          <a href="#consulting">Staff Training</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="#about">About Us</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#consulting">Consulting</a>
          <a href="#contact">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <a href="mailto:info@malonlabs.com">info@malonlabs.com</a>
          <a href="tel:+255766629933">+255 766 629 933</a>
          <a href="https://wa.me/255766629933" target="_blank" rel="noopener">WhatsApp</a>
          <a href="#">Dar es Salaam, TZ</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Malon Labs Ltd. All rights reserved.</span>
        <span style="font-style:italic; color:var(--green);">Smarter Operations. Stronger Business.</span>
      </div>
    </div>
  </footer>

  <!-- ═══ 3D MOLECULAR HERO ANIMATION (deferred) ═══ -->
  <script>
  // Lightweight 3D molecular animation using Canvas 2D
  // Inspired by the logo's network/molecular "M" motif
  (function() {
    'use strict';
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, nodes = [], mouse = { x: -1000, y: -1000 }, raf;
    const NODE_COUNT = 60;
    const CONNECT_DIST = 160;
    const MOUSE_DIST = 200;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    function init() {
      resize();
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          r: Math.random() * 2.5 + 1.5,
          pulse: Math.random() * Math.PI * 2
        });
      }
      canvas.classList.add('loaded');
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Update positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // Mouse interaction — gentle push
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const md = Math.sqrt(dx * dx + dy * dy);
        if (md < MOUSE_DIST) {
          const force = (MOUSE_DIST - md) / MOUSE_DIST * 0.015;
          n.vx += dx * force;
          n.vy += dy * force;
        }

        // Dampen velocity
        n.vx *= 0.998;
        n.vy *= 0.998;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.25;
            ctx.strokeStyle = 'rgba(26,143,110,' + alpha + ')';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const glow = 0.5 + Math.sin(n.pulse) * 0.3;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(26,143,110,' + glow + ')';
        ctx.fill();

        // Outer glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(26,143,110,' + (glow * 0.15) + ')';
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    // Defer loading
    if (document.readyState === 'complete') {
      init(); draw();
    } else {
      window.addEventListener('load', function() { init(); draw(); });
    }

    window.addEventListener('resize', function() { resize(); }, { passive: true });

    canvas.addEventListener('mousemove', function(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });

    canvas.addEventListener('mouseleave', function() {
      mouse.x = -1000; mouse.y = -1000;
    }, { passive: true });

    // Touch support
    canvas.addEventListener('touchmove', function(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    }, { passive: true });

    canvas.addEventListener('touchend', function() {
      mouse.x = -1000; mouse.y = -1000;
    }, { passive: true });

    // Cleanup on page hide
    document.addEventListener('visibilitychange', function() {
      if (document.hidden && raf) cancelAnimationFrame(raf);
      else if (!document.hidden) { raf = requestAnimationFrame(draw); }
    });
  })();
  </script>

  <!-- ═══ CORE SCRIPTS (deferred) ═══ -->
  <script>
  (function() {
    'use strict';

    // ─── Mobile nav ───
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    toggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
      } else {
        spans.forEach(function(s) { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    navLinks.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        navLinks.classList.remove('open');
        toggle.querySelectorAll('span').forEach(function(s) { s.style.transform = ''; s.style.opacity = ''; });
      });
    });

    // ─── Nav scroll ───
    var nav = document.getElementById('nav');
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // ─── Intersection Observer for animations ───
    var animObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(function(el) {
      animObserver.observe(el);
    });

    // ─── Animated counters ───
    var counterDone = new Set();
    var counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (counterDone.has(el)) return;
        counterDone.add(el);
        var target = parseInt(el.dataset.target);
        var suffix = el.dataset.suffix || '';
        var current = 0;
        var step = Math.max(1, Math.floor(target / 30));
        var timer = setInterval(function() {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current + suffix;
        }, 40);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-target]').forEach(function(el) {
      counterObserver.observe(el);
    });

    // ─── Parallax ───
    var parallaxSections = document.querySelectorAll('.parallax-bg');
    if (parallaxSections.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.addEventListener('scroll', function() {
        requestAnimationFrame(function() {
          var scrollY = window.pageYOffset;
          parallaxSections.forEach(function(bg) {
            var parent = bg.parentElement;
            var rect = parent.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
              var offset = (rect.top / window.innerHeight) * 30;
              bg.style.transform = 'translateY(' + offset + 'px)';
            }
          });
        });
      }, { passive: true });
    }

    // ─── Contact form handler ───
    window.handleSubmit = function(e) {
      e.preventDefault();
      var form = document.getElementById('contactForm');
      var name = form.querySelector('[name="name"]').value;
      var email = form.querySelector('[name="email"]').value;
      var service = form.querySelector('[name="service"]').value;
      var message = form.querySelector('[name="message"]').value;
      var waText = 'Hi Malon Labs, I\\'m ' + name + ' (' + email + '). Service: ' + (service || 'Not specified') + '. ' + message;
      window.open('https://wa.me/255766629933?text=' + encodeURIComponent(waText), '_blank');
      return false;
    };

  })();
  </script>
</body>
</html>`;

// ─── Write output ───
const outDir = 'deliverables/website';
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'index.html');
fs.writeFileSync(outPath, html);
console.log(`✅ Created ${outPath} (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);
