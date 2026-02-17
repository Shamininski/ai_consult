import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, BorderStyle, WidthType,
  HeadingLevel, PageNumber, ImageRun, ShadingType, TableLayoutType,
  TableOfContents, StyleLevel, LevelFormat, convertInchesToTwip,
  Tab, TabStopType, TabStopPosition
} from 'docx';
import fs from 'fs';
import path from 'path';

// ─── Brand colors ───
const NAVY    = '1E2637';
const GREEN   = '1A8F6E';
const AMBER   = 'F5A623';
const CHARCOAL= '2D3748';
const SLATE   = '718096';
const SOFT_GRAY = 'E8EDF3';
const WHITE   = 'FFFFFF';
const ICE     = 'F7F9FC';
const DEEP_NAVY = '141C2B';

// ─── Logo ───
const logoPath = path.resolve('brand/logo/malon-logo-primary.jpeg');
const logoBuffer = fs.readFileSync(logoPath);

// ─── Helpers ───
function spacer(pts = 6) {
  return new Paragraph({ spacing: { before: pts * 20, after: pts * 20 }, children: [] });
}

function sectionHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: GREEN } },
    children: [
      new TextRun({ text, bold: true, size: 32, color: NAVY, font: 'Calibri' })
    ]
  });
}

function subHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 100 },
    children: [
      new TextRun({ text, bold: true, size: 26, color: NAVY, font: 'Calibri' })
    ]
  });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 80 },
    alignment: opts.align || AlignmentType.LEFT,
    children: [
      new TextRun({
        text,
        size: 22,
        color: opts.color || CHARCOAL,
        font: 'Calibri',
        bold: opts.bold || false,
        italics: opts.italic || false
      })
    ]
  });
}

function richParagraph(runs, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.before || 60, after: opts.after || 80 },
    alignment: opts.align || AlignmentType.LEFT,
    children: runs
  });
}

function run(text, opts = {}) {
  return new TextRun({
    text,
    size: opts.size || 22,
    color: opts.color || CHARCOAL,
    font: 'Calibri',
    bold: opts.bold || false,
    italics: opts.italic || false
  });
}

function placeholder(text) {
  return new TextRun({
    text,
    size: 22,
    color: AMBER,
    font: 'Calibri',
    bold: true,
    highlight: 'yellow'
  });
}

function placeholderParagraph(text) {
  return new Paragraph({
    spacing: { before: 60, after: 80 },
    children: [placeholder(text)]
  });
}

function bulletPoint(text, level = 0) {
  return new Paragraph({
    spacing: { before: 40, after: 40 },
    indent: { left: 360 + (level * 360) },
    children: [
      run('•  ', { bold: true, color: GREEN }),
      run(text)
    ]
  });
}

function tableHeader(cells) {
  return new TableRow({
    tableHeader: true,
    children: cells.map(text =>
      new TableCell({
        shading: { type: ShadingType.SOLID, color: NAVY },
        children: [new Paragraph({
          spacing: { before: 60, after: 60 },
          children: [new TextRun({ text, bold: true, size: 20, color: WHITE, font: 'Calibri' })]
        })]
      })
    )
  });
}

function tableRow(cells, shade = false) {
  return new TableRow({
    children: cells.map(text =>
      new TableCell({
        shading: shade ? { type: ShadingType.SOLID, color: ICE } : undefined,
        children: [new Paragraph({
          spacing: { before: 50, after: 50 },
          children: typeof text === 'string'
            ? [new TextRun({ text, size: 20, color: CHARCOAL, font: 'Calibri' })]
            : text
        })]
      })
    )
  });
}

function makeTable(headerCells, rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    rows: [
      tableHeader(headerCells),
      ...rows.map((row, i) => tableRow(row, i % 2 === 1))
    ]
  });
}

