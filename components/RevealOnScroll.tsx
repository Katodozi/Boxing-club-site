"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function RevealOnScroll({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 0.84, 0.44, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
