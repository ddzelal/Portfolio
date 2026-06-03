import { skillGroups, marquee } from "@/lib/data";
import { Section, SectionHeading } from "./Section";
import { Reveal, RevealGroup, RevealItem } from "./anim/Reveal";

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = reverse ? [...marquee].reverse() : marquee;
  return (
    <div className="group flex overflow-hidden border-y border-line py-4 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className="flex shrink-0 animate-marquee items-center gap-8 pr-8 group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="flex items-center gap-8 font-mono text-lg text-muted"
          >
            {t}
            <span className="text-neon/50">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <Section id="stack">
      <SectionHeading index="03" title="tech_stack" command="ls -la ~/skills" />

      <RevealGroup className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <RevealItem key={group.label} className="bg-surface/60 p-6">
            <h3 className="mb-4 flex items-center gap-2 font-mono text-sm text-neon">
              <span className="text-faint">{">"}</span>
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="border border-line bg-bg px-3 py-1.5 font-mono text-xs text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-neon hover:text-neon"
                >
                  {item}
                </span>
              ))}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-12 space-y-3">
        <MarqueeRow />
        <MarqueeRow reverse />
      </Reveal>
    </Section>
  );
}
