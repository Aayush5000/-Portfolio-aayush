import { Field, Highlights, ProjectLinks, StackRow, ThemeRow } from "./parts";
import { AnalyzerVisual } from "./visuals";
import type { Project } from "@/lib/content";

/**
 * Layout 03 — laid out like a dashboard, because that is what the project is:
 * a chrome bar, then hairline-separated widgets on a grid. The 1px gaps are the
 * grid's own background showing through, which is how a real BI canvas reads.
 */
export function ProjectDashboard({ project }: { project: Project }) {
  return (
    <article className="panel panel--hover overflow-hidden">
      {/* chrome bar */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-5 py-3.5 sm:px-7">
        <span className="flex items-center gap-3.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-amber/80" />
            <span className="h-2 w-2 rounded-full bg-white/14" />
            <span className="h-2 w-2 rounded-full bg-white/14" />
          </span>
          <span className="h-3.5 w-px bg-line" aria-hidden="true" />
          <span className="font-mono text-[11px] tracking-[0.06em] text-mute">
            resume_analyzer / dashboard
          </span>
        </span>
        <span className="sec-meta">
          project {project.no} · {project.period}
        </span>
      </div>

      {/* widget grid — gap-px over a hairline ground */}
      <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-surface p-6 sm:col-span-2 sm:p-8">
          <h3 className="display text-[clamp(1.8rem,3.6vw,2.4rem)]">{project.title}</h3>
          <p className="mt-3 flex items-start gap-3 text-[15.5px] text-mute">
            <span className="mt-[13px] h-px w-5 shrink-0 bg-amber/70" aria-hidden="true" />
            {project.subtitle}
          </p>
          <ProjectLinks project={project} className="mt-7" />
        </div>

        <div className="bg-surface p-6 sm:p-8">
          <p className="label">stack</p>
          <StackRow stack={project.stack} className="mt-3.5" />
          <p className="label mt-6">themes</p>
          <ThemeRow themes={project.themes} className="mt-3" />
        </div>

        <div className="bg-surface p-6 sm:p-8">
          <Field label="problem">{project.problem}</Field>
        </div>

        <div className="bg-surface p-6 sm:p-8">
          <Field label="what I built">{project.solution}</Field>
        </div>

        <div className="bg-surface p-6 sm:col-span-2 sm:p-8 lg:col-span-1">
          <Field label="impact" tone="impact">
            {project.impact}
          </Field>
        </div>

        <div className="bg-surface p-6 sm:col-span-2 sm:p-8">
          <AnalyzerVisual />
        </div>

        <div className="bg-surface p-6 sm:col-span-2 sm:p-8 lg:col-span-1">
          <p className="label">technical highlights</p>
          <div className="mt-4">
            <Highlights items={project.highlights} />
          </div>
        </div>
      </div>
    </article>
  );
}
