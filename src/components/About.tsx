import { profile, certifications, education } from "@/lib/data";
import { Section, SectionHeading } from "./Section";
import { Reveal, RevealGroup, RevealItem } from "./anim/Reveal";
import { Avatar } from "./Avatar";

export function About() {
  return (
    <Section id="about">
      <SectionHeading index="01" title="about_me" command="cat README.md" />

      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        <div className="flex justify-center lg:block">
          <Avatar />
        </div>

        <div className="space-y-10">
          <Reveal direction="left">
            <div className="border-l-2 border-neon/40 pl-6">
              <p className="text-lg leading-relaxed text-fg/90">{profile.bio}</p>
              <p className="mt-6 leading-relaxed text-muted">
                I gravitate toward the hard parts — keeping systems alive under
                peak load, cutting latency, and shipping AI that earns its place
                in production rather than the demo. From a 12-year legacy
                migration to an AI message-routing engine handling millions of
                daily calls, I care about stability that drives real business
                value.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-2">
            <RevealGroup>
              <RevealItem>
                <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-neon">
                  // certifications
                </h3>
              </RevealItem>
              {certifications.map((c) => (
                <RevealItem key={c.title}>
                  <div className="mb-3 border border-line bg-surface/50 p-4 transition-colors hover:border-line-hi">
                    <p className="text-sm font-medium text-fg">{c.title}</p>
                    <p className="mt-1 font-mono text-xs text-muted">{c.issuer}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <RevealGroup>
              <RevealItem>
                <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-neon">
                  // education
                </h3>
              </RevealItem>
              {education.map((e) => (
                <RevealItem key={e.degree}>
                  <div className="border-b border-line py-3">
                    <p className="text-sm font-medium text-fg">{e.degree}</p>
                    <p className="font-mono text-xs text-muted">{e.school}</p>
                    <p className="mt-0.5 font-mono text-xs text-faint">{e.period}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </Section>
  );
}
