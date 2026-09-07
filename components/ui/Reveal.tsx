"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/lib/hooks";

type RevealProps = {
  children: ReactNode;
  /** Multiplied by 80ms. Use for deliberate sequencing, not on every element. */
  delay?: number;
  className?: string;
};

/**
 * Fades and lifts its contents into place the first time they are scrolled to.
 * Any descendant with the `stagger` class has its direct children sequenced
 * automatically (see globals.css), which keeps markup semantic.
 *
 * The hidden state is scoped to `html.js`, so the page is fully readable if
 * JavaScript never runs. Reduced-motion visitors get the content immediately.
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal${inView ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--d": delay } as CSSProperties}
    >
      {children}
    </div>
  );
}
