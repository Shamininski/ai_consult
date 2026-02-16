# Malon Labs Ltd

**Smarter Operations. Stronger Business.**

Full project for Malon Labs Ltd — website redesign, consulting deliverables, and DevOps infrastructure.

## Quick Start

```bash
# 1. Set up environment
chmod +x setup.sh && ./setup.sh

# 2. Set up cron jobs
chmod +x scripts/*.sh && ./scripts/setup-cron.sh

# 3. Initialize git
git init && git add . && git commit -m "chore: initial setup"

# 4. Clone old site for reference content
git clone https://github.com/Shamininski/malonlabs.git ~/malonlabs_old

# 5. Start building with Claude Code
claude
```

## Project Structure

```
ai_consult/
├── CLAUDE.md                          ← Master instructions (Claude Code reads this)
├── DEVOPS.md                          ← CI/CD, automation, deployment guide
├── .github/workflows/
│   ├── ci.yml                         ← Build, test & deploy pipeline
│   └── scheduled.yml                  ← Weekly link checks
├── .lighthouserc.json                 ← Performance testing config
├── .gitignore
├── brand/
│   ├── BRAND.md                       ← Colors, fonts, tone, logo usage
│   └── logo/                          ← 5 logo variants
├── content/
│   ├── COMPANY_OVERVIEW.md            ← Company story & positioning
│   ├── SERVICES_DEV.md                ← Software Development details
│   ├── SERVICES_MANAGED_IT.md         ← Managed IT Services details
│   ├── SERVICES_CONSULTING.md         ← AI & IT Consulting details
│   ├── BUSINESS_PLAN.md               ← Go-to-market strategy
│   └── TOOLS_DATABASE.md              ← 50+ AI tools by industry
├── deliverables/
│   ├── website/                       ← Main website (HTML/CSS/JS + 3D/parallax)
│   ├── consulting/
│   │   ├── landing-page/              ← Consulting landing page
│   │   ├── assessment/                ← AI Readiness Assessment (DOCX)
│   │   ├── pitch-deck/               ← Pitch deck (PPTX)
│   │   └── proposal/                 ← Service proposal (DOCX)
│   └── shared/                        ← Lighthouse reports, shared assets
├── scripts/
│   ├── auto-git-push.sh               ← Cron: auto-commit every 2hrs
│   ├── build-all.sh                   ← Build all DOCX/PPTX deliverables
│   ├── dev-server.sh                  ← Live preview server
│   ├── perf-test.sh                   ← Local Lighthouse audit
│   └── setup-cron.sh                  ← Install cron jobs
└── logs/                              ← Cron job logs
```

## Deliverables

| # | Deliverable | Format | Status |
|---|-------------|--------|--------|
| 1 | Main Website (3D, parallax, carousel) | HTML/CSS/JS | ⬜ |
| 2 | Consulting Landing Page | HTML | ⬜ |
| 3 | AI Readiness Assessment | DOCX | ⬜ |
| 4 | Pitch Deck | PPTX | ⬜ |
| 5 | Service Proposal Template | DOCX | ⬜ |

## Claude Code Commands

```bash
# Analyze old site for content to carry over
claude "Analyze ~/malonlabs_old for useful content to bring into the new site"

# Build main website
claude "Build the main Malon Labs website with 3D hero, parallax, and carousels per CLAUDE.md"

# Build consulting deliverables
claude "Build the consulting pitch deck per CLAUDE.md"
claude "Build the AI Readiness Assessment DOCX per CLAUDE.md"
claude "Build the service proposal DOCX per CLAUDE.md"
```

## Scripts

| Script | What It Does | How to Run |
|--------|-------------|------------|
| `dev-server.sh` | Preview website locally with hot reload | `./scripts/dev-server.sh` |
| `build-all.sh` | Build all DOCX/PPTX + convert to PDF | `./scripts/build-all.sh` |
| `perf-test.sh` | Run Lighthouse audit locally | `./scripts/perf-test.sh` |
| `auto-git-push.sh` | Auto-commit & push (runs via cron) | Automated |
| `setup-cron.sh` | Install all cron jobs | `./scripts/setup-cron.sh` |

## CI/CD Pipeline

Pushes trigger GitHub Actions automatically:
- **dev branch** → Lint + validate
- **staging branch** → Lint + Lighthouse + deploy to staging
- **main branch** → Full pipeline + deploy to production

## Key Documents

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Everything Claude Code needs to build any deliverable |
| `DEVOPS.md` | Complete DevOps reference: git workflow, CI/CD, deployment, cron |
| `brand/BRAND.md` | Visual identity: colors, typography, tone, logo rules |
