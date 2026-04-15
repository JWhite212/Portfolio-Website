"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEF";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: "mount" | "hover";
  speed?: number;
}

export default function TextScramble({
  text,
  className,
  trigger = "hover",
  speed = 30,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const reducedMotion = useReducedMotion();
  const timeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const isAnimating = useRef(false);

  const scramble = useCallback(() => {
    if (isAnimating.current || reducedMotion) return;
    isAnimating.current = true;

    let frame = 0;
    const totalFrames = text.length + 10;

    const tick = () => {
      frame++;
      const resolved = Math.floor((frame / totalFrames) * text.length);
      let output = "";

      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          output += " ";
        } else if (i < resolved) {
          output += text[i];
        } else {
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplay(output);

      if (frame < totalFrames) {
        timeoutRef.current = window.setTimeout(() => {
          rafRef.current = requestAnimationFrame(tick);
        }, speed);
      } else {
        setDisplay(text);
        isAnimating.current = false;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [text, speed, reducedMotion]);

  useEffect(() => {
    if (trigger === "mount" && !reducedMotion) {
      const timer = setTimeout(scramble, 200);
      return () => clearTimeout(timer);
    }
  }, [trigger, scramble, reducedMotion]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlers =
    trigger === "hover" && !reducedMotion
      ? { onMouseEnter: scramble }
      : undefined;

  return (
    <span
      className={className}
      {...handlers}>
      {display}
    </span>
  );
}
