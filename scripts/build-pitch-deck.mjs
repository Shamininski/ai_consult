import PptxGenJS from 'pptxgenjs';
import fs from 'fs';
import path from 'path';

// ─── Brand colors (hex without #) ───
const NAVY      = '1E2637';
const DEEP_NAVY = '141C2B';
const GREEN     = '1A8F6E';
const AMBER     = 'F5A623';
const CHARCOAL  = '2D3748';
const SLATE     = '718096';
const SOFT_GRAY = 'E8EDF3';
const WHITE     = 'FFFFFF';
const ICE       = 'F7F9FC';

// ─── Logo as base64 ───
const logoPath = path.resolve('brand/logo/malon-logo-primary.jpeg');
const logoBase64 = fs.readFileSync(logoPath, 'base64');
const logoLightPath = path.resolve('brand/logo/malon-logo-light-bg.jpg');
const logoLightBase64 = fs.readFileSync(logoLightPath, 'base64');

// ─── Create presentation ───
const pptx = new PptxGenJS();
pptx.author = 'Malon Labs Ltd';
pptx.company = 'Malon Labs Ltd';
pptx.subject = 'AI & IT Consulting Pitch Deck';
pptx.title = 'Malon Labs Consulting — Pitch Deck';
pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5

// ─── Slide masters ───
// Dark slide (navy background)
pptx.defineSlideMaster({
  title: 'DARK_MASTER',
  background: { color: NAVY },
  objects: [
    // Bottom bar
    { rect: { x: 0, y: 7.0, w: '100%', h: 0.5, fill: { color: DEEP_NAVY } } },
    // Logo bottom-left
    { image: { x: 0.4, y: 7.05, w: 0.35, h: 0.35, data: `image/jpeg;base64,${logoBase64}` } },
    // Company name bottom
    { text: {
      text: 'Malon Labs Consulting',
      options: { x: 0.85, y: 7.05, w: 3, h: 0.4, fontSize: 9, color: SLATE, fontFace: 'Calibri' }
    }},
    // Slide number
    { text: {
      text: '{{slideNumber}}',
      options: { x: 12.3, y: 7.05, w: 0.7, h: 0.4, fontSize: 9, color: SLATE, fontFace: 'Calibri', align: 'right' }
    }}
  ]
});

// Light slide (white/ice background)
pptx.defineSlideMaster({
  title: 'LIGHT_MASTER',
  background: { color: ICE },
  objects: [
    // Top accent bar
    { rect: { x: 0, y: 0, w: '100%', h: 0.06, fill: { color: GREEN } } },
    // Bottom bar
    { rect: { x: 0, y: 7.0, w: '100%', h: 0.5, fill: { color: NAVY } } },
    // Logo bottom-left
    { image: { x: 0.4, y: 7.05, w: 0.35, h: 0.35, data: `image/jpeg;base64,${logoBase64}` } },
    // Company name bottom
    { text: {
      text: 'Malon Labs Consulting',
      options: { x: 0.85, y: 7.05, w: 3, h: 0.4, fontSize: 9, color: WHITE, fontFace: 'Calibri' }
    }},
    // Slide number
    { text: {
      text: '{{slideNumber}}',
      options: { x: 12.3, y: 7.05, w: 0.7, h: 0.4, fontSize: 9, color: WHITE, fontFace: 'Calibri', align: 'right' }
    }}
  ]
});

// ─── Helper functions ───
function addSlideTitle(slide, title, opts = {}) {
  slide.addText(title, {
    x: opts.x || 0.7,
    y: opts.y || 0.3,
    w: opts.w || 11.9,
    h: 0.7,
    fontSize: opts.fontSize || 32,
    fontFace: 'Calibri',
    bold: true,
    color: opts.color || WHITE,
    align: opts.align || 'left'
  });
}

function addSubtitle(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x || 0.7,
    y: opts.y || 1.0,
    w: opts.w || 11.9,
    h: 0.5,
    fontSize: opts.fontSize || 16,
    fontFace: 'Calibri',
    color: opts.color || SLATE,
    align: opts.align || 'left'
  });
}

function addCard(slide, x, y, w, h, opts = {}) {
  // Card background
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: opts.fill || WHITE },
    shadow: { type: 'outer', blur: 8, offset: 2, color: '000000', opacity: 0.15 },
    rectRadius: 0.1
  });
}

function iconCircle(slide, x, y, color, text) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x, y, w: 0.6, h: 0.6,
    fill: { color }
  });
  slide.addText(text, {
    x, y, w: 0.6, h: 0.6,
    fontSize: 22,
    fontFace: 'Calibri',
    color: WHITE,
    align: 'center',
    valign: 'middle',
    bold: true
  });
}

