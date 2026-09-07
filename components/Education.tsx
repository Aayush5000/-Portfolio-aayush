import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { education, type Education as EducationEntry } from "@/lib/content";

function ScoreMeter({ score }: { score: EducationEntry["score"] }) {
  const pct = (score.value / score.max) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="label">{score.label}</span>
        <span className="font-mono text-[13px] tabular-nums text-bone">{score.display}</span>
      </div>
      <div className="meter mt-2.5">
        <span className="meter-fill" style={{ "--val": `${pct}%` } as CSSProperties} />
      </div>
    </div>
  );
}

/**
 * The formal record, printed in full. The scores are shown exactly as they are —
 * a transcript with the numbers removed is worth less than an honest one.
 */
export function Education() {
  const featured = education.find((item) => item.featured);
  const rest = education.filter((item) => !item.featured);

  return (
    <section id="education" className="section pt-0">
      <div className="shell">
        <SectionHeader
          id="education"
          title="Education"
          meta="B.Tech AI & DS · 2023–2027"
          lede="Degree first, then the school record, with the numbers left in. I would rather a recruiter see the whole picture here than find a gap in it later."
        />

        {featured ? (
          <Reveal className="mt-12 lg:mt-16">
            <article className="panel p-6 sm:p-8 lg:p-10">
              <div className="grid gap-9 lg:grid-cols-[1fr_minmax(0,268px)] lg:gap-14">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber">
                    {featured.period}
                  </p>
                  <h3 className="display mt-5 text-[clamp(1.85rem,4vw,2.6rem)]">
                    {featured.qualification}
                    {featured.field ? (
                      <span className="mt-2 block text-[0.52em] font-semibold leading-snug tracking-[-0.01em] text-mute">
                        {featured.field}
                      </span>
                    ) : null}
                  </h3>
                  <p className="mt-6 text-[15px] text-bone">
                    {featured.institution}
                    {featured.place ? (
                      <span className="text-faint"> · {featured.place}</span>
                    ) : null}
                  </p>
                  {featured.note ? (
                    <p className="mt-4 max-w-[52ch] text-[14.5px] leading-relaxed text-mute">
                      {featured.note}
                    </p>
                  ) : null}
                </div>

                <div className="inset flex flex-col justify-between gap-7 p-5 sm:p-6">
                  <ScoreMeter score={featured.score} />
                  <dl className="mt-1">
                    <div className="kv">
                      <dt className="key">status</dt>
                      <dd className="text-[13px] text-bone">Final year</dd>
                    </div>
                    <div className="kv">
                      <dt className="key">graduating</dt>
                      <dd className="text-[13px] text-bone">June 2027</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </article>
          </Reveal>
        ) : null}

        <Reveal delay={1} className="mt-5 lg:mt-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            {rest.map((item) => (
              <article key={item.qualification} className="panel p-6 sm:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[1.2rem] font-semibold tracking-[-0.01em] text-bone">
                    {item.qualification}
                  </h3>
                  <span className="sec-meta">{item.period}</span>
                </div>
                <p className="mt-2.5 text-[14px] text-mute">{item.institution}</p>
                <div className="mt-7 border-t border-line pt-5">
                  <ScoreMeter score={item.score} />
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
