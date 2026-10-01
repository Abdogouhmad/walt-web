import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The social card, generated at build time.
 *
 * Everything is inlined HTML and CSS: no screenshot, no CDN, no font download.
 * Satori only understands flexbox, so the layout is a column of rows rather
 * than anything clever, and the decorative blobs are absolutely positioned.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#F9F9F9",
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(15,107,79,0.16) 0%, rgba(15,107,79,0) 46%), radial-gradient(circle at 6% 96%, rgba(73,138,252,0.16) 0%, rgba(73,138,252,0) 44%)",
          color: "#191C1B",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "22px",
              backgroundColor: "#0F6B4F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: "46px",
              fontWeight: 700,
            }}
          >
            w
          </div>
          <div style={{ display: "flex", fontSize: "40px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "84px",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
            }}
          >
            Your money. Your phone.
          </div>
          <div style={{ display: "flex", marginTop: "18px", fontSize: "36px", color: "#3F4946" }}>
            Nobody else.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {["No account", "No ads", "Works offline", "Open source · MIT"].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                padding: "14px 26px",
                borderRadius: "999px",
                backgroundColor: "#D5E9DF",
                color: "#0A4C39",
                fontSize: "26px",
                fontWeight: 700,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}