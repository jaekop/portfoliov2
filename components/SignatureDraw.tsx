"use client";

export default function SignatureDraw({
  signaturePath,
  viewBox = "0 0 585 798",
  scale = 1,
  translate = { x: 0, y: 0 },
}: {
  signaturePath: string;
  viewBox?: string;
  scale?: number;
  translate?: { x: number; y: number };
}) {
  return (
    <svg
      viewBox={viewBox}
      className="h-full w-full"
      role="img"
      aria-label="Signature"
    >
      <g transform={`translate(${translate.x} ${translate.y}) scale(${scale})`}>
        <path
          d={signaturePath}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