// ═══════════════════════════════════════
// SLIDE 1: TITLE / COVER
// ═══════════════════════════════════════
{
  const slide = pptx.addSlide({ masterName: 'DARK_MASTER' });
  slide.addNotes(
    'Welcome everyone. Today I\'ll walk you through how Malon Labs Consulting can help your organization ' +
    'become more efficient and competitive through practical AI implementation. This is not about futuristic ' +
    'technology — it\'s about tools available today that can save your team hours every week.'
  );

  // Large logo center
  slide.addImage({
    data: `image/jpeg;base64,${logoBase64}`,
    x: 5.4, y: 1.0, w: 2.5, h: 2.5
  });

  slide.addText('Malon Labs Consulting', {
    x: 0.7, y: 3.7, w: 11.9, h: 0.9,
    fontSize: 42, fontFace: 'Calibri', bold: true, color: WHITE, align: 'center'
  });

  slide.addText('Smarter Operations. Stronger Business.', {
    x: 0.7, y: 4.5, w: 11.9, h: 0.6,
    fontSize: 20, fontFace: 'Calibri', color: GREEN, align: 'center', italic: true
  });

  slide.addText('AI & IT Consulting for Tanzanian Businesses', {
    x: 0.7, y: 5.3, w: 11.9, h: 0.5,
    fontSize: 16, fontFace: 'Calibri', color: SLATE, align: 'center'
  });

  // Accent line
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.2, y: 5.1, w: 2.9, h: 0.04, fill: { color: GREEN }
  });
}

// ═══════════════════════════════════════
// SLIDE 2: THE PROBLEM
// ═══════════════════════════════════════
{
  const slide = pptx.addSlide({ masterName: 'LIGHT_MASTER' });
  slide.addNotes(
    'Let me start with what we\'re hearing from businesses across Tanzania. These are not hypothetical ' +
    'problems — these are real challenges our clients face every day. The key insight is that the technology ' +
    'exists to solve these problems, but most businesses don\'t know where to start or who to trust.'
  );

  addSlideTitle(slide, 'The Problem', { color: NAVY });
  addSubtitle(slide, 'What Tanzanian businesses are struggling with today');

  const problems = [
    { icon: '?', title: 'Awareness Gap', desc: 'Businesses know AI exists but don\'t know how to apply it to their operations' },
    { icon: '⚙', title: 'No Local Expertise', desc: 'No Tanzanian consulting firms specialize in practical AI implementation' },
    { icon: '⏱', title: 'Wasted Hours', desc: 'Teams spend 20-40 hours/week on manual tasks that AI could handle in minutes' },
    { icon: '✗', title: 'Fear & Resistance', desc: 'Staff worry about job displacement; leadership unsure about ROI' }
  ];

  problems.forEach((p, i) => {
    const x = 0.7 + (i % 2) * 6.15;
    const y = 1.8 + Math.floor(i / 2) * 2.5;
    addCard(slide, x, y, 5.8, 2.1);
    iconCircle(slide, x + 0.3, y + 0.35, i < 2 ? GREEN : AMBER, p.icon);
    slide.addText(p.title, {
      x: x + 1.1, y: y + 0.3, w: 4.2, h: 0.45,
      fontSize: 18, fontFace: 'Calibri', bold: true, color: NAVY
    });
    slide.addText(p.desc, {
      x: x + 0.3, y: y + 1.0, w: 5.2, h: 0.9,
      fontSize: 13, fontFace: 'Calibri', color: CHARCOAL, lineSpacingMultiple: 1.2
    });
  });
}

// ═══════════════════════════════════════
// SLIDE 3: THE OPPORTUNITY
// ═══════════════════════════════════════
{
  const slide = pptx.addSlide({ masterName: 'DARK_MASTER' });
  slide.addNotes(
    'But here\'s the exciting part — the market is ready. WhatsApp Business is already mainstream in Tanzania, ' +
    'the government is pushing digitization, and businesses have both the budget and the motivation. ' +
    'We estimate the addressable market for AI consulting in Tanzania at hundreds of millions of shillings annually, ' +
    'and it\'s virtually untapped. The first movers will capture enormous market share.'
  );

  addSlideTitle(slide, 'The Opportunity');

  // Left side — market stats
  const stats = [
    { num: 'Growing', label: 'Private sector with increasing digital adoption' },
    { num: 'Mainstream', label: 'WhatsApp Business already widely adopted — next step is AI' },
    { num: 'Untapped', label: 'SME sector is massive and unserved for AI consulting' },
    { num: 'Top-Down', label: 'Government digitization agenda driving modernization' }
  ];

  stats.forEach((s, i) => {
    const y = 1.3 + i * 1.3;
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.7, y, w: 0.08, h: 1.0, fill: { color: GREEN }
    });
    slide.addText(s.num, {
      x: 1.1, y, w: 3, h: 0.45,
      fontSize: 20, fontFace: 'Calibri', bold: true, color: GREEN
    });
    slide.addText(s.label, {
      x: 1.1, y: y + 0.45, w: 5, h: 0.5,
      fontSize: 13, fontFace: 'Calibri', color: SOFT_GRAY, lineSpacingMultiple: 1.2
    });
  });

  // Right side — target sectors
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 7.2, y: 1.3, w: 5.5, h: 5.2,
    fill: { color: DEEP_NAVY },
    rectRadius: 0.15
  });
  slide.addText('Target Sectors', {
    x: 7.5, y: 1.5, w: 5, h: 0.5,
    fontSize: 18, fontFace: 'Calibri', bold: true, color: AMBER
  });

  const sectors = ['Banking & Financial Services', 'Telecommunications', 'Healthcare & Pharmaceuticals', 'NGOs & International Organizations', 'Logistics & Supply Chain', 'Agriculture & Agribusiness', 'Education & Training', 'Government & Public Sector'];
  sectors.forEach((s, i) => {
    slide.addText(`▸  ${s}`, {
      x: 7.7, y: 2.15 + i * 0.5, w: 4.8, h: 0.45,
      fontSize: 13, fontFace: 'Calibri', color: WHITE
    });
  });
}

