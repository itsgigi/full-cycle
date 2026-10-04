"use client";

import type { ReactNode } from "react";

// Porta al form e preseleziona il pacchetto. Senza JS resta un normale link all'ancora.
export function ChooseTrackLink({
  trackId,
  className,
  children,
}: {
  trackId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#lista"
      className={className}
      onClick={() => {
        const radio = document.getElementById(`track-${trackId}`);
        if (radio instanceof HTMLInputElement) radio.checked = true;
      }}
    >
      {children}
    </a>
  );
}
