"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, useEffect } from "react";

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

interface GlitchImageProps {
  src: StaticImageData | string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export default function GlitchImage({
  src,
  alt,
  className,
  width,
  height,
  fill,
  sizes,
  priority,
}: GlitchImageProps) {
  const [glitching, setGlitching] = useState(false);
  const reducedMotion = useReducedMotion();

  const imageProps = {
    src,
    alt,
    className: "h-full w-full object-cover",
    ...(fill ? { fill: true, sizes } : { width, height }),
    ...(priority ? { priority: true } : {}),
  };

  if (reducedMotion) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image {...imageProps} />
      </div>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden ${className ?? ""}`}
      onMouseEnter={() => setGlitching(true)}
      onMouseLeave={() => setGlitching(false)}>
      <Image {...imageProps} />
      {glitching && (
        <>
          <div
            className="absolute inset-0 mix-blend-multiply"
            style={{
              clipPath: "inset(15% 0 60% 0)",
              transform: "translateX(3px)",
              filter: "saturate(2) hue-rotate(-30deg)",
            }}>
            <Image
              {...imageProps}
              alt=""
            />
          </div>
          <div
            className="absolute inset-0 mix-blend-screen"
            style={{
              clipPath: "inset(55% 0 10% 0)",
              transform: "translateX(-3px)",
              filter: "saturate(2) hue-rotate(30deg)",
            }}>
            <Image
              {...imageProps}
              alt=""
            />
          </div>
        </>
      )}
    </div>
  );
}
