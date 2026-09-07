"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { contact, isLive, socials } from "@/lib/config";
import { sections } from "@/lib/content";
import { useCopy } from "@/lib/hooks";

type PaletteItem = {
  id: string;
  label: string;
  hint: string;
  icon: IconName;
  keywords?: string;
  /** Return true to keep the palette open (used by the copy actions). */
  run: () => boolean | void;
};

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

/**
 * Keyboard navigation for the whole page (⌘K / Ctrl+K). Every section is
 * reachable without scrolling, plus the two actions a recruiter actually wants:
 * copy the email address, copy the phone number.
 */
export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { copy } = useCopy();

  const items = useMemo<PaletteItem[]>(() => {
    const jumps: PaletteItem[] = sections.map((section) => ({
      id: `jump-${section.id}`,
      label: section.label,
      hint: "Jump to section",
      icon: "arrow-down",
      keywords: section.id,
      run: () => scrollToSection(section.id),
    }));

    const actions: PaletteItem[] = [
      {
        id: "copy-email",
        label: "Copy email address",
        hint: contact.email,
        icon: "copy",
        keywords: "mail contact reach",
        run: () => {
          void copy(contact.email, "email");
          setFlash("Email address copied");
          return true;
        },
      },
      {
        id: "copy-phone",
        label: "Copy phone number",
        hint: contact.phone,
        icon: "copy",
        keywords: "call mobile",
        run: () => {
          void copy(contact.phone, "phone");
          setFlash("Phone number copied");
          return true;
        },
      },
      {
        id: "write-email",
        label: "Write an email",
        hint: "Opens your mail app",
        icon: "mail",
        keywords: "contact hire",
        run: () => {
          window.location.href = `mailto:${contact.email}`;
        },
      },
    ];

    const external: PaletteItem[] = socials
      .filter((social) => isLive(social.url))
      .map((social) => ({
        id: `link-${social.id}`,
        label: `Open ${social.label}`,
        hint: "External link",
        icon: social.id,
        run: () => {
          window.open(social.url, "_blank", "noopener,noreferrer");
        },
      }));

    return [...jumps, ...actions, ...external];
  }, [copy]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      `${item.label} ${item.hint} ${item.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  const close = useCallback(() => {
    setQuery("");
    setFlash(null);
    onClose();
  }, [onClose]);

  const select = useCallback(
    (item: PaletteItem | undefined) => {
      if (!item) return;
      const keepOpen = item.run();
      if (!keepOpen) close();
    },
    [close],
  );

  /* Reset position when the result set changes. */
  useEffect(() => {
    setActive(0);
  }, [query, open]);

  /* Focus the input and lock the page behind the dialog. */
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
    };
  }, [open]);

  /* Keep the highlighted row visible. */
  useEffect(() => {
    const row = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    row?.scrollIntoView({ block: "nearest" });
  }, [active]);

  useEffect(() => {
    if (!flash) return;
    const timer = window.setTimeout(() => setFlash(null), 2200);
    return () => window.clearTimeout(timer);
  }, [flash]);

  if (!open) return null;

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setActive(Math.max(results.length - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      select(results[active]);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]">
      <button
        type="button"
        aria-label="Close command menu"
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/80 backdrop-blur-[3px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onKeyDown={onKeyDown}
        className="anim-pop panel relative w-full max-w-[560px] overflow-hidden shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Icon name="search" className="h-4 w-4 shrink-0 text-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Jump to a section, copy contact details…"
            aria-label="Search sections and actions"
            aria-controls="palette-list"
            aria-activedescendant={results.length ? `palette-opt-${active}` : undefined}
            autoComplete="off"
            spellCheck={false}
            className="h-14 w-full bg-transparent font-mono text-[13px] text-bone outline-none placeholder:text-faint"
          />
          <kbd className="kbd shrink-0">esc</kbd>
        </div>

        <ul
          id="palette-list"
          ref={listRef}
          role="listbox"
          aria-label="Results"
          className="max-h-[46vh] overflow-y-auto p-2"
        >
          {results.map((item, index) => (
            <li
              key={item.id}
              id={`palette-opt-${index}`}
              role="option"
              aria-selected={index === active}
              data-index={index}
              data-active={index === active}
              className="palette-row"
              onMouseEnter={() => setActive(index)}
              onClick={() => select(item)}
            >
              <Icon name={item.icon} className="h-4 w-4 shrink-0 opacity-70" />
              <span className="flex-1 truncate">{item.label}</span>
              <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
                {item.hint}
              </span>
            </li>
          ))}

          {results.length === 0 ? (
            <li className="px-4 py-6 text-center font-mono text-[12px] text-faint">
              Nothing matches “{query}”. Try “projects”, “SQL” or “email”.
            </li>
          ) : null}
        </ul>

        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            {flash ?? `${results.length} result${results.length === 1 ? "" : "s"}`}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-faint">
            <kbd className="kbd">↑</kbd>
            <kbd className="kbd">↓</kbd>
            to move
            <kbd className="kbd ml-1.5">↵</kbd>
            to select
          </span>
        </div>
      </div>
    </div>
  );
}
