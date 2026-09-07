import { CodeBlock } from "@/components/ui/CodeBlock";
import { PanelShell } from "./PanelShell";
import {
  cleanRows,
  cleaningCode,
  cleaningColumns,
  cleaningDecisions,
  rawRows,
  type Cell,
} from "./data";

function DataTable({
  caption,
  rows,
  emptyAs = "—",
}: {
  caption: string;
  rows: Cell[][];
  emptyAs?: string;
}) {
  return (
    <table className="dtable">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {cleaningColumns.map((column, index) => (
            <th key={column || `col-${index}`} scope="col">
              {column || <span className="sr-only">row index</span>}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => {
              const tone = cell.tone ? ` ${cell.tone}` : "";
              if (cellIndex === 0) {
                return (
                  <td key={cellIndex} className="idx">
                    {cell.v}
                  </td>
                );
              }
              return (
                <td key={cellIndex} className={tone.trim()}>
                  {cell.v === "" ? <span className="text-faint">{emptyAs}</span> : cell.v}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Before / after, with the reasoning between them. */
export function CleaningPanel() {
  return (
    <PanelShell
      title="Cleaning is where the analysis is won"
      blurb="Most of the time on any real dataset goes here. The interesting part is not the code, it is that each fix is an assumption — so each one gets written down where a reviewer can argue with it."
      tag="sample data · illustrative rows"
    >
      <div className="space-y-6">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="inset overflow-x-auto p-4">
            <DataTable caption="raw.csv · 5 rows, 4 problems" rows={rawRows} />
          </div>
          <div className="inset overflow-x-auto p-4">
            <DataTable caption="cleaned · 4 rows, decisions logged" rows={cleanRows} emptyAs="NaN" />
          </div>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-[5px] bg-line sm:grid-cols-2">
          {cleaningDecisions.map((decision, index) => (
            <li
              key={decision.fix}
              className={`bg-surface p-4 ${
                index === cleaningDecisions.length - 1 ? "sm:col-span-2" : ""
              }`}
            >
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-amber">
                {decision.fix}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-mute">{decision.note}</p>
            </li>
          ))}
        </ol>

        <CodeBlock
          code={cleaningCode}
          lang="python"
          filename="clean.py"
          caption="pandas, written so the diff explains itself — one transformation per line, each with the reason beside it."
        />
      </div>
    </PanelShell>
  );
}
