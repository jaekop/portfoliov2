"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import HeroLoader from "@/components/HeroLoader";
import ProjectCarousel, { type ProjectCard } from "@/components/ProjectCarousel";
import { Button } from "@/components/ui/button";
import { useMotionFadeIn, useReducedMotionGuard } from "@/lib/motion";

const signaturePath =
  "M 373.36 13.45 L 327.54 34.42 L 302.80 58.39 L 286.76 86.99 L 264.86 154.49 L 258.96 153.83 L 252.90 133.74 L 242.78 130.26 L 212.09 156.47 L 169.12 264.14 L 130.06 339.75 L 64.02 436.03 L 10.76 495.78 L 15.50 511.11 L 33.48 508.92 L 98.77 434.60 L 168.58 326.72 L 227.45 190.12 L 231.97 189.75 L 234.22 199.46 L 236.40 382.63 L 227.08 410.40 L 212.31 441.15 L 177.73 458.78 L 118.18 524.33 L 53.10 614.18 L 17.22 719.20 L 15.78 765.96 L 26.35 785.85 L 50.04 786.40 L 75.86 773.71 L 123.40 734.40 L 161.13 691.95 L 195.37 630.15 L 216.13 577.80 L 236.84 508.75 L 242.27 446.17 L 262.06 392.87 L 307.71 363.57 L 393.80 269.65 L 427.26 222.04 L 443.98 229.08 L 490.50 230.96 L 494.99 293.08 L 490.09 379.59 L 476.03 457.81 L 451.98 533.16 L 427.69 581.32 L 383.57 630.37 L 381.45 639.28 L 394.99 650.26 L 416.57 634.94 L 444.26 604.11 L 471.67 556.66 L 495.58 488.27 L 511.83 417.32 L 521.03 255.82 L 515.82 221.79 L 505.93 206.50 L 453.64 202.29 L 450.50 197.27 L 514.94 101.94 L 565.72 49.86 L 573.40 24.69 L 566.00 16.06 L 553.51 17.62 L 492.44 87.97 L 425.00 181.38 L 429.73 98.48 L 426.01 26.54 L 408.88 11.19 Z M 211.53 470.84 L 213.19 490.18 L 199.97 540.94 L 153.14 654.89 L 104.07 716.72 L 67.15 747.73 L 43.42 759.53 L 41.46 737.40 L 49.30 697.50 L 82.17 616.92 L 164.13 511.25 L 194.74 479.19 Z M 390.27 36.37 L 402.47 41.49 L 402.10 120.98 L 394.02 185.22 L 402.58 206.78 L 382.21 241.41 L 334.09 297.60 L 282.47 350.62 L 262.93 359.64 L 262.15 203.31 L 281.90 188.59 L 310.05 101.21 L 325.06 72.38 L 349.76 51.97 Z";

