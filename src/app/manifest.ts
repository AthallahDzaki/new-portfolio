import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Athallah Dzaki Anggoro Seputro — Creative Developer",
    short_name: "Athallah Dzaki",
    description:
      "Interactive 3D Portfolio of Athallah Dzaki Anggoro Seputro, Creative Developer & WebGL Engineer.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
