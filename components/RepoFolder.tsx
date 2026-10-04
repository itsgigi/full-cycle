"use client";

import { useEffect, useRef, useState } from "react";
import FolderFloat from "@/components/FolderFloat";

// Cartella del repo: le pillole sono quello che contiene un progetto finito.
// Lo spread segue la larghezza disponibile, così la nuvola non esce dallo schermo su mobile.
export function RepoFolder({ items, label, sublabel }: { items: string[]; label: string; sublabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [spread, setSpread] = useState(210);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSpread(Math.min(210, Math.floor(el.clientWidth / 2) - 8));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="repo-folder">
      <FolderFloat
        items={items}
        label={label}
        sublabel={sublabel}
        trigger="click"
        defaultOpen
        closeOnSelect={false}
        spread={spread}
        width={220}
        height={150}
        lift={30}
        tilt={6}
        folderColor="#2860c9"
        frontColor="#3b7ddf"
        paperColor="#ffffff"
        itemColor="#ffffff"
        itemTextColor="#1c1c1c"
        labelColor="#ffffff"
      />
    </div>
  );
}
