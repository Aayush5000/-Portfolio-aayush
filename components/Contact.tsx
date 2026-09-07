"use client";

import { useState, type FormEvent } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { OutLink } from "@/components/ui/OutLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contact, socials } from "@/lib/config";
import { contactCopy } from "@/lib/content";
import { useCopy } from "@/lib/hooks";

type Channel = { id: string; icon: IconName; label: string; value: string; href: string };

const channels: Channel[] = [
  {
    id: "email",
    icon: "mail",
    label: "email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    id: "phone",
    icon: "phone",
    label: "phone",
    value: contact.phone,
    href: contact.phoneHref,
  },
];

/**
 * Real email and phone, copyable in one click. The form has no backend on
 * purpose — it composes a draft in the visitor's own mail client, so a message
 * can never be silently swallowed by a form endpoint that does not exist.
 */
export function Contact() {
  const { copied, copy } = useCopy();
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [handedOff, setHandedOff] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = name ? `Portfolio enquiry — ${name}` : "Portfolio enquiry";
    const body = `${message}\n\n—\n${name}\n${from}`;
    const href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setHandedOff(true);
  };

  return (
    <section id="contact" className="section">
      <div className="shell">
        <SectionHeader id="contact" title="Contact" meta={contact.availability} />

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <div className="relative">
              <div
                className="glow-amber left-[-14%] top-[-30%] h-[340px] w-[340px] opacity-80"
                aria-hidden="true"
              />
              <div className="relative">
                <p className="display text-[clamp(1.9rem,4.4vw,3rem)]">
                  <span className="block">{contactCopy.headline[0]}</span>
                  <span className="block text-mute">{contactCopy.headline[1]}</span>
                </p>
                <p className="mt-7 max-w-[46ch] text-[15.5px] leading-relaxed text-mute">
                  {contactCopy.body}
                </p>

                <ul className="mt-10">
                  {channels.map((channel) => (
                    <li
                      key={channel.id}
                      className="flex items-center justify-between gap-5 border-t border-line py-4 last:border-b"
                    >
                      <a href={channel.href} className="group flex min-w-0 items-center gap-4">
                        <Icon
                          name={channel.icon}
                          className="h-[17px] w-[17px] shrink-0 text-faint transition-colors group-hover:text-amber"
                        />
                        <span className="min-w-0">
                          <span className="label block">{channel.label}</span>
                          <span className="link-underline mt-1 block truncate text-[15px] text-bone">
                            {channel.value}
                          </span>
                        </span>
                      </a>
                      <button
                        type="button"
                        className="btn btn--sm shrink-0"
                        onClick={() => copy(channel.value, channel.id)}
                      >
                        <Icon
                          name={copied === channel.id ? "check" : "copy"}
                          className="h-3.5 w-3.5"
                        />
                        <span>{copied === channel.id ? "Copied" : "Copy"}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <p className="label">profiles</p>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {socials.map((social) => (
                      <OutLink
                        key={social.id}
                        url={social.url}
                        label={social.label}
                        icon={social.id}
                        variant="chip"
                        pending={social.note}
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-8 flex items-center gap-3 text-[13.5px] text-faint">
                  <Icon name="pin" className="h-4 w-4 shrink-0" />
                  {contact.location}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <form onSubmit={onSubmit} className="panel p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[1.15rem] font-semibold tracking-[-0.01em] text-bone">
                  Send a message
                </h3>
                <span className="label">no backend</span>
              </div>

              <div className="mt-7 space-y-5">
                <div>
                  <label htmlFor="contact-name" className="label">
                    your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Priya Sharma"
                    className="field mt-2.5"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="label">
                    your email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={from}
                    onChange={(event) => setFrom(event.target.value)}
                    placeholder="you@company.com"
                    className="field mt-2.5"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="label">
                    message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="A dataset, a role, a problem worth digging into…"
                    className="field mt-2.5"
                  />
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button type="submit" className="btn btn--primary">
                  <Icon name="mail" className="h-4 w-4" />
                  <span>Open email draft</span>
                </button>
                <a href={`mailto:${contact.email}`} className="btn btn--sm">
                  <span>Skip the form</span>
                </a>
              </div>

              <p className="mt-6 border-t border-line pt-5 text-[13px] leading-relaxed text-faint">
                {contactCopy.formNote}
              </p>

              <p aria-live="polite" className="mt-3 text-[13px] leading-relaxed text-sage">
                {handedOff
                  ? "Draft handed to your email client. If nothing opened, copy the address above instead."
                  : ""}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
