"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SignatureDraw from "@/components/SignatureDraw";
import { useReducedMotionGuard } from "@/lib/motion";

export default function HeroLoader({
  signaturePath,
  onComplete,
}: {
  signaturePath: string;
  onComplete: () => void;
}) {
  const prefersReduced = useReducedMotionGuard();
  const [startDrawing, setStartDrawing] = useState(false);
  const signatureScale = 0.42;
  const signatureTranslate = { x: 170, y: 20 };
  const revealDuration = 0.6;

  useEffect(() => {
    const delay = prefersReduced ? 500 : 900;
    setStartDrawing(true);
    const timer = setTimeout(onComplete, delay);
    return () => clearTimeout(timer);
  }, [onComplete, prefersReduced]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-paper text-ink"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative w-[min(90vw,720px)]">
        <div className="relative z-10 h-[min(70vw,420px)] overflow-visible">
          {startDrawing && (
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
              animate={
                prefersReduced
                  ? {}
                  : { opacity: 1, scale: [0.96, 1.04, 1] }
              }
              transition={{
                duration: revealDuration + 0.2,
                ease: "easeOut",
                times: [0, 0.65, 1],
              }}
            >
              <SignatureDraw
                signaturePath={signaturePath}
                scale={signatureScale}
                translate={signatureTranslate}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
