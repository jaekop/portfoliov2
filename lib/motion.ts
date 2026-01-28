"use client";

import { useReducedMotion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export function useReducedMotionGuard() {
  const prefersReduced = useReducedMotion();
  return Boolean(prefersReduced);
}

export function useMotionFadeIn() {
  const prefersReduced = useReducedMotionGuard();
  return prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
      };
}

export function useInViewStagger<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const isInView = useInView(ref, { margin: "-10% 0px", once: true });
  return { ref, isInView };
}

export function usePrefersReducedMotionEffect(callback: () => void, deps: unknown[]) {
  const prefersReduced = useReducedMotionGuard();
  useEffect(() => {
    if (prefersReduced) return;
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReduced, ...deps]);
}
