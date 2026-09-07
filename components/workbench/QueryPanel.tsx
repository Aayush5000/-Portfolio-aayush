import { CodeBlock } from "@/components/ui/CodeBlock";
import { PanelShell } from "./PanelShell";
import { monthly, rolling3, sqlCode } from "./data";

/** The query, then the shape of what it returns. */
export function QueryPanel() {
  const preview = monthly.slice(0, 5);

  return (
    <PanelShell
      title="One query instead of three"
      blurb="A window function keeps the rolling average in the same pass as the count, so there is no self-join and no second query to keep in sync. Readable SQL is a maintenance decision, not a style one."
      tag="sample schema · illustrative result"
      aside={
        <div>
          <p className="label">why this shape</p>
          <ul className="mt-3 space-y-2.5 text-[13.5px] leading-relaxed text-mute">
            <li>A CTE names the intermediate step, so the outer query reads like a sentence.</li>
            <li>
              <code className="font-mono text-[12.5px] text-bone">ROWS BETWEEN</code> states the
              window explicitly rather than leaving the default to be guessed.
            </li>
            <li>Filtering test accounts before aggregating, not after.</li>
          </ul>
        </div>
      }
    >
      <div className="space-y-6">
        <CodeBlock code={sqlCode} lang="sql" filename="monthly_signups.sql" />

        <div className="inset overflow-x-auto p-4">
          <table className="dtable">
            <caption>result · first 5 of {monthly.length} rows</caption>
            <thead>
              <tr>
                <th scope="col">month</th>
                <th scope="col" className="num">
                  signups
                </th>
                <th scope="col" className="num">
                  rolling_3mo
                </th>
              </tr>
            </thead>
            <tbody>
              {preview.map((row, index) => (
                <tr key={row.month}>
                  <td>2026-{String(index + 1).padStart(2, "0")}</td>
                  <td className="num">{row.signups}</td>
                  <td className="num text-bone">{rolling3[index].value.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PanelShell>
  );
}
