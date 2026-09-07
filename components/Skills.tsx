"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  analyticalConcepts,
  skillGroups,
  softSkills,
  type Skill,
  type SkillGroup,
} from "@/lib/content";

/**
 * One group of technologies with its own inspector. Hovering or focusing an item
 * writes its note into the readout at the foot of the card — the detail is real
 * information about how the tool is actually used, not a self-scored percentage.
 */
function GroupCard({ group }: { group: SkillGroup }) {
  const [active, setActive] = useState<Skill | null>(null);
  const readoutId = `skill-readout-${group.id}`;

  return (
    <div className="panel flex flex-col p-6 sm:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[1.15rem] font-semibold tracking-[-0.01em] text-bone">
          {group.title}
        </h3>
        <span className="font-mono text-[10.5px] tabular-nums text-faint">
          {String(group.items.length).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-mute">{group.caption}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {group.items.map((item) => (
          <li key={item.name}>
            <button
              type="button"
              className="chip chip--interactive"
              data-active={active?.name === item.name}
              onMouseEnter={() => setActive(item)}
              onFocus={() => setActive(item)}
              onClick={() => setActive(item)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>

      <div
        id={readoutId}
        aria-live="polite"
        className="mt-auto min-h-[96px] border-t border-line pt-4"
      >
        {active ? (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-amber">
              {active.name}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-bone/90">{active.note}</p>
          </>
        ) : (
          <p className="text-[12.5px] leading-relaxed text-faint">
            Hover or focus a technology to see how I use it.
          </p>
        )}
      </div>
    </div>
  );
}

function Cluster({ title, note, items }: { title: string; note: string; items: readonly string[] }) {
  return (
    <div className="bg-surface p-6 sm:p-7">
      <h3 className="font-display text-[1.05rem] font-semibold tracking-[-0.01em] text-bone">
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-mute">{note}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li key={item} className="chip">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="shell">
        <SectionHeader
          id="skills"
          title="Skills"
          meta="no self-scored percentages"
          lede="Six groups, in the order the work usually happens. There are no progress bars here on purpose — “Python 95%” is a number nobody can verify or even define. What each item carries instead is a plain sentence about what I have actually done with it."
        />

        <Reveal className="mt-12 lg:mt-16">
          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {skillGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={1} className="mt-6 lg:mt-8">
          <div className="grid gap-px overflow-hidden rounded-[6px] border border-line bg-line md:grid-cols-2">
            <Cluster
              title="How I work through a problem"
              note="Coursework and internship habits that show up in every project."
              items={analyticalConcepts}
            />
            <Cluster
              title="How I work with people"
              note="Team projects, code reviews and a hackathon deadline taught these."
              items={softSkills}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
