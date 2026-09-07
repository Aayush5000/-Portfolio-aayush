import type { CSSProperties } from "react";
import { PanelShell } from "./PanelShell";
import { workflow, workflowMetrics } from "./data";

const delay = (n: number) => ({ "--d": n }) as CSSProperties;

/** How a model actually gets built — including the loop everyone forgets to draw. */
export function WorkflowPanel() {
  return (
    <PanelShell
      title="The order matters more than the model"
      blurb="Nearly every mistake I have made in a machine-learning project was an ordering mistake — scaling before splitting, tuning against the test set, judging a classifier on accuracy alone. So the workflow is the deliverable, and the model is what falls out of it."
      tag="workflow diagram · no results shown"
      aside={
        <div>
          <p className="label">the one that bites</p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-mute">
            Splitting comes before preprocessing. Fit a scaler on the whole dataset and the test set
            has already seen the training data — the score goes up and it means nothing.
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="inset p-5 sm:p-6">
          {/* horizontal schematic */}
          <div className="hidden lg:block">
            <ol className="grid grid-cols-5">
              {workflow.map((stage, index) => (
                <li key={stage.step} className="pr-7">
                  <div className="flex items-center gap-3">
                    <span className="node-dot" aria-hidden="true" />
                    {index < workflow.length - 1 ? (
                      <span className="pipe-line flex-1" style={delay(index)} aria-hidden="true" />
                    ) : null}
                  </div>
                  <p className="label mt-4">step 0{index + 1}</p>
                  <h4 className="mt-1.5 font-display text-[1.05rem] font-semibold tracking-[-0.01em] text-bone">
                    {stage.step}
                  </h4>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-mute">{stage.note}</p>
                </li>
              ))}
            </ol>

            {/* the iterate loop, drawn from evaluate back to preprocess */}
            <div className="mt-8 grid grid-cols-5">
              <div className="relative col-span-3 col-start-3 pr-7">
                <div
                  className="h-9 rounded-b-[6px] border-x border-b border-dashed border-steel/45"
                  aria-hidden="true"
                />
                <span
                  className="absolute left-0 top-0 h-0 w-0 -translate-x-[3.5px] -translate-y-[5px] border-x-[4px] border-b-[6px] border-x-transparent border-b-steel/70"
                  aria-hidden="true"
                />
                <p className="absolute inset-x-0 top-[9px] text-center">
                  <span className="bg-inset px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-steel">
                    iterate
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* stacked schematic */}
          <ol className="space-y-5 lg:hidden">
            {workflow.map((stage, index) => (
              <li key={stage.step} className="flex gap-4">
                <div className="flex flex-col items-center pt-1.5">
                  <span className="node-dot" aria-hidden="true" />
                  {index < workflow.length - 1 ? (
                    <span
                      className="pipe-line--v min-h-10 flex-1"
                      style={delay(index)}
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
                <div className="pb-1">
                  <p className="label">step 0{index + 1}</p>
                  <h4 className="mt-1 font-display text-[1.05rem] font-semibold tracking-[-0.01em] text-bone">
                    {stage.step}
                  </h4>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-mute">{stage.note}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-6 border-t border-line pt-4 text-[13px] leading-relaxed text-mute lg:mt-2">
            <span className="text-steel">Evaluate loops back to Preprocess</span> — the errors tell
            you which features or classes to look at again. A single pass through this diagram is a
            demo, not a model.
          </p>
        </div>

        <div className="panel p-5 sm:p-6">
          <p className="label">what gets measured</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {workflowMetrics.map((metric) => (
              <li key={metric} className="chip">
                {metric}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-line pt-4 text-[13.5px] leading-relaxed text-mute">
            Names only, and deliberately so. I evaluated NUMX on held-out digits while building it,
            but I did not keep a recorded figure — so there is no headline number here to quote.
            Inventing one would be the easiest thing on this whole page to fake, and the least
            worth having.
          </p>
        </div>
      </div>
    </PanelShell>
  );
}
