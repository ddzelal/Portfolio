"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";

const SECTION_MSG: Record<string, string> = {
  top: "boot complete. hey — I'm Dzelal.",
  about: "5+ years deep in the stack.",
  work: "shipped to prod, not just demos.",
  stack: "these are my daily drivers.",
  projects: "stuff I actually built.",
  contact: "ping me — I reply fast.",
};

const CLICK_QUIPS = [
  "compiling...",
  "git push --force? never.",
  "needs more neon.",
  "works on my machine.",
  "ship it.",
  "rerouting packets...",
];

export function MascotCompanion() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // pupil tracking
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 260, damping: 22, mass: 0.4 });
  const spy = useSpring(py, { stiffness: 260, damping: 22, mass: 0.4 });

  const [active, setActive] = useState("top");
  const [blink, setBlink] = useState(false);
  const [wink, setWink] = useState(false);
  const [quip, setQuip] = useState<string | null>(null);
  const [open, setOpen] = useState(true);
  const [hidden, setHidden] = useState(false);

  // eyes follow cursor (clamped to the eye sockets)
  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height * 0.4;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const len = Math.hypot(dx, dy) || 1;
        const max = 3.6;
        px.set((dx / len) * Math.min(max, len / 26));
        py.set((dy / len) * Math.min(max, len / 26));
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [px, py]);

  // auto-blink
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const schedule = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 130);
        schedule();
      }, 2600 + Math.random() * 2600);
    };
    schedule();
    return () => clearTimeout(t);
  }, []);

  // active section → message
  useEffect(() => {
    const ids = Object.keys(SECTION_MSG);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const onPoke = useCallback(() => {
    setWink(true);
    setTimeout(() => setWink(false), 280);
    const q = CLICK_QUIPS[Math.floor(spx.get() * 1000) % CLICK_QUIPS.length];
    setQuip(CLICK_QUIPS.includes(q) ? q : CLICK_QUIPS[0]);
    setOpen(true);
    setTimeout(() => setQuip(null), 2200);
  }, [spx]);

  if (hidden) return null;

  const message = quip ?? SECTION_MSG[active] ?? SECTION_MSG.top;
  const leftClosed = blink;
  const rightClosed = blink || wink;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {/* speech bubble */}
      <AnimatePresence>
        {open && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto relative mr-2 max-w-[210px] border border-line bg-surface/95 px-3 py-2 font-mono text-[11px] leading-snug text-fg shadow-[0_0_24px_-8px_rgba(0,255,135,0.5)] backdrop-blur"
          >
            <span className="text-neon">{">"}</span> {message}
            <span className="caret" />
            {/* tail */}
            <span className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-line bg-surface/95" />
            <button
              type="button"
              onClick={() => setHidden(true)}
              aria-label="Dismiss mascot"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center border border-line bg-bg text-[10px] text-muted transition-colors hover:border-neon hover:text-neon"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* character */}
      <motion.button
        type="button"
        onClick={onPoke}
        aria-label="Poke Dzelal"
        className="pointer-events-auto block origin-bottom"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.92, rotate: -4 }}
      >
        <div ref={wrapRef} className="relative h-28 w-24 sm:h-32 sm:w-28">
          <Character
            spx={spx}
            spy={spy}
            leftClosed={leftClosed}
            rightClosed={rightClosed}
          />
        </div>
      </motion.button>
    </div>
  );
}

/* ----------------------------- the SVG dude ----------------------------- */

