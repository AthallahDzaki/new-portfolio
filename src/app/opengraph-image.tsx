import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Athallah Dzaki Anggoro Seputro — Creative Developer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "white",
          border: "2px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "20px",
            color: "#00F0FF",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#00F0FF",
            }}
          />
          ATHALLAH DZAKI // 2026 PORTFOLIO
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              lineHeight: 1.05,
            }}
          >
            ATHALLAH DZAKI
            <span style={{ display: "block", color: "rgba(255, 255, 255, 0.4)" }}>
              ANGGORO SEPUTRO
            </span>
          </div>

          <div
            style={{
              fontSize: "28px",
              color: "#EDEDED",
              fontWeight: 300,
              maxWidth: "800px",
            }}
          >
            Creative Developer · Three.js · WebGL · Next.js Engineer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px",
            fontSize: "18px",
            color: "rgba(255, 255, 255, 0.5)",
            fontFamily: "monospace",
          }}
        >
          <div>JAKARTA, INDONESIA</div>
          <div style={{ color: "#00F0FF" }}>ATHALLAHDZAKI.MY.ID</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
