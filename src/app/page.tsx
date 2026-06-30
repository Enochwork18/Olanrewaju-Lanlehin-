import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Vision from "@/components/Vision";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-warm-white">
      <Nav />
      <Hero />
      <About />
      <Vision />
      <Education />
      <Skills />
      <WorkExperience />
      <Projects />
      <Contact />
    </main>
  );
}
