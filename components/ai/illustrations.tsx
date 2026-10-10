import {
  Braces,
  Check,
  Cpu,
  Database,
  FileText,
  Folder,
  FolderGit2,
  GitBranch,
  GitMerge,
  GitPullRequest,
  ImageIcon,
  KeyRound,
  Layers,
  MessageSquareText,
  Rocket,
  ScanEye,
  Search,
  Sparkle,
  Sparkles,
  Tag,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { Connector } from "./Connector";

// Mini-illustrazioni delle card, costruite in codice (div + SVG inline), decorative.
// I testi qui dentro sono solo etichette tecniche (nomi di file, termini di codice), uguali in tutte le lingue.

const softShadow = "shadow-[0_12px_30px_-14px_rgba(20,40,180,0.35)]";

function Pop({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div data-pop="" className={`absolute ${className}`}>
      <div data-float="">{children}</div>
    </div>
  );
}

function MiniCursor({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className={`absolute drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] ${className}`}>
      <path d="M4 3l16 8.5-7 1.6L9.6 20z" fill="#0b0f1f" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function RingIcon({ children, size = 34 }: { children: ReactNode; size?: number }) {
  return (
    <span className="relative grid place-items-center overflow-hidden rounded-full bg-white p-[2px] shadow-[0_6px_14px_-6px_rgba(20,40,180,0.6)]" style={{ width: size, height: size }}>
      <span className="ai-conic absolute inset-[-20%]" data-spin="" />
      <span className="absolute inset-[4px] grid place-items-center rounded-full bg-gradient-to-br from-cyan-accent to-blue-600 text-white">{children}</span>
    </span>
  );
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative h-full overflow-hidden rounded-[14px] bg-[#f4f6fa] ${className}`}>{children}</div>;
}

/* ---------------- Come funziona (4 card) ---------------- */

export function HowCall() {
  return (
    <Panel>
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(67,102,254,0.12),transparent)]" />
      <div className={`absolute left-1/2 top-1/2 w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-[14px] bg-white p-2.5 ${softShadow}`}>
        <div className="flex items-center justify-between rounded-full bg-[#f1f2f6] p-1.5">
          <span className="ml-2 h-1.5 w-10 rounded-full bg-[#d7dae3]" />
          <span className="h-5 w-11 rounded-full bg-gradient-to-r from-blue-200 to-blue-500" />
          <span className="mr-2 font-code text-[8px] text-[#9aa1b3]">1:1</span>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-[10px] bg-[#f6f7fa] p-2">
          <span className="flex">
            <span className="size-4 rounded-full bg-blue-200" />
            <span className="-ml-1.5 size-4 rounded-full bg-[#c7cbd6]" />
          </span>
          <span className="h-1.5 flex-1 rounded-full bg-[#dfe2ea]" />
          <span className="font-code text-[8px] text-ink">goals</span>
        </div>
      </div>
      {/* Raggio verticale che attraversa il pannello */}
      <div className="absolute left-[52%] top-[14%] h-[72%] w-px bg-gradient-to-b from-transparent via-blue-600 to-[#f1a3c5]" />
      <div className="absolute left-[52%] top-[30%] h-[40%] w-10 -translate-x-1/2 bg-blue-500/25 blur-xl" />
    </Panel>
  );
}

export function HowProduct() {
  return (
    <Panel>
      <div className="absolute left-1/2 top-1/2 size-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/60" />
      <div className="absolute left-1/2 top-1/2 size-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_28%_26%,#b8ecff,#5fb4fb_35%,#3f7bf5_62%,#6a6ff0_82%,#f1a3c5_105%)] shadow-[0_20px_50px_-12px_rgba(38,68,228,0.45)]" />
      <Sparkle className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 text-white/75" strokeWidth={1.1} />
      <div className="absolute left-[18%] top-[52%] h-px w-[64%] rotate-[18deg] bg-white/70" />
      <Pop className="left-[22%] top-[28%]">
        <span className="block size-3 rotate-12 rounded-[3px] bg-blue-300/80" />
      </Pop>
      <Pop className="right-[20%] top-[60%]">
        <span className="block size-3 -rotate-12 rounded-[3px] bg-[#f1a3c5]" />
      </Pop>
      <Pop className="left-[40%] top-[36%]">
        <span className="block size-4 rotate-6 rounded-[4px] border-2 border-white/90" />
      </Pop>
      <MiniCursor className="left-[16%] top-[44%]" />
    </Panel>
  );
}

export function HowSprint() {
  return (
    <Panel>
      <div className="absolute bottom-[-40%] left-1/2 size-[220px] -translate-x-1/2 rounded-full bg-white/80 blur-sm" />
      <div className={`absolute left-[20%] top-[18%] h-[110px] w-[120px] -rotate-6 rounded-[12px] bg-white/80 ${softShadow}`} />
      <div className={`absolute left-[34%] top-[14%] h-[120px] w-[140px] rounded-[12px] border-2 border-blue-500/70 bg-white p-2.5 ${softShadow}`}>
        <div className="flex gap-2">
          <span className="size-8 rounded-[6px] bg-[#e7eaf2]" />
          <span className="flex-1 space-y-1.5 pt-1">
            <span className="block h-1.5 w-full rounded-full bg-[#dfe2ea]" />
            <span className="block h-1.5 w-2/3 rounded-full bg-[#e7eaf2]" />
          </span>
        </div>
        <span className="mt-3 block h-1.5 w-full rounded-full bg-[#e7eaf2]" />
        <span className="mt-1.5 block h-1.5 w-4/5 rounded-full bg-[#e7eaf2]" />
      </div>
      <Pop className="right-[14%] top-[10%]">
        <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-accent px-2 py-1 font-code text-[9px] text-white shadow-[0_6px_14px_-6px_rgba(38,68,228,0.8)]">
          <GitPullRequest className="size-3" /> PR
        </span>
      </Pop>
      <Pop className="bottom-[16%] left-1/2 -translate-x-1/2">
        <RingIcon size={38}>
          <Check className="size-4" strokeWidth={2.5} />
        </RingIcon>
      </Pop>
    </Panel>
  );
}

export function HowPortfolio() {
  return (
    <Panel>
      <div className="absolute left-1/2 top-1/2 h-[120px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] bg-[linear-gradient(135deg,#c7deff,#7293fe)] p-[3px] shadow-[0_20px_40px_-18px_rgba(38,68,228,0.6)]">
        <div className="relative size-full rounded-[13px] bg-white/90">
          <span className="absolute left-1/2 top-[22%] grid size-9 -translate-x-1/2 place-items-center rounded-[8px] bg-gradient-to-br from-blue-500 to-cyan-accent text-white">
            <FolderGit2 className="size-4" />
          </span>
          <span className="absolute left-[14%] top-[58%] h-1.5 w-[72%] rounded-full bg-[#e3e6ef]" />
          <span className="absolute left-[14%] top-[72%] h-1.5 w-[44%] rounded-full bg-[#eceef4]" />
        </div>
      </div>
      <div className="absolute bottom-[10%] left-1/2 size-7 -translate-x-1/2 rounded-full border border-blue-200 bg-white/80" />
      <MiniCursor className="left-[56%] top-[44%]" />
    </Panel>
  );
}

/* ---------------- Il problema (3 card) ---------------- */

export function ProblemCompanies() {
  return (
    <div className="relative h-full">
      <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 320 240" preserveAspectRatio="none">
        <Connector points={[[100, 62], [100, 160], [190, 160]]} className="stroke-[#cfd6ea]" />
        <Connector points={[[100, 160], [100, 190], [70, 190]]} className="stroke-[#cfd6ea]" />
      </svg>
      <Pop className="left-[2%] top-[4%]">
        <span className="flex items-center gap-3 rounded-full border border-[#f3d6e8] bg-white py-1.5 pl-1.5 pr-3 shadow-[0_10px_24px_-14px_rgba(20,40,180,0.5)] ring-4 ring-[#eef2ff]">
          <RingIcon>
            <Cpu className="size-4" />
          </RingIcon>
          <span className="text-[15px] text-blue-600">LLM</span>
          <span className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-accent px-2 py-0.5 font-code text-[9px] text-white">API</span>
        </span>
      </Pop>
      <Pop className="right-[4%] top-[40%]">
        <div className="rounded-[16px] bg-gradient-to-br from-cyan-soft to-blue-500 p-[3px] shadow-[0_20px_40px_-18px_rgba(38,68,228,0.6)]">
          <div className="grid size-[130px] place-items-center rounded-[13px] bg-white">
            <div className="relative grid h-[70px] w-[84px] place-items-center rounded-[12px] bg-gradient-to-b from-blue-300 to-blue-600">
              <span className="absolute -top-2 left-3 h-4 w-12 rounded-t-[6px] bg-white/80" />
              <span className="rounded-full bg-white/25 px-2 py-0.5 font-code text-[8px] text-white">app</span>
            </div>
          </div>
        </div>
      </Pop>
      <Pop className="left-[10%] top-[70%]">
        <div className="rounded-[8px] border border-[#dfe3ee] bg-white p-1 shadow-sm">
          <span className="block size-[46px] rounded-[6px] bg-[linear-gradient(135deg,#4366fe,#15a0f0_50%,#f1a3c5)]" />
          <span className="mt-0.5 block text-center font-code text-[8px] text-[#8a93a8]">prod</span>
        </div>
      </Pop>
      <MiniCursor className="left-[30%] top-[86%]" />
    </div>
  );
}

export function ProblemDemo() {
  return (
    <div className="relative h-full">
      <div className="absolute inset-x-4 inset-y-0 bg-[linear-gradient(to_right,#eef0f6_1px,transparent_1px),linear-gradient(to_bottom,#eef0f6_1px,transparent_1px)] bg-[size:62px_44px]" />
      <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 320 240" preserveAspectRatio="none">
        <path
          d="M40 190 C40 160 60 152 100 146 C130 142 120 100 160 96 L185 96 L240 40 L300 40"
          fill="none"
          stroke="#7293fe"
          strokeWidth="1.2"
          pathLength={1}
          data-draw=""
        />
      </svg>
      <Pop className="left-[44%] top-[36%]">
        <Zap className="size-5 fill-cyan-accent text-blue-600" strokeWidth={1.4} />
      </Pop>
      <Pop className="left-[88%] top-[12%]">
        <span className="block size-3.5 rounded-full bg-blue-500 ring-4 ring-blue-200/60" />
      </Pop>
      <MiniCursor className="left-[92%] top-[20%]" />
      <div className={`absolute inset-x-[10%] bottom-[2%] flex items-center justify-around rounded-[14px] border border-[#eceef4] bg-white py-3 ${softShadow}`}>
        <Check className="size-4 text-[#2fbf71]" strokeWidth={2.4} />
        <span className="flex items-center gap-2 rounded-full border-2 border-cyan-soft bg-white py-1 pl-1 pr-3 shadow-[0_6px_16px_-8px_rgba(21,160,240,0.8)]">
          <RingIcon size={26}>
            <Sparkles className="size-3" />
          </RingIcon>
          <span className="text-[13px] text-blue-600">deploy</span>
        </span>
        <Sparkle className="size-4 fill-blue-500 text-blue-500" />
      </div>
    </div>
  );
}

export function ProblemRepo() {
  return (
    <div className="relative grid h-full place-items-center">
      <div className={`relative h-[200px] w-full max-w-[290px] overflow-hidden rounded-[14px] border border-[#e3e8f5] bg-white ${softShadow}`}>
        <div className="flex h-6 items-center gap-1 bg-[linear-gradient(90deg,#f6f8fd,#a8d5fe)] px-3">
          <span className="size-1.5 rounded-full bg-[#ff6b6b]" />
          <span className="size-1.5 rounded-full bg-[#ffc24b]" />
          <span className="size-1.5 rounded-full bg-[#2fbf71]" />
        </div>
        <div className="flex gap-3 p-3">
          <div data-pop="" className="mt-6 grid size-[70px] shrink-0 place-items-center rounded-[12px] bg-gradient-to-b from-blue-300 to-blue-600 shadow-[0_10px_20px_-10px_rgba(38,68,228,0.8)]">
            <Folder className="size-7 fill-white/30 text-white" strokeWidth={1.4} />
          </div>
          <div className="flex-1 rounded-[8px] border border-[#eef0f6] bg-[#fafbfe] p-2">
            <p className="font-code text-[8px] text-[#5b6478]">README.md</p>
            {[90, 70, 84, 50, 76, 62, 88, 40].map((w, i) => (
              <span key={i} className="mt-1.5 block h-1 rounded-full bg-[#e2e6f0]" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Diagramma sotto le card: una linea scende in un nodo centrale e si dirama in due nodi.
export function ProblemDiagram() {
  return (
    <div className="relative mx-auto h-[230px] w-[450px] max-w-full" aria-hidden="true">
      <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 450 230">
        <Connector points={[[225, 4], [225, 95]]} className="stroke-white/60" />
        <Connector points={[[225, 70], [112, 70], [112, 130]]} className="stroke-white/60" />
        <Connector points={[[225, 70], [338, 70], [338, 130]]} className="stroke-white/60" />
        <circle cx="225" cy="4" r="3" fill="#fff" />
      </svg>
      <div data-pop="" className="absolute left-[165px] top-[95px]">
        <div className="grid size-[120px] place-items-center rounded-[26px] border border-white/25 bg-white/10 backdrop-blur-md">
          <div className="grid size-[90px] place-items-center rounded-[16px] bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
            <Sparkle className="size-10 fill-blue-600/10 text-blue-600" strokeWidth={1.3} />
          </div>
        </div>
      </div>
      {[
        { left: 87, Icon: Database },
        { left: 313, Icon: Rocket },
      ].map(({ left, Icon }) => (
        <div key={left} data-pop="" className="absolute top-[130px]" style={{ left }}>
          <div className="grid size-[50px] place-items-center rounded-[10px] border border-white/60 bg-white/5">
            <Icon className="size-5 text-white" strokeWidth={1.4} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Programma (bento) ---------------- */

export function BentoTokens() {
  const tokens = [38, 22, 54, 30, 46, 26, 34, 42, 24];
  const meters = [
    ["context", "w-[72%]", "from-blue-600 to-cyan-accent"],
    ["latency", "w-[38%]", "from-cyan-accent to-blue-200"],
    ["cost", "w-[24%]", "from-[#f1a3c5] to-blue-300"],
  ];
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-1.5">
        {tokens.map((w, i) => (
          <span
            key={i}
            data-pop=""
            className="h-6 rounded-[6px] border border-[#e1e6f5]"
            style={{ width: w, background: i % 3 === 0 ? "#dbe6ff" : i % 3 === 1 ? "#e6f4ff" : "#f2e9f7" }}
          />
        ))}
      </div>
      <div className="mt-5 space-y-2.5 rounded-[12px] border border-[#eef0f6] bg-[#fafbfe] p-3">
        {meters.map(([label, width, color]) => (
          <div key={label} className="flex items-center gap-3">
            <span className="w-14 font-code text-[9px] text-[#7a8399]">{label}</span>
            <span className="h-1.5 flex-1 rounded-full bg-[#e7eaf2]">
              <span className={`block h-full rounded-full bg-gradient-to-r ${width} ${color}`} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BentoPrompt() {
  return (
    <div className="relative h-[330px]">
      <Pop className="left-1/2 top-[6%] -translate-x-1/2">
        <span className="flex items-center gap-2 rounded-full border-2 border-cyan-soft bg-white py-1.5 pl-1.5 pr-4 shadow-[0_10px_24px_-10px_rgba(21,160,240,0.8)] ring-4 ring-[#eef4ff]">
          <RingIcon size={30}>
            <MessageSquareText className="size-3.5" />
          </RingIcon>
          <span className="font-code text-[13px] text-blue-600">prompt()</span>
        </span>
      </Pop>
      <MiniCursor className="left-[63%] top-[22%]" />
      <div className={`absolute left-[8%] top-[34%] h-[220px] w-[60%] rounded-[14px] border border-[#eceef4] bg-white p-3 ${softShadow}`}>
        <div className="flex gap-1">
          <span className="size-1.5 rounded-full bg-[#ff6b6b]" />
          <span className="size-1.5 rounded-full bg-[#ffc24b]" />
          <span className="size-1.5 rounded-full bg-[#2fbf71]" />
        </div>
        {[0, 1].map((i) => (
          <div key={i} className="mt-4 flex items-center gap-3 rounded-[10px] border border-[#eef0f6] p-2">
            <span className="size-10 rounded-[8px] bg-[linear-gradient(135deg,#4366fe,#15a0f0_60%,#f1a3c5)]" />
            <span className="flex-1 space-y-1.5">
              <span className="block h-1.5 w-4/5 rounded-full bg-[#e2e6f0]" />
              <span className="block h-1.5 w-1/2 rounded-full bg-[#eceef4]" />
            </span>
            <Check className="size-3.5 text-[#2fbf71]" strokeWidth={2.4} />
          </div>
        ))}
      </div>
      <Pop className="right-[6%] top-[46%]">
        <div className="w-[150px] rounded-[14px] bg-gradient-to-b from-cyan-soft to-blue-500 p-[2px] shadow-[0_20px_40px_-18px_rgba(38,68,228,0.7)]">
          <div className="rounded-[12px] bg-white p-2.5">
            <div className="flex justify-between">
              {[Braces, Database, Search].map((Icon, i) => (
                <span key={i} className="grid size-8 place-items-center rounded-[8px] border border-[#eceef4] text-blue-600">
                  <Icon className="size-3.5" />
                </span>
              ))}
            </div>
            <div className="my-2 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            {["schema.ts", "output.json", "retry()"].map((t) => (
              <span key={t} className="mt-1.5 flex items-center gap-1.5 rounded-full border border-[#eceef4] px-2 py-1 font-code text-[8px] text-[#7a8399]">
                <Check className="size-2.5 text-blue-500" /> {t}
              </span>
            ))}
          </div>
        </div>
      </Pop>
    </div>
  );
}

export function BentoVectors() {
  const colors = ["#a8d5fe", "#f1f4fb", "#7293fe", "#4366fe", "#15a0f0", "#c7deff", "#2644e4", "#e7e0fb"];
  return (
    <div className="relative mt-6 h-[150px]">
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: 30 }, (_, i) => (
          <span key={i} className="aspect-square rounded-[5px]" style={{ background: colors[(i * 7 + (i % 4)) % colors.length], opacity: i % 5 === 1 ? 0.55 : 1 }} />
        ))}
      </div>
      <Pop className="left-[34%] top-[22%]">
        <div className="w-[130px] rounded-[10px] border border-white/70 bg-white/80 p-2 shadow-[0_14px_30px_-12px_rgba(20,40,180,0.5)] backdrop-blur-md">
          <span className="flex items-center justify-between rounded-[6px] border border-[#e3e6ef] bg-white px-2 py-1 font-code text-[9px] text-[#5b6478]">
            cosine <span className="text-[#aab0c0]">▾</span>
          </span>
          <span className="mt-2 block h-1.5 rounded-full bg-[linear-gradient(90deg,#2644e4,#15a0f0,#c7deff)]" />
        </div>
      </Pop>
    </div>
  );
}

export function BentoRag() {
  return (
    <div className="relative h-[300px]">
      <div className="absolute left-0 top-[16%] w-[52%] rounded-[12px] border border-[#eceef4] bg-white p-3 shadow-sm">
        <div className="flex gap-2 text-[#9aa1b3]">
          <FileText className="size-3.5" />
          <Layers className="size-3.5" />
          <Braces className="size-3.5" />
        </div>
        <div className="relative mt-3 h-1 rounded-full bg-[#e7eaf2]">
          <span className="absolute left-[46%] top-1/2 size-3 -translate-y-1/2 rounded-full bg-blue-500 ring-4 ring-blue-100" />
        </div>
        <div className="mt-3 flex justify-between font-code text-[8px] text-[#8a93a8]">
          <span>top-k</span>
          <span>5</span>
        </div>
        <span className="mt-3 flex w-[80%] items-center justify-between rounded-[6px] border border-[#e3e6ef] px-2 py-1 font-code text-[8px] text-[#5b6478]">
          rerank <span className="text-[#aab0c0]">▾</span>
        </span>
        <span className="mt-1.5 flex w-[80%] items-center justify-between rounded-[6px] border border-[#e3e6ef] px-2 py-1 font-code text-[8px] text-[#5b6478]">
          hybrid <span className="text-[#aab0c0]">▾</span>
        </span>
      </div>
      <div className="absolute right-[18%] top-[18%] size-[120px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#bfe6ff,#3fa2f5_45%,#2644e4_80%)] shadow-[0_20px_40px_-12px_rgba(38,68,228,0.6)]" />
      {[
        "right-[30%] top-[36%] rotate-[-14deg]",
        "right-[4%] top-[28%] rotate-[18deg]",
        "right-[16%] top-[52%] rotate-[6deg]",
      ].map((pos, i) => (
        <div
          key={i}
          data-pop=""
          className={`absolute ${pos} grid h-[110px] w-[96px] place-items-center rounded-[10px] border border-white/80 bg-white/45 shadow-[0_14px_30px_-14px_rgba(20,40,180,0.5)] backdrop-blur-md`}
        >
          <FileText className="size-7 text-blue-300/80" strokeWidth={1.2} />
        </div>
      ))}
      <MiniCursor className="left-[12%] top-[78%] rotate-[-30deg]" />
    </div>
  );
}

export function BentoStream() {
  return (
    <div className="mt-6 flex justify-center">
      <span data-pop="" className="flex items-center gap-2 rounded-full border-2 border-cyan-soft bg-white py-1.5 pl-1.5 pr-4 shadow-[0_8px_20px_-10px_rgba(21,160,240,0.8)] ring-4 ring-[#eef4ff]">
        <RingIcon size={28}>
          <Sparkles className="size-3.5" />
        </RingIcon>
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full bg-blue-500" style={{ opacity: 1 - i * 0.3 }} />
          ))}
        </span>
      </span>
    </div>
  );
}

export function BentoEval() {
  const rows = [true, true, false, true];
  return (
    <div className="mt-6 space-y-1.5">
      {rows.map((ok, i) => (
        <span key={i} data-pop="" className="flex items-center gap-2 rounded-[8px] border border-[#eceef4] bg-white px-2.5 py-1.5">
          <span className={`grid size-4 place-items-center rounded-full ${ok ? "bg-[#2fbf71]/15 text-[#2fbf71]" : "bg-[#f1a3c5]/25 text-[#d0548c]"}`}>
            {ok ? <Check className="size-2.5" strokeWidth={3} /> : <span className="text-[9px] leading-none">×</span>}
          </span>
          <span className="font-code text-[9px] text-[#7a8399]">case_{String(i + 1).padStart(2, "0")}</span>
          <span className="ml-auto h-1.5 w-12 rounded-full bg-[#e7eaf2]" />
        </span>
      ))}
    </div>
  );
}

export function BentoProduction() {
  return (
    <div className="relative mt-6 flex h-[110px] items-center justify-center gap-4">
      <div data-pop="" className="grid size-[64px] rotate-[-8deg] place-items-center rounded-[14px] bg-[linear-gradient(135deg,#7293fe,#2644e4)] shadow-[0_16px_30px_-12px_rgba(38,68,228,0.8)]">
        <Rocket className="size-7 text-white" strokeWidth={1.4} />
      </div>
      <div data-pop="" className="grid size-[64px] rotate-[10deg] place-items-center rounded-[14px] bg-[linear-gradient(135deg,#a8d5fe,#15a0f0)] shadow-[0_16px_30px_-12px_rgba(21,160,240,0.8)]">
        <KeyRound className="size-7 text-white" strokeWidth={1.4} />
      </div>
    </div>
  );
}

export function BentoTeam() {
  const steps = [GitBranch, GitPullRequest, MessageSquareText, GitMerge];
  return (
    <div className="relative mt-6 h-[70px] max-w-[560px]">
      <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 560 70" preserveAspectRatio="none">
        <Connector points={[[30, 35], [530, 35]]} className="stroke-[#cfd6ea]" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-between">
        {steps.map((Icon, i) => (
          <span key={i} data-pop="" className="grid size-[56px] place-items-center rounded-[14px] border border-[#e3e6ef] bg-white shadow-sm">
            {i === 3 ? (
              <RingIcon size={36}>
                <Icon className="size-4" />
              </RingIcon>
            ) : (
              <Icon className="size-5 text-blue-600" strokeWidth={1.5} />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Pacchetti ---------------- */

function TrackStage({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[190px] overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#0b1b68_0%,#2644e4_45%,#4366fe_70%,#c7deff_100%)]">
      <div className="ai-grid ai-grid-dark [--grid-x:48px] [--grid-y:38px]" />
      {children}
    </div>
  );
}

export function TrackRag() {
  return (
    <TrackStage>
      <div className="absolute left-[24%] top-[24%] h-[110px] w-[90px] -rotate-6 rounded-[10px] bg-white/40 backdrop-blur-sm" />
      <div className="absolute left-[34%] top-[18%] h-[120px] w-[96px] rounded-[10px] bg-white p-2.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
        <FileText className="size-4 text-blue-600" />
        {[80, 60, 90, 50, 70].map((w, i) => (
          <span key={i} className="mt-2 block h-1 rounded-full bg-[#e2e6f0]" style={{ width: `${w}%` }} />
        ))}
      </div>
      <Pop className="right-[18%] top-[22%]">
        <RingIcon size={40}>
          <Sparkles className="size-4" />
        </RingIcon>
      </Pop>
      <Pop className="right-[12%] top-[56%]">
        <span className="flex gap-1">
          {["1", "2"].map((n) => (
            <span key={n} className="grid size-6 place-items-center rounded-[6px] bg-white font-code text-[10px] text-blue-600 shadow">
              {n}
            </span>
          ))}
        </span>
      </Pop>
    </TrackStage>
  );
}

export function TrackApp() {
  return (
    <TrackStage>
      <div className="absolute left-1/2 top-[16%] h-[130px] w-[200px] -translate-x-1/2 rounded-[12px] bg-white p-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
        <div className="flex gap-1">
          <span className="size-1.5 rounded-full bg-[#ff6b6b]" />
          <span className="size-1.5 rounded-full bg-[#ffc24b]" />
          <span className="size-1.5 rounded-full bg-[#2fbf71]" />
        </div>
        <span className="mt-3 block h-1.5 w-4/5 rounded-full bg-[#e2e6f0]" />
        <span className="mt-1.5 block h-1.5 w-3/5 rounded-full bg-[#eceef4]" />
        <div className="mt-3 flex gap-1.5">
          {["#ai", "#tag"].map((t) => (
            <span key={t} className="flex items-center gap-0.5 rounded-full bg-blue-100 px-1.5 py-0.5 font-code text-[8px] text-blue-600">
              <Tag className="size-2" /> {t.slice(1)}
            </span>
          ))}
        </div>
      </div>
      <Pop className="right-[12%] top-[12%]">
        <RingIcon size={40}>
          <Sparkles className="size-4" />
        </RingIcon>
      </Pop>
    </TrackStage>
  );
}

export function TrackVision() {
  return (
    <TrackStage>
      <div className="absolute left-[22%] top-[18%] grid h-[120px] w-[130px] place-items-center rounded-[12px] bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
        <ImageIcon className="size-10 text-blue-300" strokeWidth={1.2} />
        <span className="absolute inset-x-2 top-[46%] h-px bg-cyan-accent shadow-[0_0_8px_#15a0f0]" />
      </div>
      <Pop className="right-[16%] top-[24%]">
        <span className="flex h-10 items-center gap-[3px] rounded-[10px] bg-white/90 px-2.5 shadow">
          {[10, 18, 26, 14, 22, 30, 12, 20].map((h, i) => (
            <span key={i} className="w-[3px] rounded-full bg-blue-500" style={{ height: h }} />
          ))}
        </span>
      </Pop>
      <Pop className="right-[22%] top-[58%]">
        <RingIcon size={38}>
          <ScanEye className="size-4" />
        </RingIcon>
      </Pop>
    </TrackStage>
  );
}
