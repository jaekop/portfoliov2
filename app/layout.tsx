import type { Metadata } from "next";
import { IBM_Plex_Sans, Poiret_One } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PencilTexture from "@/components/PencilTexture";
import ThemeInit from "@/components/ThemeInit";
import SmoothScroll from "@/components/SmoothScroll";
import PostHogProvider from "@/components/PostHogProvider";
import { siteMetadata } from "@/lib/seo";

const displayFont = Poiret_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});


export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeInit />
        <PostHogProvider>
          <SmoothScroll />
          <div className="relative min-h-screen">
            <PencilTexture intensity="soft" className="opacity-70" />
            <div className="relative z-10 flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </div>
        </PostHogProvider>
      </body>
    </html>
  );
}