const socials = [
  { label: "Email", href: "mailto:jakobramirez@ucsb.edu" },
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

const focusAreas = [
  {
    title: "Engineering Focus",
    items: [
      "Computer vision + applied ML",
      "Backend + full-stack systems",
      "Data modeling + optimization",
    ],
  },
  {
    title: "Core Stack",
    items: ["Python", "SQL", "FastAPI", "Next.js", "PostgreSQL", "GCP"],
  },
  {
    title: "Tooling",
    items: ["PyTorch", "OpenCV", "Pandas", "NumPy", "GitHub"],
  },
  {
    title: "Languages",
    items: ["English", "Spanish"],
  },
];

const nowNotes = [
  "Developing a real-time YOLOv5 hand-sign detection system with sequence logic.",
  "Building and deploying full-stack data tools on Google Cloud with CI/CD.",
  "Leading technical workshops and mentoring teams in applied ML and data science.",
];

const currentBuildProjects = [
  {
    title: "Browser Gesture CV",
    summary: "Browser CV for gesture chains.",
    bullets: [
      "Client-side WebGPU inference for low-latency gesture recognition.",
      "YOLO-based detector plus lightweight classifier for two-hand sequences.",
      "Python + OpenCV tooling with CVAT labels for scalable training data.",
    ],
  },
  {
    title: "Context Lens",
    summary: "Real-time context reasoning from signals.",
    bullets: [
      "Computer vision and audio analysis build context of room dynamics and conversation.",
      "An AR/VR-ready system that clarifies social and environmental cues on the fly.",
      "Event-driven pipeline synthesizes signals into actionable, real-time guidance.",
    ],
  },
  {
    title: "Cooking Workflow Platform",
    summary: "Cloud-native cooking workflow platform scalable.",
    bullets: [
      "Full-stack product for recipe capture, planning, and kitchen flow.",
      "Event-driven backend with real-time API and analytics pipeline.",
      "DevOps lifecycle with CI/CD, observability, and extensible services.",
    ],
  },
];

const versionCards = [
  {
    id: "current",
    title: "Current Build",
    label: "What I am shaping",
    version: "v0.2",
    copy: "",
    items: nowNotes,
    tilt: -1.5,
  },
  {
    id: "toolbox",
    title: "Focus Areas",
    label: "Core disciplines",
    version: "v0.2",
    copy: "The stack I use when a model or workflow needs to ship reliably.",
    items: focusAreas,
    tilt: 1.2,
  },
  {
    id: "collab",
    title: "Availability",
    label: "Open to",
    version: "v0.2",
    copy:
      "Internships, research roles, and early-stage startup opportunities.",
    items: [],
    tilt: -0.6,
  },
];

export default function HomeClient({ projects }: { projects: ProjectCard[] }) {
  const [showLoader, setShowLoader] = useState(false);
  const [ready, setReady] = useState(false);
  const prefersReduced = useReducedMotionGuard();
  const fadeIn = useMotionFadeIn();
  const gridVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18 } },
  };
  const columnVariants = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const gridState = "show";

  useEffect(() => {
    const seen = localStorage.getItem("loaderSeen");
    if (!seen) {
      setShowLoader(true);
    } else {
      setReady(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    localStorage.setItem("loaderSeen", "true");
    setShowLoader(false);
    setReady(true);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showLoader && (
          <HeroLoader
            signaturePath={signaturePath}
            onComplete={handleLoaderComplete}
          />
        )}
      </AnimatePresence>

      {ready && (
        <div className="mx-auto flex w-full max-w-6xl flex-col px-4">
          <motion.section
            variants={gridVariants}
            initial={prefersReduced ? false : "hidden"}
            animate={gridState}
            className="min-h-[100svh] flex items-center"
          >
            <div className="flex w-full flex-col gap-8 py-10">
              <motion.div variants={columnVariants} className="space-y-3">
                <p className="text-xs uppercase tracking-[0.4em] text-ink/50">
                  About me
                </p>
                <h2 className="handwritten-title text-3xl sm:text-4xl">
                  Jakob Ramirez
                </h2>
                <p className="text-sm text-ink/70">
                  Statistics &amp; Data Science Student · Software &amp; Computer
                  Vision Engineer
                </p>
                <p className="max-w-3xl text-sm text-ink/70">
                  I build production-ready data, backend, and computer-vision
                  systems with a focus on real-time performance, scalability,
                  and clean infrastructure.
                </p>
              </motion.div>

              <div className="bulletin-board">
                <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr,1fr] lg:grid-rows-[auto,1fr]">
                  <motion.article
                    variants={columnVariants}
                    className="bulletin-card lg:col-start-1 lg:row-span-2"
                    style={{ rotate: versionCards[1].tilt }}
                  >
                    <span className="bulletin-pin" />
                    <div className="bulletin-card-header">
                      <div>
                        <p className="bulletin-label">{versionCards[1].label}</p>
                        <h3 className="bulletin-title">
                          {versionCards[1].title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-ink/70">{versionCards[1].copy}</p>
                    <div className="space-y-4">
                      {versionCards[1].items.map((group) => (
                        <div key={group.title} className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
                            {group.title}
                          </p>
                          <div className="bulletin-chips">
                            {group.items.map((item, index) => (
                              <span
                                key={`${group.title}-${item}`}
                                className="bulletin-chip"
                              >
                                {item}
                                <span className="bulletin-chip-id">
                                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.article>

                  <motion.div
                    variants={columnVariants}
                    className="bulletin-photo-card lg:col-start-2 lg:row-start-1"
                  >
                    <span className="bulletin-pin bulletin-pin-center" />
                    <div className="bulletin-photo-frame">
                      <Image
                        src="/me.jpg"
                        alt="Portrait"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 520px"
                      />
                    </div>
                    <div className="bulletin-photo-label">Jakob Ramirez</div>
                  </motion.div>

                  <motion.article
                    variants={columnVariants}
                    className="bulletin-card lg:col-start-3 lg:row-span-2"
                    style={{ rotate: versionCards[0].tilt }}
                  >
                    <span className="bulletin-pin" />
                    <div className="bulletin-card-header">
                      <div>
                        <p className="bulletin-label">{versionCards[0].label}</p>
                        <h3 className="bulletin-title">
                          {versionCards[0].title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-ink/70">{versionCards[0].copy}</p>
                    <div className="space-y-3">
                      <div>
                        <div className="space-y-0">
                          {currentBuildProjects.map((project) => (
                            <div key={project.title} className="space-y-2">
                              <p className="text-sm font-semibold text-ink">
                                {project.title}
                              </p>
                              <p className="text-xs font-semibold text-ink">
                                {project.summary}
                              </p>
                              <ul className="space-y-1 text-sm text-ink/70">
                                {project.bullets.map((bullet) => (
                                  <li key={bullet}>• {bullet}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.article>

                  <motion.article
                    variants={columnVariants}
                    className="bulletin-card lg:col-start-2 lg:col-end-3"
                    style={{ rotate: versionCards[2].tilt }}
                  >
                    <span className="bulletin-pin" />
                    <div className="bulletin-card-header">
                      <div>
                        <p className="bulletin-label">{versionCards[2].label}</p>
                        <h3 className="bulletin-title">
                          {versionCards[2].title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-ink/70">{versionCards[2].copy}</p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {socials.map((social) => (
                        <Button key={social.label} asChild variant="outline">
                          <a href={social.href} className="focus-ring">
                            {social.label}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </motion.article>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section {...fadeIn} className="pb-12 pt-10">
            <ProjectCarousel projects={projects} />
          </motion.section>
        </div>
      )}
    </div>
  );
}
