"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, MOTION, ScrollTrigger } from "./motion";

// Scroll morbido con Lenis, sincronizzato con ScrollTrigger. Spento con prefers-reduced-motion.
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia(MOTION).matches) return;
    const lenis = new Lenis({ anchors: { offset: -16 }, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
