# OpenCode Prompt — Gallery Folder → Projects Card + Full Gallery Page

The client has a folder of real event photos already placed in the project. Wire them into two places:
1. A preview grid inside the Creatives Conference project card (Projects section)
2. A brand-new `/gallery` page showing ALL photos with a lightbox viewer

Do NOT rebuild anything that already exists. Only add/edit what is specified here.

---

## STEP 1 — Confirm the gallery folder path

The images are located at:
```
/public/images/gallery/
```

First, read that directory and list all image files inside it. The filenames will be whatever the client named them. Use Node's `fs` module at build time to dynamically load all images from that folder — this way, adding new photos to the folder automatically shows them on the site without any code changes.

---

## STEP 2 — Create a gallery data helper

Create a new file: `lib/gallery.ts`

```ts
// lib/gallery.ts
import fs from 'fs';
import path from 'path';

export interface GalleryImage {
  src: string;        // e.g. /images/gallery/photo1.jpg
  alt: string;
  filename: string;
}

export function getGalleryImages(): GalleryImage[] {
  const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery');

  // Return empty array if folder doesn't exist yet
  if (!fs.existsSync(galleryDir)) return [];

  const files = fs.readdirSync(galleryDir);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

  return files
    .filter((file) => imageExtensions.includes(path.extname(file).toLowerCase()))
    .map((file, index) => ({
      src: `/images/gallery/${file}`,
      alt: `Creatives Conference event photo ${index + 1}`,
      filename: file,
    }));
}
```

---

## STEP 3 — Update the Projects section (preview grid)

Find the Professional Projects section component (likely `components/Projects.tsx` or `sections/Projects.tsx`).

Import the gallery helper and pass images as a prop, OR fetch them server-side if the component is a Server Component.

Inside the **Creatives Conference project card**, replace any existing generic stock image with this preview grid showing the **first 6 photos** from the gallery folder:

```tsx
// Show first 6 images as preview
const previewImages = galleryImages.slice(0, 6);
```

**Project card layout — full replacement for the Creatives Conference card:**

```tsx
<div className="rounded-2xl border-2 border-accent/30 bg-white dark:bg-wine-card overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">

  {/* Header */}
  <div className="p-6 pb-4">
    {/* Badge chips */}
    <div className="flex gap-2 flex-wrap mb-4">
      <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-semibold">Event Management</span>
      <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-semibold">100+ Attendees</span>
      <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-semibold">2024–2026</span>
    </div>

    {/* Title + date */}
    <h3 className="text-2xl font-bold mb-1">Creatives Conference</h3>
    <p className="text-accent font-medium text-sm mb-3">2024 – 2026</p>

    {/* Description */}
    <p className="text-secondary text-sm leading-relaxed">
      Successfully planned and executed the Creatives Conference: coordinated project timelines,
      stakeholder engagement, speaker management, team operations, and event logistics to deliver
      a high-impact experience for creatives, professionals, and emerging talents.
    </p>
  </div>

  {/* Edition tags */}
  <div className="px-6 pb-3 flex gap-2">
    <span className="text-xs border border-accent text-accent px-3 py-1 rounded-full">2025 Edition</span>
    <span className="text-xs border border-accent text-accent px-3 py-1 rounded-full">2026 Edition</span>
  </div>

  {/* Photo preview grid — 6 images */}
  {previewImages.length > 0 && (
    <div className="px-6 pb-4">
      <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden">
        {previewImages.map((img, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
              sizes="(max-width: 768px) 33vw, 20vw"
            />
          </div>
        ))}
      </div>
    </div>
  )}

  {/* "View all photos" link to gallery page */}
  <div className="px-6 pb-6">
    <a
      href="/gallery"
      className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all duration-200"
    >
      View All Photos
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  </div>
</div>
```

---

## STEP 4 — Create the full Gallery page

Create the file: `app/gallery/page.tsx` (App Router) OR `pages/gallery.tsx` (Pages Router) — check which the project uses.

**This page must:**
- Show ALL photos from `/public/images/gallery/` in a responsive masonry-style grid
- Have a lightbox — clicking any photo opens it fullscreen with prev/next navigation
- Have a "Back to Portfolio" link in the header
- Match the site's exact design system (same fonts, same red accent, same light/dark mode)
- Be fully responsive: 1 col mobile → 2 col tablet → 3–4 col desktop

### Full page code:

