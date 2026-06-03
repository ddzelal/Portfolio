"use client";

import { motion } from "motion/react";
import { profile, stats } from "@/lib/data";
import { GlitchText } from "./anim/GlitchText";
import { TypeWriter } from "./anim/TypeWriter";
import { Counter } from "./anim/Counter";
import { Magnetic } from "./anim/Magnetic";
import { ArrowDownIcon, GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

const promptLines = [
  { cmd: "whoami", out: profile.name },
  { cmd: "cat role.txt", out: profile.role },
  { cmd: "echo $LOCATION", out: profile.location },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-neon/10 blur-[140px]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left — headline */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 border border-line bg-surface/60 px-3 py-1.5 font-mono text-xs text-muted"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              available for select work
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="block text-fg">Dzelal</span>
              <GlitchText text="Dupljak" className="text-neon text-glow" />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 font-mono text-lg text-muted sm:text-xl"
            >
              <span className="text-neon">$</span>{" "}
              <TypeWriter
                className="text-fg"
                phrases={[
                  "Full-Stack Software Engineer",
                  "High-Availability Architect",
                  "AI Systems Integrator",
                  "Telecom · Web3 · Streaming",
                ]}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted"
            >
              5+ years architecting high-availability systems and weaving modern AI
              into products that ship — across telecom, streaming and Web3.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a
                  href="#projects"
                  className="box-glow inline-flex items-center gap-2 bg-neon px-6 py-3 font-mono text-sm font-semibold text-bg transition-transform hover:scale-[1.02]"
                >
                  view_work()
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 border border-line-hi px-6 py-3 font-mono text-sm text-fg transition-colors hover:border-neon hover:text-neon"
                >
                  contact_me()
                </a>
              </Magnetic>

              <div className="ml-1 flex items-center gap-1">
                {[
                  { href: profile.github, Icon: GithubIcon, label: "GitHub" },
                  { href: profile.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
                  { href: `mailto:${profile.email}`, Icon: MailIcon, label: "Email" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center border border-transparent text-muted transition-colors hover:border-line-hi hover:text-neon"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — terminal window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="box-glow-hover border border-line bg-surface/80 backdrop-blur"
          >
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-magenta/80" />
              <span className="h-3 w-3 rounded-full bg-[#f5c542]/80" />
              <span className="h-3 w-3 rounded-full bg-neon/80" />
              <span className="ml-3 font-mono text-xs text-faint">
                {profile.handle}@portfolio: ~
              </span>
            </div>

            <div className="space-y-3 p-5 font-mono text-sm">
              {promptLines.map((line, i) => (
                <motion.div
                  key={line.cmd}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.25 }}
                >
                  <p className="text-muted">
                    <span className="text-neon">➜</span> <span className="text-cyan">~</span>{" "}
                    {line.cmd}
                  </p>
                  <p className="pl-4 text-fg">{line.out}</p>
                </motion.div>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="text-muted"
              >
                <span className="text-neon">➜</span> <span className="text-cyan">~</span>{" "}
                <span className="caret" />
              </motion.p>
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-2 gap-px border-t border-line bg-line">
              {stats.map((s) => (
                <div key={s.label} className="bg-surface p-4">
                  <p className="font-display text-2xl font-bold text-neon">
                    {s.prefix}
                    <Counter value={s.value} />
                    {s.suffix}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-16 hidden items-center gap-2 font-mono text-xs text-faint transition-colors hover:text-neon lg:flex"
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <ArrowDownIcon width={16} height={16} />
          </motion.span>
          scroll
        </motion.a>
      </div>
    </section>
  );
}
