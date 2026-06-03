import type { ReactNode } from "react";
import { Reveal } from "./anim/Reveal";

export function SectionHeading({
  index,
  title,
  command,
}: {
  index: string;
  title: string;
  command: string;
}) {
  return (
    <Reveal>
      <div className="mb-12">
        <p className="mb-3 font-mono text-xs text-neon">
          <span className="text-faint">{index}.</span> {command}
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          {title}
        </h2>
        <div className="mt-4 h-px w-full bg-gradient-to-r from-neon/50 via-line to-transparent" />
      </div>
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 ${className}`}
    >
      {children}
    </section>
  );
}
