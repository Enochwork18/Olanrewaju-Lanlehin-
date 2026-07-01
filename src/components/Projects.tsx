"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FolderOpen } from "lucide-react";
import { projects } from "@/data/data";
import DecorativeAccents from "./DecorativeAccents";
import type { GalleryImage } from "@/lib/gallery";

interface Props {
  galleryImages?: GalleryImage[];
}

const projectBadges = [
  "Event Management",
  "100+ Attendees",
  "2024–2026",
];

export default function Projects({ galleryImages = [] }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const previewImages = galleryImages.slice(0, 6);

  return (
    <section id="projects" ref={ref} className="relative px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-24 scroll-mt-20">
      <DecorativeAccents />
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl mb-12 text-near-black"
        >
          Professional <span className="text-accent">Projects</span>
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
                className="rounded-2xl border-2 border-accent/30 bg-card-bg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6 pb-4">
                  <div className="flex gap-2 flex-wrap mb-4">
                    {projectBadges.map((badge) => (
                      <span
                        key={badge}
                        className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-semibold"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <FolderOpen size={18} className="text-accent" />
                    <span className="text-accent font-medium text-sm">{project.period}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-near-black mb-3">
                    {project.title}
                  </h3>
                  <p className="text-mid-grey text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="px-6 pb-3 flex gap-2">
                  <span className="text-xs border border-accent text-accent px-3 py-1 rounded-full">2025 Edition</span>
                  <span className="text-xs border border-accent text-accent px-3 py-1 rounded-full">2026 Edition</span>
                </div>

                {previewImages.length > 0 && (
                  <div className="px-6 pb-4">
                    <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden">
                      {previewImages.map((img, idx) => (
                        <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                            sizes="(max-width: 768px) 33vw, 20vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="px-6 pb-6">
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all duration-200"
                  >
                    View All Photos
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full aspect-[4/3] max-w-md mx-auto md:mx-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 border-2 border-accent rounded-2xl -translate-x-2 -translate-y-2 z-10 pointer-events-none" />
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
