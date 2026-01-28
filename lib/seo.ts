import type { Metadata } from "next";

const baseUrl = process.env.SITE_URL || "http://localhost:3000";

export const siteMetadata: Metadata = {
  title: "Pencil Portfolio",
  description: "Hand-drawn portfolio with projects, experiments, and sketches.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Pencil Portfolio",
    description: "Hand-drawn portfolio with projects, experiments, and sketches.",
    url: baseUrl,
    images: ["/api/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pencil Portfolio",
    description: "Hand-drawn portfolio with projects, experiments, and sketches.",
    images: ["/api/og"],
  },
};
