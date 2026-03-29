import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EazyAccess",
    short_name: "EazyAccess",
    description:
      "A permanent portfolio of software built for the serious, practical parts of British life.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFCFA",
    theme_color: "#C8622A",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