// ═══════════════════════════════════════
// SLIDE 4: WHO WE ARE
// ═══════════════════════════════════════
{
  const slide = pptx.addSlide({ masterName: 'LIGHT_MASTER' });
  slide.addNotes(
    'Malon Labs is not just a consulting firm — we are a full-service technology company. ' +
    'This means that when we recommend a solution, we can also build it, deploy it, and support it. ' +
    'Our clients get one partner for the entire journey, not three different vendors who don\'t talk to each other.'
  );

  addSlideTitle(slide, 'Who We Are', { color: NAVY });
  addSubtitle(slide, 'A Tanzanian technology company with three integrated service pillars');

  // Three pillars
  const pillars = [
    { title: 'Software & App\nDevelopment', desc: 'Custom software, mobile apps, web platforms, APIs, and blockchain solutions for East African businesses', color: '3B82F6', icon: '{ }' },
    { title: 'Managed IT\nServices', desc: 'Ongoing IT support, infrastructure, cybersecurity, cloud migration, and helpdesk for organizations', color: '8B5CF6', icon: '☁' },
    { title: 'AI & IT\nConsulting', desc: 'Strategic AI implementation, operational audits, staff training, and workflow automation', color: GREEN, icon: '★' }
  ];

  pillars.forEach((p, i) => {
    const x = 0.7 + i * 4.15;
    addCard(slide, x, 1.8, 3.85, 4.4);

    // Color accent bar at top of card
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.15, y: 1.85, w: 3.55, h: 0.06, fill: { color: p.color }
    });

    iconCircle(slide, x + 1.6, 2.2, p.color, p.icon);

    slide.addText(p.title, {
      x: x + 0.3, y: 3.0, w: 3.25, h: 0.9,
      fontSize: 17, fontFace: 'Calibri', bold: true, color: NAVY, align: 'center', lineSpacingMultiple: 1.15
    });
    slide.addText(p.desc, {
      x: x + 0.3, y: 3.9, w: 3.25, h: 1.8,
      fontSize: 12, fontFace: 'Calibri', color: CHARCOAL, align: 'center', lineSpacingMultiple: 1.3
    });
  });

  // Highlight consulting
  slide.addShape(pptx.ShapeType.rect, {
    x: 8.99, y: 6.1, w: 3.87, h: 0.06, fill: { color: GREEN }
  });
}

// ═══════════════════════════════════════
// SLIDE 5: OUR APPROACH (4 Phases)
// ═══════════════════════════════════════
{
  const slide = pptx.addSlide({ masterName: 'DARK_MASTER' });
  slide.addNotes(
    'Our approach is structured into four clear phases. We don\'t just give advice — we walk with you through ' +
    'the entire journey from discovery to deployment. Each phase builds on the previous one, and we don\'t ' +
    'move forward until you\'re satisfied with the results. The key differentiator is that we always start ' +
    'with understanding your specific business, not pushing generic solutions.'
  );

  addSlideTitle(slide, 'Our Approach');
  addSubtitle(slide, 'A proven 4-phase methodology that delivers measurable results', { color: SOFT_GRAY });

  const phases = [
    { num: '01', title: 'Discover', items: ['Operational audit', 'AI Readiness Assessment', 'Stakeholder interviews', 'Pain point mapping'], color: GREEN },
    { num: '02', title: 'Design', items: ['Tool selection', 'Implementation roadmap', 'Change management plan', 'ROI projections'], color: '3B82F6' },
    { num: '03', title: 'Deploy', items: ['Tool setup & config', 'Data integration', 'Custom automations', 'Pilot programs'], color: AMBER },
    { num: '04', title: 'Develop', items: ['Staff training', 'Champion development', 'Performance monitoring', 'Ongoing advisory'], color: '8B5CF6' }
  ];

  phases.forEach((p, i) => {
    const x = 0.5 + i * 3.15;
    // Phase card
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.8, w: 2.95, h: 4.6,
      fill: { color: DEEP_NAVY },
      rectRadius: 0.1
    });

    // Phase number
    slide.addText(p.num, {
      x, y: 1.95, w: 2.95, h: 0.7,
      fontSize: 36, fontFace: 'Calibri', bold: true, color: p.color, align: 'center'
    });

    // Phase title
    slide.addText(p.title, {
      x, y: 2.65, w: 2.95, h: 0.5,
      fontSize: 20, fontFace: 'Calibri', bold: true, color: WHITE, align: 'center'
    });

    // Divider line
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.6, y: 3.25, w: 1.75, h: 0.03, fill: { color: p.color }
    });

    // Items
    p.items.forEach((item, j) => {
      slide.addText(`▸  ${item}`, {
        x: x + 0.3, y: 3.5 + j * 0.55, w: 2.5, h: 0.45,
        fontSize: 12, fontFace: 'Calibri', color: SOFT_GRAY
      });
    });

    // Arrow between phases
    if (i < 3) {
      slide.addText('→', {
        x: x + 2.85, y: 3.6, w: 0.4, h: 0.5,
        fontSize: 24, fontFace: 'Calibri', color: SLATE, align: 'center', valign: 'middle'
      });
    }
  });
}

