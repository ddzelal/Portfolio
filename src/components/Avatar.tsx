"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SRC = "/DzelalDupljakPicture.jpg";

export function Avatar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="avatar-group group relative aspect-[4/5] w-full max-w-[320px] select-none overflow-hidden border border-line bg-surface box-glow-hover"
    >
      {/* base photo — desaturated, neon-graded, color on hover */}
      <Image
        src={SRC}
        alt="Dzelal Dupljak"
        fill
        priority={false}
        sizes="(max-width: 768px) 80vw, 320px"
        className="object-cover object-[38%_24%] grayscale contrast-[1.05] brightness-90 transition-[filter] duration-500 group-hover:grayscale-0"
      />

      {/* RGB-split glitch clones (animate on hover) */}
      <div
        className="avatar-layer avatar-cyan"
        style={{ backgroundImage: `url(${SRC})`, filter: "hue-rotate(150deg) saturate(2)" }}
      />
      <div
        className="avatar-layer avatar-magenta"
        style={{ backgroundImage: `url(${SRC})`, filter: "hue-rotate(-60deg) saturate(2)" }}
      />

      {/* neon duotone wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-neon/25 via-transparent to-cyan/15 mix-blend-overlay" />
      {/* bottom fade for the label */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg via-bg/40 to-transparent" />

      {/* scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0 2px, rgba(0,0,0,.5) 3px, transparent 4px)",
        }}
      />

      {/* one-pass scan line on load */}
      <div className="avatar-scanline pointer-events-none absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-neon/30 to-transparent" />

      {/* corner brackets */}
      {(
        [
          "left-2 top-2 border-l-2 border-t-2",
          "right-2 top-2 border-r-2 border-t-2",
          "left-2 bottom-2 border-l-2 border-b-2",
          "right-2 bottom-2 border-r-2 border-b-2",
        ] as const
      ).map((pos) => (
        <span key={pos} className={`pointer-events-none absolute h-5 w-5 border-neon ${pos}`} />
      ))}

      {/* label */}
      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between font-mono text-[11px]">
        <span className="text-neon">./dzelal.jpg</span>
        <span className="flex items-center gap-1.5 text-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" />
          live
        </span>
      </div>
    </motion.div>
  );
}
