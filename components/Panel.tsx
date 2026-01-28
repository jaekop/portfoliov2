import { cn } from "@/lib/utils";

export default function Panel({
  title,
  className,
  children,
  scrollable,
  draw,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
  scrollable?: boolean;
  draw?: boolean;
}) {
  return (
    <section
      className={cn(
        "panel-frame panel-jitter relative flex h-full flex-col gap-4 p-5",
        draw ? "sketch-frame" : "hand-drawn-border",
        scrollable && "overflow-hidden",
        className
      )}
    >
      {draw && (
        <svg
          className="sketch-border"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect
            className="sketch-border-path"
            x="2"
            y="2"
            width="96"
            height="96"
            rx="12"
            ry="12"
            pathLength="1"
          />
        </svg>
      )}
      {title && (
        <h2 className="relative z-10 handwritten-title text-sm text-ink/70">
          {title}
        </h2>
      )}
      <div className={cn("relative z-10", scrollable && "overflow-y-auto pr-2")}>
        {children}
      </div>
    </section>
  );
}
