"use client";

import { track } from "@vercel/analytics";
import TearTicket from "@/components/TearTicket";

// Biglietto della waitlist: strappando la matrice si passa al form.
type Props = { ariaLabel: string; stubCta: string; stubSub: string; title: string; note: string };

export function WaitlistTicket({ ariaLabel, stubCta, stubSub, title, note }: Props) {
  return (
    <TearTicket
      className="waitlist-ticket"
      width={440}
      height={200}
      stubSize={128}
      radius={16}
      holes={11}
      rotate={-3}
      tiltMax={7}
      background="#d9ad45"
      stubBackground="#ecca6e"
      color="#2b1d05"
      ariaLabel={ariaLabel}
      onTear={() => {
        track("Ticket Torn");
        const input = document.getElementById("wl-name");
        input?.scrollIntoView({ behavior: "smooth", block: "center" });
        input?.focus({ preventScroll: true });
      }}
      stub={
        <div className="ticket-stub">
          <span className="ticket-mono">N. 001</span>
          <span className="ticket-stub-cta">{stubCta}</span>
          <span className="ticket-mono">{stubSub}</span>
        </div>
      }
    >
      <div className="ticket-body">
        <span className="ticket-mono ticket-muted">full-cycle · mentorship 1:1</span>
        <span className="ticket-heading">
          <span className="ticket-title">{title}</span>
          <span className="ticket-logo">
            full<span className="ticket-logo-slash">/</span>cycle
          </span>
        </span>
        <span className="ticket-mono ticket-muted">{note}</span>
      </div>
    </TearTicket>
  );
}
