import { allProjects } from "contentlayer/generated";

export function getProjects() {
  return allProjects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
