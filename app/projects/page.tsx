import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/content";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <header className="mb-8 space-y-2">
        <h1 className="handwritten-title text-3xl">Projects</h1>
        <p className="text-sm text-ink/70">
          A sketchbook of shipped work, prototypes, and playful experiments.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="rounded-xl border border-graphite/30 bg-paper p-5"
          >
            <div className="relative mb-4 h-44 overflow-hidden rounded-lg border border-graphite/20">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h2 className="font-display text-xl">{project.title}</h2>
            <p className="text-sm text-ink/70">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-graphite/30 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-4">
              <Link href={`/projects/${project.slug}`}>Open project</Link>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
