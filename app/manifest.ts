import type { MetadataRoute } from "next";
import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  const { meta } = getDictionary(defaultLocale);
  return {
    name: meta.title,
    short_name: siteConfig.name,
    description: meta.description,
    lang: defaultLocale,
    start_url: "/",
    display: "browser",
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
