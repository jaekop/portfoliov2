"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import posthog from "posthog-js";

export type ProjectCard = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  period?: string;
  stack: string[];
  highlights?: string[];
  logo?: string;
};

export default function ProjectCarousel({ projects }: { projects: ProjectCard[] }) {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const formatDate = (value: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(new Date(value));

  const slides = useMemo(() => {
    const tocItems = projects.map((project, i) => ({
      title: project.title,
      slug: project.slug,
      number: i + 1,
    }));

    return [
      { id: "toc", type: "toc" as const, items: tocItems },
      ...projects.map((project) => ({
        id: project.slug,
        type: "project" as const,
        project,
      })),
    ];
  }, [projects]);

  const goNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const cardVariants = {
    enter: (dir: number) => ({
      rotateZ: prefersReduced ? 0 : dir > 0 ? -6 : 6,
      opacity: 0,
      y: prefersReduced ? 0 : dir > 0 ? 24 : -24,
      scale: prefersReduced ? 1 : 0.96,
    }),
    center: {
      rotateZ: 0,
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReduced
        ? { duration: 0 }
        : { type: "spring", stiffness: 260, damping: 22 },
    },
    exit: (dir: number) => ({
      rotateZ: prefersReduced ? 0 : dir > 0 ? 6 : -6,
      opacity: 0,
      y: prefersReduced ? 0 : dir > 0 ? -18 : 18,
      scale: prefersReduced ? 1 : 0.96,
      transition: { duration: prefersReduced ? 0 : 0.3, ease: "easeIn" },
    }),
  };

  const current = slides[index];

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="handwritten-title text-sm text-ink/70">Projects</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goPrev}
            aria-label="Previous card"
          >
            <ArrowLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goNext}
            aria-label="Next card"
          >
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
      <div
        tabIndex={0}
        aria-label="Project flashcards"
        className="flashcard-stage focus-ring w-full"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") goPrev();
          if (event.key === "ArrowRight") goNext();
        }}
      >
        <div className="flashcard-deck mx-auto w-full max-w-3xl">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.article
              key={current.id}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flashcard flashcard-card w-full min-h-[420px] px-7 pb-7 pt-7 pl-16 sm:min-h-[460px]"
            >
              {current.type === "toc" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
                        Table of contents
                      </p>
                      <h3 className="font-display text-xl">Flashcards</h3>
                    </div>
                    <span className="text-xs text-ink/50">
                      {index + 1} / {slides.length}
                    </span>
                  </div>
                  <ol className="space-y-2 text-sm text-ink/70">
                    {current.items.map((item) => (
                      <li key={item.slug} className="flex items-center gap-3">
                        <span className="text-xs text-ink/50">
                          {item.number.toString().padStart(2, "0")}
                        </span>
                        <span>{item.title}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
                    Tap ← to flip forward
                  </p>
                </div>
              ) : (
                (() => {
                  return (
                    <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
                        Project {index} of {slides.length - 1}
                      </p>
                      <h3 className="font-display text-xl">
                        {current.project.title}
                      </h3>
                    </div>
                    <span className="text-xs text-ink/50">
                      {current.project.period ??
                        formatDate(current.project.date)}{" "}
                      · {index + 1} / {slides.length}
                    </span>
                  </div>
                      <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/50">
                        {current.project.stack.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                      <div className="grid gap-4 text-base text-ink/70 sm:grid-cols-2">
                        <div className="bg-paper/70 p-5">
                          <div className="space-y-3">
                            <div className="relative h-40 w-full overflow-hidden sm:h-52">
                              <Image
                                src={current.project.image}
                                alt={current.project.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, 50vw"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="bg-paper/70 p-5">
                          <div className="space-y-2 text-xs text-ink/60">
                            {current.project.highlights?.length ? (
                              <ul className="space-y-1">
                                {current.project.highlights.map((item) => (
                                  <li key={item}>• {item}</li>
                                ))}
                              </ul>
                            ) : (
                              <p>{current.project.summary}</p>
                            )}
                          </div>
                        </div>
                        <div className="bg-paper/70 p-5 sm:col-span-2">
                          <div className="space-y-3">
                            <p className="text-lg font-semibold text-ink">
                              {current.project.summary}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button
                          asChild
                          variant="outline"
                          onClick={() => {
                            if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
                              posthog.capture("project_open", {
                                slug: current.project.slug,
                              });
                            }
                          }}
                        >
                          <Link href={`/projects/${current.project.slug}`}>
                            View
                          </Link>
                        </Button>
                        <span className="text-xs text-ink/50">
                          Click → to rewind
                        </span>
                      </div>
                    </div>
                  );
                })()
              )}
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
