"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { ProjectKind } from "@/lib/data";

/* Shared "screen" chrome around every animated preview */
function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="relative h-36 overflow-hidden border-b border-line bg-bg">
      <div className="flex items-center gap-1.5 border-b border-line/60 px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-magenta/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#f5c542]/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-neon/70" />
        <span className="ml-2 font-mono text-[10px] text-faint">{label}</span>
      </div>
      <div className="relative h-[calc(100%-27px)] p-3">{children}</div>
    </div>
  );
}

const loop = (extra = {}) => ({
  repeat: Infinity,
  repeatType: "loop" as const,
  ease: "easeInOut" as const,
  ...extra,
});

/* 1 — AI message-routing: packets travelling across nodes */
function Routing() {
  const lanes = [16, 30, 44];
  return (
    <Frame label="router.live ~ optimizing">
      <svg viewBox="0 0 100 56" className="h-full w-full" preserveAspectRatio="none">
        {lanes.map((y) => (
          <line key={y} x1="10" y1={y} x2="90" y2={y} stroke="#1f1f1f" strokeWidth="0.6" />
        ))}
        {[0, 1, 2].map((i) => (
          <rect key={`s${i}`} x="6" y={lanes[i] - 3} width="6" height="6" fill="#121212" stroke="#2a2a2a" strokeWidth="0.5" />
        ))}
        {[0, 1, 2].map((i) => (
          <rect key={`d${i}`} x="88" y={lanes[i] - 3} width="6" height="6" fill="#0a0a0a" stroke="#00ff87" strokeWidth="0.6" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.circle
            key={i}
            r="1.8"
            fill={i % 2 ? "#22d3ee" : "#00ff87"}
            initial={{ cx: 12, cy: lanes[i % 3] }}
            animate={{ cx: [12, 88], cy: [lanes[i % 3], lanes[(i + 1) % 3]] }}
            transition={loop({ duration: 1.6, delay: i * 0.32 })}
          />
        ))}
      </svg>
      <div className="absolute right-3 top-2 flex items-center gap-1.5 font-mono text-[10px] text-neon">
        <motion.span
          className="inline-block h-1.5 w-1.5 rounded-full bg-neon"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={loop({ duration: 1 })}
        />
        1.2M req/s
      </div>
    </Frame>
  );
}

/* 2 — Call Agent: live voice waveform with STT → TTS */
function Voice() {
  const bars = Array.from({ length: 22 });
  return (
    <Frame label="call_agent ~ streaming">
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between font-mono text-[10px]">
          <span className="text-cyan">● STT</span>
          <span className="text-faint">→</span>
          <span className="text-neon">TTS ●</span>
        </div>
        <div className="flex h-12 items-center justify-center gap-[3px]">
          {bars.map((_, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-neon"
              style={{ originY: 0.5 }}
              animate={{ scaleY: [0.2, 1, 0.4, 0.8, 0.2] }}
              transition={loop({ duration: 1.1, delay: i * 0.05 })}
            />
          ))}
        </div>
        <p className="font-mono text-[10px] text-muted">
          &quot;routing your call<span className="caret" />&quot;
        </p>
      </div>
    </Frame>
  );
}

/* 3 — Performance Golf: video player + engagement */
function Video() {
  return (
    <Frame label="stream.mp4 ~ 1080p">
      <div className="flex h-full gap-3">
        <div className="relative flex flex-1 items-center justify-center border border-line bg-surface/60">
          <motion.span
            className="flex h-7 w-7 items-center justify-center rounded-full border border-neon text-neon"
            animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
            transition={loop({ duration: 1.6 })}
          >
            <span className="ml-0.5 block h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-neon" />
          </motion.span>
          <div className="absolute inset-x-2 bottom-2 h-1 overflow-hidden bg-line">
            <motion.div
              className="h-full bg-neon"
              animate={{ width: ["5%", "100%"] }}
              transition={loop({ duration: 4, ease: "linear" })}
            />
          </div>
        </div>
        <div className="flex w-14 flex-col justify-end gap-1">
          {[0.4, 0.65, 0.5, 0.85].map((h, i) => (
            <motion.div
              key={i}
              className="bg-cyan/70"
              style={{ height: 7 }}
              animate={{ scaleX: [0.3, h, 0.3] }}
              transition={loop({ duration: 2, delay: i * 0.25 })}
            />
          ))}
          <span className="mt-0.5 font-mono text-[9px] text-neon">+25%</span>
        </div>
      </div>
    </Frame>
  );
}

/* 4 — Libex NFT marketplace: minting grid */
function Nft() {
  const tiles = Array.from({ length: 8 });
  return (
    <Frame label="marketplace ~ minting">
      <div className="grid h-full grid-cols-4 grid-rows-2 gap-1.5">
        {tiles.map((_, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden border border-line bg-gradient-to-br from-surface to-bg"
            animate={{ borderColor: ["#1f1f1f", "#00ff87", "#1f1f1f"] }}
            transition={loop({ duration: 2.4, delay: i * 0.2 })}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-neon/20 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={loop({ duration: 1.8, delay: i * 0.2, ease: "linear" })}
            />
            <span className="absolute bottom-0.5 right-1 font-mono text-[8px] text-cyan">
              Ξ{(0.4 + i * 0.12).toFixed(2)}
            </span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/* 5 — BaitulMal: transparency bars filling */
function Finance() {
  const rows = [
    { label: "allocated", pct: 92 },
    { label: "disbursed", pct: 74 },
    { label: "verified", pct: 100 },
  ];
  return (
    <Frame label="ledger ~ 100% transparent">
      <div className="flex h-full flex-col justify-center gap-2.5">
        {rows.map((r, i) => (
          <div key={r.label}>
            <div className="mb-0.5 flex justify-between font-mono text-[9px]">
              <span className="text-muted">{r.label}</span>
              <span className="text-neon">{r.pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden bg-line">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-dim to-neon"
                initial={{ width: 0 }}
                whileInView={{ width: `${r.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 6 — Municipal: real-time analytics chart */
function Analytics() {
  const bars = [0.45, 0.7, 0.55, 0.9, 0.65, 0.8, 0.5];
  return (
    <Frame label="dashboard ~ realtime">
      <div className="flex h-full items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gradient-to-t from-neon/30 to-neon"
            style={{ originY: 1, height: `${h * 100}%` }}
            animate={{ scaleY: [h, Math.min(1, h + 0.25), h] }}
            transition={loop({ duration: 2.2, delay: i * 0.15 })}
          />
        ))}
        <span className="absolute right-3 top-2 font-mono text-[10px] text-cyan">▲ live</span>
      </div>
    </Frame>
  );
}

const MAP: Record<ProjectKind, () => React.JSX.Element> = {
  routing: Routing,
  voice: Voice,
  video: Video,
  nft: Nft,
  finance: Finance,
  analytics: Analytics,
};

export function ProjectPreview({ kind }: { kind: ProjectKind }) {
  const Comp = MAP[kind];
  return <Comp />;
}
