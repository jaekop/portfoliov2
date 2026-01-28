"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Panel from "@/components/Panel";
import { useReducedMotionGuard } from "@/lib/motion";

export default function SqlWaldoPage() {
  const [showCohorts, setShowCohorts] = useState(true);
  const prefersReduced = useReducedMotionGuard();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <header className="mb-8 space-y-2">
        <h1 className="handwritten-title text-3xl">SQL Waldo</h1>
        <p className="text-sm text-ink/70">
          A future mini-game for finding cohorts hiding in query results.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr,2fr]">
        <Panel title="Filters">
          <div className="space-y-4">
            <label className="flex flex-col gap-2 text-sm">
              Dataset
              <select className="focus-ring rounded-md border border-graphite/40 bg-paper px-3 py-2">
                <option>Growth cohorts</option>
                <option>Retention clues</option>
                <option>Revenue trails</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Time range
              <select className="focus-ring rounded-md border border-graphite/40 bg-paper px-3 py-2">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>All time</option>
              </select>
            </label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={showCohorts ? "default" : "outline"}
                onClick={() => setShowCohorts(true)}
              >
                Show cohorts
              </Button>
              <Button
                variant={!showCohorts ? "default" : "outline"}
                onClick={() => setShowCohorts(false)}
              >
                Hide cohorts
              </Button>
            </div>
          </div>
        </Panel>

        <Panel title="Cohort Canvas" className="min-h-[320px]">
          <motion.div
            initial={false}
            animate={
              prefersReduced
                ? { opacity: 1, height: "auto" }
                : { opacity: showCohorts ? 1 : 0, y: showCohorts ? 0 : 20 }
            }
            transition={{ duration: 0.4 }}
            className="grid h-full place-items-center rounded-lg border border-dashed border-graphite/40 bg-paper/60 p-6 text-center"
          >
            {showCohorts ? (
              <div className="space-y-2">
                <h2 className="font-display text-xl">Cohorts Incoming</h2>
                <p className="text-sm text-ink/70">
                  Animated nodes will appear here once the dataset lands.
                </p>
              </div>
            ) : (
              <p className="text-sm text-ink/70">
                Cohorts hidden. Toggle back to reveal the dots.
              </p>
            )}
          </motion.div>
        </Panel>
      </div>
    </div>
  );
}
