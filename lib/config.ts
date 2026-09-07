/**
 * ─────────────────────────────────────────────────────────────────────────────
 * EDIT THIS FILE FIRST.
 *
 * Everything a visitor can click lives here. Any `url` left as an empty string
 * ("") is treated as "not published yet": the UI renders a clearly disabled
 * chip instead of a broken link, so nothing on the site is ever a dead end.
 * Fill one in and it becomes a real button automatically — no other changes.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  /** Deployed URL. Replace after your first deploy — used for SEO + Open Graph. */
  url: "https://aayush5000.github.io/",
  title: "Aayush Mishra | AI & Data Science Portfolio",
  shortTitle: "Aayush Mishra",
  description:
    "Portfolio of Aayush Mishra, an Artificial Intelligence and Data Science student focused on machine learning, data science, and AI-powered applications.",
  /** 1200×630 image in /public. Regenerate or replace with your own. */
  ogImage: "/og.png",
  locale: "en_IN",
} as const;

export const contact = {
  email: "aayush.mishra@gmail.com",
  /** Human-readable phone number. */
  phone: "+91-7303707660",
  /** Same number, dial-able. Digits and a leading + only. */
  phoneHref: "tel:+917303707660",
  location: "Faridabad, Haryana, India",
  /** Shown in the contact section and the profile snapshot — edit freely. */
  availability: "Open to AI, Machine Learning, and Data Science roles",
} as const;

export type SocialId = "github" | "linkedin" | "leetcode";

export type Social = {
  id: SocialId;
  label: string;
  /** Paste your profile URL here. Leave "" until you have it. */
  url: string;
  /** Shown next to the disabled state so visitors know what is coming. */
  note: string;
};

export const socials: Social[] = [
  { id: "github", label: "GitHub", url: "https://github.com/Aayush5000", note: "" },
  { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/aayush-mishra-007xd/", note: "" },
  { id: "leetcode", label: "LeetCode", url: "https://leetcode.com/u/Aayush5000/", note: "" },
];

/** Convenience lookup: socialUrl("github") → "" or a real URL. */
export function socialUrl(id: SocialId): string {
  return socials.find((s) => s.id === id)?.url ?? "";
}

/** A link is only rendered as a link when it actually points somewhere. */
export function isLive(url: string | undefined): boolean {
  return typeof url === "string" && url.trim().length > 0;
}
