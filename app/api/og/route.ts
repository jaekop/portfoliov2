import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "1200px",
          height: "630px",
          background: "#f7f2e9",
          color: "#161616",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
          fontFamily: "serif",
        }}
      >
        Pencil Portfolio
      </div>
    )
  );
}
