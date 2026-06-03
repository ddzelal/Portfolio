"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through `phrases`, typing then deleting each one.
 * Renders a blinking caret after the text.
 */
export function TypeWriter({
  phrases,
  className = "",
  typeSpeed = 55,
  deleteSpeed = 28,
  holdTime = 1600,
}: {
  phrases: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
}) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];

    if (!deleting && sub === current.length) {
      const t = setTimeout(() => setDeleting(true), holdTime);
      return () => clearTimeout(t);
    }
    if (deleting && sub === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const t = setTimeout(
      () => setSub((s) => s + (deleting ? -1 : 1)),
      deleting ? deleteSpeed : typeSpeed,
    );
    return () => clearTimeout(t);
  }, [sub, deleting, index, phrases, typeSpeed, deleteSpeed, holdTime]);

  const text = phrases[index % phrases.length].slice(0, sub);

  return (
    <span className={`caret ${className}`} aria-live="polite">
      {text}
    </span>
  );
}
