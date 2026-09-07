import { DemoTag } from "@/components/ui/DemoTag";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { achievement } from "@/lib/content";

/* 50 highlighted dots in a much larger field. Deliberately not to scale — the
   real entry count is not something Aayush published, so the caption says so. */
const FIELD = 336;
const RANKED = 50;

/** The single strongest credibility signal on the page, so it gets its own stage. */
export function Achievement() {
  return (
    <section id="achievement" className="section pt-0">
      <div className="shell">
        <SectionHeader
          id="achievement"
          title={achievement.event}
          meta={`${achievement.rank} · ${achievement.where}`}
        />

        <Reveal className="mt-11 lg:mt-14">
          <article className="panel relative overflow-hidden">
            <div
              className="glow-amber left-[-6%] top-[-18%] h-[380px] w-[380px] lg:h-[460px] lg:w-[460px]"
              aria-hidden="true"
            />

            <div className="relative grid lg:grid-cols-[1fr_minmax(0,0.82fr)]">
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="eyebrow">National-level competition</p>

                <p className="mt-6 flex items-end gap-4">
                  <span className="display text-[clamp(3.4rem,11vw,6.4rem)] leading-[0.82] text-amber">
                    {achievement.rank}
                  </span>
                  <span className="mb-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-faint">
                    among
                    <br />
                    thousands
                  </span>
                </p>

                <p className="mt-8 max-w-[46ch] text-[16px] leading-relaxed text-bone">
                  {achievement.claim}
                </p>
                <p className="mt-5 max-w-[52ch] text-[14.5px] leading-relaxed text-mute">
                  {achievement.context}
                </p>

                <ul className="mt-8 flex flex-wrap gap-1.5">
                  {["Team event", "Time-boxed build", "Judged rounds"].map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <figure className="flex flex-col justify-center border-t border-line bg-inset/60 p-7 sm:p-10 lg:border-l lg:border-t-0">
                <div
                  className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-[3px]"
                  aria-hidden="true"
                >
                  {Array.from({ length: FIELD }, (_, index) => (
                    <span
                      key={index}
                      className={`aspect-square rounded-[1px] ${
                        index < RANKED ? "bg-amber" : "bg-white/[0.07]"
                      }`}
                    />
                  ))}
                </div>

                <figcaption className="mt-6 border-t border-line pt-4">
                  <DemoTag>illustrative figure · not to scale</DemoTag>
                  <p className="mt-3 text-[13px] leading-relaxed text-mute">
                    Fifty dots highlighted, for a field that ran into the thousands. The exact
                    entry count was never published, so this is a diagram rather than a
                    measurement.
                  </p>
                </figcaption>
              </figure>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
