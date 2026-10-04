"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// Grafico finto "in tempo reale" per la card Admin Dashboard: ogni tick arriva un punto nuovo, come da WebSocket.
const W = 300;
const H = 100;
const TICK_MS = 1400;
const INITIAL = [42, 48, 45, 56, 52, 61, 58, 66, 60, 71, 68, 74, 70, 78];

function toPath(values: number[]) {
  const step = W / (values.length - 1);
  const pts = values.map((v, i) => [i * step, H - v] as const);
  // Curva morbida: punti di controllo a metà tra un punto e il successivo.
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`;
  }
  return d;
}

function nextValue(prev: number) {
  const v = prev + (Math.random() - 0.48) * 18;
  return Math.min(88, Math.max(18, v));
}

export function LiveChart() {
  const reduce = useReducedMotion();
  const [values, setValues] = useState(INITIAL);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setValues((prev) => [...prev.slice(1), nextValue(prev[prev.length - 1])]);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [reduce]);

  const line = toPath(values);
  const area = `${line} L${W},${H} L0,${H} Z`;
  const last = values[values.length - 1];
  const rate = Math.round(last * 17 + 120);
  const transition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="live-chart">
      <span className="live-chart-stat">
        <span className="live-chart-dot" />
        live · {rate.toLocaleString("it-IT")} req/s
      </span>
      <div className="live-chart-plot">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="live-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a9c9f5" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#a9c9f5" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[25, 50, 75].map((y) => (
            <line key={y} x1="0" x2={W} y1={y} y2={y} className="live-chart-grid" />
          ))}
          <motion.path initial={false} animate={{ d: area }} transition={transition} fill="url(#live-chart-fill)" />
          <motion.path
            initial={{ pathLength: 0, d: line }}
            animate={{ pathLength: 1, d: line }}
            transition={{ ...transition, pathLength: { duration: 1.6, ease: "easeOut" } }}
            className="live-chart-line"
          />
        </svg>
        <motion.span
          className="live-chart-head"
          initial={false}
          animate={{ top: `${100 - last}%` }}
          transition={transition}
        />
      </div>
    </div>
  );
}
