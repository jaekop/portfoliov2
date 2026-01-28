"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotionGuard } from "@/lib/motion";

export default function SmoothScroll() {
  const prefersReduced = useReducedMotionGuard();

  useEffect(() => {
    if (prefersReduced) return;
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(frame);
    };
  }, [prefersReduced]);

  return null;
}
