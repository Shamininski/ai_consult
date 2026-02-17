import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, BorderStyle, WidthType,
  HeadingLevel, PageNumber, TabStopPosition, TabStopType,
  ImageRun, ShadingType, TableLayoutType
} from 'docx';
import fs from 'fs';
import path from 'path';

// ─── Brand colors ───
const NAVY = '1E2637';
const GREEN = '1A8F6E';
const AMBER = 'F5A623';
const CHARCOAL = '2D3748';
const SLATE = '718096';
const SOFT_GRAY = 'E8EDF3';
const WHITE = 'FFFFFF';

// ─── Logo ───
const logoPath = path.resolve('brand/logo/malon-logo-primary.jpeg');
const logoBuffer = fs.readFileSync(logoPath);

// ─── Helper: blank paragraph ───
function spacer(pts = 6) {
  return new Paragraph({ spacing: { before: pts * 20, after: pts * 20 } });
}

// ─── Helper: section heading ───
function sectionHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 300, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GREEN } },
    children: [
      new TextRun({ text, bold: true, size: 28, color: NAVY, font: 'Calibri' })
    ]
  });
}

// ─── Helper: question block ───
function question(num, text, type = 'lines', options = []) {
  const items = [
    new Paragraph({
      spacing: { before: 200, after: 60 },
      children: [
        new TextRun({ text: `${num}. `, bold: true, size: 22, color: NAVY, font: 'Calibri' }),
        new TextRun({ text, size: 22, color: CHARCOAL, font: 'Calibri' })
      ]
    })
  ];

  if (type === 'lines') {
    // Two blank answer lines
    for (let i = 0; i < 2; i++) {
      items.push(new Paragraph({
        spacing: { before: 80, after: 0 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: SOFT_GRAY.replace('#', '') } },
        children: [new TextRun({ text: ' ', size: 22, font: 'Calibri' })]
      }));
    }
  } else if (type === 'scale') {
    items.push(new Paragraph({
      spacing: { before: 60, after: 40 },
      children: [
        new TextRun({ text: '    1 — Not at all    ', size: 20, color: SLATE, font: 'Calibri' }),
        new TextRun({ text: '2 — Minimal    ', size: 20, color: SLATE, font: 'Calibri' }),
        new TextRun({ text: '3 — Moderate    ', size: 20, color: SLATE, font: 'Calibri' }),
        new TextRun({ text: '4 — Good    ', size: 20, color: SLATE, font: 'Calibri' }),
        new TextRun({ text: '5 — Excellent', size: 20, color: SLATE, font: 'Calibri' })
      ]
    }));
    items.push(new Paragraph({
      spacing: { before: 40, after: 40 },
      children: [new TextRun({ text: '    Your rating: _____', size: 22, color: CHARCOAL, font: 'Calibri' })]
    }));
  } else if (type === 'checkbox') {
    for (const opt of options) {
      items.push(new Paragraph({
        spacing: { before: 40, after: 20 },
        indent: { left: 360 },
        children: [
          new TextRun({ text: '☐  ', size: 22, font: 'Calibri' }),
          new TextRun({ text: opt, size: 22, color: CHARCOAL, font: 'Calibri' })
        ]
      }));
    }
  } else if (type === 'yesno') {
    items.push(new Paragraph({
      spacing: { before: 60, after: 40 },
      indent: { left: 360 },
      children: [
        new TextRun({ text: '☐ Yes     ☐ No     ☐ Not sure', size: 22, color: CHARCOAL, font: 'Calibri' })
      ]
    }));
  }

  return items;
}

