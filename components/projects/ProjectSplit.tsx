import { Field, Highlights, ProjectLinks, ProjectTitle, StackRow, ThemeRow } from "./parts";
import { FlowMateVisual } from "./visuals";
import type { Project } from "@/lib/content";

/**
 * Layout 02 — split screen. The interface concept gets its own half on a lit
 * ground, the writing gets the other. Visual leads on desktop, copy leads on
 * mobile (order is set per breakpoint, not left to reflow).
 */
export function ProjectSplit({ project }: { project: Project }) {
  return (
    <article className="panel panel--hover overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* the lit half */}
        <div className="relative flex items-center justify-center overflow-hidden border-b border-line bg-surface-2 px-6 py-12 sm:py-16 lg:order-1 lg:border-b-0 lg:border-r">
          <div
            className="glow-amber left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
          />
          <div className="grid-field opacity-70" aria-hidden="true" />
          <div className="relative">
            <FlowMateVisual />
          </div>
        </div>

        {/* the written half */}
        <div className="p-6 sm:p-9 lg:order-2 lg:p-11">
          <ProjectTitle project={project} size="md" />

          <StackRow stack={project.stack} className="mt-7" />

          <div className="mt-9 space-y-7">
            <Field label="problem">{project.problem}</Field>
            <Field label="what I built">{project.solution}</Field>
          </div>

          <div className="mt-9 border-l-2 border-l-amber/60 pl-5">
            <Field label="impact" tone="impact">
              {project.impact}
            </Field>
          </div>

          <div className="mt-9 border-t border-line pt-7">
            <p className="label">technical highlights</p>
            <div className="mt-4">
              <Highlights items={project.highlights} />
            </div>
          </div>

          <ProjectLinks project={project} className="mt-9" />
          <ThemeRow themes={project.themes} className="mt-7" />
        </div>
      </div>
    </article>
  );
}
