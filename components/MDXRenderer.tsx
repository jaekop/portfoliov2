"use client";

import { useMDXComponent } from "@content-collections/mdx/react";

export default function MDXRenderer({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <article className="mdx-content space-y-4">
      <Component />
    </article>
  );
}
