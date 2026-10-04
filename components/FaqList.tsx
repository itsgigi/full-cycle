"use client";

import { useRef } from "react";
import type { MouseEvent } from "react";

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

// Accordion su <details> nativi: con JS apertura e chiusura animano l'altezza, senza JS funzionano lo stesso.
function FaqItem({ q, a }: { q: string; a: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const anim = useRef<Animation | null>(null);

  function onToggle(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();

    const summary = el.querySelector("summary")!;
    const answer = el.querySelector(".faq-answer") as HTMLElement;
    const style = getComputedStyle(el);
    const closedHeight = summary.offsetHeight + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const from = el.offsetHeight;
    const opening = !el.open || el.dataset.closing === "true";

    anim.current?.cancel();
    el.style.overflow = "hidden";

    if (opening) {
      delete el.dataset.closing;
      el.open = true;
      el.dataset.state = "open";
      const to = el.offsetHeight;
      answer.animate(
        [{ opacity: 0, transform: "translateY(-6px)" }, { opacity: 1, transform: "none" }],
        { duration: 380, delay: 60, easing: EASING, fill: "backwards" },
      );
      anim.current = el.animate({ height: [`${from}px`, `${to}px`] }, { duration: 420, easing: EASING });
    } else {
      el.dataset.closing = "true";
      el.dataset.state = "closed";
      answer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: "ease-out", fill: "forwards" });
      anim.current = el.animate({ height: [`${from}px`, `${closedHeight}px`] }, { duration: 360, easing: EASING });
    }

    anim.current.onfinish = () => {
      if (el.dataset.closing === "true") {
        el.open = false;
        delete el.dataset.closing;
      }
      answer.getAnimations().forEach((x) => x.cancel());
      el.style.overflow = "";
      anim.current = null;
    };
  }

  return (
    <details ref={ref}>
      <summary onClick={onToggle} style={{ cursor: "help" }}>
        <span>{q}</span>
        <span className="faq-icon" aria-hidden="true" />
      </summary>
      <p className="faq-answer">{a}</p>
    </details>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq-list">
      {items.map((f) => (
        <FaqItem key={f.q} q={f.q} a={f.a} />
      ))}
    </div>
  );
}
