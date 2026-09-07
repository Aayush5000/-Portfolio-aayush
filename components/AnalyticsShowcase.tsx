"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ChartPanel } from "./workbench/ChartPanel";
import { CleaningPanel } from "./workbench/CleaningPanel";
import { DashboardPanel } from "./workbench/DashboardPanel";
import { QueryPanel } from "./workbench/QueryPanel";
import { WorkflowPanel } from "./workbench/WorkflowPanel";

const PANELS = [
  { id: "clean", label: "clean", Panel: CleaningPanel },
  { id: "query", label: "query", Panel: QueryPanel },
  { id: "chart", label: "visualise", Panel: ChartPanel },
  { id: "report", label: "report", Panel: DashboardPanel },
  { id: "model", label: "model", Panel: WorkflowPanel },
] as const;

const LAST = PANELS.length - 1;

/**
 * The part of the job a résumé bullet cannot show: cleaning, querying, charting,
 * reporting, modelling. One invented sample dataset runs through all five so the
 * numbers stay consistent — and nothing here is presented as a real result.
 */
export function AnalyticsShowcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (index: number) => {
    setActive(index);
    tabs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        move(active === LAST ? 0 : active + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        move(active === 0 ? LAST : active - 1);
        break;
      case "Home":
        move(0);
        break;
      case "End":
        move(LAST);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  return (
    <section id="workbench" className="section">
      <div className="shell">
        <SectionHeader
          id="workbench"
          title="The analyst’s workbench"
          meta="sample data throughout"
          lede="Saying “I clean data and build dashboards” costs nothing, so here is the work instead. One small invented dataset moves through all five stages — messy CSV, query, chart, report, model — which is enough to show the craft without borrowing a result I never produced."
        />

        <Reveal className="mt-12 lg:mt-14">
          <div
            role="tablist"
            aria-label="Analyst workbench examples"
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            className="-mx-1 flex flex-wrap items-center gap-1 border-y border-line px-1 py-2.5"
          >
            {PANELS.map((panel, index) => {
              const selected = index === active;
              return (
                <button
                  key={panel.id}
                  ref={(node) => {
                    tabs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`wb-tab-${panel.id}`}
                  aria-selected={selected}
                  aria-controls={`wb-panel-${panel.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  className="tab"
                >
                  <span className={selected ? "text-amber/60" : "text-white/20"}>
                    0{index + 1}
                  </span>
                  {panel.label}
                </button>
              );
            })}
          </div>
          <p className="label mt-3">
            ← → to move between stages
          </p>
        </Reveal>

        <div className="mt-10 lg:mt-14">
          {PANELS.map((panel, index) => (
            <div
              key={panel.id}
              role="tabpanel"
              id={`wb-panel-${panel.id}`}
              aria-labelledby={`wb-tab-${panel.id}`}
              tabIndex={0}
              hidden={index !== active}
              className="focus-visible:outline-none"
            >
              <panel.Panel />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
