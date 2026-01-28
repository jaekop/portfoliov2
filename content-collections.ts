import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    period: z.string().optional(),
    tags: z.array(z.string()),
    stack: z.array(z.string()),
    highlights: z.array(z.string()).optional(),
    repo: z.string().optional(),
    demo: z.string().optional(),
    image: z.string(),
    summary: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
      slug: document._meta.path,
    };
  },
});

export default defineConfig({
  collections: [projects],
});
