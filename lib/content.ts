import { allProjects } from "content-collections";

export function getProjects() {
  return [...allProjects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
