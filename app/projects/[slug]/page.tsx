import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allProjects } from "content-collections";
import MDXRenderer from "@/components/MDXRenderer";
import { Button } from "@/components/ui/button";

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = allProjects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <header className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
          {project.date}
        </p>
        <h1 className="handwritten-title text-3xl">{project.title}</h1>
        <p className="text-sm text-ink/70">{project.summary}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-graphite/30 px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.repo && (
            <Button asChild variant="outline">
              <Link href={project.repo}>Repo</Link>
            </Button>
          )}
          {project.demo && (
            <Button asChild variant="default">
              <Link href={project.demo}>Live demo</Link>
            </Button>
          )}
        </div>
      </header>

      <div className="relative mb-10 h-60 overflow-hidden rounded-xl border border-graphite/30">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>

      <MDXRenderer code={project.mdx} />
    </div>
  );
}
