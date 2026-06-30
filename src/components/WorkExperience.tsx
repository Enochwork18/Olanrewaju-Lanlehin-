"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Briefcase } from "lucide-react";
import { workExperience } from "@/data/data";
import DecorativeAccents from "./DecorativeAccents";

export default function WorkExperience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="relative px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-24">
      <DecorativeAccents />
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl mb-12 text-near-black"
        >
          Work <span className="text-crimson">Experience</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative pl-8 border-l-2 border-crimson/30 space-y-8">
              {workExperience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="relative"
                >
                  <div className="absolute -left-[2.35rem] top-1 w-4 h-4 rounded-full bg-crimson border-2 border-warm-white" />
                  <div className="frame-card">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase size={16} className="text-crimson shrink-0" />
                      <span className="text-crimson text-xs font-semibold uppercase tracking-wider">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-near-black mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-mid-grey text-sm leading-relaxed">
                      {exp.description}
                    </p>
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
              <div className="absolute inset-0 border-2 border-crimson rounded-2xl translate-x-2 translate-y-2 z-10 pointer-events-none" />
              <Image
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80"
                alt="Professional meeting"
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
