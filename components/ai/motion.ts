"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { RefObject } from "react";

// Plugin registrati solo nel browser (questo modulo viene valutato anche durante il prerender).
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin, SplitText);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

// Linguaggio di movimento comune: ogni reveal è opacità + y + blur, mai solo una dissolvenza.
export const MOTION = "(prefers-reduced-motion: no-preference)";
export const hidden = { autoAlpha: 0, y: 40, filter: "blur(10px)" };
export const shown = { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" };
export const popFrom = { autoAlpha: 0, scale: 0.6, filter: "blur(6px)" };
export const popTo = { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.6)" };

// Galleggiamento a riposo: ±4px, durate diverse per elemento.
export function idleFloat(targets: Element[]) {
  targets.forEach((el, i) => {
    gsap.to(el, {
      y: i % 2 ? 4 : -4,
      duration: 3 + ((i * 0.7) % 2),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: (i * 0.37) % 1.5,
    });
  });
}

export function spinRings(targets: Element[]) {
  targets.forEach((el, i) => gsap.to(el, { rotation: 360, duration: 7 + i, ease: "none", repeat: -1 }));
}

/*
 * Reveal standard di una sezione, guidato da attributi:
 *   [data-reveal="head"]  titolo, eyebrow, testo: entrano per primi
 *   [data-reveal="item"]  card: una dopo l'altra, da sinistra a destra
 *   [data-draw]           path SVG (pathLength=1) dentro una card: si disegnano dopo la card
 *   [data-pop]            chip dentro una card: spuntano per ultimi
 *   [data-float] / [data-spin]  animazioni a riposo
 * L'elemento `scope` deve avere l'attributo data-reveal-scope.
 */
export function useSectionReveal(scope: RefObject<HTMLElement | null>, start = "top 70%") {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const root = scope.current;
        if (!root) return;
        // Solo gli elementi di questo scope: uno scope annidato ([data-reveal-scope]) ha il suo trigger.
        const own = <T extends Element>(sel: string) =>
          gsap.utils.toArray<T>(sel, root).filter((el) => el.parentElement?.closest("[data-reveal-scope]") === root);
        const heads = own<HTMLElement>("[data-reveal='head']");
        const items = own<HTMLElement>("[data-reveal='item']");
        const loose = own<Element>("[data-draw]").filter((el) => !el.closest("[data-reveal='item']"));
        const loosePops = own<Element>("[data-pop]").filter((el) => !el.closest("[data-reveal='item']"));

        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start, once: true } });
        if (heads.length) tl.fromTo(heads, { ...hidden, y: 24 }, { ...shown, stagger: 0.1 });

        items.forEach((item, i) => {
          const at = 0.25 + i * 0.15;
          tl.fromTo(item, hidden, shown, at);
          const draws = item.querySelectorAll("[data-draw]");
          if (draws.length) tl.fromTo(draws, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.1 }, at + 0.35);
          const pops = item.querySelectorAll("[data-pop]");
          if (pops.length) tl.fromTo(pops, popFrom, { ...popTo, stagger: 0.08 }, at + 0.55);
        });

        if (loose.length) tl.fromTo(loose, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.12 });
        if (loosePops.length) tl.fromTo(loosePops, popFrom, { ...popTo, stagger: 0.08 }, "-=0.3");

        idleFloat(own<Element>("[data-float]"));
        spinRings(own<Element>("[data-spin]"));
      });
    },
    { scope },
  );
}
