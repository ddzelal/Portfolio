"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { navLinks, profile } from "@/lib/data";
import { DownloadIcon } from "./Icons";

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`transition-colors duration-300 ${
          scrolled
            ? "border-b border-line bg-bg/80 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#top"
            className="font-mono text-sm font-semibold tracking-tight text-fg transition-colors hover:text-neon"
          >
            <span className="text-neon">~/</span>
            {profile.handle}
            <span className="text-faint">.dev</span>
          </a>

          <ul className="hidden items-center gap-7 font-mono text-[13px] text-muted md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="group relative transition-colors hover:text-fg"
                >
                  <span className="text-neon/70">/</span>
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-neon transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 border border-line-hi px-3.5 py-2 font-mono text-xs text-fg transition-colors hover:border-neon hover:text-neon sm:inline-flex"
            >
              <DownloadIcon width={14} height={14} />
              resume
            </a>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-line-hi md:hidden"
            >
              <span
                className={`h-px w-4 bg-fg transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-4 bg-fg transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </nav>

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX: progress }}
          className="h-0.5 origin-left bg-neon"
        />
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-line bg-bg/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4 font-mono text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-muted transition-colors hover:text-neon"
                  >
                    <span className="text-neon/70">/</span> {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 border border-line-hi px-3.5 py-2 text-xs text-neon"
                >
                  <DownloadIcon width={14} height={14} /> resume.pdf
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
