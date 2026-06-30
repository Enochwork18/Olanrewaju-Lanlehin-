# OpenCode Build Prompt — Olanrewaju Lanlehin Portfolio Site

Save this as PROMPT.md in your project folder, then run:
opencode run "$(cat PROMPT.md)"

---

You are acting as a senior product designer and senior full-stack engineer — the kind of person who has shipped award-winning, premium portfolio sites for years. Build a one-page (single scrolling page with anchor sections), fully responsive portfolio website for a real client. Treat this as production work, not a demo: clean architecture, real polish, no placeholder lorem ipsum, no broken states.

## Tech Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS (utility-first, no inline styles except where unavoidable)
- Framer Motion for all animation (scroll reveals, hero text effects, hover/tap micro-interactions)
- Lucide-react for icons
- Deploy target: Vercel

## Brand & Design System
Translate this red/black/off-white editorial brand into a modern web aesthetic:
- Background: warm off-white (#F5F5F4)
- Primary accent: crimson red (#C8203F or close — sample from reference)
- Text: near-black (#1A1A1A)
- Supporting neutrals: mid-grey for secondary text, light-grey for dividers
- Headlines: a bold serif/slab display font (e.g. "Bitter", "Lora", or "Fraunhofer" weight 700+) — mix regular + bold weights within the same headline like the reference (e.g. "Olanrewaju" light serif / "Lanlehin" bold serif)
- Body: clean modern sans-serif (e.g. "Inter" or "Manrope")
- UI motifs carried over from the brand reference: rounded-corner bordered "frame" cards (2px red border, large border-radius), small decorative accent shapes (plus/cross marks, hollow circles, chevron arrow stacks, diagonal hatch lines) scattered in corners of sections, a solid red bar/divider at the bottom of each section
- Every section should feel like a "slide" from a premium pitch deck translated to web — generous whitespace, one clear focal image per section, content never cramped

## Site Structure (single page, anchor nav matches this order)
1. **Hero** — Name, role tag, CTA buttons (Contact Me / Download CV), headshot
2. **Introduction / About Me** — bio paragraph, seated portrait photo
3. **Vision** — vision statement, supporting image
4. **Education** — degree, university, certifications
5. **Personal Skills** — skill list with checkmark icons
6. **Work Experience** — timeline/cards
7. **Professional Projects** — project case card(s)
8. **Contact** — phone, email, contact CTA, closing statement

Include a sticky/fixed top nav with smooth-scroll links to each section, condensing into a mobile hamburger menu below 768px. Include a subtle scroll-progress indicator (thin red bar at top of viewport) as a nice premium touch.

## Content (use verbatim — do not invent or alter facts)

**Name:** Olanrewaju Lanlehin
**Role:** Project Manager
**Contact:** Justwaju@gmail.com · 09065011800

**About Me:**
"I'm Olanrewaju Lanlehin, a Project Manager with over 2 years of experience leading projects, coordinating cross-functional teams, and delivering successful events and organizational initiatives. Skilled in project planning, stakeholder management, operations, and execution, with a strong track record of driving results and achieving project objectives."

**Vision:**
"Aiming to lead impactful projects that create value, drive innovation, and deliver measurable results while fostering collaboration, excellence, and sustainable growth."

**Education:**
- Federal University Lokoja, Kogi State — B.Sc. Computer Science
- Certification: Certified Project Manager — 2023

**Personal Skills:**
- Leadership
- Strategic Planning
- Problem Solving
- Communication

**Work Experience:**
1. *Project Manager, 2023–Present* — Led the team to plan a major event tagged "Creatives Conference," with over 100 attendees and positive reviews recorded afterwards.
2. *Hangout with Wajuwears, 2022–2023* — A mini hangout for entrepreneurs, creatives, etc.

**Professional Projects:**
- *Creatives Conference, 2024–2026* — Successfully planned and executed the Creatives Conference: coordinated project timelines, stakeholder engagement, speaker management, team operations, and event logistics to deliver a high-impact experience for creatives, professionals, and emerging talents.
  (Note: source material labeled this "Corporate Budget Overhaul" but the description is entirely about the Creatives Conference — flagged for client confirmation, used the matching title for now.)

**Closing / Contact section statement:**
"Project Manager with a passion for delivering impactful and well-executed projects. Experienced in leading teams, managing events, and driving creative initiatives from concept to completion. Committed to excellence, collaboration, and continuous growth in every project delivered."

## Images
Two real photos are provided — place them at:
- /public/images/headshot-hero.png (cover/hero shot, circular crop already friendly — use as hero portrait)
- /public/images/headshot-about.png (seated full-length portrait — use in the About/Introduction section)

For the remaining sections (Vision, Education, Skills, Work Experience, Projects, Contact closing image) source clean, license-free black-and-white desk/laptop/analytics-style stock photography (Unsplash) matching the moody monochrome tone of the originals — do not use generic colorful stock photos.

## Animation Requirements (this is a key ask — don't skip it)
- **Hero name animation:** On load, the name "Olanrewaju Lanlehin" should type itself in character-by-character (typewriter effect), then after a short pause, the role tag below it should cycle through a few short titles (e.g. "Project Manager", "Team Leader", "Event Strategist") with a type-in / type-out (erase) loop — classic animated typewriter rotator. Use Framer Motion + a simple custom typewriter hook (no heavy external typewriter library needed).
- **Scroll-reveal:** every section's content (headline, image, body text) fades + slides in (e.g. 20px up, opacity 0→1) as it enters the viewport, using `whileInView`, staggered slightly between elements in the same section so it doesn't feel like everything pops at once.
- **Nav interactions:** smooth scroll to anchors, active section highlighted in nav as user scrolls (use IntersectionObserver), underline/color transition on hover for nav links.
- **Micro-interactions:** buttons scale slightly on hover/tap, skill checkmarks animate in with a small stagger and a subtle pop, project/work cards lift with a soft shadow on hover.
- **Section transitions:** subtle parallax or scale on the decorative accent shapes (the cross marks, circles, chevrons) as the user scrolls past, so the page feels alive without being distracting.
- Respect `prefers-reduced-motion` — provide a reduced/no-animation fallback for accessibility.

## Responsiveness
- Must look intentional (not just "shrunk") at: mobile (375px), large mobile (430px), tablet (768px), laptop (1024px), desktop (1440px+).
- On mobile: stack image/text pairs vertically (image first or text first per section, alternate naturally), collapse nav to a hamburger with a full-screen overlay menu, reduce decorative shape clutter so it doesn't crowd small screens.
- Test that text never overflows its container and that the hero typewriter text doesn't cause layout shift as it types (reserve space / use a min-height container).

## Quality bar
- Real, working code — no TODOs, no commented-out placeholder sections.
- Semantic HTML, accessible labels, good color contrast (verify red-on-offwhite passes WCAG AA for text use cases; use the red mainly as accent/background, not small body text).
- Lighthouse-conscious: optimized images via `next/image`, no layout shift, fast initial paint.
- Clean component structure: one component per section under `/components`, content/data separated into a `data.ts` or similar so copy can be edited without touching layout code.

Build this now, end to end, and let me know if anything (fonts, exact red hex, copy) needs adjusting once it's running locally.