// ═══════════════════════════════════════
// SLIDE 6: WHAT WE DO (Services Detail)
// ═══════════════════════════════════════
{
  const slide = pptx.addSlide({ masterName: 'LIGHT_MASTER' });
  slide.addNotes(
    'Let me give you concrete examples of what our consulting engagements deliver. These are not theoretical — ' +
    'these are real implementations we can set up for your organization. The key point is that every ' +
    'recommendation is matched to your specific needs, budget, and technical environment. ' +
    'We don\'t push tools that won\'t work with your internet connection or your team\'s skill level.'
  );

  addSlideTitle(slide, 'What We Deliver', { color: NAVY });
  addSubtitle(slide, 'Practical AI solutions matched to your specific business needs');

  const services = [
    { title: 'Operational Audits', desc: 'Map every workflow, identify bottlenecks, score opportunities by impact and ease' },
    { title: 'AI Tool Implementation', desc: 'Set up and configure the right AI tools — chatbots, writing assistants, analytics, automation' },
    { title: 'Custom Automations', desc: 'Build WhatsApp bots, automated reports, invoice processing, and workflow integrations' },
    { title: 'Staff Training', desc: 'Hands-on workshops from AI basics to department-specific advanced sessions' },
    { title: 'Change Management', desc: 'Internal communications, champion programs, and adoption strategies that stick' },
    { title: 'Ongoing Advisory', desc: 'Monthly retainers for support, updates, refresher training, and strategic advice' }
  ];

  services.forEach((s, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.7 + col * 4.15;
    const y = 1.8 + row * 2.5;

    addCard(slide, x, y, 3.85, 2.1);
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.3, y: y + 0.25, w: 0.5, h: 0.06, fill: { color: GREEN }
    });
    slide.addText(s.title, {
      x: x + 0.3, y: y + 0.4, w: 3.3, h: 0.5,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: NAVY
    });
    slide.addText(s.desc, {
      x: x + 0.3, y: y + 1.0, w: 3.3, h: 0.9,
      fontSize: 12, fontFace: 'Calibri', color: CHARCOAL, lineSpacingMultiple: 1.3
    });
  });
}

// ═══════════════════════════════════════
// SLIDE 7: CASE STUDIES / RESULTS
// ═══════════════════════════════════════
{
  const slide = pptx.addSlide({ masterName: 'DARK_MASTER' });
  slide.addNotes(
    'Here are examples of the kind of results we deliver. These statistics represent typical outcomes from ' +
    'AI consulting engagements with businesses similar to yours. When we work with your organization, ' +
    'we\'ll set specific, measurable targets like these and track progress against them. ' +
    'Customize these with actual case studies once you have completed pilot engagements.'
  );

  addSlideTitle(slide, 'Results That Matter');
  addSubtitle(slide, 'Real outcomes from AI implementation in businesses like yours', { color: SOFT_GRAY });

  const cases = [
    { stat: '40%', label: 'Reduction in\nreport generation time', context: 'Finance department — automated monthly reporting', color: GREEN },
    { stat: '15 hrs', label: 'Saved per week\nper department', context: 'Operations — workflow automation and AI assistants', color: '3B82F6' },
    { stat: '3x', label: 'Faster customer\nresponse time', context: 'Customer service — WhatsApp chatbot deployment', color: AMBER },
    { stat: '60%', label: 'Reduction in\nmanual data entry', context: 'HR & Admin — AI-powered document processing', color: '8B5CF6' }
  ];

  cases.forEach((c, i) => {
    const x = 0.5 + i * 3.15;
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.9, w: 2.95, h: 4.2,
      fill: { color: DEEP_NAVY },
      rectRadius: 0.1
    });
    slide.addText(c.stat, {
      x, y: 2.2, w: 2.95, h: 1.0,
      fontSize: 48, fontFace: 'Calibri', bold: true, color: c.color, align: 'center'
    });
    slide.addText(c.label, {
      x: x + 0.2, y: 3.3, w: 2.55, h: 0.8,
      fontSize: 15, fontFace: 'Calibri', bold: true, color: WHITE, align: 'center', lineSpacingMultiple: 1.2
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.6, y: 4.2, w: 1.75, h: 0.03, fill: { color: c.color }
    });
    slide.addText(c.context, {
      x: x + 0.2, y: 4.5, w: 2.55, h: 1.0,
      fontSize: 11, fontFace: 'Calibri', color: SLATE, align: 'center', lineSpacingMultiple: 1.3
    });
  });
}