// ─── Build document ───
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: 'Calibri', size: 22, color: CHARCOAL }
      }
    }
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, bottom: 1200, left: 1200, right: 1200 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 100 },
            children: [
              new ImageRun({
                data: logoBuffer,
                transformation: { width: 110, height: 110 },
                type: 'jpg'
              }),
              new TextRun({ text: '    ', size: 22 }),
              new TextRun({
                text: 'Malon Labs Consulting',
                bold: true, size: 24, color: NAVY, font: 'Calibri'
              }),
              new TextRun({
                text: '  |  AI Readiness Assessment',
                size: 20, color: SLATE, font: 'Calibri'
              })
            ]
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            border: { top: { style: BorderStyle.SINGLE, size: 1, color: SOFT_GRAY.replace('#', '') } },
            spacing: { before: 100 },
            children: [
              new TextRun({ text: 'Confidential — Malon Labs Ltd  |  malonlabs.com  |  +255 766 629 933  |  Page ', size: 16, color: SLATE, font: 'Calibri' }),
              new TextRun({ children: [PageNumber.CURRENT], size: 16, color: SLATE, font: 'Calibri' })
            ]
          })
        ]
      })
    },
    children: [
      // ─── TITLE PAGE ───
      spacer(40),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new ImageRun({
            data: logoBuffer,
            transformation: { width: 180, height: 180 },
            type: 'jpg'
          })
        ]
      }),
      spacer(12),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'AI Readiness Assessment', bold: true, size: 56, color: NAVY, font: 'Calibri' })
        ]
      }),
      spacer(4),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'Malon Labs Consulting', size: 28, color: GREEN, font: 'Calibri' })
        ]
      }),
      spacer(20),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'This assessment helps us understand your organization\'s current technology landscape, ', size: 22, color: CHARCOAL, font: 'Calibri' }),
          new TextRun({ text: 'pain points, and readiness for AI adoption. Your answers will be used to create a ', size: 22, color: CHARCOAL, font: 'Calibri' }),
          new TextRun({ text: 'customized AI opportunity report and implementation roadmap.', size: 22, color: CHARCOAL, font: 'Calibri' })
        ]
      }),
      spacer(16),

      // ─── CLIENT INFO TABLE ───
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        layout: TableLayoutType.FIXED,
        rows: [
          ['Company Name', ''],
          ['Industry / Sector', ''],
          ['Number of Employees', ''],
          ['Contact Person & Role', ''],
          ['Email / Phone', ''],
          ['Date', ''],
          ['Completed By', '']
        ].map(([label, val]) =>
          new TableRow({
            children: [
              new TableCell({
                width: { size: 35, type: WidthType.PERCENTAGE },
                shading: { type: ShadingType.SOLID, color: NAVY },
                children: [new Paragraph({
                  spacing: { before: 60, after: 60 },
                  children: [new TextRun({ text: label, bold: true, size: 20, color: WHITE, font: 'Calibri' })]
                })]
              }),
              new TableCell({
                width: { size: 65, type: WidthType.PERCENTAGE },
                children: [new Paragraph({
                  spacing: { before: 60, after: 60 },
                  children: [new TextRun({ text: val || ' ', size: 20, font: 'Calibri' })]
                })]
              })
            ]
          })
        )
      }),

      // ─── PAGE BREAK ───
      new Paragraph({ pageBreakBefore: true, children: [] }),

      // ═══════════════════════════════════════
      // SECTION 1: COMPANY & TECHNOLOGY OVERVIEW
      // ═══════════════════════════════════════
      sectionHeading('Section 1: Company & Technology Overview'),

      ...question(1, 'What are your company\'s core products or services?', 'lines'),
      ...question(2, 'What technology tools and systems does your organization currently use? (Select all that apply)', 'checkbox', [
        'Microsoft Office / Microsoft 365',
        'Google Workspace (Gmail, Docs, Sheets)',
        'Accounting software (QuickBooks, Tally, Sage, etc.)',
        'CRM / Customer management system',
        'ERP / Enterprise resource planning',
        'Custom-built internal software',
        'WhatsApp Business',
        'Social media management tools',
        'Other: ___________________________'
      ]),
      ...question(3, 'How would you rate your organization\'s overall technology maturity?', 'scale'),
      ...question(4, 'How reliable is your internet connectivity?', 'checkbox', [
        'Consistently fast and reliable',
        'Generally good with occasional outages',
        'Unreliable — frequent disruptions',
        'We rely primarily on mobile data'
      ]),

      // ═══════════════════════════════════════
      // SECTION 2: PAIN POINTS & WORKFLOWS
      // ═══════════════════════════════════════
      sectionHeading('Section 2: Pain Points & Workflows'),

      ...question(5, 'What are the top 3 tasks or processes that consume the most staff time in your organization?', 'lines'),
      ...question(6, 'Which of these pain points does your team experience regularly? (Select all that apply)', 'checkbox', [
        'Manual, repetitive data entry',
        'Slow report generation or document creation',
        'Difficulty finding information across systems',
        'Inconsistent customer response times',
        'Scheduling and coordination challenges',
        'Inventory or supply chain tracking issues',
        'High volume of routine customer inquiries',
        'Staff spending time on tasks below their skill level',
        'Other: ___________________________'
      ]),
      ...question(7, 'Estimate the hours per week your team spends on manual, repetitive tasks that could potentially be automated.', 'checkbox', [
        'Less than 5 hours',
        '5–15 hours',
        '15–30 hours',
        '30–50 hours',
        'More than 50 hours'
      ]),
      ...question(8, 'Which departments would benefit most from improved efficiency? (Rank top 3)', 'lines'),

      // ═══════════════════════════════════════
      // SECTION 3: AI AWARENESS & TEAM READINESS
      // ═══════════════════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      sectionHeading('Section 3: AI Awareness & Team Readiness'),

      ...question(9, 'How familiar is your leadership team with AI and automation tools?', 'scale'),
      ...question(10, 'Does anyone in your organization currently use AI tools (ChatGPT, Copilot, Gemini, etc.) in their work?', 'checkbox', [
        'Yes — widely used across the organization',
        'Yes — a few individuals use them informally',
        'No — but there is interest',
        'No — and there is skepticism or resistance'
      ]),
      ...question(11, 'How open is your team to adopting new technology tools?', 'scale'),
      ...question(12, 'Do you have an internal IT team or dedicated technical staff?', 'checkbox', [
        'Yes — dedicated IT department',
        'Yes — 1-2 technical staff',
        'No — we outsource IT support',
        'No — no dedicated IT capacity'
      ]),
      ...question(13, 'What concerns, if any, does your organization have about adopting AI? (Select all that apply)', 'checkbox', [
        'Cost / return on investment unclear',
        'Data privacy and security risks',
        'Staff resistance to change',
        'Lack of technical knowledge',
        'Internet reliability',
        'Not sure which tools are trustworthy',
        'Fear of job displacement among staff',
        'Regulatory or compliance concerns',
        'None — we are ready to explore'
      ]),

      // ═══════════════════════════════════════
      // SECTION 4: GOALS & PRIORITIES
      // ═══════════════════════════════════════
      sectionHeading('Section 4: Goals & Priorities'),

      ...question(14, 'What is the primary business outcome you hope AI can help achieve?', 'checkbox', [
        'Reduce operational costs',
        'Save staff time on repetitive tasks',
        'Improve customer service and response time',
        'Generate better reports and insights',
        'Increase revenue or sales',
        'Improve internal communication',
        'Gain competitive advantage in our market',
        'Other: ___________________________'
      ]),
      ...question(15, 'If we could solve ONE problem with AI in the next 30 days, what would it be?', 'lines'),
      ...question(16, 'Are there specific AI tools or capabilities you have heard about and want to explore?', 'lines'),

      // ═══════════════════════════════════════
      // SECTION 5: BUDGET & TIMELINE
      // ═══════════════════════════════════════
      new Paragraph({ pageBreakBefore: true, children: [] }),
      sectionHeading('Section 5: Budget & Timeline'),

      ...question(17, 'What is your approximate budget range for AI consulting and implementation?', 'checkbox', [
        'Under TZS 2,000,000 (Exploring options)',
        'TZS 2,000,000 – 5,000,000 (Jumpstart engagement)',
        'TZS 5,000,000 – 25,000,000 (Full implementation)',
        'TZS 25,000,000+ (Enterprise transformation)',
        'Not yet determined — need guidance'
      ]),
      ...question(18, 'How soon would you like to begin an AI implementation project?', 'checkbox', [
        'Immediately — within the next 2 weeks',
        'Short-term — within 1-2 months',
        'Medium-term — within 3-6 months',
        'We are in the research phase'
      ]),
      ...question(19, 'Would your organization be interested in ongoing AI advisory and support after the initial engagement?', 'yesno'),
      ...question(20, 'Is there anything else you would like us to know about your organization, challenges, or goals?', 'lines'),

      // ─── CLOSING ───
      spacer(12),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        shading: { type: ShadingType.SOLID, color: NAVY },
        spacing: { before: 200, after: 0 },
        children: [
          new TextRun({ text: ' ', size: 10 })
        ]
      }),
      spacer(6),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'Thank you for completing this assessment.', bold: true, size: 24, color: NAVY, font: 'Calibri' })
        ]
      }),
      spacer(4),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: 'A Malon Labs consultant will review your responses and prepare a customized ',
            size: 22, color: CHARCOAL, font: 'Calibri'
          }),
          new TextRun({
            text: 'AI Opportunity Report within 5 business days.',
            bold: true, size: 22, color: GREEN, font: 'Calibri'
          })
        ]
      }),
      spacer(8),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'Contact us: ', size: 20, color: SLATE, font: 'Calibri' }),
          new TextRun({ text: 'info@malonlabs.com', bold: true, size: 20, color: NAVY, font: 'Calibri' }),
          new TextRun({ text: '  |  ', size: 20, color: SLATE, font: 'Calibri' }),
          new TextRun({ text: '+255 766 629 933', bold: true, size: 20, color: NAVY, font: 'Calibri' }),
          new TextRun({ text: '  |  ', size: 20, color: SLATE, font: 'Calibri' }),
          new TextRun({ text: 'malonlabs.com', bold: true, size: 20, color: NAVY, font: 'Calibri' })
        ]
      })
    ]
  }]
});

// ─── Write file ───
const outDir = 'deliverables/consulting/assessment';
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'ai-readiness-assessment.docx');
const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buffer);
console.log(`✅ Created ${outPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
