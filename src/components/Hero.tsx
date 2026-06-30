"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Download, Mail } from "lucide-react";
import { personalInfo } from "@/data/data";
import { useTypewriterSingle, useTypewriterRotator } from "@/hooks/useTypewriter";
import DecorativeAccents from "./DecorativeAccents";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const nameText = useTypewriterSingle(personalInfo.name, 70, 400);
  const roleText = useTypewriterRotator(personalInfo.roles, 80, 50, 2000, 2500);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center pt-16 px-4 md:px-8 lg:px-16 xl:px-24 overflow-hidden"
    >
      <DecorativeAccents />

      <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={mounted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <span className="invisible whitespace-nowrap block" aria-hidden="true">
              <span className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                {personalInfo.name}.
              </span>
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-near-black absolute inset-0 whitespace-nowrap">
              {nameText}
              <span className="text-crimson">.</span>
            </h1>
          </div>

          <div className="relative mt-2 h-8">
            <span className="invisible whitespace-nowrap block" aria-hidden="true">
              <span className="font-sans text-lg md:text-xl">
                {personalInfo.roles[personalInfo.roles.length - 1]}
              </span>
            </span>
            <p className="font-sans text-lg md:text-xl text-crimson font-medium absolute inset-0 whitespace-nowrap">
              {roleText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[2px] h-5 bg-crimson ml-0.5 align-middle"
              />
            </p>
          </div>

          <p className="mt-6 text-mid-grey text-sm md:text-base max-w-md">
            Based in Nigeria — delivering projects with purpose and precision.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-crimson text-white rounded-full font-medium text-sm hover:bg-crimson/90 transition-colors"
            >
              <Mail size={16} />
              Contact Me
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                const link = document.createElement("a");
                link.href = "/Olanrewaju_Lanlehin_CV.pdf";
                link.download = "Olanrewaju_Lanlehin_CV.pdf";
                link.click();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-near-black text-near-black rounded-full font-medium text-sm hover:bg-near-black hover:text-white transition-colors"
            >
              <Download size={16} />
              Download CV
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 rounded-full border-2 border-crimson -m-2" />
            <div className="absolute inset-0 rounded-full border border-crimson/30 -m-4" />
            <Image
              src="/images/headshot-hero.jpg"
              alt={personalInfo.name}
              fill
              className="object-cover rounded-full"
              priority
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={20} className="text-mid-grey" />
        </motion.div>
      </motion.div>
    </section>
  );
}
