"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Award } from "lucide-react";
import { education } from "@/data/data";
import DecorativeAccents from "./DecorativeAccents";

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" ref={ref} className="relative px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-24 scroll-mt-20">
      <DecorativeAccents />
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl mb-12 text-near-black"
        >
          <span className="text-accent">Edu</span>cation
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-6">
              <div className="frame-card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <GraduationCap size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-near-black">
                      {education.degree}
                    </h3>
                    <p className="text-mid-grey mt-1">{education.university}</p>
                  </div>
                </div>
              </div>

              {education.certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="frame-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Award size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-near-black">
                        {cert.title}
                      </h3>
                      <p className="text-mid-grey mt-1">{cert.year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full aspect-[4/3] max-w-md mx-auto md:mx-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 border-2 border-accent rounded-2xl translate-x-2 translate-y-2 z-10 pointer-events-none" />
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80"
                alt="Academic setting"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="section-divider max-w-7xl mx-auto" />
    </section>
  );
}
