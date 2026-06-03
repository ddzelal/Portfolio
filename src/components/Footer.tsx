import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 font-mono text-xs text-faint sm:flex-row sm:px-8">
        <p>
          <span className="text-neon">$</span> built by {profile.name} ·{" "}
          <span className="text-muted">Next.js + Motion</span>
        </p>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">
            © {profile.name}. all systems operational
            <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-neon align-middle" />
          </span>
          <div className="flex items-center gap-1">
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
                className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-neon"
              >
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
