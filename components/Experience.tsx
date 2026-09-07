import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/lib/content";

function Note({ label, children }: { label: string; children: string }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[128px_1fr] sm:gap-6">
      <p className="label sm:pt-[3px]">{label}</p>
      <p className="text-[14.5px] leading-relaxed text-mute">{children}</p>
    </div>
  );
}

/**
 * Two guided virtual internships, described as exactly that. The `kind` line on
 * every entry keeps the framing honest — these were structured programmes, not
 * jobs, and the section says so before a recruiter has to ask.
 */
export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="shell">
        <SectionHeader
          id="experience"
          title="Experience"
          meta="2 virtual internships · 2025"
          lede="Both of these were guided virtual programmes rather than employment, and I would rather label them plainly than let a job title be inferred. What they gave me was structure: a real workflow to follow, deadlines, and other people reading my code."
        />

        <ol className="mt-12 space-y-6 lg:mt-16">
          {experience.map((item, index) => (
            <li key={item.role}>
              <Reveal delay={index}>
                <article className="panel panel--hover p-6 sm:p-8 lg:p-9">
                  <div className="grid gap-8 lg:grid-cols-[215px_1fr] lg:gap-12">
                    <div className="lg:border-r lg:border-line lg:pr-8">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber">
                        {item.period}
                      </p>
                      <p className="mt-3.5 text-[12.5px] leading-relaxed text-faint">{item.kind}</p>
                      {item.badge ? (
                        <p className="mt-6">
                          <span className="badge-o">
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-amber"
                              aria-hidden="true"
                            />
                            {item.badge}
                          </span>
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <h3 className="font-display text-[clamp(1.35rem,2.6vw,1.75rem)] font-semibold leading-[1.15] tracking-[-0.015em] text-bone">
                        {item.role}
                      </h3>
                      <p className="mt-2.5 text-[14.5px] text-mute">
                        <span className="text-bone">{item.org}</span>
                        <span className="text-faint"> — {item.support}</span>
                      </p>

                      <div className="mt-7 space-y-5 border-t border-line pt-6">
                        <Note label="what I did">{item.worked}</Note>
                        <Note label="what I took">{item.learned}</Note>
                      </div>

                      <p className="mt-6 border-l-2 border-l-amber/60 pl-5 text-[15px] leading-relaxed text-bone/90">
                        {item.outcome}
                      </p>

                      <ul
                        className="mt-6 flex flex-wrap gap-1.5"
                        aria-label={`Focus areas — ${item.role}`}
                      >
                        {item.stack.map((tag) => (
                          <li key={tag} className="chip">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
