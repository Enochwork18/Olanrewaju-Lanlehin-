"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FolderOpen } from "lucide-react";
import { projects } from "@/data/data";
import DecorativeAccents from "./DecorativeAccents";

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="relative px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-24">
      <DecorativeAccents />
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl mb-12 text-near-black"
        >
          Professional <span className="text-crimson">Projects</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
                className="frame-card transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <FolderOpen size={18} className="text-crimson" />
                  <span className="text-crimson text-xs font-semibold uppercase tracking-wider">
                    {project.period}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-near-black mb-3">
                  {project.title}
                </h3>
                <p className="text-mid-grey text-sm leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full aspect-[4/3] max-w-md mx-auto md:mx-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 border-2 border-crimson rounded-2xl -translate-x-2 -translate-y-2 z-10 pointer-events-none" />
              <Image
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80"
                alt="Event planning and coordination"
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
