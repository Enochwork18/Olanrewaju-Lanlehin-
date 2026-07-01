"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { aboutText, personalInfo } from "@/data/data";
import DecorativeAccents from "./DecorativeAccents";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={sectionRef} className="relative px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-24 scroll-mt-20">
      <DecorativeAccents />
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl mb-12 text-near-black"
        >
          About <span className="text-accent">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto md:mx-0">
              <div className="absolute inset-0 border-2 border-accent rounded-2xl translate-x-2 translate-y-2" />
              <Image
                src="/images/headshot-about.jpg"
                alt={`${personalInfo.name} portrait`}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-near-black text-base md:text-lg leading-relaxed">
              {aboutText}
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "4rem" } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="h-1 bg-accent mt-6"
            />
          </motion.div>
        </div>
      </div>
      <div className="section-divider max-w-7xl mx-auto" />
    </section>
  );
}
