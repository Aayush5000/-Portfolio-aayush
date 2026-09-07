import type { CSSProperties } from "react";
import { ActivationMatrix } from "@/components/ActivationMatrix";
import { Icon } from "@/components/ui/Icon";
import { OutLink } from "@/components/ui/OutLink";
import { contact, socials } from "@/lib/config";
import { hero } from "@/lib/content";

/** Load-sequence step → CSS custom property consumed by `.rise`. */
const step = (n: number) => ({ "--d": n }) as CSSProperties;

/**
 * The 30-second section. Identity, positioning, four verifiable facts, two
 * ways to act — and the intensity grid doing the talking on the right.
 */
export function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh flex-col justify-center overflow-hidden">
      <div className="grid-field" aria-hidden="true" />
      <div
        className="glow-amber right-[-8%] top-[4%] h-[420px] w-[420px] opacity-70 lg:h-[560px] lg:w-[560px]"
        aria-hidden="true"
      />

      <div className="shell relative w-full pb-14 pt-[calc(var(--nav-h)+52px)] lg:pb-20 lg:pt-[calc(var(--nav-h)+64px)]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* ── identity ───────────────────────────────────────────────── */}
          <div>
            <p className="rise eyebrow" style={step(0)}>
              {hero.eyebrow}
            </p>

            <h1 className="rise display mt-5 text-[clamp(2.7rem,10.5vw,6.6rem)] uppercase" style={step(1)}>
              <span className="block">Aayush</span>
              <span className="type-outline block">Mishra</span>
            </h1>

            <p
              className="rise mt-7 max-w-[24ch] font-display text-[clamp(1.3rem,2.5vw,1.9rem)] font-medium leading-[1.15] tracking-[-0.02em] sm:max-w-[32ch]"
              style={step(2)}
            >
              {hero.headline[0]} <span className="text-mute">{hero.headline[1]}</span>
            </p>

            <p className="rise mt-6 max-w-[54ch] text-[15px] leading-relaxed text-mute" style={step(3)}>
              {hero.positioning}
            </p>

            <div className="rise mt-9 flex flex-wrap items-center gap-2.5" style={step(4)}>
              <a href="#projects" className="btn btn--primary">
                <span>View work</span>
                <Icon name="arrow-down" className="h-3.5 w-3.5" />
              </a>
              <a href="#contact" className="btn">
                <Icon name="mail" className="h-3.5 w-3.5" />
                <span>Contact me</span>
              </a>

              <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />

              {socials.map((social) => (
                <OutLink
                  key={social.id}
                  url={social.url}
                  label={social.label}
                  icon={social.id}
                  variant="icon"
                  pending="URL not added yet"
                />
              ))}
            </div>

            <p className="rise mt-6 flex items-center gap-2 font-mono text-[11px] text-faint" style={step(5)}>
              <Icon name="pin" className="h-3.5 w-3.5" />
              {contact.location}
            </p>
          </div>

          {/* ── signature visual ───────────────────────────────────────── */}
          <div className="rise mx-auto w-full max-w-[420px] lg:max-w-none" style={step(3)}>
            <div className="anim-drift">
              <ActivationMatrix />
            </div>
          </div>
        </div>

        {/* ── the four facts a recruiter needs first ──────────────────── */}
        <dl className="rise glance mt-14 lg:mt-16" style={step(6)}>
          {hero.glance.map((fact) => (
            <div key={fact.value}>
              <dt className="font-display text-[clamp(1.05rem,1.7vw,1.35rem)] font-bold tracking-[-0.01em] text-bone">
                {fact.value}
              </dt>
              <dd className="mt-1.5 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.12em] text-faint">
                {fact.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
