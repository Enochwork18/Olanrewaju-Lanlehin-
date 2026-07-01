# OpenCode Update Prompt — Olanrewaju Lanlehin Portfolio (v2 Patch)

Apply ALL of the following changes to the existing Next.js portfolio at https://olanrewaju-lanlehin.vercel.app/. The repo is already built — this is a targeted surgical update. Do not rebuild from scratch. Find the relevant files, make the changes, and ensure nothing else breaks.

---

## 1. EMAIL — Update throughout

Replace every instance of `Justwaju@gmail.com` (and any `mailto:Justwaju@gmail.com` links) with:
**olanrewajulanlehin5@gmail.com**

Check: `data.ts`, `components/Contact.tsx` (or wherever the contact section is), the `mailto:` href, any meta tags or structured data, and the contact form `action`/API route if present.

---

## 2. REMOVE — Download CV Button

In the Hero section, remove the "Download CV" button entirely. The CTA area should only show the single "Contact Me" button. Clean up any dead href="#" links. Do not leave an empty container or extra spacing where the button was.

---

## 3. SOCIAL LINKS — Add Facebook & Instagram

In the Contact section (and optionally in the footer/nav if there is a social row), add:
- **Facebook:** https://www.facebook.com/share/1H7BLWFrzB/
- **Instagram:** https://www.instagram.com/waju_wears

