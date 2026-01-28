import ReplayLoaderLink from "@/components/ReplayLoaderLink";

export default function Footer() {
  return (
    <footer className="border-t border-graphite/20 bg-paper/80 py-6">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 text-sm text-ink/70">
        <span>Drawn in graphite &amp; pixels.</span>
        <ReplayLoaderLink />
      </div>
    </footer>
  );
}
