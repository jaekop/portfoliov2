"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { cn } from "@/lib/utils";

export default function TileCard({
  href,
  title,
  description,
  image,
  className,
}: {
  href: string;
  title: string;
  description: string;
  image: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "tile-card focus-ring group flex h-full flex-col rounded-xl border border-graphite/30 bg-paper p-4",
        className
      )}
      onClick={() => {
        if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
          posthog.capture("tile_open", { href, title });
        }
      }}
    >
      <div className="relative mb-4 h-36 w-full overflow-hidden rounded-lg border border-graphite/20">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
        />
      </div>
      <h3 className="font-display text-lg">{title}</h3>
      <p className="text-sm text-ink/70">{description}</p>
    </Link>
  );
}
