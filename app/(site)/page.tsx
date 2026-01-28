import { allProjects } from "content-collections";
import HomeClient from "@/components/HomeClient";

export default function HomePage() {
  const projects = allProjects.slice(0, 6).map((project) => ({
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    image: project.image,
    date: project.date,
    period: project.period,
    stack: project.stack,
    highlights: project.highlights,
  }));

  return <HomeClient projects={projects} />;
}
