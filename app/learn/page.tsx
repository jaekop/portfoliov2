import TileCard from "@/components/TileCard";

const tiles = [
  {
    href: "/learn/sql-waldo",
    title: "SQL Waldo",
    description: "Find the query anomalies hiding in plain sight.",
    image: "/tiles/sql-waldo.jpg",
  },
  {
    href: "/learn/motion-lab",
    title: "Motion Lab",
    description: "Play with easing curves and sketchy transitions.",
    image: "/tiles/motion-lab.jpg",
  },
  {
    href: "/learn/palette-play",
    title: "Palette Play",
    description: "Remix pencil palettes and texture overlays.",
    image: "/tiles/palette-play.jpg",
  },
  {
    href: "/learn/sound-scribbles",
    title: "Sound Scribbles",
    description: "Draw beats and watch them animate.",
    image: "/tiles/sound-scribbles.jpg",
  },
  {
    href: "/learn/layout-maze",
    title: "Layout Maze",
    description: "Navigate a grid puzzle of responsive layouts.",
    image: "/tiles/layout-maze.jpg",
  },
  {
    href: "/learn/data-sketch",
    title: "Data Sketch",
    description: "Sketch a tiny data story with animated dots.",
    image: "/tiles/data-sketch.jpg",
  },
];

export default function LearnPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="handwritten-title text-3xl">Learn Hub</h1>
        <p className="text-sm text-ink/70">
          Neal.fun-inspired playgrounds, each with a pencil twist.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tiles.map((tile) => (
          <TileCard key={tile.href} {...tile} />
        ))}
      </div>
    </div>
  );
}
