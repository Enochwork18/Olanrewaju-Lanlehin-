"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function PlusMark({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="22" stroke="#C8203F" strokeWidth="2" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="#C8203F" strokeWidth="2" />
    </svg>
  );
}

function HollowCircle({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="#C8203F" strokeWidth="1.5" />
    </svg>
  );
}

function ChevronStack({ className }: { className?: string }) {
  return (
    <svg width="16" height="32" viewBox="0 0 16 32" fill="none" aria-hidden="true">
      <path d="M2 2l12 14-12 14" stroke="#C8203F" strokeWidth="1.5" />
    </svg>
  );
}

function DiagonalHatch({ className }: { className?: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <line x1="0" y1="40" x2="40" y2="0" stroke="#C8203F" strokeWidth="1" />
      <line x1="10" y1="40" x2="40" y2="10" stroke="#C8203F" strokeWidth="1" />
      <line x1="0" y1="30" x2="30" y2="0" stroke="#C8203F" strokeWidth="1" />
    </svg>
  );
}

export default function DecorativeAccents() {
  const ref = useRef<HTMLDivElement>(null!);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  return (
    <div ref={ref} className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div className="absolute top-8 right-8" style={{ y: y1 }}>
        <PlusMark />
      </motion.div>
      <motion.div className="absolute bottom-8 left-8" style={{ y: y2, scale: scale1 }}>
        <HollowCircle />
      </motion.div>
      <motion.div className="absolute top-1/2 right-4 -translate-y-1/2" style={{ y: y1 }}>
        <ChevronStack />
      </motion.div>
      <motion.div className="absolute bottom-12 right-12" style={{ y: y2 }}>
        <DiagonalHatch />
      </motion.div>
    </div>
  );
}
