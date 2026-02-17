# Malon Labs Ltd — Project Instructions

## About This Project

This project contains all deliverables for **Malon Labs Ltd**, a Tanzanian technology company offering three core services: Software/App Development, Managed IT Services, and AI & IT Consulting. The project covers both the **main company website** (full redesign) and the **consulting service line deliverables**.

## Company Overview

- **Company Name:** Malon Labs Ltd
- **Location:** Tanzania
- **Industry:** Technology & IT Services
- **Website:** (redesign in progress)
- **Languages:** English (primary), Swahili (marketing & outreach)

### Service Lines

1. **Software & App Development** — Custom software, blockchain apps, mobile apps, web apps, APIs, and system integrations for businesses across East Africa.

2. **Managed IT Services** — Ongoing IT support, infrastructure management, network administration, cybersecurity, cloud migration, and helpdesk services for organizations that want reliable technology without building an in-house IT team.

3. **Malon Labs Consulting** — AI & IT consulting helping organizations increase efficiency and productivity through strategic implementation of AI tools, operational audits, staff training, and workflow automation.

### Value Proposition
"We build, manage, and optimize technology so you can focus on your business."

### Brand Tagline
"Smarter Operations. Stronger Business."

## Brand Guidelines

See `brand/BRAND.md` for full details including colors, fonts, tone of voice, and logo usage.

### Logo Files
Located in `brand/logo/`:
- `malon-logo-dark-bg.jpg` — Logo with dark navy background (use on light pages)
- `malon-logo-light-bg.jpg` — Logo with light/white background (use on dark sections)
- `malon-logo-primary.jpeg` — Primary logo variant

## Project Structure

```
ai_consult/
├── CLAUDE.md                    ← You are here (project instructions)
├── README.md                    ← Project overview
├── brand/
│   ├── BRAND.md                 ← Brand guidelines
│   └── logo/                    ← Logo files (dark bg, light bg variants)
├── content/
│   ├── COMPANY_OVERVIEW.md      ← Full company description & positioning
│   ├── SERVICES_DEV.md          ← Software & App Development details
│   ├── SERVICES_MANAGED_IT.md   ← Managed IT Services details
│   ├── SERVICES_CONSULTING.md   ← AI & IT Consulting details (formerly SERVICES.md)
│   ├── BUSINESS_PLAN.md         ← Consulting business strategy & go-to-market
│   └── TOOLS_DATABASE.md        ← AI tools reference by industry
├── deliverables/
│   ├── website/                 ← Main Malon Labs website (HTML/CSS/JS)
│   ├── consulting/
│   │   ├── landing-page/        ← Consulting-specific landing page
│   │   ├── assessment/          ← AI Readiness Assessment (DOCX)
│   │   ├── pitch-deck/          ← Client pitch deck (PPTX)
│   │   └── proposal/            ← Service proposal template (DOCX)
│   └── shared/                  ← Shared assets used across deliverables
├── scripts/                     ← Build/generation scripts
└── assets/                      ← Images, icons, shared resources
```

## Deliverables

### Priority 1: Main Malon Labs Website (`deliverables/website/`)

**This is a full company website redesign.** It should serve three goals equally: lead generation, portfolio/credibility, and service catalog.

- **Format:** Multi-section responsive HTML site (can be single-page with smooth scroll or multi-page)
- **Must include the actual Malon Labs logo** from `brand/logo/`
- **Mobile-first** — many visitors will be on phones

#### Required Sections/Pages:
1. **Hero** — Bold intro with tagline, brief description, primary CTA (contact/WhatsApp)
2. **Services** — Three pillars: Development, Managed IT, Consulting. Each with clear description and "Learn More" path
3. **About** — Company story, mission, what makes Malon Labs different in the Tanzanian market
4. **Portfolio/Work** — Past projects or case study summaries (use realistic placeholders if none provided)
5. **Consulting (Malon Labs Consulting)** — Dedicated section or sub-page for the consulting offering with tiers, process, and CTA
6. **Contact** — Contact form, WhatsApp link, email, location info
7. **Footer** — Links, social media placeholders, copyright

#### Design Requirements:
- Use the Malon Labs color palette from `brand/BRAND.md`
- Match the navy-heavy aesthetic of the existing logo
- Professional but not cold — approachable for both SME owners and enterprise decision-makers
- Smooth animations/transitions where appropriate
- Fast-loading — minimize dependencies
- Include the logo image file directly (base64 or referenced)

