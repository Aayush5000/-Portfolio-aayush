import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { OutLink } from "@/components/ui/OutLink";
import { certCount, certifications } from "@/lib/content";

/**
 * Grouped by issuer. Every entry carries a verification button wired to
 * `credentialUrl` in lib/content.ts — empty for now, so each renders as a
 * visibly pending chip rather than a fabricated credential link.
 */
export function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="shell">
        <SectionHeader
          id="certifications"
          title="Certifications"
          meta={`${certCount} certificates · 3 issuers`}
          lede="Cloud and AI fundamentals from Oracle and AWS, plus design thinking from NPTEL. The verification buttons are already wired up — they are waiting on the credential links, because a made-up verification URL would be worse than none."
        />

        <Reveal className="mt-12 lg:mt-16">
          <div className="grid gap-px overflow-hidden rounded-[6px] border border-line bg-line lg:grid-cols-3">
            {certifications.map((group) => (
              <div key={group.issuer} className="flex flex-col bg-surface p-6 sm:p-7">
                <div className="flex items-baseline justify-between gap-4 border-b border-line pb-5">
                  <h3 className="font-display text-[1.3rem] font-bold tracking-[-0.015em] text-bone">
                    {group.issuer}
                  </h3>
                  <span className="font-mono text-[10.5px] tabular-nums text-faint">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>

                <ul className="mt-5 flex-1 space-y-5">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <p className="text-[14.5px] leading-snug text-bone">{item.name}</p>
                      <div className="mt-2.5">
                        <OutLink
                          url={item.credentialUrl}
                          label="Verify"
                          variant="chip"
                          pending="credential link pending"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
