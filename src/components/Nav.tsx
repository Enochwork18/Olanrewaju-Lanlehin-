"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, sectionIds, personalInfo } from "@/data/data";
import { useScrollActive } from "@/hooks/useScrollActive";
import ScrollProgress from "./ScrollProgress";
import { cn } from "@/lib/utils";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollActive(sectionIds);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <ScrollProgress />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-white/90 backdrop-blur-md border-b border-light-grey">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => handleClick("#hero")}
              className="text-near-black font-serif font-bold text-lg tracking-tight hover:text-crimson transition-colors"
            >
              {personalInfo.name.split(" ")[0]}
              <span className="text-crimson">.</span>
            </button>

            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleClick(link.href)}
                    className={cn(
                      "text-sm font-medium transition-all duration-200 relative pb-1",
                      activeId === link.href.replace("#", "")
                        ? "text-crimson"
                        : "text-mid-grey hover:text-near-black"
                    )}
                  >
                    {link.label}
                    {activeId === link.href.replace("#", "") && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-crimson"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <button
              className="md:hidden p-2 text-near-black hover:text-crimson transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-light-grey bg-warm-white overflow-hidden"
            >
              <ul className="flex flex-col py-4">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => handleClick(link.href)}
                      className={cn(
                        "w-full text-left px-6 py-3 text-sm font-medium transition-colors",
                        activeId === link.href.replace("#", "")
                          ? "text-crimson bg-crimson/5"
                          : "text-mid-grey hover:text-near-black hover:bg-light-grey/50"
                      )}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
