import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Vision from "@/components/Vision";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { getGalleryImages } from "@/lib/gallery";

export default function Home() {
  const galleryImages = getGalleryImages();

  return (
    <main className="min-h-screen bg-bg-primary">
      <Nav />
      <Hero />
      <About />
      <Vision />
      <Education />
      <Skills />
      <WorkExperience />
      <Projects galleryImages={galleryImages} />
      <Contact />
    </main>
  );
}
