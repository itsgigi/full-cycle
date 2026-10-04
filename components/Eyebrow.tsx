import type { ReactNode } from "react";

// Etichetta sopra i titoli in forma di path, come "/frontend". Varianti per sfondi chiari, scuri e su immagine.
function toPath(text: string) {
  return "/" + text.trim().toLowerCase().replace(/\s+/g, "-");
}

export function Eyebrow({
  variant = "default",
  className,
  children,
}: {
  variant?: "default" | "dark" | "glass";
  className?: string;
  children: ReactNode;
}) {
  const classes = ["eyebrow", variant !== "default" && `eyebrow-${variant}`, className]
    .filter(Boolean)
    .join(" ");

  if (typeof children !== "string") return <p className={classes}>{children}</p>;

  return (
    <p className={classes}>
      <span aria-hidden="true">{toPath(children)}</span>
      <span className="sr-only">{children}</span>
    </p>
  );
}
