import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { about } from "@/lib/content";

/**
 * Narrative first, résumé second. The prose says how he works; the snapshot
 * panel beside it answers the factual questions a recruiter checks anyway —
 * including the CGPA, stated plainly rather than buried.
 */
export function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHeader id="about" title="About" meta="Final year · B.Tech AI & DS" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_minmax(320px,388px)] lg:gap-20">
          {/* ── narrative ───────────────────────────────────────────────── */}
          <Reveal>
            <div className="border-l border-line-strong pl-6 sm:pl-8">
              <p className="display max-w-[26ch] text-[clamp(1.5rem,3.4vw,2.35rem)]">
                {about.lede}
              </p>

              <div className="mt-8 max-w-[62ch] space-y-6 text-[16.5px] leading-[1.72] text-mute">
                {about.paragraphs.map((paragraph, index) => (
                  <p key={index} className={index === 0 ? "text-bone/90" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── profile snapshot ────────────────────────────────────────── */}
          <Reveal delay={1}>
            <div className="panel p-5 sm:p-6 lg:sticky lg:top-[calc(var(--nav-h)+28px)]">
              <div className="flex items-center justify-between gap-4 pb-4">
                <span className="label">profile.snapshot</span>
                <span className="label">{about.snapshot.length} fields</span>
              </div>

              <dl>
                {about.snapshot.map((row) => (
                  <div key={row.key} className="kv">
                    <dt className="key">{row.key}</dt>
                    <dd className="text-[13.5px] leading-relaxed text-bone">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
