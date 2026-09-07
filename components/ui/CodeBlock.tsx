"use client";

import { Fragment, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { useCopy } from "@/lib/hooks";

type Lang = "sql" | "python";

const SPEC: Record<Lang, { comment: string; keywords: string[]; caseInsensitive: boolean }> = {
  sql: {
    comment: "--",
    caseInsensitive: true,
    keywords: [
      "with", "as", "select", "from", "where", "group", "by", "order", "over", "partition",
      "rows", "between", "preceding", "following", "current", "row", "and", "or", "not", "null",
      "case", "when", "then", "else", "end", "join", "left", "inner", "on", "limit", "desc",
      "asc", "is", "in", "distinct", "having",
    ],
  },
  python: {
    comment: "#",
    caseInsensitive: false,
    keywords: [
      "import", "from", "as", "def", "return", "for", "in", "if", "elif", "else", "not", "and",
      "or", "None", "True", "False", "lambda", "with", "class",
    ],
  },
};

/** Splits on words, quoted strings and numbers; everything else passes through
 *  untouched, which keeps indentation and punctuation exactly as written. */
const TOKEN = /([A-Za-z_][A-Za-z0-9_]*|'[^']*'|"[^"]*"|\d+(?:\.\d+)?)/g;

/** Splits a trailing comment off a line, ignoring markers inside strings. */
function splitComment(line: string, marker: string): [string, string | null] {
  let quote: string | null = null;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (quote) {
      if (char === quote) quote = null;
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }
    if (line.startsWith(marker, i)) return [line.slice(0, i), line.slice(i)];
  }

  return [line, null];
}

function renderLine(line: string, lang: Lang): ReactNode {
  const spec = SPEC[lang];
  const [source, comment] = splitComment(line, spec.comment);

  if (!source.trim() && comment) {
    return <span className="tk-com">{line}</span>;
  }

  const pieces = source.split(TOKEN);

  const tokens = pieces.map((piece, index) => {
    if (!piece) return null;

    const key = `${index}-${piece}`;
    const first = piece[0];

    if (first === "'" || first === '"') {
      return (
        <span key={key} className="tk-val">
          {piece}
        </span>
      );
    }

    if (first >= "0" && first <= "9") {
      return (
        <span key={key} className="tk-val">
          {piece}
        </span>
      );
    }

    const isWord = /^[A-Za-z_]/.test(piece);
    if (isWord) {
      const probe = spec.caseInsensitive ? piece.toLowerCase() : piece;
      if (spec.keywords.includes(probe)) {
        return (
          <span key={key} className="tk-kw">
            {piece}
          </span>
        );
      }
      if (pieces[index + 1]?.startsWith("(")) {
        return (
          <span key={key} className="tk-fn">
            {piece}
          </span>
        );
      }
    }

    return <Fragment key={key}>{piece}</Fragment>;
  });

  if (!comment) return tokens;

  return (
    <>
      {tokens}
      <span className="tk-com">{comment}</span>
    </>
  );
}

/**
 * A small syntax highlighter. Hand-rolled on purpose: the whole site ships with
 * no runtime dependencies, and two languages do not justify a 40 kB library.
 */
export function CodeBlock({
  code,
  lang,
  filename,
  caption,
}: {
  code: string;
  lang: Lang;
  filename?: string;
  caption?: string;
}) {
  const { copied, copy } = useCopy();
  const name = filename;
  const lines = code.replace(/\n+$/, "").split("\n");
  const isCopied = copied === name;

  return (
    <figure>
      {name ? (
        <div className="flex items-center justify-between gap-4 rounded-t-[5px] border border-b-0 border-line bg-white/[0.02] px-4 py-2.5">
          <span className="label">{name}</span>
          <button
            type="button"
            onClick={() => void copy(code, name)}
            aria-label={`Copy ${name} to clipboard`}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint transition-colors duration-300 hover:text-bone"
          >
            <Icon name={isCopied ? "check" : "copy"} className="h-3.5 w-3.5" />
            {isCopied ? "copied" : "copy"}
          </button>
        </div>
      ) : null}

      <pre className={`code ${name ? "rounded-t-none" : ""}`}>
        <code>
          {lines.map((line, index) => (
            <Fragment key={index}>
              {renderLine(line, lang)}
              {index < lines.length - 1 ? "\n" : null}
            </Fragment>
          ))}
        </code>
      </pre>

      {caption ? (
        <figcaption className="mt-3 text-[13.5px] leading-relaxed text-faint">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
