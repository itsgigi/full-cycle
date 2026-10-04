import { notFound } from "next/navigation";

// URL sconosciuti sotto /it o /en: mostrano la 404 localizzata di app/[lang]/not-found.tsx.
export default function CatchAll() {
  notFound();
}
