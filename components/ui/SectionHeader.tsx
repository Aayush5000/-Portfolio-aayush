import type { ReactNode } from "react";
import { sectionIndex } from "@/lib/content";

type SectionHeaderProps = {
  /** Section id — also produces the s/NN index so numbering can never drift. */
  id: string;
  title: string;
  /** Right-hand fact printed on the rule. Keep it factual and short. */
  meta?: string;
  lede?: ReactNode;
  className?: string;
};

/**
 * Every section opens the same way: a hairline carrying the section index and
 * one true fact, then the title. The rule is a data row, not an ornament.
 */
export function SectionHeader({ id, title, meta, lede, className = "" }: SectionHeaderProps) {
  return (
    <header className={className}>
      <div className="sec-rule">
        <span className="sec-index">{sectionIndex(id)}</span>
        <span className="sec-rule-line" aria-hidden="true" />
        {meta ? <span className="sec-meta">{meta}</span> : null}
      </div>
      <h2 className="sec-title">{title}</h2>
      {lede ? <p className="sec-lede">{lede}</p> : null}
    </header>
  );
}
