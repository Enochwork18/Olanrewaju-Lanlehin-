# OpenCode Fix Prompt — Mobile Navigation Scroll Fix

This is a surgical fix ONLY. Do not touch anything else on the site. Fix the mobile (and desktop) navigation so every link correctly scrolls to its matching section.

---

## ROOT CAUSE

The nav links point to anchors (`#about`, `#vision`, etc.) but the section elements on the page either have mismatched `id` values or are missing the `id` attribute entirely. Also, the mobile menu click handlers are likely not closing the menu AND scrolling at the same time. Fix both issues below.

---

## STEP 1 — Add correct `id` attributes to every section

Open every section component file and ensure the outermost wrapper element has the exact `id` listed below. Match section to id precisely:

| Section Content | Required `id` |
|---|---|
| Hero / top of page | `home` |
| "About Me" / Introduction | `about` |
| "My Vision" | `vision` |
| "Education" | `education` |
| "Personal Skills" | `skills` |
| "Work Experience" | `experience` |
| "Professional Projects" | `projects` |
| "Get in Touch" / Contact | `contact` |

Example — if the About section component currently looks like this:
```tsx
<section className="...">
```
Change it to:
```tsx
<section id="about" className="...">
```

Do this for ALL eight sections. Double-check by searching the codebase for `id="home"`, `id="about"` etc. to confirm they are present after the edit.

---

## STEP 2 — Add `scroll-margin-top` to every section

The site has a fixed/sticky navbar. Without a top offset, the navbar will overlap the section heading when scrolling to it. Add this CSS to every section that has an `id`:

```css
scroll-margin-top: 80px;
```

Do this via Tailwind: add `scroll-mt-20` (which equals 80px) to the className of every `<section id="...">` element. If the navbar is taller than 80px, increase to `scroll-mt-24` (96px). Check the navbar height and pick the right value.

Example:
```tsx
<section id="about" className="scroll-mt-20 ...rest of existing classes">
```

---

## STEP 3 — Fix the mobile nav click handler

Open the Navbar component (likely `components/Navbar.tsx` or `components/Header.tsx`). Find the mobile menu nav links. Replace whatever handler is there with this pattern:

```tsx
const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  e.preventDefault();               // stop the default hash jump (causes flicker)
  setMenuOpen(false);               // close the mobile hamburger menu immediately

  // Small delay so the menu close animation starts before scroll begins
  setTimeout(() => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 80);
};
```

Then apply it to every mobile nav anchor like this:

```tsx
<a
  href={`#${item.id}`}
  onClick={(e) => handleNavClick(e, item.id)}
  className="..."
>
  {item.label}
</a>
```

Where `item.id` maps to: `home`, `about`, `vision`, `education`, `skills`, `experience`, `projects`, `contact`.

Apply the SAME `handleNavClick` pattern to the desktop nav links too (they don't need `setMenuOpen(false)` but the `preventDefault` + `scrollIntoView` pattern fixes any desktop scroll issues as well).

---

## STEP 4 — Fix the "Home" link specifically

"Home" should scroll back to the very top of the page (`id="home"` on the hero section, OR use `window.scrollTo({ top: 0, behavior: 'smooth' })` if the hero section is at scroll position 0). Make sure the hero/top section has `id="home"` and `scroll-mt-0` (no offset needed for the top section).

---

## STEP 5 — Verify the nav items array matches exactly

Find the nav items array (likely looks like `[{ label: 'Home', href: '#home' }, ...]`). Confirm it contains ALL eight items in this exact order with these exact ids:

```ts
const navItems = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Vision',     href: '#vision' },
  { label: 'Education',  href: '#education' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
];
```

If any are missing, add them. If any ids are different (e.g. `#work-experience` instead of `#experience`), either update the nav item OR update the section id — make them match each other.

---

## STEP 6 — Mobile menu must close on outside click & Escape key

Add these two effects inside the Navbar component if they are not already working:

```tsx
// Close on Escape key
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setMenuOpen(false);
  };
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);

// Close on click outside the menu
useEffect(() => {
  if (!menuOpen) return;
  const handleClickOutside = (e: MouseEvent) => {
    const menu = document.getElementById('mobile-menu');
    const toggle = document.getElementById('hamburger-btn');
    if (
      menu && !menu.contains(e.target as Node) &&
      toggle && !toggle.contains(e.target as Node)
    ) {
      setMenuOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [menuOpen]);
```

Give the mobile menu container `id="mobile-menu"` and the hamburger button `id="hamburger-btn"` so the selectors above work.

---

## VERIFICATION CHECKLIST

After applying all fixes, manually test:
- [ ] `id="home"` exists on the hero section element
- [ ] `id="about"` exists on the About Me section element
- [ ] `id="vision"` exists on the Vision section element
- [ ] `id="education"` exists on the Education section element
- [ ] `id="skills"` exists on the Skills section element
- [ ] `id="experience"` exists on the Work Experience section element
- [ ] `id="projects"` exists on the Projects section element
- [ ] `id="contact"` exists on the Contact section element
- [ ] Every section has `scroll-mt-20` (or appropriate value) in its className
- [ ] Clicking each mobile nav link closes the menu AND scrolls to the right section
- [ ] The section heading is NOT hidden under the navbar after scroll
- [ ] "Home" link scrolls back to the very top
- [ ] Clicking outside the mobile menu closes it
- [ ] Pressing Escape closes the mobile menu
