// Sequenza di fasi come chip collegati da frecce. L'ultima fase è evidenziata come punto d'arrivo.
export function Flow({ steps, className }: { steps: string[]; className?: string }) {
  return (
    <ol className={["flow", className].filter(Boolean).join(" ")}>
      {steps.map((step, i) => (
        <li key={step} className={i === steps.length - 1 ? "flow-step flow-end" : "flow-step"}>
          {i > 0 && (
            <svg className="flow-arrow" viewBox="0 0 20 12" aria-hidden="true">
              <path d="M1 6h16M12.5 1.5 17 6l-4.5 4.5" />
            </svg>
          )}
          <span className="flow-chip">{step}</span>
        </li>
      ))}
    </ol>
  );
}
