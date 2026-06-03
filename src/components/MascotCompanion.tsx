"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Character } from "./Character";

const SECTION_MSG: Record<string, string> = {
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
  const [active, setActive] = useState("about");
  const [heroVisible, setHeroVisible] = useState(true);
  const [quip, setQuip] = useState<string | null>(null);
  const [open, setOpen] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [poke, setPoke] = useState(0);

  // active section → message (+ detect hero to fade companion out while on it)
  useEffect(() => {
    const ids = [...Object.keys(SECTION_MSG), "top"];
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target.id === "top") setHeroVisible(e.isIntersecting);
          if (e.isIntersecting && e.target.id !== "top") setActive(e.target.id);
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
    setPoke((n) => n + 1);
    setQuip((q) => {
      const next = CLICK_QUIPS[(CLICK_QUIPS.indexOf(q ?? "") + 1) % CLICK_QUIPS.length];
      return next;
    });
    setOpen(true);
    window.setTimeout(() => setQuip(null), 2200);
  }, []);

  if (hidden) return null;

  const show = !heroVisible; // hero has its own big character
  const message = quip ?? SECTION_MSG[active] ?? SECTION_MSG.about;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6"
        >
          {/* speech bubble */}
          <AnimatePresence mode="wait">
            {open && (
              <motion.div
                key={message}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.22 }}
                className="pointer-events-auto relative mr-2 max-w-[210px] border border-line bg-surface/95 px-3 py-2 font-mono text-[11px] leading-snug text-fg shadow-[0_0_24px_-8px_rgba(0,255,135,0.5)] backdrop-blur"
              >
                <span className="text-neon">{">"}</span> {message}
                <span className="caret" />
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
            whileTap={{ scale: 0.92 }}
          >
            <Character className="h-28 w-24 sm:h-32 sm:w-28" pokeSignal={poke} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