```tsx
// app/gallery/page.tsx
import { getGalleryImages } from '@/lib/gallery';
import GalleryClient from '@/components/GalleryClient';

export const metadata = {
  title: 'Gallery | Olanrewaju Lanlehin',
  description: 'Event photography from the Creatives Conference 2025 & 2026',
};

export default function GalleryPage() {
  const images = getGalleryImages();
  return <GalleryClient images={images} />;
}
```

---

## STEP 5 — Create the Gallery Client Component (with lightbox)

Create: `components/GalleryClient.tsx`

This is a client component (needs `'use client'`) because of lightbox interactivity.

```tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryImage } from '@/lib/gallery';

interface Props {
  images: GalleryImage[];
}

export default function GalleryClient({ images }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, goNext, goPrev]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <main className="min-h-screen bg-[#F5F5F4] dark:bg-[#3D0014]">

      {/* Page header */}
      <div className="sticky top-0 z-40 bg-[#F5F5F4]/90 dark:bg-[#3D0014]/90 backdrop-blur-md border-b border-accent/20 px-6 py-4 flex items-center justify-between">
        <Link
          href="/#projects"
          className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-accent transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </Link>
        <div className="text-right">
          <h1 className="text-lg font-bold text-primary">Event Gallery</h1>
          <p className="text-xs text-secondary">{images.length} photos · Creatives Conference 2025 & 2026</p>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Section tags */}
        <div className="flex gap-3 mb-8">
          <span className="text-xs border border-accent text-accent px-4 py-1.5 rounded-full font-medium">2025 Edition</span>
          <span className="text-xs border border-accent text-accent px-4 py-1.5 rounded-full font-medium">2026 Edition</span>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-24 text-secondary">
            <p className="text-lg">No photos yet.</p>
            <p className="text-sm mt-2">Add images to <code>/public/images/gallery/</code> to display them here.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3">
            {images.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="break-inside-avoid"
              >
                <div
                  className="relative overflow-hidden rounded-xl cursor-pointer group"
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-300 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10"
              aria-label="Previous"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                width={1200}
                height={800}
                className="w-full h-full object-contain rounded-lg max-h-[85vh]"
                priority
              />
              {/* Counter */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                {lightboxIndex + 1} / {images.length}
              </div>
            </motion.div>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10"
              aria-label="Next"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
```

---

## STEP 6 — Add "Gallery" link to the navbar

Find the nav items array in the Navbar component. Add a Gallery link AFTER "Projects":

```ts
{ label: 'Gallery', href: '/gallery' }
```

Note: this is a page link (not an anchor scroll), so it uses `<Link href="/gallery">` NOT `href="#gallery"`. It should NOT use the `handleNavClick` scroll handler — just a regular Next.js `<Link>`.

On mobile, include it in the hamburger menu as well, styled the same as other nav items but maybe with a small camera icon (Lucide `Camera`) to make it stand out:

```tsx
import { Camera } from 'lucide-react';
// In the nav link:
<Link href="/gallery" className="flex items-center gap-2 ...">
  <Camera className="w-4 h-4" />
  Gallery
</Link>
```

---

## STEP 7 — next.config image domains

If the project uses `next/image` and images are local (in `/public`), no config change is needed. But confirm `next.config.ts` does NOT have a restrictive `images.domains` or `images.remotePatterns` that would block local images. Local images in `/public` are always served fine.

---

## SUMMARY CHECKLIST

- [ ] `lib/gallery.ts` created — reads all images from `/public/images/gallery/` dynamically
- [ ] Projects section: Creatives Conference card shows first 6 gallery photos in a 3-col grid
- [ ] Projects section: badge chips (Event Management, 100+ Attendees, 2024–2026) visible
- [ ] Projects section: "2025 Edition" and "2026 Edition" tags visible
- [ ] Projects section: "View All Photos →" link goes to `/gallery`
- [ ] `/gallery` page created and accessible
- [ ] Gallery page shows ALL images from `/public/images/gallery/` in masonry grid
- [ ] Gallery page: 1 col mobile → 2 col tablet → 3 col laptop → 4 col desktop
- [ ] Gallery page: clicking any photo opens fullscreen lightbox
- [ ] Lightbox: prev/next arrows work (click and keyboard ← →)
- [ ] Lightbox: Escape key closes it
- [ ] Lightbox: clicking outside the image closes it
- [ ] Lightbox: shows photo counter (e.g. "3 / 12")
- [ ] Gallery page: "Back to Portfolio" sticky header link returns to /#projects
- [ ] Navbar: "Gallery" link added (desktop + mobile hamburger menu)
- [ ] Light/dark mode works on the Gallery page (inherits from ThemeProvider)
- [ ] Adding new photos to `/public/images/gallery/` shows them automatically — no code change needed
