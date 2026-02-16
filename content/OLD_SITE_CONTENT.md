# Old Malon Labs Website — Extracted Content

**Source:** `~/Projects/malonlabs_old_reference/` (both `malonlaravel/` and `old_site/`)
**Extracted:** 2026-02-16
**Note:** Both versions (Laravel blade template + static HTML) contain identical content. Differences noted where they exist.

---

## Hero / Tagline

**Headline:** "Amua Tenda" (Swahili — means "Decide and Act")

- Used as a pulsating animated heading in the hero section
- Background: laptop image banner (`laptop-2434393_1920.jpg`)

---

## About Us

> Malonlabs is a STEM-based startup with projects primarily in Agribusiness and Technology fields. We are about creating, sharing and inspiring innovations and the brilliance of Science to all and sundry.

**Key takeaway:** The old positioning was STEM/Agribusiness + Technology. The new site pivots to pure technology services (Software, Managed IT, Consulting). The "Amua Tenda" tagline and the spirit of innovation could be carried forward or referenced.

---

## Services (Old Site — 6 services)

| # | Service | Description |
|---|---------|-------------|
| 1 | **Web & Mobile Development** | Websites — E-commerce, Personal/Business/Organisation & Mobile Applications for Business |
| 2 | **Computer and Systems Repair** | Virus Removal, Software Installation & Maintenance, Data Recovery, Start-up Failure, Game Console Installation |
| 3 | **Data Analysis and Statistics** | School Project Statistical Analysis, Data Analysis Bootcamp/Courses (Min of 15 students) |
| 4 | **Web Hosting** | Reliable Website Hosting — Dedicated Servers, Shared Hosting, Reseller Hosting |
| 5 | **Greenhouse Installation** | Hydroponic and Aquaponic Systems Design & Structural Set-up |
| 6 | **Network and Security Solutions** | Security Cameras/CCTVs, CISCO Network, Dish Installation |

**What carries forward:** Web & Mobile Development evolves into the new Software & App Development pillar. Network/Security maps loosely to Managed IT Services. Data Analysis connects to the new AI & IT Consulting line. The agribusiness services (Greenhouse) are being dropped.

---

## Products (Old Site — 6 products)

| # | Product | Description |
|---|---------|-------------|
| 1 | **School Management Systems** | Manage all Student, Staff, Parents and Administration Services in one platform. Results, Procurements, Finance and Calendar Events |
| 2 | **Inventory Systems** | Efficient tracking of Sales, Procurements, Salaries and Costs of your business for better insights and decision making |
| 3 | **Internet of Things Gadgets** | Raspberry Pi, Arduino, Intel Galileo & Edison, Starter Kits |
| 4 | **Laboratory Equipment** *(Laravel)* / **Greenhouse Products** *(old_site)* | Microscopes, Glassware, Reagents, Racks & Stands *(Laravel)* / Starter Kits, Frames, Polyethylene, Racks and Stands *(old_site)* |
| 5 | **Hydroponic Mix Solutions** | Pre-mixed nutrient solution for your hydroponic crops |
| 6 | **Vegetables and Fruits** | Organic, fresh and chemical-free veggies, fruits and mushroom |

**What carries forward:** School Management Systems and Inventory Systems are good portfolio examples for the new Software & App Development service. Can be referenced as past work / case studies on the new site.

---

## Contact Information

**WhatsApp numbers (from footer):**
- +255-762 483355
- +254-722 881750

**Phone numbers (commented out in HTML):**
- +255 715 629931
- +255 766 629933

**Contact form fields:** Name, Email, Message (simple form, no backend integration visible)

**Social media (commented out — never launched):**
- Facebook, Twitter, Instagram, LinkedIn (placeholder links only)

---

## Testimonials

Testimonials section existed but was **commented out** with placeholder lorem ipsum text and fake names (Alicia Shannon, Jack Wilson, Sienna Johnson). No real testimonials were ever added.

---

## Design & Technical Details

**Fonts used:**
- Didact Gothic (Google Fonts)
- Modak (Google Fonts)
- Viga (Google Fonts)

**Logo file:** `Malon-Labs-FAV-2.png` (favicon-style logo, different from current logo set)

**Layout:** Single-page scroll site with sections: Home → About → Services → Gallery → Products → Gallery → (Testimonials) → Contact → Footer

**Gallery:** Two image gallery sections with ~30 stock photos covering tech, agriculture, science, and security themes.

**Copyright:** 2019–2020 MalonLabs

**Tech stack:**
- Old site: Static HTML/CSS/JS
- Laravel version: Laravel + Blade templates (same content, wrapped in `{{ URL::asset() }}` helpers)

---

## Content Worth Carrying Over to New Site

### Definitely use:
- **WhatsApp numbers** — Verify with client if still active, then use in new contact section
- **"Amua Tenda"** — Strong Swahili tagline, could be a secondary tagline or cultural nod on the new site
- **School Management System & Inventory System descriptions** — Reference as past projects in the Portfolio section
- **Web & Mobile Development copy** — Starting point for the new Software & App Development service descriptions

### Reference only:
- The old About Us copy shows the company's roots — useful for the "Company Story" section
- The old service range shows the evolution from STEM/agribusiness to focused tech services
- Gallery image themes (tech, networking, data) align with the new direction

### Do not carry over:
- Agribusiness content (Greenhouse, Hydroponic, Vegetables) — no longer part of the business
- Laboratory Equipment — no longer relevant
- Placeholder testimonials (lorem ipsum) — need real testimonials
- Old font choices (Didact Gothic, Modak, Viga) — new brand uses Poppins/Inter
- Old logo (`Malon-Labs-FAV-2.png`) — replaced by new logo set in `brand/logo/`
