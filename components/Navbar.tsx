"use client";

import { useEffect, useRef, useState } from "react";
import { CommandPalette } from "@/components/CommandPalette";
import { Icon } from "@/components/ui/Icon";
import { contact, socials } from "@/lib/config";
import { navItems, sectionIndex, sections } from "@/lib/content";
import { OutLink } from "@/components/ui/OutLink";
import { useActiveSection, useScrolled } from "@/lib/hooks";

const sectionIds = sections.map((section) => section.id);

export function Navbar() {
  const scrolled = useScrolled(14);
  const activeId = useActiveSection(sectionIds);
  const active = sections.find((section) => section.id === activeId);
  const activeNav = active?.parent ?? activeId;

  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [modifier, setModifier] = useState("");
  const paletteTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
    setModifier(mac ? "⌘" : "Ctrl");
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenuOpen(false);
        setPaletteOpen((open) => !open);
      }
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <>
      <header className="navbar" data-scrolled={scrolled}>
        <nav className="shell flex items-center justify-between gap-6" aria-label="Primary">
          <a
            href="#home"
            className="group flex items-center gap-3"
            onClick={() => setMenuOpen(false)}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-line-strong font-mono text-[11px] tracking-tight text-bone transition-colors duration-300 group-hover:border-amber group-hover:text-amber">
              AM
            </span>
            <span className="hidden sm:block">
              <span className="block font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-bone">
                Aayush Mishra
              </span>
              <span className="block font-mono text-[9.5px] uppercase tracking-[0.2em] text-faint">
                Data · analysis · AI
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="nav-link"
                  data-active={activeNav === item.id}
                  aria-current={activeNav === item.id ? "true" : undefined}
                >
                  {item.nav}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              ref={paletteTrigger}
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden h-9 items-center gap-2.5 rounded-[4px] border border-line px-3 font-mono text-[11px] text-faint transition-colors duration-300 hover:border-line-strong hover:text-bone md:inline-flex"
              aria-label="Open command menu"
            >
              <Icon name="search" className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Jump to…</span>
              <span className="kbd">{modifier}K</span>
            </button>

            <a
              href="#contact"
              className="btn btn--sm hidden sm:inline-flex"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="btn btn--icon h-9 w-9 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <Icon name={menuOpen ? "close" : "menu"} className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile navigation: a designed panel, not a shrunken desktop bar. */}
      {menuOpen ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="anim-fade fixed inset-0 z-40 flex flex-col bg-ink/97 pt-[var(--nav-h)] backdrop-blur-xl lg:hidden"
        >
          <div className="shell flex-1 overflow-y-auto py-6">
            <ul className="stagger is-in">
              {sections.map((section) => (
                <li key={section.id} className="border-t border-line first:border-t-0">
                  <a
                    href={`#${section.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline justify-between gap-4 py-4"
                  >
                    <span
                      className={`font-display text-[1.6rem] font-extrabold tracking-[-0.02em] ${
                        activeId === section.id ? "text-amber" : "text-bone"
                      }`}
                    >
                      {section.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                      {sectionIndex(section.id)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <a className="btn btn--sm btn--primary" href={`mailto:${contact.email}`}>
                <Icon name="mail" className="h-3.5 w-3.5" />
                <span>Email me</span>
              </a>
              {socials.map((social) => (
                <OutLink
                  key={social.id}
                  url={social.url}
                  label={social.label}
                  icon={social.id}
                  variant="btn-sm"
                  pending="link not added yet"
                />
              ))}
            </div>

            <p className="mt-6 font-mono text-[11px] leading-relaxed text-faint">
              {contact.location}
              <br />
              {contact.phone}
            </p>
          </div>
        </div>
      ) : null}

      <CommandPalette
        open={paletteOpen}
        onClose={() => {
          setPaletteOpen(false);
          paletteTrigger.current?.focus();
        }}
      />
    </>
  );
}
