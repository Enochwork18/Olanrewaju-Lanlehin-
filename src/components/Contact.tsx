"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, Send } from "lucide-react";
import { personalInfo, closingText } from "@/data/data";
import DecorativeAccents from "./DecorativeAccents";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="relative px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-24">
      <DecorativeAccents />
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl mb-12 text-near-black"
        >
          Get in <span className="text-crimson">Touch</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 md:order-1"
          >
            <div className="relative w-full aspect-[4/3] max-w-md mx-auto md:mx-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 border-2 border-crimson rounded-2xl -translate-x-2 -translate-y-2 z-10 pointer-events-none" />
              <Image
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80"
                alt="Contact"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <p className="text-near-black text-base md:text-lg leading-relaxed mb-8 font-serif italic">
              &ldquo;{closingText}&rdquo;
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-crimson" />
                </div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-mid-grey hover:text-crimson transition-colors text-sm md:text-base"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-crimson" />
                </div>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="text-mid-grey hover:text-crimson transition-colors text-sm md:text-base"
                >
                  {personalInfo.phone}
                </a>
              </div>
            </div>

            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-crimson text-white rounded-full font-medium text-sm hover:bg-crimson/90 transition-colors"
            >
              <Send size={16} />
              Send a Message
            </motion.a>
          </motion.div>
        </div>
      </div>
      <div className="section-divider max-w-7xl mx-auto" />
    </section>
  );
}
