"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  mode?: "char" | "word";
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export default function SplitText({
  text,
  className,
  charClassName,
  mode = "char",
  delay = 0,
  stagger = 0.02,
  once = true,
}: SplitTextProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const units = mode === "char" ? text.split("") : text.split(" ");

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}>
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          className={`inline-block ${charClassName ?? ""}`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                delay: delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}>
          {unit === " " ? "\u00A0" : unit}
          {mode === "word" && i < units.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