### Priority 2: Consulting Deliverables (`deliverables/consulting/`)

#### 2a. Consulting Landing Page (`consulting/landing-page/`)
- Focused single-page for the consulting arm specifically
- Can be used as a standalone page or embedded at `malonlabs.com/consulting`
- Deeper detail on consulting services, process, pricing tiers, and CTA
- References content from `content/SERVICES_CONSULTING.md`

#### 2b. AI Readiness Assessment (`consulting/assessment/`)
- Professional Word document (.docx)
- Client-facing questionnaire (15-20 questions)
- Covers: current tech stack, pain points, team readiness, budget
- Branded header/footer with Malon Labs identity
- Designed to be filled in during a discovery meeting

#### 2c. Pitch Deck (`consulting/pitch-deck/`)
- PowerPoint presentation (.pptx), 12-15 slides
- Audience: C-suite / decision-makers at Tanzanian companies
- Flow: Problem → Solution → Services → Process → Case Studies → Pricing → CTA
- Bold, modern design matching brand palette
- Speaker notes included on each slide
- Must include the Malon Labs logo

#### 2d. Service Proposal Template (`consulting/proposal/`)
- Word document (.docx), 8-12 pages
- Customizable per client (placeholder sections clearly marked)
- Sections: Executive Summary, Company Background, Scope of Work, Timeline, Investment, Terms
- Professional formatting with TOC, page numbers, branded elements

## DevOps & Automation

See `DEVOPS.md` for full details including:
- Git workflow and branch strategy
- GitHub Actions CI/CD pipeline (`.github/workflows/`)
- Lighthouse performance testing (`.lighthouserc.json`)
- Automated cron jobs (git push, link checking)
- Deployment options (GitHub Pages, VPS, Vercel)
- Local automation scripts (`scripts/`)

## Technical Notes

- Use `pptxgenjs` (Node.js) for creating PPTX from scratch
- Use `docx` npm package (Node.js) for creating DOCX files
- Use LibreOffice (`soffice`) for format conversions
- Use `pdftoppm` for converting to images for QA
- Logo files are in `brand/logo/` — use the appropriate variant based on background
- For HTML: embed logo as base64 or reference the file path
- All final outputs go to their respective `deliverables/` subdirectories
- Keep generated scripts in `scripts/` for reproducibility
- **Old site reference:** Clone https://github.com/Shamininski/malonlabs to ~/malonlabs_old for content extraction

## Website Technical Requirements

### Visual Effects (Priority: Stunning but Performant)
- **Parallax scrolling** on hero and section backgrounds using Intersection Observer API
- **3D molecular animation** in hero section — inspired by the logo's network/molecular "M" motif. Use Three.js (lightweight scene) or CSS 3D transforms. Nodes and connections that subtly animate, rotate, and respond to mouse movement
- **Carousel/slider** for portfolio section using lightweight library (Swiper.js) or custom CSS scroll-snap
- **Scroll-triggered animations** — elements fade/slide in as they enter viewport
- **Animated counters** for statistics (e.g., "50+ clients", "40% efficiency gain")
- **Hover effects** — 3D card tilt on service cards, glow effects on CTAs
- **Smooth page transitions** between sections

### Performance Optimization (Non-Negotiable)
- **Lazy loading** all images and heavy assets (`loading="lazy"` + Intersection Observer)
- **Defer 3D/animation scripts** — load Three.js and animation code AFTER critical content renders
- **Preload critical resources** — fonts, hero background, logo
- **Use WebP images** with JPEG fallback
- **Inline critical CSS**, defer non-critical stylesheets
- **requestAnimationFrame** for all animations (never setInterval)
- **prefers-reduced-motion** media query — disable parallax and 3D for users who prefer it
- **Performance budget:** < 2MB total, < 200KB JS gzipped, FCP < 1.5s, LCP < 2.5s
- **Loading skeleton** for 3D content — show content first, animate after

## Style & Tone

- Professional but warm and accessible
- Avoid jargon — speak in business outcomes, not tech specs
- Use concrete examples relevant to Tanzanian businesses
- Numbers and data wherever possible ("save 15 hours/week" not "improve efficiency")
- When in doubt, think: "Would a busy Tanzanian CEO find this compelling and clear?"
- The website should feel like a premium Tanzanian tech company, not a Silicon Valley clone
