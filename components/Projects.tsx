"use client";

import { useMemo, useState } from "react";
import { ProjectDashboard } from "@/components/projects/ProjectDashboard";
import { ProjectFeature } from "@/components/projects/ProjectFeature";
import { ProjectSplit } from "@/components/projects/ProjectSplit";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects, projectThemes, type Project, type ProjectTheme } from "@/lib/content";

/** Each project keeps its own layout, whatever the filter is showing. */
function ProjectBlock({ project }: { project: Project }) {
  if (project.no === "02") return <ProjectSplit project={project} />;
  if (project.no === "03") return <ProjectDashboard project={project} />;
  return <ProjectFeature project={project} />;
}

const CHRONOLOGY = [
  { year: "2024", note: "trained a model" },
  { year: "2025", note: "designed a product" },
  { year: "2026", note: "built the full stack" },
];

export function Projects() {
  const [theme, setTheme] = useState<ProjectTheme | "all">("all");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const value of projectThemes) {
      map.set(value, projects.filter((project) => project.themes.includes(value)).length);
    }
    return map;
  }, []);

  const visible =
    theme === "all" ? projects : projects.filter((project) => project.themes.includes(theme));

  return (
    <section id="projects" className="section">
      <div className="shell">
        <SectionHeader
          id="projects"
          title="Selected projects"
          meta={`${projects.length} builds · 2024 → 2026`}
          lede="Three finished builds, each one a step further out: a model, then a product, then an application that does the whole job end to end. Every technology listed below is one I wrote code in."
        />

        {/* the growth line, stated with dates rather than adjectives */}
        <Reveal className="mt-10 hidden md:block">
          <ol className="flex items-center gap-5">
            {CHRONOLOGY.map((entry, index) => (
              <li key={entry.year} className="flex flex-1 items-center gap-5 last:flex-none">
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-[12px] tracking-[0.08em] text-amber">
                    {entry.year}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
                    {entry.note}
                  </span>
                </span>
                {index < CHRONOLOGY.length - 1 ? (
                  <span className="h-px flex-1 bg-line" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* ── theme filter ───────────────────────────────────────────────── */}
        <div className="mt-10 flex flex-col gap-4 border-y border-line py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="label mr-1.5">filter</span>

            <button
              type="button"
              className="chip chip--interactive"
              data-active={theme === "all"}
              aria-pressed={theme === "all"}
              onClick={() => setTheme("all")}
            >
              All
              <span className="text-faint">{projects.length}</span>
            </button>

            {projectThemes.map((value) => (
              <button
                key={value}
                type="button"
                className="chip chip--interactive"
                data-active={theme === value}
                aria-pressed={theme === value}
                onClick={() => setTheme(value)}
              >
                {value}
                <span className="text-faint">{counts.get(value) ?? 0}</span>
              </button>
            ))}
          </div>

          <p className="sec-meta" role="status" aria-live="polite">
            showing {visible.length} of {projects.length}
          </p>
        </div>

        {/* ── the work ───────────────────────────────────────────────────── */}
        <div className="mt-12 space-y-14 sm:space-y-20">
          {visible.map((project, index) => (
            <Reveal key={project.no} delay={index === 0 ? 0 : 1}>
              <ProjectBlock project={project} />
            </Reveal>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-12 text-[15px] text-mute">
            No project carries that theme yet.{" "}
            <button
              type="button"
              className="link-underline text-amber"
              onClick={() => setTheme("all")}
            >
              Show all three
            </button>
            .
          </p>
        ) : null}
      </div>
    </section>
  );
}
