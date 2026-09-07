import type { CSSProperties } from "react";
import { PanelShell } from "./PanelShell";
import { monthly, rolling3 } from "./data";

const W = 680;
const H = 300;
const PAD = { top: 20, right: 16, bottom: 34, left: 44 };
const MAX = 50;
const TICKS = [0, 10, 20, 30, 40, 50];

const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;
const band = plotW / monthly.length;
const baseline = PAD.top + plotH;

const cx = (index: number) => PAD.left + band * index + band / 2;
const cy = (value: number) => PAD.top + (1 - value / MAX) * plotH;

const linePoints = rolling3.map((row, index) => `${cx(index)},${cy(row.value)}`).join(" ");

/** One chart, one idea: the trend under the noise. */
export function ChartPanel() {
  return (
    <PanelShell
      title="A chart should answer one question"
      blurb="Monthly counts bounce around; the line is the same series smoothed over three months. Bars for the raw value, a line for the trend, labelled axes, and nothing drawn that is not information."
      tag="sample data · rendered as inline SVG"
      aside={
        <div>
          <p className="label">choices made here</p>
          <ul className="mt-3 space-y-2.5 text-[13.5px] leading-relaxed text-mute">
            <li>Axis starts at zero, so bar heights stay proportional to the values.</li>
            <li>Two encodings, two meanings — never the same number twice.</li>
            <li>Gridlines light enough to read against, not through.</li>
          </ul>
        </div>
      }
    >
      <figure className="inset p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <span className="label">signups_by_month</span>
          <span className="flex items-center gap-5">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
              <span className="h-2.5 w-2.5 rounded-[1px] bg-amber/75" aria-hidden="true" />
              monthly
            </span>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
              <span className="h-px w-4 bg-steel" aria-hidden="true" />
              3-mo average
            </span>
          </span>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label="Bar chart of monthly signups from January to September, rising overall from 18 to 47, with a three-month rolling average drawn over it. Sample data."
        >
          {/* gridlines + y axis */}
          {TICKS.map((tick) => (
            <g key={tick}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={cy(tick)}
                y2={cy(tick)}
                stroke={tick === 0 ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.055)"}
                strokeWidth={1}
              />
              <text
                x={PAD.left - 10}
                y={cy(tick)}
                dy="0.32em"
                textAnchor="end"
                className="font-mono"
                fontSize={10}
                fill="#767c86"
              >
                {tick}
              </text>
            </g>
          ))}

          {/* bars */}
          {monthly.map((row, index) => (
            <g key={row.month} className="group">
              <rect
                x={cx(index) - 13}
                y={cy(row.signups)}
                width={26}
                height={baseline - cy(row.signups)}
                rx={2}
                fill="#f2b33d"
                opacity={0.7}
                className="transition-opacity duration-300 group-hover:opacity-100"
              >
                <title>{`${row.month}: ${row.signups} signups`}</title>
              </rect>
              <text
                x={cx(index)}
                y={H - 12}
                textAnchor="middle"
                className="font-mono"
                fontSize={10}
                fill="#767c86"
              >
                {row.month}
              </text>
            </g>
          ))}

          {/* rolling average */}
          <polyline
            points={linePoints}
            fill="none"
            stroke="#6ea8c7"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="anim-draw"
            style={{ "--len": 900 } as CSSProperties}
          />
          {rolling3.map((row, index) => (
            <circle
              key={row.month}
              cx={cx(index)}
              cy={cy(row.value)}
              r={3}
              fill="#050608"
              stroke="#6ea8c7"
              strokeWidth={1.4}
            />
          ))}
        </svg>

        {/* the same numbers, for anyone who cannot see the chart */}
        <table className="sr-only">
          <caption>Sample monthly signups and three-month rolling average</caption>
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">Signups</th>
              <th scope="col">Rolling average</th>
            </tr>
          </thead>
          <tbody>
            {monthly.map((row, index) => (
              <tr key={row.month}>
                <th scope="row">{row.month}</th>
                <td>{row.signups}</td>
                <td>{rolling3[index].value.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <figcaption className="mt-4 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
          y: signups · x: month · sample data
        </figcaption>
      </figure>
    </PanelShell>
  );
}