function confidentialNotice() {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 100, after: 0 },
    shading: { type: ShadingType.SOLID, color: ICE },
    border: {
      top: { style: BorderStyle.SINGLE, size: 1, color: SOFT_GRAY },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: SOFT_GRAY },
      left: { style: BorderStyle.SINGLE, size: 1, color: SOFT_GRAY },
      right: { style: BorderStyle.SINGLE, size: 1, color: SOFT_GRAY }
    },
    children: [
      new TextRun({
        text: 'CONFIDENTIAL — This document is prepared exclusively for ',
        size: 18, color: SLATE, font: 'Calibri', italics: true
      }),
      placeholder('[CLIENT NAME]'),
      new TextRun({
        text: ' and should not be shared without written consent from Malon Labs Ltd.',
        size: 18, color: SLATE, font: 'Calibri', italics: true
      })
    ]
  });
}

// ─── Build Document ───
const doc = new Document({
  features: { updateFields: true },
  styles: {
    default: {
      document: {
        run: { font: 'Calibri', size: 22, color: CHARCOAL }
      },
      heading1: {
        run: { font: 'Calibri', size: 32, bold: true, color: NAVY }
      },
      heading2: {
        run: { font: 'Calibri', size: 26, bold: true, color: NAVY }
      }
    }
  },
  numbering: {
    config: [{
      reference: 'terms-numbering',
      levels: [{
        level: 0,
        format: LevelFormat.DECIMAL,
        text: '%1.',
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 360 } } }
      }]
    }]
  },
  sections: [
    // ═══════════════════════════════════════
    // COVER PAGE (Section 1 — no header/footer)
    // ═══════════════════════════════════════
    {
      properties: {
        page: {
          margin: { top: 1440, bottom: 1200, left: 1200, right: 1200 }
        }
      },
      children: [
        spacer(30),
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
        spacer(10),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'Service Proposal', bold: true, size: 60, color: NAVY, font: 'Calibri' })
          ]
        }),
        spacer(4),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'AI & IT Consulting Services', size: 28, color: GREEN, font: 'Calibri' })
          ]
        }),
        spacer(16),

        // Cover info table
        new Table({
          width: { size: 70, type: WidthType.PERCENTAGE },
          layout: TableLayoutType.FIXED,
          rows: [
            ['Prepared For', '[CLIENT NAME]'],
            ['Prepared By', 'Malon Labs Consulting'],
            ['Date', '[DATE]'],
            ['Proposal Reference', '[REF-XXXX]'],
            ['Validity', '30 days from issue date'],
            ['Version', '1.0']
          ].map(([label, val]) =>
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 40, type: WidthType.PERCENTAGE },
                  shading: { type: ShadingType.SOLID, color: NAVY },
                  children: [new Paragraph({
                    spacing: { before: 60, after: 60 },
                    children: [new TextRun({ text: label, bold: true, size: 20, color: WHITE, font: 'Calibri' })]
                  })]
                }),
                new TableCell({
                  width: { size: 60, type: WidthType.PERCENTAGE },
                  children: [new Paragraph({
                    spacing: { before: 60, after: 60 },
                    children: val.startsWith('[')
                      ? [placeholder(val)]
                      : [new TextRun({ text: val, size: 20, color: CHARCOAL, font: 'Calibri' })]
                  })]
                })
              ]
            })
          )
        }),

        spacer(24),
        confidentialNotice()
      ]
    },

    // ═══════════════════════════════════════
    // MAIN CONTENT (Section 2 — with header/footer + TOC)
    // ═══════════════════════════════════════
    {
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
              spacing: { after: 80 },
              border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: SOFT_GRAY } },
              children: [
                new ImageRun({
                  data: logoBuffer,
                  transformation: { width: 80, height: 80 },
                  type: 'jpg'
                }),
                run('    '),
                run('Malon Labs Consulting', { bold: true, size: 20, color: NAVY }),
                run('  |  Service Proposal for ', { size: 18, color: SLATE }),
                placeholder('[CLIENT NAME]')
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
              border: { top: { style: BorderStyle.SINGLE, size: 1, color: SOFT_GRAY } },
              spacing: { before: 80 },
              children: [
                run('Confidential — Malon Labs Ltd  |  malonlabs.com  |  +255 766 629 933  |  Page ', { size: 16, color: SLATE }),
                new TextRun({ children: [PageNumber.CURRENT], size: 16, color: SLATE, font: 'Calibri' }),
                run(' of ', { size: 16, color: SLATE }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: SLATE, font: 'Calibri' })
              ]
            })
          ]
        })
      },
      children: [
        // ─── TABLE OF CONTENTS ───
        new Paragraph({
          spacing: { before: 100, after: 200 },
          children: [
            new TextRun({ text: 'Table of Contents', bold: true, size: 32, color: NAVY, font: 'Calibri' })
          ]
        }),
        new TableOfContents('Table of Contents', {
          hyperlink: true,
          headingStyleRange: '1-2'
        }),

        // ═══════════════════════════════════════
        // 1. EXECUTIVE SUMMARY
        // ═══════════════════════════════════════
        new Paragraph({ pageBreakBefore: true, children: [] }),
        sectionHeading('1. Executive Summary'),

        bodyText(
          'Malon Labs Ltd is pleased to present this proposal to support [CLIENT NAME] in achieving measurable ' +
          'operational improvements through strategic implementation of AI and technology solutions.'
        ),
        spacer(4),
        richParagraph([
          placeholder('[CLIENT NAME]'),
          run(' operates in the '),
          placeholder('[INDUSTRY/SECTOR]'),
          run(' sector and has identified key opportunities to reduce manual workload, improve decision-making, ' +
              'and increase overall business efficiency through targeted AI adoption.')
        ]),
        spacer(4),
        bodyText(
          'Following our initial discovery session, we have identified the following priority areas:'
        ),
        bulletPoint('[PRIORITY AREA 1 — e.g., Automate monthly financial reporting]'),
        bulletPoint('[PRIORITY AREA 2 — e.g., Deploy WhatsApp chatbot for customer inquiries]'),
        bulletPoint('[PRIORITY AREA 3 — e.g., Streamline HR onboarding documentation]'),
        spacer(4),
        richParagraph([
          run('This engagement is designed to deliver '),
          run('concrete, measurable results within [TIMELINE]', { bold: true }),
          run(', with clear milestones and ongoing support to ensure successful adoption.')
        ]),

        // ═══════════════════════════════════════
        // 2. COMPANY BACKGROUND
        // ═══════════════════════════════════════
        new Paragraph({ pageBreakBefore: true, children: [] }),
        sectionHeading('2. About Malon Labs'),

        subHeading('2.1 Who We Are'),
        bodyText(
          'Malon Labs Ltd is a Tanzanian technology company offering three integrated service lines: ' +
          'Software & App Development, Managed IT Services, and AI & IT Consulting. We build, manage, ' +
          'and optimize technology so our clients can focus on their business.'
        ),
        spacer(4),
        bodyText(
          'Our consulting division — Malon Labs Consulting — specializes in helping organizations increase ' +
          'efficiency and productivity through strategic implementation of AI tools, operational audits, ' +
          'staff training, and workflow automation.'
        ),

        subHeading('2.2 Why Malon Labs'),
        bulletPoint('Local expertise — we understand Tanzanian business realities, infrastructure challenges, and regulatory context'),
        bulletPoint('Integrated services — consulting backed by in-house development and IT management capability'),
        bulletPoint('Practical approach — we focus on tools that work with your existing systems and connectivity'),
        bulletPoint('Measurable outcomes — every recommendation comes with a projected ROI and success metric'),
        bulletPoint('Ongoing partnership — we do not just advise and leave; we support implementation and adoption'),

        subHeading('2.3 Relevant Experience'),
        placeholderParagraph('[INSERT 2-3 RELEVANT CASE STUDIES OR PROJECT SUMMARIES]'),
        spacer(2),
        bodyText('Example format:', { italic: true, color: SLATE }),
        bulletPoint('[CLIENT TYPE] — [INDUSTRY]: [Brief description of challenge, solution, and result]'),
        bulletPoint('[CLIENT TYPE] — [INDUSTRY]: [Brief description of challenge, solution, and result]'),

        // ═══════════════════════════════════════
        // 3. UNDERSTANDING YOUR NEEDS
        // ═══════════════════════════════════════
        new Paragraph({ pageBreakBefore: true, children: [] }),
        sectionHeading('3. Understanding Your Needs'),

        subHeading('3.1 Current Situation'),
        richParagraph([
          run('Based on our discovery session with '),
          placeholder('[CLIENT NAME]'),
          run(' on '),
          placeholder('[DISCOVERY DATE]'),
          run(', we understand the following about your current operations:')
        ]),
        spacer(2),
        placeholderParagraph('[DESCRIBE CLIENT\'S CURRENT STATE — technology stack, team size, key processes, pain points identified during discovery]'),

        subHeading('3.2 Key Challenges Identified'),
        makeTable(
          ['#', 'Challenge', 'Impact', 'Department(s) Affected'],
          [
            ['1', '[CHALLENGE 1]', '[High/Medium/Low]', '[DEPARTMENT]'],
            ['2', '[CHALLENGE 2]', '[High/Medium/Low]', '[DEPARTMENT]'],
            ['3', '[CHALLENGE 3]', '[High/Medium/Low]', '[DEPARTMENT]'],
            ['4', '[CHALLENGE 4]', '[High/Medium/Low]', '[DEPARTMENT]']
          ].map(row => row.map(cell => cell.startsWith('[') ? [placeholder(cell)] : cell))
        ),

        subHeading('3.3 Opportunities'),
        bodyText(
          'Based on our analysis, the following opportunities have been scored using our Impact × Ease matrix:'
        ),
        spacer(2),
        makeTable(
          ['Opportunity', 'Impact', 'Ease of Implementation', 'Priority'],
          [
            ['[OPPORTUNITY 1]', 'High', 'Easy', 'Phase 1'],
            ['[OPPORTUNITY 2]', 'High', 'Moderate', 'Phase 1'],
            ['[OPPORTUNITY 3]', 'Medium', 'Easy', 'Phase 2'],
            ['[OPPORTUNITY 4]', 'Medium', 'Hard', 'Phase 3']
          ].map(row => row.map(cell => cell.startsWith('[') ? [placeholder(cell)] : cell))
        ),

        // ═══════════════════════════════════════
        // 4. SCOPE OF WORK
        // ═══════════════════════════════════════
        new Paragraph({ pageBreakBefore: true, children: [] }),
        sectionHeading('4. Scope of Work'),

        bodyText(
          'This section details the specific activities, deliverables, and outcomes included in this engagement.'
        ),

        subHeading('4.1 Service Tier'),
        richParagraph([
          run('Recommended engagement level: '),
          run('[TIER 1 — Jumpstart / TIER 2 — Transform / TIER 3 — Enterprise]', { bold: true, color: GREEN })
        ]),

        subHeading('4.2 Phase 1: Discovery & Assessment'),
        bulletPoint('AI Readiness Assessment (standardized questionnaire)'),
        bulletPoint('Workflow mapping with department heads (30-60 min per department)'),
        bulletPoint('Opportunity scoring and prioritization matrix'),
        bulletPoint('Tool matching and recommendation report'),
        placeholderParagraph('[ADD/REMOVE ITEMS BASED ON AGREED SCOPE]'),

        subHeading('4.3 Phase 2: Implementation'),
        bulletPoint('[SCOPE ITEM 1 — e.g., Configure and deploy WhatsApp Business chatbot]'),
        bulletPoint('[SCOPE ITEM 2 — e.g., Set up automated report generation for finance team]'),
        bulletPoint('[SCOPE ITEM 3 — e.g., Integrate AI writing assistant for marketing department]'),
        bulletPoint('[SCOPE ITEM 4 — e.g., Build custom automation workflow for order processing]'),
        placeholderParagraph('[CUSTOMIZE BASED ON CLIENT NEEDS AND TIER]'),

        subHeading('4.4 Phase 3: Training & Adoption'),
        bulletPoint('AI Literacy Foundation workshop (all staff, 4-5 hours)'),
        bulletPoint('Department-specific training sessions (3 sessions × 3 hours per department)'),
        bulletPoint('Executive briefing for leadership team (2 hours)'),
        bulletPoint('Internal champion identification and mentoring'),
        placeholderParagraph('[ADJUST TRAINING SCOPE BASED ON TIER AND DEPARTMENTS]'),

        subHeading('4.5 Phase 4: Support & Optimization'),
        bulletPoint('Post-implementation review (2-4 weeks after go-live)'),
        bulletPoint('Performance measurement against agreed KPIs'),
        bulletPoint('Adjustment and optimization recommendations'),
        bulletPoint('[DURATION]-day follow-up support included'),

        subHeading('4.6 Out of Scope'),
        bodyText(
          'The following items are not included in this engagement but can be added as separate work orders:'
        ),
        placeholderParagraph('[LIST ITEMS EXPLICITLY EXCLUDED — e.g., custom software development, hardware procurement, third-party license costs]'),

        // ═══════════════════════════════════════
        // 5. DELIVERABLES
        // ═══════════════════════════════════════
        new Paragraph({ pageBreakBefore: true, children: [] }),
        sectionHeading('5. Deliverables'),

        bodyText('The following tangible outputs will be provided as part of this engagement:'),
        spacer(4),
        makeTable(
          ['#', 'Deliverable', 'Format', 'Delivered By'],
          [
            ['1', 'AI Readiness Assessment Report', 'PDF / DOCX', 'End of Phase 1'],
            ['2', 'Opportunity Scoring Matrix', 'Excel / PDF', 'End of Phase 1'],
            ['3', 'Implementation Roadmap', 'PDF / PPTX', 'End of Phase 1'],
            ['4', '[TOOL/SYSTEM 1] — configured and tested', 'Live system', 'End of Phase 2'],
            ['5', '[TOOL/SYSTEM 2] — configured and tested', 'Live system', 'End of Phase 2'],
            ['6', 'Staff Training Materials & Recordings', 'PDF + Video', 'End of Phase 3'],
            ['7', 'AI Playbook (customized for your organization)', 'PDF / DOCX', 'End of Phase 3'],
            ['8', 'Final Report with ROI Analysis', 'PDF / PPTX', 'End of Phase 4']
          ].map(row => row.map(cell => cell.startsWith('[') ? [placeholder(cell)] : cell))
        ),

        // ═══════════════════════════════════════
        // 6. TIMELINE
        // ═══════════════════════════════════════
        new Paragraph({ pageBreakBefore: true, children: [] }),
        sectionHeading('6. Timeline'),

        richParagraph([
          run('Estimated project duration: '),
          placeholder('[TOTAL DURATION — e.g., 6-8 weeks]')
        ]),
        spacer(4),
        makeTable(
          ['Phase', 'Activities', 'Duration', 'Key Milestone'],
          [
            ['Phase 1: Discovery', 'Assessment, workflow mapping, opportunity scoring', '[1-2 weeks]', 'Roadmap presented'],
            ['Phase 2: Implementation', 'Tool setup, configuration, integration, testing', '[2-4 weeks]', 'Systems go-live'],
            ['Phase 3: Training', 'Foundation workshop, department sessions, executive briefing', '[1-2 weeks]', 'Training complete'],
            ['Phase 4: Support', 'Post-launch review, optimization, KPI measurement', '[2-4 weeks]', 'Final report delivered']
          ].map(row => row.map(cell => cell.startsWith('[') ? [placeholder(cell)] : cell))
        ),
        spacer(4),
        bodyText(
          'Note: Timeline is indicative and will be confirmed during the project kickoff meeting. ' +
          'Delays caused by client-side availability or approvals may extend the timeline.',
          { italic: true, color: SLATE }
        ),

        // ═══════════════════════════════════════
        // 7. INVESTMENT
        // ═══════════════════════════════════════
        new Paragraph({ pageBreakBefore: true, children: [] }),
        sectionHeading('7. Investment'),

        bodyText(
          'The following fee structure applies to this engagement. All prices are in Tanzanian Shillings (TZS) and exclusive of VAT unless stated otherwise.'
        ),
        spacer(4),

        subHeading('7.1 Project Fees'),
        makeTable(
          ['Component', 'Description', 'Fee (TZS)'],
          [
            ['Discovery & Assessment', 'AI readiness assessment, workflow mapping, opportunity report', '[AMOUNT]'],
            ['Implementation', 'Tool setup, configuration, integration, and testing', '[AMOUNT]'],
            ['Training Program', 'Foundation + department-specific + executive briefing', '[AMOUNT]'],
            ['Post-Launch Support', '[DURATION] days of follow-up support', 'Included'],
            ['', '', ''],
            ['Total Investment', '', '[TOTAL AMOUNT]']
          ].map(row => row.map(cell => cell.startsWith('[') ? [placeholder(cell)] : cell))
        ),

        subHeading('7.2 Payment Schedule'),
        makeTable(
          ['Milestone', 'Percentage', 'Amount (TZS)', 'Due Date'],
          [
            ['Contract signing', '40%', '[AMOUNT]', '[DATE]'],
            ['Phase 2 kickoff', '30%', '[AMOUNT]', '[DATE]'],
            ['Project completion', '30%', '[AMOUNT]', '[DATE]']
          ].map(row => row.map(cell => cell.startsWith('[') ? [placeholder(cell)] : cell))
        ),

        subHeading('7.3 Optional Add-Ons'),
        makeTable(
          ['Service', 'Description', 'Fee (TZS)'],
          [
            ['Monthly Retainer (Basic)', 'Email support, monthly tool update brief', '500,000/mo'],
            ['Monthly Retainer (Standard)', 'Above + monthly check-in, quarterly refresher', '1,500,000/mo'],
            ['Monthly Retainer (Premium)', 'Above + dedicated channel, priority support, strategy calls', '3,000,000 – 5,000,000/mo'],
            ['Additional Training', 'Per department, per session', '1,500,000 – 2,500,000'],
            ['Custom Development', 'Bespoke integrations or tools', 'Quoted separately']
          ]
        ),

        spacer(4),
        bodyText('Payment methods accepted: Bank transfer, Mobile Money (M-Pesa/Tigo Pesa), or cheque.'),

        // ═══════════════════════════════════════
        // 8. TERMS & CONDITIONS
        // ═══════════════════════════════════════
        new Paragraph({ pageBreakBefore: true, children: [] }),
        sectionHeading('8. Terms & Conditions'),

        subHeading('8.1 Acceptance'),
        bodyText(
          'This proposal is valid for 30 days from the date of issue. To accept, please sign and return ' +
          'a copy of this document or confirm acceptance in writing via email to info@malonlabs.com.'
        ),

        subHeading('8.2 Confidentiality'),
        bodyText(
          'Both parties agree to treat all shared information as confidential. Malon Labs will not disclose ' +
          'client data to third parties without written consent. The client agrees not to share proprietary ' +
          'methodologies, tools, or materials provided by Malon Labs.'
        ),

        subHeading('8.3 Intellectual Property'),
        bodyText(
          'All deliverables created specifically for the client become the client\'s property upon full payment. ' +
          'Malon Labs retains ownership of pre-existing tools, templates, and methodologies used during the engagement. ' +
          'Malon Labs reserves the right to reference the engagement (without disclosing confidential details) in marketing materials.'
        ),

        subHeading('8.4 Cancellation & Rescheduling'),
        bodyText(
          'Either party may cancel the engagement with 14 days written notice. In the event of cancellation:'
        ),
        bulletPoint('Work completed to date will be invoiced and delivered'),
        bulletPoint('Prepaid fees for undelivered work will be refunded within 30 business days'),
        bulletPoint('Rescheduling of sessions requires 48 hours notice'),

        subHeading('8.5 Liability'),
        bodyText(
          'Malon Labs\' total liability under this agreement shall not exceed the total fees paid by the client. ' +
          'Malon Labs is not liable for business losses arising from the client\'s implementation decisions.'
        ),

        subHeading('8.6 Client Responsibilities'),
        bodyText('To ensure project success, the client agrees to:'),
        bulletPoint('Designate a primary point of contact with decision-making authority'),
        bulletPoint('Provide timely access to relevant staff, systems, and information'),
        bulletPoint('Allocate staff time for training sessions and workshops'),
        bulletPoint('Provide feedback on deliverables within 5 business days of submission'),
        bulletPoint('Ensure a suitable workspace for on-site activities (if applicable)'),

        // ═══════════════════════════════════════
        // 9. ACCEPTANCE & SIGNATURES
        // ═══════════════════════════════════════
        new Paragraph({ pageBreakBefore: true, children: [] }),
        sectionHeading('9. Acceptance'),

        bodyText(
          'By signing below, both parties agree to the scope, terms, and investment outlined in this proposal.'
        ),
        spacer(12),

        // Signature table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          layout: TableLayoutType.FIXED,
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.SINGLE, size: 1, color: SOFT_GRAY }
                  },
                  children: [
                    new Paragraph({
                      spacing: { before: 60, after: 60 },
                      children: [run('FOR THE CLIENT', { bold: true, size: 20, color: NAVY })]
                    }),
                    spacer(16),
                    new Paragraph({
                      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: CHARCOAL } },
                      spacing: { before: 40, after: 40 },
                      children: [run('Name: ', { size: 20 })]
                    }),
                    spacer(4),
                    new Paragraph({
                      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: CHARCOAL } },
                      spacing: { before: 40, after: 40 },
                      children: [run('Title: ', { size: 20 })]
                    }),
                    spacer(4),
                    new Paragraph({
                      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: CHARCOAL } },
                      spacing: { before: 40, after: 40 },
                      children: [run('Signature: ', { size: 20 })]
                    }),
                    spacer(4),
                    new Paragraph({
                      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: CHARCOAL } },
                      spacing: { before: 40, after: 40 },
                      children: [run('Date: ', { size: 20 })]
                    })
                  ]
                }),
                new TableCell({
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  borders: {
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.SINGLE, size: 1, color: SOFT_GRAY },
                    right: { style: BorderStyle.NONE }
                  },
                  children: [
                    new Paragraph({
                      spacing: { before: 60, after: 60 },
                      children: [run('FOR MALON LABS LTD', { bold: true, size: 20, color: NAVY })]
                    }),
                    spacer(16),
                    new Paragraph({
                      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: CHARCOAL } },
                      spacing: { before: 40, after: 40 },
                      children: [run('Name: ', { size: 20 })]
                    }),
                    spacer(4),
                    new Paragraph({
                      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: CHARCOAL } },
                      spacing: { before: 40, after: 40 },
                      children: [run('Title: ', { size: 20 })]
                    }),
                    spacer(4),
                    new Paragraph({
                      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: CHARCOAL } },
                      spacing: { before: 40, after: 40 },
                      children: [run('Signature: ', { size: 20 })]
                    }),
                    spacer(4),
                    new Paragraph({
                      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: CHARCOAL } },
                      spacing: { before: 40, after: 40 },
                      children: [run('Date: ', { size: 20 })]
                    })
                  ]
                })
              ]
            })
          ]
        }),

        spacer(16),
        // ─── CLOSING ───
        new Paragraph({
          alignment: AlignmentType.CENTER,
          shading: { type: ShadingType.SOLID, color: NAVY },
          spacing: { before: 200, after: 0 },
          children: [run(' ', { size: 10 })]
        }),
        spacer(6),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'Malon Labs Ltd', bold: true, size: 24, color: NAVY, font: 'Calibri' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            run('Smarter Operations. Stronger Business.', { italic: true, size: 20, color: GREEN })
          ]
        }),
        spacer(4),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            run('info@malonlabs.com  |  +255 766 629 933  |  malonlabs.com', { size: 18, color: SLATE })
          ]
        })
      ]
    }
  ]
});

// ─── Write file ───
const outDir = 'deliverables/consulting/proposal';
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'service-proposal-template.docx');
const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outPath, buffer);
console.log(`✅ Created ${outPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