// ═══════════════════════════════════════
// SLIDE 8: INDUSTRY EXAMPLES
// ═══════════════════════════════════════
{
  const slide = pptx.addSlide({ masterName: 'LIGHT_MASTER' });
  slide.addNotes(
    'AI is not one-size-fits-all. Here are concrete examples of what AI can do in specific industries. ' +
    'When we work with a client, we identify the highest-impact opportunities for their specific sector ' +
    'and prioritize the ones that are easiest to implement first. This builds internal confidence and buy-in ' +
    'before we tackle larger, more complex implementations.'
  );

  addSlideTitle(slide, 'AI by Industry', { color: NAVY });
  addSubtitle(slide, 'Specific, practical applications for every sector');

  const industries = [
    { name: 'Banking', examples: 'Fraud detection, automated KYC, AI-powered loan assessment, customer chatbots' },
    { name: 'Healthcare', examples: 'Appointment scheduling, patient record analysis, diagnostic support, drug interaction checking' },
    { name: 'Logistics', examples: 'Route optimization, demand forecasting, automated supplier comms, inventory prediction' },
    { name: 'Education', examples: 'Automated grading, personalized learning paths, administrative automation, content creation' },
    { name: 'NGOs', examples: 'Grant report generation, impact analysis, donor communication, data collection automation' },
    { name: 'Retail', examples: 'Customer segmentation, pricing optimization, inventory management, WhatsApp commerce bots' }
  ];

  industries.forEach((ind, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.7 + col * 6.15;
    const y = 1.7 + row * 1.65;

    addCard(slide, x, y, 5.85, 1.35);
    slide.addText(ind.name, {
      x: x + 0.3, y: y + 0.15, w: 2, h: 0.45,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: NAVY
    });
    slide.addText(ind.examples, {
      x: x + 0.3, y: y + 0.6, w: 5.3, h: 0.6,
      fontSize: 11.5, fontFace: 'Calibri', color: CHARCOAL, lineSpacingMultiple: 1.25
    });
  });
}

// ═══════════════════════════════════════
// SLIDE 9: TRAINING OVERVIEW
// ═══════════════════════════════════════
{
  const slide = pptx.addSlide({ masterName: 'DARK_MASTER' });
  slide.addNotes(
    'Training is a critical part of every engagement. Technology without adoption is wasted investment. ' +
    'Our training approach is designed for adult learners — short sessions spread over time, with practice ' +
    'in between. We don\'t do 8-hour marathons. We start with building basic AI literacy across the whole ' +
    'organization, then go deeper with department-specific sessions.'
  );

  addSlideTitle(slide, 'Training That Sticks');
  addSubtitle(slide, 'Practical, hands-on training designed for real adoption', { color: SOFT_GRAY });

  const training = [
    { title: 'AI Literacy Foundation', duration: '1 day (4-5 hrs)', audience: 'All staff', desc: 'What AI is, live demos, hands-on prompting exercises, ethics & privacy' },
    { title: 'Department-Specific', duration: '3 sessions × 3 hrs', audience: 'Department teams', desc: 'Tailored to each role — finance, marketing, HR, operations, customer service' },
    { title: 'Executive Briefing', duration: '2 hours', audience: 'C-suite & board', desc: 'AI strategy, ROI understanding, risk management, vendor evaluation' },
    { title: 'Technical Integration', duration: '5-10 days', audience: 'IT team', desc: 'API integrations, custom chatbots, workflow automation, security & compliance' }
  ];

  training.forEach((t, i) => {
    const y = 1.8 + i * 1.25;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.5, y, w: 12.3, h: 1.05,
      fill: { color: DEEP_NAVY },
      rectRadius: 0.08
    });
    // Left accent
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5, y, w: 0.08, h: 1.05, fill: { color: GREEN }
    });

    slide.addText(t.title, {
      x: 0.9, y, w: 3, h: 0.55,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: WHITE
    });
    slide.addText(t.duration, {
      x: 0.9, y: y + 0.5, w: 2, h: 0.4,
      fontSize: 11, fontFace: 'Calibri', color: GREEN
    });
    slide.addText(t.audience, {
      x: 2.8, y: y + 0.5, w: 1.5, h: 0.4,
      fontSize: 11, fontFace: 'Calibri', color: AMBER
    });
    slide.addText(t.desc, {
      x: 4.5, y: y + 0.1, w: 8, h: 0.85,
      fontSize: 12, fontFace: 'Calibri', color: SOFT_GRAY, lineSpacingMultiple: 1.25, valign: 'middle'
    });
  });
}

