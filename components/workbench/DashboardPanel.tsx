import type { CSSProperties, ReactNode } from "react";
import { PanelShell } from "./PanelShell";
import { cityShare, monthly, rolling3, totalSignups } from "./data";

/* donut geometry */
const R = 42;
const C = 2 * Math.PI * R;
const SLICE_COLOURS = ["#f2b33d", "#b98520", "#6ea8c7", "#9fc4a0", "rgba(255,255,255,0.16)"];

/* sparkline geometry */
const SPARK_W = 108;
const SPARK_H = 30;
const sparkPoints = monthly
  .map((row, index) => {
    const x = (index / (monthly.length - 1)) * SPARK_W;
    const y = SPARK_H - (row.signups / 50) * SPARK_H;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  })
  .join(" ");

const peak = monthly.reduce((best, row) => (row.signups > best.signups ? row : best), monthly[0]);
const average = totalSignups / monthly.length;

function Kpi({
  label,
  value,
  unit,
  children,
}: {
  label: string;
  value: string;
  unit?: string;
  children?: ReactNode;
}) {
  return (
    <div className="bg-surface p-4">
      <p className="label">{label}</p>
      <p className="mt-2.5 flex items-baseline gap-1.5 font-display text-[1.7rem] font-bold tracking-[-0.02em]">
        {value}
        {unit ? <span className="font-mono text-[11px] tracking-normal text-faint">{unit}</span> : null}
      </p>
      {children ? <div className="mt-2">{children}</div> : null}
    </div>
  );
}

/** A report page, drawn in CSS. Same numbers as the chart and the query. */
export function DashboardPanel() {
  let offset = 0;

  return (
    <PanelShell
      title="Built for the person who will not open a notebook"
      blurb="A dashboard is a different job from a chart: filters at the top, the headline numbers where the eye lands first, and detail underneath for whoever wants it. This is the layout I build towards in Power BI."
      tag="layout demonstration · sample figures, not client data"
      aside={
        <div>
          <p className="label">reading order</p>
          <ol className="mt-3 space-y-2.5 text-[13.5px] leading-relaxed text-mute">
            <li>Filters, so nobody argues about what is included.</li>
            <li>Three numbers that answer “how are we doing”.</li>
            <li>Then the breakdown, for the follow-up question.</li>
          </ol>
        </div>
      }
    >
      <div className="inset overflow-hidden">
        {/* report chrome */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
          <span className="font-mono text-[11px] tracking-[0.04em] text-mute">
            signup_overview
            <span className="text-faint"> / page 1</span>
          </span>
          <span className="label">sample report</span>
        </div>

        {/* slicers */}
        <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3">
          <span className="label mr-1">filters</span>
          <span className="chip">Jan – Sep</span>
          <span className="chip">All regions</span>
          <span className="chip chip--amber">Test accounts excluded</span>
        </div>

        {/* kpi row */}
        <div className="grid gap-px bg-line sm:grid-cols-3">
          <Kpi label="total signups" value={totalSignups.toLocaleString("en-IN")}>
            <svg
              viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
              className="h-[30px] w-full"
              aria-hidden="true"
            >
              <polyline
                points={sparkPoints}
                fill="none"
                stroke="#f2b33d"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.85}
              />
            </svg>
          </Kpi>
          <Kpi label="monthly average" value={average.toFixed(1)} unit="/ month">
            <p className="font-mono text-[10.5px] text-faint">
              latest 3-mo avg {rolling3[rolling3.length - 1].value.toFixed(1)}
            </p>
          </Kpi>
          <Kpi label="strongest month" value={peak.month} unit={`${peak.signups} signups`}>
            <p className="font-mono text-[10.5px] text-faint">of {monthly.length} months</p>
          </Kpi>
        </div>

        {/* breakdown row */}
        <div className="grid gap-px border-t border-line bg-line lg:grid-cols-[1.25fr_1fr]">
          <div className="bg-surface p-4">
            <p className="label">share by city</p>
            <ul className="mt-4 space-y-3.5">
              {cityShare.map((row) => (
                <li key={row.city}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[13px] text-mute">{row.city}</span>
                    <span className="font-mono text-[11px] text-bone">{row.share}%</span>
                  </div>
                  <div className="meter mt-1.5 h-1.5">
                    <span
                      className="meter-fill"
                      style={{ "--val": `${row.share}%` } as CSSProperties}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 bg-surface p-4">
            <p className="label self-start">composition</p>
            <svg viewBox="0 0 120 120" className="h-[128px] w-[128px]" aria-hidden="true">
              <g transform="rotate(-90 60 60)">
                {cityShare.map((row, index) => {
                  const length = (row.share / 100) * C;
                  const dash = `${length} ${C - length}`;
                  const element = (
                    <circle
                      key={row.city}
                      cx={60}
                      cy={60}
                      r={R}
                      fill="none"
                      stroke={SLICE_COLOURS[index]}
                      strokeWidth={13}
                      strokeDasharray={dash}
                      strokeDashoffset={-offset}
                    />
                  );
                  offset += length;
                  return element;
                })}
              </g>
              <text
                x={60}
                y={57}
                textAnchor="middle"
                className="font-mono"
                fontSize={15}
                fill="#edeae3"
              >
                {totalSignups}
              </text>
              <text
                x={60}
                y={71}
                textAnchor="middle"
                className="font-mono"
                fontSize={8}
                fill="#767c86"
                letterSpacing="1.4"
              >
                TOTAL
              </text>
            </svg>
            <ul className="grid w-full grid-cols-2 gap-x-3 gap-y-1.5">
              {cityShare.map((row, index) => (
                <li
                  key={row.city}
                  className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.08em] text-faint"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-[1px]"
                    style={{ background: SLICE_COLOURS[index] }}
                    aria-hidden="true"
                  />
                  <span className="truncate">{row.city}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