function Character({
  spx,
  spy,
  leftClosed,
  rightClosed,
}: {
  spx: ReturnType<typeof useSpring>;
  spy: ReturnType<typeof useSpring>;
  leftClosed: boolean;
  rightClosed: boolean;
}) {
  return (
    <svg
      viewBox="0 0 240 270"
      className="h-full w-full drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]"
      role="img"
      aria-label="Dzelal mascot"
    >
      <defs>
        <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3cba6" />
          <stop offset="1" stopColor="#dca37b" />
        </linearGradient>
        <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#23262d" />
          <stop offset="1" stopColor="#0c0e12" />
        </linearGradient>
        <linearGradient id="blazer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d2636" />
          <stop offset="1" stopColor="#10151f" />
        </linearGradient>
        <radialGradient id="iris" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#5bffc0" />
          <stop offset="0.55" stopColor="#11c98c" />
          <stop offset="1" stopColor="#06432f" />
        </radialGradient>
        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* shoulders / blazer */}
      <path
        d="M44 270 C46 214 80 196 120 196 C160 196 194 214 196 270 Z"
        fill="url(#blazer)"
        stroke="#0a0d13"
        strokeWidth="2"
      />
      {/* black shirt + lapels */}
      <path d="M120 196 L101 232 L120 252 L139 232 Z" fill="#0b0e14" />
      <path d="M104 200 L120 250 L97 224 Z" fill="#161d29" />
      <path d="M136 200 L120 250 L143 224 Z" fill="#161d29" />
      {/* neon collar accent */}
      <path
        d="M104 201 L120 248 L136 201"
        fill="none"
        stroke="#00ff87"
        strokeWidth="1.4"
        opacity="0.5"
      />

      {/* neck */}
      <path d="M106 168 L106 200 Q120 210 134 200 L134 168 Z" fill="url(#skin)" />
      <path d="M106 184 Q120 196 134 184 L134 176 Q120 188 106 176 Z" fill="#c98f66" opacity="0.5" />

      {/* ears */}
      <ellipse cx="74" cy="116" rx="8" ry="12" fill="url(#skin)" stroke="#c98f66" strokeWidth="1" />
      <ellipse cx="166" cy="116" rx="8" ry="12" fill="url(#skin)" stroke="#c98f66" strokeWidth="1" />

      {/* face */}
      <path
        d="M78 96
           C76 70 92 54 120 54
           C148 54 164 70 162 96
           C161 118 156 140 140 158
           C132 167 126 170 120 170
           C114 170 108 167 100 158
           C84 140 79 118 78 96 Z"
        fill="url(#skin)"
      />

      {/* beard */}
      <path
        d="M80 104
           C82 132 90 152 104 164
           C110 169 115 171 120 171
           C125 171 130 169 136 164
           C150 152 158 132 160 104
           C150 120 138 126 120 126
           C102 126 90 120 80 104 Z"
        fill="url(#hair)"
      />
      {/* sideburns connect beard to hair */}
      <path d="M80 92 C78 104 80 112 84 120 L92 110 C88 102 86 96 86 90 Z" fill="url(#hair)" />
      <path d="M160 92 C162 104 160 112 156 120 L148 110 C152 102 154 96 154 90 Z" fill="url(#hair)" />

      {/* hair */}
      <path
        d="M74 100
           C68 74 84 48 120 48
           C156 48 172 74 166 100
           C164 86 158 78 150 74
           C156 84 156 92 154 98
           C150 84 140 76 128 74
           C132 80 132 86 130 90
           C122 80 110 78 100 82
           C92 86 88 92 86 100
           C84 90 82 84 86 78
           C78 84 76 92 74 100 Z"
        fill="url(#hair)"
      />

      {/* eyebrows */}
      <path d="M88 92 Q102 84 114 90" fill="none" stroke="#1a1d23" strokeWidth="4" strokeLinecap="round" />
      <path d="M126 90 Q138 84 152 92" fill="none" stroke="#1a1d23" strokeWidth="4" strokeLinecap="round" />

      {/* eyes */}
      {/* left */}
      <g>
        <ellipse cx="101" cy="108" rx="11" ry="12.5" fill="#fbfdfb" />
        <motion.g style={{ x: spx, y: spy }}>
          <circle cx="101" cy="108" r="7" fill="url(#iris)" filter="url(#glow)" />
          <circle cx="101" cy="108" r="3.2" fill="#04241a" />
          <circle cx="98.5" cy="105" r="1.8" fill="#ffffff" opacity="0.9" />
        </motion.g>
        <motion.ellipse
          cx="101"
          cy="108"
          rx="11.6"
          ry="13"
          fill="url(#skin)"
          className="origin-top [transform-box:fill-box]"
          initial={false}
          animate={{ scaleY: leftClosed ? 1 : 0 }}
          transition={{ duration: 0.08 }}
        />
      </g>
      {/* right */}
      <g>
        <ellipse cx="139" cy="108" rx="11" ry="12.5" fill="#fbfdfb" />
        <motion.g style={{ x: spx, y: spy }}>
          <circle cx="139" cy="108" r="7" fill="url(#iris)" filter="url(#glow)" />
          <circle cx="139" cy="108" r="3.2" fill="#04241a" />
          <circle cx="136.5" cy="105" r="1.8" fill="#ffffff" opacity="0.9" />
        </motion.g>
        <motion.ellipse
          cx="139"
          cy="108"
          rx="11.6"
          ry="13"
          fill="url(#skin)"
          className="origin-top [transform-box:fill-box]"
          initial={false}
          animate={{ scaleY: rightClosed ? 1 : 0 }}
          transition={{ duration: 0.08 }}
        />
      </g>

      {/* nose */}
      <path d="M118 114 Q116 122 113 125 Q118 128 122 125" fill="none" stroke="#c4895f" strokeWidth="1.6" strokeLinecap="round" />

      {/* mustache */}
      <path d="M104 131 Q112 127 120 130 Q128 127 136 131 Q128 136 120 134 Q112 136 104 131 Z" fill="url(#hair)" />
      {/* smile */}
      <path d="M108 137 Q120 146 132 137" fill="none" stroke="#7a4a31" strokeWidth="2" strokeLinecap="round" />
      <path d="M111 138 Q120 143 129 138" fill="#fbeae0" opacity="0.85" />

      {/* headset (neon, telecom nod) */}
      <path
        d="M166 110 C176 108 180 120 176 130"
        fill="none"
        stroke="#00ff87"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M176 130 C170 140 156 142 148 138"
        fill="none"
        stroke="#00ff87"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="147" cy="138" r="2.6" fill="#00ff87" filter="url(#glow)" />
      <rect x="165" y="110" width="8" height="14" rx="3" fill="#0c0e12" stroke="#00ff87" strokeWidth="1.4" />

      {/* neon rim light */}
      <path
        d="M74 100 C68 74 84 48 120 48"
        fill="none"
        stroke="#00ff87"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}
