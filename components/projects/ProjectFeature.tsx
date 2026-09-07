import { Field, Highlights, ProjectLinks, ProjectTitle, StackRow, ThemeRow } from "./parts";
import { NumxVisual } from "./visuals";
import type { Project } from "@/lib/content";

/**
 * Layout 01 — the large featured horizontal block. Copy on the left, the model
 * diagram and technical detail on the right, one full-width panel.
 */
export function ProjectFeature({ project }: { project: Project }) {
  return (
    <article className="panel panel--hover overflow-hidden">
      <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
        {/* copy */}
        <div className="p-6 sm:p-9 lg:p-11">
          <ProjectTitle project={project} />

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

          <ProjectLinks project={project} className="mt-9" />
          <ThemeRow themes={project.themes} className="mt-7" />
        </div>

        {/* visual + technical detail */}
        <div className="flex flex-col justify-center gap-8 border-t border-line bg-inset/50 p-6 sm:p-9 lg:border-l lg:border-t-0 lg:p-11">
          <NumxVisual />

          <div>
            <p className="label">technical highlights</p>
            <div className="mt-4">
              <Highlights items={project.highlights} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
