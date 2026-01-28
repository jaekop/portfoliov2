import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    stack: { type: "list", of: { type: "string" }, required: true },
    highlights: { type: "list", of: { type: "string" }, required: false },
    period: { type: "string", required: false },
    repo: { type: "string", required: false },
    demo: { type: "string", required: false },
    image: { type: "string", required: true },
    summary: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Project],
});
