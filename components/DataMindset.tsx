import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { modelNote, pipeline } from "@/lib/content";

const delay = (n: number) => ({ "--d": n }) as CSSProperties;

/** Shared frame for the six stage glyphs. Diagrams, not illustrations. */
function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-11 w-11 shrink-0"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** One tiny diagram per stage: unsorted points, a filter, a search, a
 *  comparison, a chart, a branch. They read left to right like the pipeline. */
function StageGlyph({ step }: { step: string }) {
  switch (step) {
    case "01":
      return (
        <Glyph>
          <g fill="currentColor" stroke="none">
            <circle cx="9" cy="13" r="2" />
            <circle cx="19" cy="8" r="2" />
            <circle cx="33" cy="15" r="2" />
            <circle cx="14" cy="26" r="2" />
            <circle cx="27" cy="24" r="2" />
            <circle cx="36" cy="32" r="2" />
            <circle cx="8" cy="36" r="2" />
            <circle cx="21" cy="36" r="2" />
          </g>
          <circle cx="28" cy="34" r="2.4" strokeDasharray="2 2" />
          <circle cx="35" cy="7" r="2.4" strokeDasharray="2 2" />
        </Glyph>
      );
    case "02":
      return (
        <Glyph>
          <path d="M7 9h30L26 23v12l-8-4V23L7 9Z" />
          <path d="M18 16h8" opacity="0.5" />
          <path d="M36 33.5 40 37M40 33.5 36 37" opacity="0.75" />
        </Glyph>
      );
    case "03":
      return (
        <Glyph>
          <path d="M6 38h32" opacity="0.45" />
          <path d="M11 38V26M18 38v-8M25 38V17M32 38v-14" />
          <circle cx="27" cy="16" r="8.5" />
          <path d="M33.4 22.4 39 28" />
        </Glyph>
      );
    case "04":
      return (
        <Glyph>
          <path d="M5 32c4 0 5-13 10-13s6 13 10 13" opacity="0.55" />
          <path d="M17 32c4 0 6-17 11-17s7 17 11 17" />
          <path d="M6 36h32" opacity="0.45" />
          <path d="M15 10v20M28 6v24" strokeDasharray="2 3" opacity="0.7" />
        </Glyph>
      );
    case "05":
      return (
        <Glyph>
          <path d="M8 6v32h30" opacity="0.55" />
          <rect x="13" y="24" width="5" height="14" rx="1" />
          <rect x="22" y="15" width="5" height="23" rx="1" />
          <rect x="31" y="20" width="5" height="18" rx="1" />
        </Glyph>
      );
    default:
      return (
        <Glyph>
          <path d="M6 22h11" />
          <path d="M17 22c6 0 5-11 11-11h6" />
          <path d="M17 22c6 0 5 11 11 11h6" strokeDasharray="2 3" opacity="0.55" />
          <path d="M31 8.5 34.5 11 31 13.5" />
          <circle cx="38" cy="33" r="5" opacity="0.55" />
          <path d="M35.7 33.2 37.4 35l3-3.6" />
        </Glyph>
      );
  }
}

/**
 * The analytics-first section. The strip at the top is the whole method in one
 * line; the rows below explain each stage. Nothing is hidden behind hover —
 * hover only lights up what you are already reading.
 */
export function DataMindset() {
  return (
    <section id="mindset" className="section relative overflow-hidden">
      <div className="shell relative">
        <SectionHeader
          id="mindset"
          title="How I think about data"
          meta="six stages · one loop"
          lede="Tools change from project to project. The order of operations does not. This is the loop I run on every dataset, whether it arrives as a spreadsheet or a folder of images."
        />

        {/* ── the method in one line ─────────────────────────────────────── */}
        <Reveal className="mt-14 hidden md:block">
          <ol className="flex items-center" aria-label="Data workflow, in order">
            {pipeline.map((stage, index) => (
              <li
                key={stage.step}
                className={`flex items-center gap-4 ${
                  index === pipeline.length - 1 ? "shrink-0" : "flex-1"
                }`}
              >
                <span className="flex shrink-0 items-center gap-2.5">
                  <span className="node-dot" aria-hidden="true" />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-mute">
                    {stage.title}
                  </span>
                </span>
                {index < pipeline.length - 1 ? (
                  <span className="pipe-line flex-1" style={delay(index)} aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* ── stage by stage ─────────────────────────────────────────────── */}
        <Reveal className="mt-12 md:mt-16">
          <ol className="stagger border-t border-line">
            {pipeline.map((stage) => (
              <li key={stage.step} className="group relative border-b border-line">
                <span
                  className="absolute left-0 top-0 h-full w-px bg-amber opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="grid gap-x-10 gap-y-5 py-8 transition-colors duration-500 group-hover:bg-white/[0.012] md:grid-cols-[76px_1fr_1.15fr] md:py-9 md:pl-5">
                  <p
                    className="display text-[clamp(1.6rem,3vw,2.4rem)] leading-none text-white/[0.16] transition-colors duration-500 group-hover:text-amber/70"
                    aria-hidden="true"
                  >
                    {stage.step}
                  </p>

                  <div>
                    <h3 className="text-[1.3rem] font-bold sm:text-[1.45rem]">{stage.title}</h3>
                    <p className="mt-2 text-[14.5px] text-mute">{stage.summary}</p>
                  </div>

                  <div className="flex items-start gap-5">
                    <span className="mt-0.5 text-steel/45 transition-colors duration-500 group-hover:text-steel">
                      <StageGlyph step={stage.step} />
                    </span>
                    <p className="text-[14.5px] leading-relaxed text-faint transition-colors duration-500 group-hover:text-mute">
                      {stage.detail}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* ── the modelling footnote ─────────────────────────────────────── */}
        <Reveal className="mt-12">
          <div className="panel grid gap-8 border-l-2 border-l-amber/60 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
            <div>
              <p className="eyebrow">Model evaluation</p>
              <h3 className="mt-3 text-[1.35rem] sm:text-[1.55rem]">{modelNote.title}</h3>
              <p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-mute">
                {modelNote.body}
              </p>
            </div>

            {/* Concept diagram: the four cells of a confusion matrix, unlabelled
                by design — there are no numbers here to report. */}
            <figure className="shrink-0">
              <div className="grid w-[184px] grid-cols-2 gap-1.5" aria-hidden="true">
                {[
                  { cell: "TP", tone: "good" },
                  { cell: "FP", tone: "bad" },
                  { cell: "FN", tone: "bad" },
                  { cell: "TN", tone: "good" },
                ].map(({ cell, tone }) => (
                  <span
                    key={cell}
                    className={`flex h-[62px] items-center justify-center rounded-[3px] border font-mono text-[11px] tracking-[0.12em] ${
                      tone === "good"
                        ? "border-amber/30 bg-amber/[0.07] text-amber"
                        : "border-line bg-white/[0.02] text-faint"
                    }`}
                  >
                    {cell}
                  </span>
                ))}
              </div>
              <figcaption className="demo-tag mt-3">
                confusion matrix · concept, no data
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
