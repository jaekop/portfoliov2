"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { Menu } from "lucide-react";
import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { siteVersion } from "@/lib/version";

const links = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-transparent bg-paper/90 backdrop-blur-sm",
        scrolled && "border-graphite/20 shadow-sm"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="handwritten-title text-lg">
            jaekop.me
          </Link>
          <span className="rounded-full border border-graphite/40 px-3 py-0.5 text-[10px] uppercase tracking-[0.25em] text-ink/70">
            {siteVersion}
          </span>
        </div>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="focus-ring">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu size={18} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Quick Menu</DialogTitle>
                <DialogDescription>
                  Jump to a section or sign in with Google.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="focus-ring rounded-md border border-graphite/30 px-3 py-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  variant="outline"
                  onClick={() => signIn("google")}
                  className="mt-2"
                >
                  Sign in with Google
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
