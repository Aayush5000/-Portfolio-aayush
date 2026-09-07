"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** True when the visitor has asked their OS to reduce motion. Live-updating. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Fires once when an element scrolls into view. Used for every reveal on the page. */
export function useInView<T extends Element>(opts?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const { threshold = 0.12, rootMargin = "0px 0px -8% 0px", once = true } = opts ?? {};
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer (very old browsers, some test envs): show the content.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}

/**
 * Which section is currently being read. Scroll-position based rather than
 * observer based, so it stays correct at the very top and very bottom of the page.
 */
export function useActiveSection(ids: string[]): string {
  const idsKey = ids.join(",");
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const list = idsKey.split(",").filter(Boolean);
    if (list.length === 0) return;
    let frame = 0;

    const compute = () => {
      frame = 0;
      const line = window.scrollY + window.innerHeight * 0.34;
      let current = list[0];

      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= line) current = id;
      }

      // Bottom of the document always belongs to the last section.
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = list[list.length - 1];

      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [idsKey]);

  return active;
}

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 10): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/** Copy-to-clipboard with a confirmation state and a fallback for insecure contexts. */
export function useCopy(resetAfter = 1800) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback(async (text: string, key: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const field = document.createElement("textarea");
        field.value = text;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        document.body.removeChild(field);
      }
      setCopied(key);
    } catch {
      setCopied(null);
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(null), resetAfter);
    return () => window.clearTimeout(timer);
  }, [copied, resetAfter]);

  return { copied, copy };
}
