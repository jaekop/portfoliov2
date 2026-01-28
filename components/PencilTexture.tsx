import { cn } from "@/lib/utils";

const intensityClasses = {
  soft: "grain-soft",
  medium: "grain-medium",
  strong: "grain-strong",
};

export default function PencilTexture({
  intensity = "medium",
  className,
}: {
  intensity?: "soft" | "medium" | "strong";
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0", intensityClasses[intensity], className)}>
      <div className="pencil-texture" aria-hidden="true" />
      <div className="grain-layer" aria-hidden="true" />
    </div>
  );
}
