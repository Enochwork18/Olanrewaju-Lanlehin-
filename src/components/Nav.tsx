"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Camera } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { navLinks, sectionIds, personalInfo } from "@/data/data";
import { useScrollActive } from "@/hooks/useScrollActive";
import ScrollProgress from "./ScrollProgress";
import { cn } from "@/lib/utils";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const activeId = useScrollActive(sectionIds);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileOpen(false);

    setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const menu = document.getElementById("mobile-menu");
      const toggle = document.getElementById("hamburger-btn");
      if (
        menu && !menu.contains(e.target as Node) &&
        toggle && !toggle.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  return (
    <>
      <ScrollProgress />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-bg backdrop-blur-md border-b border-light-grey">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={(e) => handleNavClick(e, "home")}
              className="text-near-black font-serif font-bold text-lg tracking-tight hover:text-accent transition-colors"
            >
              {personalInfo.name.split(" ")[0]}
              <span className="text-accent">.</span>
            </button>

            <div className="flex items-center gap-4">
              <ul className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => {
                  const id = link.href.replace("#", "");
                  return (
                    <li key={link.href}>
                      <button
                        onClick={(e) => handleNavClick(e, id)}
                        className={cn(
                          "text-sm font-medium transition-all duration-200 relative pb-1",
                          activeId === id
                            ? "text-accent"
                            : "text-mid-grey hover:text-near-black"
                        )}
                      >
                        {link.label}
                        {activeId === id && (
                          <motion.div
                            layoutId="nav-underline"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href="/gallery"
                    className="flex items-center gap-1.5 text-sm font-medium text-mid-grey hover:text-accent transition-colors"
                  >
                    <Camera size={14} />
                    Gallery
                  </Link>
                </li>
              </ul>

              {mounted && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent/20 transition-colors shrink-0"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={theme}
                      initial={{ rotate: -90, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      exit={{ rotate: 90, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              )}

              <button
                id="hamburger-btn"
                className="md:hidden p-2 text-near-black hover:text-accent transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-light-grey bg-bg-primary overflow-hidden"
            >
              <ul className="flex flex-col py-4">
                {navLinks.map((link, i) => {
                  const id = link.href.replace("#", "");
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <button
                        onClick={(e) => handleNavClick(e, id)}
                        className={cn(
                          "w-full text-left px-6 py-3 text-sm font-medium transition-colors",
                          activeId === id
                            ? "text-accent bg-accent/5"
                            : "text-mid-grey hover:text-near-black hover:bg-light-grey/50"
                        )}
                      >
                        {link.label}
                      </button>
                    </motion.li>
                  );
                })}
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <Link
                    href="/gallery"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 w-full text-left px-6 py-3 text-sm font-medium text-mid-grey hover:text-near-black hover:bg-light-grey/50 transition-colors"
                  >
                    <Camera size={16} />
                    Gallery
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
