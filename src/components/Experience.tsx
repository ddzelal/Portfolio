"use client";

import { motion } from "motion/react";
import { experience } from "@/lib/data";
import { Section, SectionHeading } from "./Section";

export function Experience() {
  return (
    <Section id="work">
      <SectionHeading index="02" title="work_history" command="git log --oneline --all" />

      <div className="relative">
        {/* timeline spine */}
        <div className="absolute left-0 top-2 hidden h-full w-px bg-gradient-to-b from-neon/60 via-line to-transparent sm:left-[7px] sm:block" />

        <div className="space-y-10">
          {experience.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative sm:pl-12"
            >
              {/* node */}
              <span className="absolute left-0 top-1.5 hidden h-4 w-4 items-center justify-center sm:flex">
                <span
                  className={`h-3.5 w-3.5 rounded-full border-2 ${
                    job.current
                      ? "border-neon bg-neon/20 shadow-[0_0_12px_rgba(0,255,135,0.6)]"
                      : "border-line-hi bg-bg"
                  }`}
                />
              </span>

              <div className="group border border-line bg-surface/40 p-6 transition-colors hover:border-line-hi">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-xl font-bold text-fg">
                    {job.company}
                    {job.current && (
                      <span className="ml-3 inline-flex items-center gap-1.5 align-middle font-mono text-[11px] font-normal text-neon">
                        <span className="h-1.5 w-1.5 rounded-full bg-neon" />
                        current
                      </span>
                    )}
                  </h3>
                  <span className="font-mono text-xs text-faint">{job.period}</span>
                </div>

                <p className="mt-1 font-mono text-sm text-neon-dim">{job.role}</p>
                <p className="font-mono text-xs text-muted">{job.meta}</p>

                <ul className="mt-4 space-y-2">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-neon/70" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.stack.map((t) => (
                    <span
                      key={t}
                      className="border border-line bg-bg px-2.5 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-line-hi"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