Use Lucide-react icons where possible (or simple SVG icons styled to match the site's red/off-white brand). Each icon should be a clickable anchor tag with `target="_blank" rel="noopener noreferrer"`. Style the icons to match the existing accent color (#C8203F or the current red variable). Add hover micro-interaction (scale 1.1 + colour shift on hover using Framer Motion or Tailwind transition).

---

## 4. WHATSAPP LINK — Phone Number

The phone number `09065011800` currently renders as a plain `tel:` link. Change it so that:
- The display stays "09065011800"
- The href becomes: `https://wa.me/2349065011800` (Nigeria country code prefix, no leading zero)
- Add a WhatsApp icon (use Lucide `MessageCircle` or a small WhatsApp SVG) next to it
- `target="_blank" rel="noopener noreferrer"` on the anchor

---

## 5. CONTACT FORM — Full Working Email Form

Replace the current "Send a Message" mailto button with a fully functional contact form. The form must:

**Frontend (in the Contact section):**
- Fields: Name (text), Email (email), Subject (text), Message (textarea — min 4 rows)
- A "Send Message" submit button styled in the site's red accent
- Inline validation: all fields required, email must be valid format, show red error text under each invalid field on submit attempt
- On success: replace the form with a friendly confirmation message ("Thanks [Name], your message has been sent! Olanrewaju will get back to you shortly.") — do not navigate away or reload the page
- On error: show a red banner "Something went wrong. Please try again or email directly at olanrewajulanlehin5@gmail.com"
- All form states (idle, loading spinner on submit button, success, error) must be implemented
- Use React `useState` for form state — no external form libraries needed

**Backend (Next.js API Route):**
Create `app/api/contact/route.ts` (or `pages/api/contact.ts` depending on which router the project uses — check the existing project structure first).

Use **Resend** (https://resend.com) to send emails — it's the simplest modern choice for Next.js. Install: `npm install resend`

The API route must:
1. Validate all fields server-side (name, email, subject, message required; email format check)
2. Send an email TO `olanrewajulanlehin5@gmail.com` with subject: `[Portfolio Contact] {subject}` and body containing all form fields
3. Send an auto-reply email TO the person who submitted the form, FROM a Resend-verified sender (use `onboarding@resend.dev` as the from address during dev/testing, or instruct the client to add their own domain in Resend settings). The auto-reply subject: `Re: {subject}` — body: "Hi {name}, thank you for reaching out to Olanrewaju Lanlehin. Your message has been received and Olanrewaju will be in touch with you shortly. — Olanrewaju Lanlehin, Project Manager"
4. Return `{ success: true }` on success, `{ error: "..." }` with appropriate HTTP status on failure

**Environment variable needed:**
Add to `.env.local` (and document in README / Vercel environment variables):
```
RESEND_API_KEY=your_resend_api_key_here
```

Instruct the client: sign up free at resend.com, create an API key, paste it into Vercel → Project Settings → Environment Variables as `RESEND_API_KEY`, then redeploy.

---

## 6. LIGHT / DARK MODE — Wine & White (NOT black & white)

Implement a full light/dark mode toggle. This is the most important visual requirement: the dark mode must use **wine/deep crimson as its dark background**, not plain black or dark grey.

**Color palette:**

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--bg-primary` | #F5F5F4 (warm off-white) | #3D0014 (deep wine / dark burgundy) |
| `--bg-secondary` | #FFFFFF | #520019 (slightly lighter wine for cards/sections) |
| `--text-primary` | #1A1A1A | #F5F0F2 (soft warm white) |
| `--text-secondary` | #555555 | #D9B8C0 (muted rose-white) |
| `--accent` | #C8203F (crimson red) | #FF6B8A (lighter rose-red — so it pops on dark wine bg) |
| `--border` | rgba(200,32,63,0.25) | rgba(255,107,138,0.3) |
| `--card-bg` | #FFFFFF | #4A001A (wine card) |
| `--nav-bg` | rgba(245,245,244,0.9) | rgba(61,0,20,0.92) |
| `--decorative` | rgba(200,32,63,0.15) | rgba(255,107,138,0.15) |

**Implementation:**
- Use `next-themes` for theme management: `npm install next-themes`
- Wrap the app in `<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>` in the root layout
- Use Tailwind's `dark:` variant for all colours (configure `darkMode: 'class'` in `tailwind.config.ts` if not already set)
- Convert ALL hardcoded colour classes to use CSS variable tokens so the theme switch is comprehensive
- The toggle button: place in the top-right of the navbar (both desktop and mobile nav). Use a sun/moon icon (Lucide `Sun` / `Moon`). Animate the icon swap with a small Framer Motion rotate + scale transition. The button itself should be a small circular icon button styled in the current accent colour.
- Persist theme in localStorage via next-themes (it handles this automatically).
- On dark mode, the decorative accent shapes (plus marks, circles, chevrons) should also shift to the lighter rose-red variant so they remain visible against the wine background.
- Ensure all text passes WCAG AA contrast on both backgrounds — check especially: accent red on wine bg (use the lighter rose-red in dark mode), and secondary text.

---

## 7. MOBILE NAVIGATION — Fix Anchor Scroll + Hamburger

The mobile hamburger menu must work perfectly. Currently clicking nav items may not scroll correctly or close the menu. Fix all of the following:

**Smooth scroll to section:**
- Every nav link (`Home`, `About`, `Vision`, `Education`, `Skills`, `Experience`, `Projects`, `Contact`) must have the correct matching `id` attribute on its target section.
- Confirm each section has the right `id`: `id="home"`, `id="about"`, `id="vision"`, `id="education"`, `id="skills"`, `id="experience"`, `id="projects"`, `id="contact"`.
- Nav links must use `href="#sectionId"` with a `onClick` handler that: (1) prevents default, (2) closes the mobile menu, (3) smoothly scrolls to the target element using `element.scrollIntoView({ behavior: 'smooth', block: 'start' })`.
- Account for the fixed navbar height offset — use `scroll-margin-top` CSS on each section (`scroll-margin-top: 80px` or whatever the nav height is) so the section headline isn't hidden behind the nav after scrolling.

**Mobile menu behaviour:**
- Menu closes automatically after any nav link is tapped — no leaving the menu open after navigation.
- Menu closes when tapping outside the menu overlay (add a click-outside handler).
- Menu closes on Escape key press.
- The hamburger icon animates into an X when menu is open (Framer Motion animate the bars).
- The mobile menu overlay itself should animate: slide down from top or fade in — should feel fluid, not instant.

**Active link highlighting:**
- Use `IntersectionObserver` to track which section is currently in view and highlight the corresponding nav link (apply the accent colour + underline/bold to the active link).
- Works on both desktop and mobile nav.

---

## Summary Checklist (verify before finishing)

- [ ] Email updated to olanrewajulanlehin5@gmail.com everywhere
- [ ] "Download CV" button fully removed, no empty space left
- [ ] Facebook & Instagram icons added in Contact section, both links open in new tab
- [ ] Phone number links to WhatsApp (wa.me/2349065011800) with WhatsApp icon
- [ ] Contact form: Name, Email, Subject, Message fields with validation
- [ ] Contact form: sends notification email to olanrewajulanlehin5@gmail.com via Resend
- [ ] Contact form: sends auto-reply email to the submitter via Resend
- [ ] Contact form: loading/success/error states all implemented
- [ ] RESEND_API_KEY documented in .env.local.example and README
- [ ] Light mode: warm off-white (#F5F5F4) background, crimson red accent
- [ ] Dark mode: deep wine (#3D0014) background — NOT black — rose accent
- [ ] Dark mode toggle button in navbar (sun/moon icon, animated)
- [ ] Theme persists across page reload via next-themes localStorage
- [ ] All 8 mobile nav links (Home/About/Vision/Education/Skills/Experience/Projects/Contact) scroll to correct section on tap
- [ ] Mobile menu closes after nav tap, on outside click, and on Escape
- [ ] `scroll-margin-top` set on all sections to compensate for fixed nav
- [ ] Active nav item highlighted based on current scroll position
- [ ] Full mobile responsiveness: 375px–430px–768px tested, no overflow
- [ ] Dark mode tested on mobile: wine theme applies correctly in hamburger menu overlay too
