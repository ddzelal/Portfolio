import { profile } from "@/lib/data";
import { Section, SectionHeading } from "./Section";
import { Reveal } from "./anim/Reveal";
import { Magnetic } from "./anim/Magnetic";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  GlobeIcon,
  MapPinIcon,
  PhoneIcon,
} from "./Icons";

const channels = [
  { label: "email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
  { label: "github", value: "github.com/ddzelal", href: profile.github, Icon: GithubIcon },
  { label: "linkedin", value: "in/dzelaldupljak", href: profile.linkedin, Icon: LinkedinIcon },
  { label: "website", value: "dzelaldupljak.com", href: profile.website, Icon: GlobeIcon },
  { label: "phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, Icon: PhoneIcon },
];

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading index="05" title="get_in_touch" command="./connect.sh --now" />

      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <div className="border border-line bg-surface/50">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-magenta/80" />
              <span className="h-3 w-3 rounded-full bg-[#f5c542]/80" />
              <span className="h-3 w-3 rounded-full bg-neon/80" />
              <span className="ml-3 font-mono text-xs text-faint">message.sh</span>
            </div>
            <div className="space-y-2 p-6 font-mono text-sm">
              <p className="text-muted">
                <span className="text-neon">$</span> echo &quot;Let&apos;s build
                something stable.&quot;
              </p>
              <p className="text-fg">Let&apos;s build something stable.</p>
              <p className="pt-2 text-muted">
                <span className="text-neon">$</span> open mailto:
                <span className="caret" />
              </p>
              <div className="flex items-center gap-2 pt-3 text-muted">
                <MapPinIcon width={15} height={15} className="text-neon" />
                {profile.location}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal direction="left">
          <div className="space-y-3">
            {channels.map(({ label, value, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border border-line bg-surface/30 px-5 py-4 transition-all duration-200 hover:border-neon hover:bg-surface/60"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors group-hover:border-neon group-hover:text-neon">
                    <Icon width={17} height={17} />
                  </span>
                  <span>
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-faint">
                      {label}
                    </span>
                    <span className="block text-sm text-fg transition-colors group-hover:text-neon">
                      {value}
                    </span>
                  </span>
                </span>
                <span className="font-mono text-faint transition-transform group-hover:translate-x-1 group-hover:text-neon">
                  →
                </span>
              </a>
            ))}

            <Magnetic strength={0.2} className="block w-full">
              <a
                href={`mailto:${profile.email}`}
                className="box-glow mt-2 flex w-full items-center justify-center gap-2 bg-neon px-6 py-4 font-mono text-sm font-semibold text-bg transition-transform hover:scale-[1.01]"
              >
                send_message()
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
