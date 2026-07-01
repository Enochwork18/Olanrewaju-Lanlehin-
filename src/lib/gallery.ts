import fs from 'fs';
import path from 'path';

export interface GalleryImage {
  src: string;
  alt: string;
  filename: string;
}

export function getGalleryImages(): GalleryImage[] {
  const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery');

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