// ═══════════════════════════════════════
// SLIDE 10: PRICING TIERS
// ═══════════════════════════════════════
{
  const slide = pptx.addSlide({ masterName: 'LIGHT_MASTER' });
  slide.addNotes(
    'We offer three engagement levels to match different organization sizes and needs. ' +
    'Tier 1 Jumpstart is perfect for SMEs who want to test the waters — it\'s a 2-3 day engagement ' +
    'that gives immediate results. Tier 2 Transform is our most popular option for mid-size companies ' +
    'who want a full implementation. Tier 3 Enterprise is for large organizations needing comprehensive ' +
    'digital transformation. All prices are negotiable based on scope.'
  );

  addSlideTitle(slide, 'Investment Options', { color: NAVY });
  addSubtitle(slide, 'Flexible tiers designed for every organization size');

  const tiers = [
    {
      name: 'Jumpstart', target: 'SMEs (5-50 staff)', duration: '2-3 days',
      price: 'TZS 2M – 5M', color: GREEN,
      items: ['Half-day discovery session', 'Top 3-5 AI tool recommendations', '1-2 day staff workshop', 'Practical playbook', '30-day email support']
    },
    {
      name: 'Transform', target: 'Mid-size (50-500 staff)', duration: '2-4 weeks',
      price: 'TZS 10M – 25M', color: '3B82F6',
      items: ['Full operational audit', 'Department AI mapping', 'Tool setup & configuration', 'Role-specific training', '2 custom automations', '60-day support']
    },
    {
      name: 'Enterprise', target: 'Large (500+ staff)', duration: '2-6 months',
      price: 'TZS 50M+', color: AMBER,
      items: ['Comprehensive transformation', 'Executive AI briefings', 'Phased department rollout', 'Custom integrations', 'Change management', '6-month retainer']
    }
  ];

  tiers.forEach((t, i) => {
    const x = 0.5 + i * 4.2;
    const isMiddle = i === 1;

    addCard(slide, x, isMiddle ? 1.6 : 1.8, 3.9, isMiddle ? 5.0 : 4.6);

    // Top color bar
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.15, y: isMiddle ? 1.65 : 1.85, w: 3.6, h: 0.08, fill: { color: t.color }
    });

    if (isMiddle) {
      slide.addShape(pptx.ShapeType.roundRect, {
        x: x + 1.0, y: 1.35, w: 1.9, h: 0.35,
        fill: { color: t.color }, rectRadius: 0.05
      });
      slide.addText('MOST POPULAR', {
        x: x + 1.0, y: 1.35, w: 1.9, h: 0.35,
        fontSize: 9, fontFace: 'Calibri', bold: true, color: WHITE, align: 'center', valign: 'middle'
      });
    }

    const baseY = isMiddle ? 1.85 : 2.05;
    slide.addText(t.name, {
      x: x + 0.2, y: baseY, w: 3.5, h: 0.5,
      fontSize: 22, fontFace: 'Calibri', bold: true, color: NAVY, align: 'center'
    });
    slide.addText(t.target, {
      x: x + 0.2, y: baseY + 0.5, w: 3.5, h: 0.35,
      fontSize: 11, fontFace: 'Calibri', color: SLATE, align: 'center'
    });
    slide.addText(t.price, {
      x: x + 0.2, y: baseY + 0.9, w: 3.5, h: 0.45,
      fontSize: 20, fontFace: 'Calibri', bold: true, color: t.color, align: 'center'
    });
    slide.addText(t.duration, {
      x: x + 0.2, y: baseY + 1.35, w: 3.5, h: 0.3,
      fontSize: 10, fontFace: 'Calibri', color: SLATE, align: 'center'
    });

    // Divider
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.6, y: baseY + 1.75, w: 2.7, h: 0.02, fill: { color: SOFT_GRAY }
    });

    // Items
    t.items.forEach((item, j) => {
      slide.addText(`✓  ${item}`, {
        x: x + 0.4, y: baseY + 1.9 + j * 0.4, w: 3.2, h: 0.35,
        fontSize: 11, fontFace: 'Calibri', color: CHARCOAL
      });
    });
  });
}

