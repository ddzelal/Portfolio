"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { projects, type Project } from "@/lib/data";
import { Section, SectionHeading } from "./Section";
import { RevealGroup, RevealItem } from "./anim/Reveal";
import { ProjectPreview } from "./ProjectPreview";
import { ArrowUpRightIcon } from "./Icons";

function TiltCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <RevealItem className="h-full [perspective:1000px]">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group box-glow-hover relative flex h-full flex-col overflow-hidden border border-line bg-surface/50"
      >
        <ProjectPreview kind={project.kind} />

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-neon">
              {project.category}
            </span>
            <span className="font-mono text-xs text-faint">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-3 flex items-center gap-2 font-display text-xl font-bold text-fg transition-colors group-hover:text-neon">
            {project.name}
            <ArrowUpRightIcon
              width={16}
              height={16}
              className="text-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neon"
            />
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {project.blurb}
          </p>

          <div className="mt-4 inline-flex w-fit items-center gap-2 border border-neon/30 bg-neon/5 px-2.5 py-1 font-mono text-[11px] text-neon">
            <span className="h-1.5 w-1.5 rounded-full bg-neon" />
            {project.metric}
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-4">
            {project.stack.map((t) => (
              <span key={t} className="font-mono text-[11px] text-faint">
                #{t.toLowerCase().replace(/[.\s/]/g, "")}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </RevealItem>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        index="04"
        title="featured_builds"
        command="find ./projects -type f -name '*.shipped'"
      />

      <RevealGroup
        stagger={0.1}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p, i) => (
          <TiltCard key={p.name} project={p} index={i} />
        ))}
      </RevealGroup>
    </Section>
  );
}
