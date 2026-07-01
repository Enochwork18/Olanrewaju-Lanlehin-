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