// ═══════════════════════════════════════
// SLIDE 11: REVENUE POTENTIAL / ROI
// ═══════════════════════════════════════
{
  const slide = pptx.addSlide({ masterName: 'DARK_MASTER' });
  slide.addNotes(
    'This slide shows the potential return on investment. For a typical Tier 2 engagement at TZS 15 million, ' +
    'we typically see savings of 15+ hours per week across departments. That translates to significant ' +
    'cost savings within the first quarter alone. We measure ROI rigorously and include it in our final report. ' +
    'The retainer model ensures you continue to capture value long after the initial engagement ends.'
  );

  addSlideTitle(slide, 'Return on Investment');
  addSubtitle(slide, 'Your investment pays for itself within the first quarter', { color: SOFT_GRAY });

  // ROI boxes
  const roiItems = [
    { label: 'Average time saved\nper department weekly', value: '15+ hours', color: GREEN },
    { label: 'Typical cost reduction\nin first 6 months', value: '25-40%', color: '3B82F6' },
    { label: 'Customer response\ntime improvement', value: '3x faster', color: AMBER },
    { label: 'Staff productivity\ngain with AI tools', value: '30-50%', color: '8B5CF6' }
  ];

  roiItems.forEach((r, i) => {
    const x = 0.5 + i * 3.15;
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.9, w: 2.95, h: 2.5,
      fill: { color: DEEP_NAVY },
      rectRadius: 0.1
    });
    slide.addText(r.value, {
      x, y: 2.1, w: 2.95, h: 0.9,
      fontSize: 36, fontFace: 'Calibri', bold: true, color: r.color, align: 'center'
    });
    slide.addText(r.label, {
      x: x + 0.2, y: 3.0, w: 2.55, h: 0.9,
      fontSize: 12, fontFace: 'Calibri', color: SOFT_GRAY, align: 'center', lineSpacingMultiple: 1.3
    });
  });

  // Bottom message
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 4.8, w: 12.3, h: 1.4,
    fill: { color: DEEP_NAVY },
    rectRadius: 0.1
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 4.8, w: 0.08, h: 1.4, fill: { color: GREEN }
  });
  slide.addText('"For every TZS 1 million invested in AI consulting, our clients typically see TZS 3-5 million in annual savings through reduced manual work, faster processes, and fewer errors."', {
    x: 1.0, y: 4.9, w: 11.5, h: 1.2,
    fontSize: 15, fontFace: 'Calibri', color: WHITE, italic: true, lineSpacingMultiple: 1.3, valign: 'middle'
  });
}

// ═══════════════════════════════════════
// SLIDE 12: WHY MALON LABS
// ═══════════════════════════════════════
{
  const slide = pptx.addSlide({ masterName: 'LIGHT_MASTER' });
  slide.addNotes(
    'This is our key differentiator slide. Emphasize that we are local, practical, and integrated. ' +
    'Most global consulting firms charge 10x more and deliver generic recommendations. ' +
    'We understand Tanzanian infrastructure, business culture, and regulatory environment. ' +
    'And because we also build software and manage IT, we can implement everything we recommend.'
  );

  addSlideTitle(slide, 'Why Malon Labs', { color: NAVY });
  addSubtitle(slide, 'Five reasons we are the right partner for your AI journey');

  const differentiators = [
    { num: '01', title: 'Local Context Expertise', desc: 'We understand Tanzanian business culture, regulations, and infrastructure limitations — including internet reliability' },
    { num: '02', title: 'Practical, Not Theoretical', desc: 'Every recommendation comes with hands-on implementation. We don\'t just write reports — we build and deploy solutions' },
    { num: '03', title: 'ROI-Focused', desc: 'We measure success in hours saved, costs reduced, and revenue gained. Every engagement includes measurable targets' },
    { num: '04', title: 'Ongoing Partnership', desc: 'We don\'t consult and leave. Our retainer model ensures lasting impact with continuous support and optimization' },
    { num: '05', title: 'Full-Stack Capability', desc: 'Unlike pure consultancies, we have in-house development and IT teams to build and manage whatever we recommend' }
  ];

  differentiators.forEach((d, i) => {
    const y = 1.6 + i * 1.05;
    addCard(slide, 0.7, y, 11.9, 0.85);

    slide.addText(d.num, {
      x: 1.0, y: y + 0.05, w: 0.7, h: 0.75,
      fontSize: 24, fontFace: 'Calibri', bold: true, color: GREEN, valign: 'middle'
    });
    slide.addText(d.title, {
      x: 1.8, y: y + 0.05, w: 3, h: 0.75,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: NAVY, valign: 'middle'
    });
    slide.addText(d.desc, {
      x: 4.8, y: y + 0.05, w: 7.5, h: 0.75,
      fontSize: 12, fontFace: 'Calibri', color: CHARCOAL, valign: 'middle', lineSpacingMultiple: 1.25
    });
  });
}

