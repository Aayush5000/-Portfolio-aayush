import type { ReactNode } from "react";
import { OutLink } from "@/components/ui/OutLink";
import type { Project } from "@/lib/content";

/* Small shared parts, so the three project layouts can look completely
   different while the information architecture stays identical. */

export function Field({
  label,
  children,
  tone = "default",
  className = "",
}: {
  label: string;
  children: ReactNode;
  tone?: "default" | "impact";
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={tone === "impact" ? "eyebrow" : "label"}>{label}</p>
      <p
        className={`mt-2.5 leading-relaxed ${
          tone === "impact" ? "text-[15px] text-bone/90" : "text-[14.5px] text-mute"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

export function StackRow({ stack, className = "" }: { stack: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies used">
      {stack.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[13.5px] leading-relaxed text-mute">
          <span className="mt-[8px] h-1 w-1 shrink-0 rounded-[1px] bg-amber/70" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ThemeRow({
  themes,
  className = "",
}: {
  themes: readonly string[];
  className?: string;
}) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint ${className}`}
    >
      {themes.map((theme, index) => (
        <span key={theme} className="flex items-center gap-2.5">
          {index > 0 ? <span aria-hidden="true">·</span> : null}
          {theme}
        </span>
      ))}
    </p>
  );
}

/**
 * Repository and demo buttons. Both URLs live in lib/content.ts and both are
 * empty until Aayush publishes them — until then they render as visibly
 * pending instead of linking nowhere.
 */
export function ProjectLinks({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <OutLink
        url={project.repoUrl}
        label="View code"
        icon="github"
        variant="btn-sm"
        pending="repository link not added yet"
      />
      <OutLink
        url={project.liveUrl}
        label="Live demo"
        icon="arrow-out"
        variant="btn-sm"
        pending="no hosted demo yet"
      />
    </div>
  );
}

/** The number + title block. Sized by the layout that uses it. */
export function ProjectTitle({
  project,
  size = "lg",
}: {
  project: Project;
  size?: "lg" | "md";
}) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
          project {project.no}
        </span>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
        <span className="sec-meta">{project.period}</span>
      </div>

      <h3
        className={`display mt-5 ${
          size === "lg"
            ? "text-[clamp(2.1rem,5.2vw,3.2rem)]"
            : "text-[clamp(1.8rem,3.6vw,2.4rem)]"
        }`}
      >
        {project.title}
      </h3>
      <p className="mt-3 flex items-start gap-3 text-[15.5px] text-mute">
        <span className="mt-[13px] h-px w-5 shrink-0 bg-amber/70" aria-hidden="true" />
        {project.subtitle}
      </p>
    </div>
  );
}
