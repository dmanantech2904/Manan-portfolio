import { ImageResponse } from "next/og";

export const alt = "Manan Dave — Graphic Designer & Video Editor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#123D33",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          borderLeft: "18px solid #C3A268",
        }}
      >
        <div style={{ color: "#C3A268", fontSize: 26, letterSpacing: 8, textTransform: "uppercase" }}>
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#F3EADB",
              fontSize: 170,
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: -4,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Manan Dave
          </div>
          <div style={{ width: 160, height: 4, background: "#C3A268", margin: "36px 0 28px" }} />
          <div style={{ color: "#F3EADB", fontSize: 40, display: "flex" }}>
            Graphic Designer & Video Editor
          </div>
        </div>
      </div>
    ),
    size,
  );
}