// ═══════════════════════════════════════
// SLIDE 13: THE PROCESS (Client Journey)
// ═══════════════════════════════════════
{
  const slide = pptx.addSlide({ masterName: 'DARK_MASTER' });
  slide.addNotes(
    'Walk the audience through what the engagement actually looks like from their perspective. ' +
    'This removes uncertainty and makes it easy to say yes. Emphasize that Step 1 — the free consultation — ' +
    'has no obligation. We want to earn their trust before asking for commitment.'
  );

  addSlideTitle(slide, 'Getting Started');
  addSubtitle(slide, 'Your journey from first conversation to measurable results', { color: SOFT_GRAY });

  const steps = [
    { num: '①', title: 'Free Consultation', desc: '30-minute call to understand your business and identify quick wins', time: 'Day 1' },
    { num: '②', title: 'AI Readiness Assessment', desc: 'Complete our structured questionnaire to baseline your current state', time: 'Day 1-3' },
    { num: '③', title: 'Opportunity Report', desc: 'Receive a customized report with prioritized recommendations and ROI projections', time: 'Week 1' },
    { num: '④', title: 'Proposal & Kickoff', desc: 'Agree on scope, timeline, and investment — then we start delivering results', time: 'Week 2' },
    { num: '⑤', title: 'Implementation', desc: 'Tools deployed, staff trained, automations running, measurable outcomes delivered', time: 'Week 3+' }
  ];

  steps.forEach((s, i) => {
    const y = 1.8 + i * 1.0;

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.5, y, w: 12.3, h: 0.85,
      fill: { color: DEEP_NAVY },
      rectRadius: 0.06
    });

    slide.addText(s.num, {
      x: 0.7, y, w: 0.7, h: 0.85,
      fontSize: 24, fontFace: 'Calibri', color: GREEN, valign: 'middle', align: 'center'
    });

    slide.addText(s.title, {
      x: 1.5, y, w: 2.5, h: 0.85,
      fontSize: 16, fontFace: 'Calibri', bold: true, color: WHITE, valign: 'middle'
    });

    slide.addText(s.desc, {
      x: 4.1, y, w: 6.8, h: 0.85,
      fontSize: 12, fontFace: 'Calibri', color: SOFT_GRAY, valign: 'middle', lineSpacingMultiple: 1.2
    });

    slide.addText(s.time, {
      x: 11.0, y, w: 1.6, h: 0.85,
      fontSize: 11, fontFace: 'Calibri', bold: true, color: AMBER, valign: 'middle', align: 'right'
    });
  });
}

// ═══════════════════════════════════════
// SLIDE 14: CTA / CONTACT
// ═══════════════════════════════════════
{
  const slide = pptx.addSlide({ masterName: 'DARK_MASTER' });
  slide.addNotes(
    'This is your closing slide. Make the ask clearly — invite them to book the free consultation. ' +
    'Have the WhatsApp QR code or link ready to share immediately. Leave this slide up during Q&A so ' +
    'the contact information stays visible. Thank them for their time and express genuine interest ' +
    'in helping their specific business.'
  );

  // Large logo
  slide.addImage({
    data: `image/jpeg;base64,${logoBase64}`,
    x: 5.4, y: 0.8, w: 2.5, h: 2.5
  });

  slide.addText('Let\'s Get Started', {
    x: 0.7, y: 3.4, w: 11.9, h: 0.8,
    fontSize: 40, fontFace: 'Calibri', bold: true, color: WHITE, align: 'center'
  });

  slide.addText('Book your free 30-minute AI Opportunity Consultation today', {
    x: 0.7, y: 4.1, w: 11.9, h: 0.5,
    fontSize: 18, fontFace: 'Calibri', color: GREEN, align: 'center'
  });

  // Accent line
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.2, y: 4.8, w: 2.9, h: 0.04, fill: { color: GREEN }
  });

  // Contact details
  const contacts = [
    { icon: '✉', text: 'info@malonlabs.com' },
    { icon: '☎', text: '+255 766 629 933' },
    { icon: '🌐', text: 'malonlabs.com' }
  ];

  contacts.forEach((c, i) => {
    const x = 3.0 + i * 2.8;
    slide.addText(`${c.icon}  ${c.text}`, {
      x, y: 5.1, w: 2.8, h: 0.5,
      fontSize: 14, fontFace: 'Calibri', color: WHITE, align: 'center'
    });
  });

  slide.addText('Smarter Operations. Stronger Business.', {
    x: 0.7, y: 5.9, w: 11.9, h: 0.5,
    fontSize: 16, fontFace: 'Calibri', color: SLATE, align: 'center', italic: true
  });
}

// ─── Write file ───
const outDir = 'deliverables/consulting/pitch-deck';
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'malon-consulting-deck.pptx');
const data = await pptx.write({ outputType: 'nodebuffer' });
fs.writeFileSync(outPath, data);
console.log(`✅ Created ${outPath} (${(data.length / 1024).toFixed(0)} KB)`);
