// Linea di collegamento tra nodi, come una pista di un circuito: tratti orizzontali e verticali con gomiti arrotondati.
// pathLength=1 permette di disegnarla con stroke-dashoffset (1 -> 0) qualunque sia la lunghezza reale.

type Point = [number, number];

// Costruisce un path ortogonale dai punti, con raggio `r` sui gomiti.
export function elbowPath(points: Point[], r = 16) {
  if (points.length < 2) return "";
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    const inLen = Math.hypot(x - px, y - py);
    const outLen = Math.hypot(nx - x, ny - y);
    const rr = Math.min(r, inLen / 2, outLen / 2);
    const ix = x - Math.sign(x - px) * rr;
    const iy = y - Math.sign(y - py) * rr;
    const ox = x + Math.sign(nx - x) * rr;
    const oy = y + Math.sign(ny - y) * rr;
    d += ` L${ix} ${iy} Q${x} ${y} ${ox} ${oy}`;
  }
  const [lx, ly] = points[points.length - 1];
  return `${d} L${lx} ${ly}`;
}

export function Connector({
  points,
  radius = 16,
  className = "stroke-white/60",
  draw = true,
  id,
}: {
  points: Point[];
  radius?: number;
  className?: string;
  draw?: boolean;
  id?: string;
}) {
  return (
    <path
      id={id}
      d={elbowPath(points, radius)}
      pathLength={1}
      fill="none"
      strokeWidth={1}
      className={className}
      data-draw={draw ? "" : undefined}
    />
  );
}
