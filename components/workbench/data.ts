/* ════════════════════════════════════════════════════════════════════════════
   Sample data for the Analyst Workbench.

   IMPORTANT: everything in this file is invented for demonstration purposes.
   It is not project data, client data or a result Aayush is claiming. Every
   component that renders it carries a visible "sample data" caption.
   ═══════════════════════════════════════════════════════════════════════════ */

export type Cell = { v: string; tone?: "bad" | "good" };

export const cleaningColumns = ["", "city", "signup_date", "units"];

export const rawRows: Cell[][] = [
  [{ v: "0" }, { v: "Faridabad" }, { v: "2024-01-05" }, { v: "14" }],
  [{ v: "1" }, { v: "faridabad", tone: "bad" }, { v: "05/01/2024", tone: "bad" }, { v: "14" }],
  [{ v: "2" }, { v: "NOIDA", tone: "bad" }, { v: "2024-02-11" }, { v: "", tone: "bad" }],
  [{ v: "3" }, { v: "Greater Noida" }, { v: "2024-03-02" }, { v: "-3", tone: "bad" }],
  [{ v: "4" }, { v: "Noida" }, { v: "2024-03-08" }, { v: "22" }],
];

export const cleanRows: Cell[][] = [
  [{ v: "0" }, { v: "Faridabad" }, { v: "2024-01-05" }, { v: "14" }],
  [{ v: "1" }, { v: "Noida", tone: "good" }, { v: "2024-02-11" }, { v: "NaN", tone: "good" }],
  [{ v: "2" }, { v: "Greater Noida" }, { v: "2024-03-02" }, { v: "NaN", tone: "good" }],
  [{ v: "3" }, { v: "Noida" }, { v: "2024-03-08" }, { v: "22" }],
];

/** The point of the panel: a cleaning step is a decision someone can question. */
export const cleaningDecisions = [
  {
    fix: "Case and whitespace",
    note: "City names normalised to title case so “faridabad” and “Faridabad” stop being two cities.",
  },
  {
    fix: "Mixed date formats",
    note: "05/01/2024 parsed to 2024-01-05 — ambiguous formats get read once, explicitly, not guessed per row.",
  },
  {
    fix: "Duplicate row",
    note: "Row 1 became an exact duplicate of row 0 once the city and date were normalised, so it was dropped.",
  },
  {
    fix: "Impossible value",
    note: "−3 units cannot exist. It becomes missing rather than 0, because 0 is a measurement and this is not.",
  },
  {
    fix: "Missing stays missing",
    note: "Nothing is imputed silently here. NaN is carried forward so the analysis has to acknowledge it.",
  },
];

export const cleaningCode = `# every fix is a decision, so each one gets a line and a reason
def clean(df):
    df["city"] = df["city"].str.strip().str.title()          # "faridabad" -> "Faridabad"
    df["signup_date"] = pd.to_datetime(df["signup_date"], format="mixed")
    df["units"] = pd.to_numeric(df["units"], errors="coerce") # bad values -> NaN
    df.loc[df["units"] < 0, "units"] = pd.NA                  # negatives are impossible
    return df.drop_duplicates(subset=["city", "signup_date"])`;

/* ── the query ────────────────────────────────────────────────────────────── */

export const sqlCode = `-- monthly signups, with a 3-month rolling average
WITH monthly AS (
    SELECT
        DATE_TRUNC('month', signup_date) AS month,
        COUNT(*)                         AS signups
    FROM users
    WHERE status <> 'test'
    GROUP BY 1
)
SELECT
    month,
    signups,
    ROUND(AVG(signups) OVER (
        ORDER BY month
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ), 1) AS rolling_3mo
FROM monthly
ORDER BY month;`;

/* ── the chart and the dashboard read the same numbers ────────────────────── */

export const monthly = [
  { month: "Jan", signups: 18 },
  { month: "Feb", signups: 24 },
  { month: "Mar", signups: 21 },
  { month: "Apr", signups: 32 },
  { month: "May", signups: 29 },
  { month: "Jun", signups: 38 },
  { month: "Jul", signups: 41 },
  { month: "Aug", signups: 36 },
  { month: "Sep", signups: 47 },
];

/** Same window the SQL above describes: current row and the two before it. */
export const rolling3 = monthly.map((row, index) => {
  const frame = monthly.slice(Math.max(0, index - 2), index + 1);
  const mean = frame.reduce((total, item) => total + item.signups, 0) / frame.length;
  return { month: row.month, value: Math.round(mean * 10) / 10 };
});

export const totalSignups = monthly.reduce((total, row) => total + row.signups, 0);

export const cityShare = [
  { city: "Noida", share: 34 },
  { city: "Faridabad", share: 27 },
  { city: "Greater Noida", share: 19 },
  { city: "Gurugram", share: 12 },
  { city: "Other", share: 8 },
];

/* ── the ML workflow ──────────────────────────────────────────────────────── */

export const workflow = [
  { step: "Data", note: "Collect, inspect, understand what each column means." },
  { step: "Split", note: "Train / validation / test — before any transformation is fitted." },
  { step: "Preprocess", note: "Scale, encode, reshape. Fitted on train only." },
  { step: "Train", note: "Start with a baseline, then earn every extra layer." },
  { step: "Evaluate", note: "Held-out data, confusion matrix, per-class errors." },
];

export const workflowMetrics = ["accuracy", "precision", "recall", "F1", "confusion matrix"];
