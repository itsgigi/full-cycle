"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

// Traccia i click sugli elementi con data-track="Nome evento" (anche nei server component).
// Le proprietà arrivano dagli attributi data-track-*: data-track-location="hero" → { location: "hero" }.
export function TrackClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const props: Record<string, string> = {};
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key.startsWith("track") && key !== "track" && value) {
          props[key.charAt(5).toLowerCase() + key.slice(6)] = value;
        }
      }
      track(el.dataset.track!, props);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
