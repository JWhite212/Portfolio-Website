"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";

function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isTouch;
}

const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };

function CursorRing({
  x,
  y,
  hovering,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  hovering: boolean;
}) {
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const size = hovering ? 56 : 40;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full border border-[var(--accent)]"
      style={{
        x: springX,
        y: springY,
        width: size,
        height: size,
        translateX: "-50%",
        translateY: "-50%",
        opacity: hovering ? 0.6 : 0.3,
        transition: "width 0.2s, height 0.2s, opacity 0.2s",
      }}
    />
  );
}

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY],
  );

  useEffect(() => {
    if (reducedMotion || isTouch) return;

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select"))
        setHovering(true);
    };
    const handleOut = () => setHovering(false);

    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [reducedMotion, isTouch, onMouseMove]);

  if (reducedMotion || isTouch) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10001]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}>
        <div
          className="rounded-full bg-[var(--accent)]"
          style={{
            width: hovering ? 6 : 8,
            height: hovering ? 6 : 8,
            transition: "width 0.2s, height 0.2s",
          }}
        />
      </motion.div>
      <CursorRing
        x={cursorX}
        y={cursorY}
        hovering={hovering}
      />
    </>
  );
}
