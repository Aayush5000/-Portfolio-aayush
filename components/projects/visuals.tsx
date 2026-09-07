import { DemoTag } from "@/components/ui/DemoTag";

/* ════════════════════════════════════════════════════════════════════════════
   Project visuals. Every one of these is drawn with CSS and SVG — there are no
   screenshots on this site, and nothing here is presented as one. Each figure
   carries a caption saying exactly what it is.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── 01 · NUMX ─────────────────────────────────────────────────────────────
   A digit rasterised onto a coarse grid, then the shape of the model that
   reads it. The bitmap is hand-drawn below, one string per row. */

const DIGIT_7 = [
  "............",
  "..########..",
  "..#######...",
  ".......###..",
  "......###...",
  ".....###....",
  ".....###....",
  "....###.....",
  "....###.....",
  "...###......",
  "...###......",
  "............",
];

const STAGES = ["input", "conv", "pool", "dense", "softmax"];

export function NumxVisual() {
  return (
    <figure className="inset p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4 pb-4">
        <span className="label">forward_pass</span>
        <span className="label">python · tensorflow</span>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        {/* the pixel input */}
        <svg
          viewBox="0 0 12 12"
          className="h-[132px] w-[132px] shrink-0 sm:h-[148px] sm:w-[148px]"
          role="img"
          aria-label="A handwritten digit seven rasterised onto a 12 by 12 pixel grid."
        >
          {DIGIT_7.map((row, y) =>
            row.split("").map((pixel, x) => (
              <rect
                key={`${x}-${y}`}
                x={x + 0.1}
                y={y + 0.1}
                width={0.8}
                height={0.8}
                rx={0.12}
                fill={pixel === "#" ? "#f2b33d" : "rgba(255,255,255,0.05)"}
                opacity={pixel === "#" ? 0.92 : 1}
              />
            )),
          )}
        </svg>

        <div className="min-w-0 flex-1">
          {/* the layer chain */}
          <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
            {STAGES.map((stage, index) => (
              <li key={stage} className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
                  {stage}
                </span>
                {index < STAGES.length - 1 ? (
                  <span className="h-px w-5 bg-line-strong" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>

          {/* the class layer: ten outputs, one of them chosen */}
          <div className="mt-5 border-t border-line pt-4">
            <div className="flex items-end gap-[7px]" aria-hidden="true">
              {Array.from({ length: 10 }, (_, digit) => {
                const chosen = digit === 7;
                return (
                  <span key={digit} className="flex flex-1 flex-col items-center gap-2">
                    <span
                      className={`w-full rounded-[1px] ${
                        chosen ? "h-8 bg-amber" : "h-2 bg-white/10"
                      }`}
                    />
                    <span
                      className={`font-mono text-[9.5px] ${chosen ? "text-amber" : "text-faint"}`}
                    >
                      {digit}
                    </span>
                  </span>
                );
              })}
            </div>
            <p className="mt-4 font-mono text-[11px] text-mute">
              <span className="text-faint">argmax</span> → 7
            </p>
          </div>
        </div>
      </div>

      <figcaption className="mt-5 border-t border-line pt-3">
        <DemoTag>concept diagram · illustrates the model, not a screenshot</DemoTag>
      </figcaption>
    </figure>
  );
}

/* ── 02 · Flow Mate ────────────────────────────────────────────────────────
   An interface concept, drawn in CSS: audio-first module, progress, streak. */

const WAVE = [
  4, 9, 14, 8, 18, 24, 16, 11, 21, 28, 19, 13, 7, 15, 22, 26, 17, 10, 20, 14, 8, 12, 6, 9,
];
const PLAYED = 11;

export function FlowMateVisual() {
  return (
    <figure className="flex flex-col items-center">
      <div className="w-[248px] rounded-[30px] border border-line-strong bg-surface-2 p-2.5 shadow-[0_50px_90px_-45px_rgba(0,0,0,0.95)]">
        <div className="relative overflow-hidden rounded-[22px] border border-line bg-inset px-4 pb-4 pt-3">
          {/* status / notch line */}
          <div className="flex items-center justify-between pb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
              flow mate
            </span>
            <span className="h-1.5 w-10 rounded-full bg-white/12" aria-hidden="true" />
          </div>

          {/* now playing */}
          <p className="label">now playing</p>
          <p className="mt-2 font-display text-[15px] font-semibold leading-snug text-bone">
            Audio module
          </p>

          <div className="mt-4 flex h-8 items-end gap-[3px]" aria-hidden="true">
            {WAVE.map((height, index) => (
              <span
                key={index}
                className={`flex-1 rounded-[1px] ${
                  index < PLAYED ? "bg-amber/80" : "bg-white/12"
                }`}
                style={{ height: `${height}px` }}
              />
            ))}
          </div>

          <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <span className="block h-full w-[46%] rounded-full bg-amber" />
          </div>

          {/* controls */}
          <div className="mt-4 flex items-center justify-center gap-5" aria-hidden="true">
            <span className="h-3 w-[3px] rounded-[1px] bg-white/25" />
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber">
              <span className="ml-[3px] h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-[#0a0800]" />
            </span>
            <span className="h-3 w-[3px] rounded-[1px] bg-white/25" />
          </div>

          {/* streak, shown as days rather than a number */}
          <div className="mt-5 rounded-[4px] border border-line bg-white/[0.02] p-3">
            <div className="flex items-center justify-between">
              <span className="label">streak</span>
              <span className="label">this week</span>
            </div>
            <div className="mt-2.5 flex gap-1.5" aria-hidden="true">
              {Array.from({ length: 7 }, (_, day) => (
                <span
                  key={day}
                  className={`h-4 flex-1 rounded-[2px] ${
                    day < 5 ? "bg-amber/70" : "border border-line bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* bottom nav */}
          <div className="mt-4 flex items-center justify-around border-t border-line pt-3" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/18" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/18" />
          </div>
        </div>
      </div>

      <figcaption className="mt-5 text-center">
        <DemoTag>interface concept · drawn in CSS, not a screenshot</DemoTag>
      </figcaption>
    </figure>
  );
}

/* ── 03 · AI Resume Analyzer ───────────────────────────────────────────────
   The dashboard's output structure. Deliberately no score number: the point is
   what the tool reports, and inventing a figure would mean inventing a result. */

const CRITERIA = [
  { name: "Keyword coverage", state: "present" },
  { name: "Skills match", state: "partial" },
  { name: "Section structure", state: "present" },
  { name: "Formatting parse", state: "missing" },
] as const;

const MATCHED = ["Python", "SQL", "pandas", "Data visualization"];
const MISSING = ["Docker", "Airflow", "Kubernetes"];

const STATE_STYLE: Record<string, string> = {
  present: "border-amber/35 bg-amber/[0.08] text-amber",
  partial: "border-line-strong bg-white/[0.03] text-mute",
  missing: "border-line bg-transparent text-faint",
};

export function AnalyzerVisual() {
  return (
    <figure className="inset p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4 pb-4">
        <span className="label">sample_scan</span>
        <span className="label">keyword extraction</span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* extracted keywords */}
        <div>
          <p className="key">matched</p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {MATCHED.map((keyword) => (
              <li key={keyword} className="chip chip--amber">
                {keyword}
              </li>
            ))}
          </ul>

          <p className="key mt-5">not found</p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {MISSING.map((keyword) => (
              <li key={keyword} className="chip border-dashed text-faint">
                {keyword}
              </li>
            ))}
          </ul>
        </div>

        {/* criteria readout */}
        <div>
          <p className="key">evaluation</p>
          <ul className="mt-2.5">
            {CRITERIA.map((row) => (
              <li
                key={row.name}
                className="flex items-center justify-between gap-3 border-b border-line py-2.5 last:border-b-0"
              >
                <span className="text-[13px] text-mute">{row.name}</span>
                <span
                  className={`shrink-0 rounded-[2px] border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] ${
                    STATE_STYLE[row.state]
                  }`}
                >
                  {row.state}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <figcaption className="mt-5 border-t border-line pt-3">
        <DemoTag>illustrative sample output · no real résumé or score shown</DemoTag>
      </figcaption>
    </figure>
  );
}
