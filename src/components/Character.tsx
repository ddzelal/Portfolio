"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Self-contained anime mascot of Dzelal.
 * - eyes track the cursor
 * - auto-blinks
 * - `pokeSignal` (incrementing number) triggers a wink + hop
 * - `waveOnMount` plays a hand wave when it appears
 */
export function Character({
  className = "",
  waveOnMount = false,
  pokeSignal = 0,
}: {
  className?: string;
  waveOnMount?: boolean;
  pokeSignal?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 260, damping: 22, mass: 0.4 });
  const spy = useSpring(py, { stiffness: 260, damping: 22, mass: 0.4 });

  const [blink, setBlink] = useState(false);
  const [wink, setWink] = useState(false);
  const [waving, setWaving] = useState(false);

  // cursor tracking
  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height * 0.42;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const len = Math.hypot(dx, dy) || 1;
        const max = 3.2;
        px.set((dx / len) * Math.min(max, len / 28));
        py.set((dy / len) * Math.min(max, len / 28));
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
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 130);
        loop();
      }, 2600 + Math.random() * 2600);
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  // wave on first mount
  useEffect(() => {
    if (!waveOnMount) return;
    const t = setTimeout(() => setWaving(true), 500);
    const t2 = setTimeout(() => setWaving(false), 2100);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [waveOnMount]);

  // poke → wink + quick wave
  useEffect(() => {
    if (pokeSignal === 0) return;
    setWink(true);
    setWaving(true);
    const t = setTimeout(() => setWink(false), 300);
    const t2 = setTimeout(() => setWaving(false), 1200);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [pokeSignal]);

  const leftClosed = blink;
  const rightClosed = blink || wink;

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox="0 0 240 270"
        className="h-full w-full drop-shadow-[0_8px_18px_rgba(0,0,0,0.5)]"
        role="img"
        aria-label="Dzelal mascot"
      >
        <defs>
          <linearGradient id="m-skin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f3cba6" />
            <stop offset="1" stopColor="#dca37b" />
          </linearGradient>
          <linearGradient id="m-hair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#23262d" />
            <stop offset="1" stopColor="#0c0e12" />
          </linearGradient>
          <linearGradient id="m-blazer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1d2636" />
            <stop offset="1" stopColor="#10151f" />
          </linearGradient>
          <radialGradient id="m-iris" cx="0.5" cy="0.42" r="0.62">
            <stop offset="0" stopColor="#7dffce" />
            <stop offset="0.5" stopColor="#15c98c" />
            <stop offset="1" stopColor="#06432f" />
          </radialGradient>
          <filter id="m-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* waving arm (only visible while waving) */}
        <motion.g
          className="origin-[176px_210px]"
          initial={false}
          animate={
            waving
              ? { opacity: 1, rotate: [0, -20, 8, -16, 4, 0] }
              : { opacity: 0, rotate: 0 }
          }
          transition={{ duration: waving ? 1.3 : 0.2, ease: "easeInOut" }}
        >
          <path
            d="M176 210 C188 200 198 180 200 162"
            fill="none"
            stroke="url(#m-blazer)"
            strokeWidth="13"
            strokeLinecap="round"
          />
          <circle cx="201" cy="158" r="9" fill="url(#m-skin)" />
          <path d="M196 150 L206 150 M195 156 L207 156" stroke="#c4895f" strokeWidth="1.4" strokeLinecap="round" />
        </motion.g>

        {/* shoulders / blazer */}
        <path
          d="M44 270 C46 214 80 196 120 196 C160 196 194 214 196 270 Z"
          fill="url(#m-blazer)"
          stroke="#0a0d13"
          strokeWidth="2"
        />
        <path d="M120 196 L101 232 L120 252 L139 232 Z" fill="#0b0e14" />
        <path d="M104 200 L120 250 L97 224 Z" fill="#161d29" />
        <path d="M136 200 L120 250 L143 224 Z" fill="#161d29" />
        <path d="M104 201 L120 248 L136 201" fill="none" stroke="#00ff87" strokeWidth="1.4" opacity="0.5" />

        {/* neck */}
        <path d="M106 168 L106 200 Q120 210 134 200 L134 168 Z" fill="url(#m-skin)" />
        <path d="M106 184 Q120 196 134 184 L134 176 Q120 188 106 176 Z" fill="#c98f66" opacity="0.5" />

        {/* ears */}
        <ellipse cx="76" cy="116" rx="7.5" ry="11" fill="url(#m-skin)" stroke="#c98f66" strokeWidth="1" />
        <ellipse cx="164" cy="116" rx="7.5" ry="11" fill="url(#m-skin)" stroke="#c98f66" strokeWidth="1" />

        {/* face */}
        <path
          d="M80 98
             C78 72 94 56 120 56
             C146 56 162 72 160 98
             C159 118 154 138 139 156
             C131 165 126 168 120 168
             C114 168 109 165 101 156
             C86 138 81 118 80 98 Z"
          fill="url(#m-skin)"
        />

        {/* beard */}
        <path
          d="M82 106
             C84 132 92 150 105 162
             C111 167 115 169 120 169
             C125 169 129 167 135 162
             C148 150 156 132 158 106
             C149 120 138 126 120 126
             C102 126 91 120 82 106 Z"
          fill="url(#m-hair)"
        />
        <path d="M82 94 C80 106 82 114 86 122 L94 112 C90 104 88 98 88 92 Z" fill="url(#m-hair)" />
        <path d="M158 94 C160 106 158 114 154 122 L146 112 C150 104 152 98 152 92 Z" fill="url(#m-hair)" />

        {/* hair — short, side-parted */}
        <path
          d="M78 96
             C72 70 88 50 120 50
             C152 50 168 70 162 96
             C160 84 154 78 146 76
             C150 84 150 90 148 95
             C144 82 134 76 124 76
             C127 81 127 86 125 89
             C118 80 108 79 99 83
             C92 87 89 92 88 98
             C86 90 85 85 88 80
             C82 85 80 90 78 96 Z"
          fill="url(#m-hair)"
        />

        {/* eyebrows */}
        <path d="M89 95 Q101 89 112 94" fill="none" stroke="#15181d" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M128 94 Q139 89 151 95" fill="none" stroke="#15181d" strokeWidth="3.4" strokeLinecap="round" />

        {/* eyes */}
        <g>
          <ellipse cx="103" cy="109" rx="9.5" ry="11" fill="#fbfdfb" />
          <motion.g style={{ x: spx, y: spy }}>
            <circle cx="103" cy="109" r="6" fill="url(#m-iris)" filter="url(#m-glow)" />
            <circle cx="103" cy="109" r="2.8" fill="#04241a" />
            <circle cx="100.8" cy="106.5" r="1.6" fill="#fff" opacity="0.9" />
          </motion.g>
          <motion.ellipse
            cx="103"
            cy="109"
            rx="10"
            ry="11.5"
            fill="url(#m-skin)"
            className="origin-top [transform-box:fill-box]"
            initial={false}
            animate={{ scaleY: leftClosed ? 1 : 0 }}
            transition={{ duration: 0.08 }}
          />
        </g>
        <g>
          <ellipse cx="137" cy="109" rx="9.5" ry="11" fill="#fbfdfb" />
          <motion.g style={{ x: spx, y: spy }}>
            <circle cx="137" cy="109" r="6" fill="url(#m-iris)" filter="url(#m-glow)" />
            <circle cx="137" cy="109" r="2.8" fill="#04241a" />
            <circle cx="134.8" cy="106.5" r="1.6" fill="#fff" opacity="0.9" />
          </motion.g>
          <motion.ellipse
            cx="137"
            cy="109"
            rx="10"
            ry="11.5"
            fill="url(#m-skin)"
            className="origin-top [transform-box:fill-box]"
            initial={false}
            animate={{ scaleY: rightClosed ? 1 : 0 }}
            transition={{ duration: 0.08 }}
          />
        </g>

        {/* nose */}
        <path d="M118 115 Q116 122 113.5 125 Q118 127.5 121.5 125" fill="none" stroke="#c4895f" strokeWidth="1.5" strokeLinecap="round" />

        {/* mustache + smile */}
        <path d="M105 130 Q112 126.5 120 129 Q128 126.5 135 130 Q128 135 120 133 Q112 135 105 130 Z" fill="url(#m-hair)" />
        <path d="M109 136 Q120 144 131 136" fill="none" stroke="#7a4a31" strokeWidth="2" strokeLinecap="round" />
        <path d="M112 137 Q120 142 128 137" fill="#fbeae0" opacity="0.85" />

        {/* neon headset */}
        <path d="M164 110 C174 108 178 120 174 130" fill="none" stroke="#00ff87" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        <path d="M174 130 C168 140 154 142 146 138" fill="none" stroke="#00ff87" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        <circle cx="145" cy="138" r="2.6" fill="#00ff87" filter="url(#m-glow)" />
        <rect x="163" y="110" width="8" height="14" rx="3" fill="#0c0e12" stroke="#00ff87" strokeWidth="1.4" />

        {/* neon rim light */}
        <path d="M78 96 C72 70 88 50 120 50" fill="none" stroke="#00ff87" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    </div>
  );
}
