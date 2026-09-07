# Aayush Mishra — portfolio

A single-page portfolio built to position Aayush Mishra as a data analyst / data science / AI
professional. Next.js App Router, React, TypeScript and Tailwind CSS v4, with **no runtime
dependencies beyond React itself** — every animation, icon, chart, diagram and the syntax
highlighter are hand-written in this repo.

---

## 1. Run it

Requirements: **Node 18.18+** (Node 20 LTS recommended) and npm.

```bash
npm install     # first time only
npm run dev     # http://localhost:3000
```

| Script              | What it does                                            |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                      |
| `npm run typecheck` | `tsc --noEmit` — run this first if something looks off   |
| `npm run build`     | Production build                                        |
| `npm start`         | Serve the production build (after `npm run build`)       |

> **Note:** the machine this project was authored on had no access to the npm registry, so
> `npm install` and `npm run build` have **not** been executed here. Run `npm install && npm run
> typecheck && npm run build` once locally before deploying — that is the first thing to do.

### Deploy

- **Vercel** (simplest): push to GitHub, import the repo, accept the defaults.
- **Any static host** (GitHub Pages, Netlify, S3, Cloudflare Pages): uncomment the two lines in
  `next.config.ts`, run `npm run build`, and upload the generated `out/` folder. The site uses no
  server features, so a static export is byte-for-byte the same experience.

---

## 2. Replace these placeholders

Nothing on the site links to a fabricated URL. Anything not yet published renders as a visibly
**pending** chip — dashed border, greyed out, non-clickable, with an explanation for screen
readers. Fill in a value and it silently becomes a real button. No other code changes needed.

### `lib/config.ts` — do this one first

| Field                              | Currently        | Replace with                              |
| ---------------------------------- | ---------------- | ----------------------------------------- |
| `socials[0].url` — GitHub          | `""`             | `https://github.com/<username>`           |
| `socials[1].url` — LinkedIn        | `""`             | `https://linkedin.com/in/<username>`      |
| `socials[2].url` — LeetCode        | `""`             | `https://leetcode.com/u/<username>`       |
| `site.url`                         | `https://example.com` | Your deployed URL (used by SEO + Open Graph + JSON-LD) |

Email, phone, location and availability in the same file are already real — edit only if they change.

### `lib/content.ts`

| Field                                     | Currently | Replace with                                  |
| ----------------------------------------- | --------- | --------------------------------------------- |
| `projects[n].repoUrl`                     | `""`      | Repository URL, once the code is public       |
| `projects[n].liveUrl`                     | `""`      | Hosted demo URL, if you deploy one            |
| `certifications[n].items[n].credentialUrl` | `""`     | Credential verification link from the issuer  |

**Do not invent any of these.** An empty string is handled properly and honestly; a dead link is
the single fastest way to lose a recruiter's trust.

### `public/`

- `favicon.svg` — hand-drawn amber bar mark. Replace if you design something better.
- `og.png` — 1200×630 social preview. Regenerate after editing the wording:
  `python3 scripts/make_og.py` (needs Python + Pillow; it is a build-time asset script, not part
  of the app).

---

## 3. Where the content lives

All copy is data, not markup. You should never need to touch a component to change a sentence.

```
lib/config.ts     Links, email, phone, SEO strings.        ← edit first
lib/content.ts    Every word of the page:
                    sections[]        section registry — drives the navbar,
                                      the active-section indicator, the ⌘K
                                      palette and the s/NN header numbering.
                                      Reordering here reorders navigation.
                    hero              headline, positioning, the four glance facts
                    about             lede, paragraphs, profile snapshot
                    pipeline[]        the six-stage "how I think about data" flow
                    projects[]        the three case studies + their theme tags
                    skillGroups[]     six groups; each item's `note` is the
                                      hover/focus readout (no percentages, ever)
                    experience[]      internships, with `kind` framing + Grade O badge
                    education[]       degree and school records, real scores
                    certifications[]  grouped by issuer
                    achievement       Smart India Hackathon Top 50
                    contactCopy       contact headline + form note
components/workbench/data.ts
                  The sample dataset used by the Analyst Workbench. Invented for
                  demonstration and labelled as such on screen — see §5.
```

---

## 4. Project structure

```
app/
  layout.tsx            Fonts, metadata, Open Graph, Person JSON-LD, skip link,
                        navbar, scroll progress, footer
  page.tsx              Section order — must match `sections` in lib/content.ts
  globals.css           Design tokens (@theme), base styles, every component
                        class, keyframes, reduced-motion + print rules
components/
  Navbar.tsx            Sticky nav, active-section indicator, mobile menu, ⌘K trigger
  CommandPalette.tsx    ⌘K / Ctrl-K navigation (combobox + listbox, arrow keys)
  ScrollProgress.tsx    1px reading-progress rule under the navbar
  Hero.tsx              Name, headline, CTAs, glance facts
  ActivationMatrix.tsx  Canvas signature visual — a 24×24 activation grid,
                        the same motif as the NUMX digit bitmap
  About.tsx             Narrative + profile snapshot
  DataMindset.tsx       Raw → Clean → Explore → Analyze → Visualize → Decide,
                        with a hand-drawn SVG glyph per stage
  Projects.tsx          Theme filtering + chronology strip
  projects/
    ProjectFeature.tsx    Layout 01 — large horizontal feature (NUMX)
    ProjectSplit.tsx      Layout 02 — split screen (Flow Mate)
    ProjectDashboard.tsx  Layout 03 — widget grid (AI Resume Analyzer)
    visuals.tsx           CSS/SVG project previews (no stock photography)
    parts.tsx             Shared field/stack/highlight/link parts
  AnalyticsShowcase.tsx Tabbed analyst workbench (5 panels, full keyboard support)
  workbench/
    CleaningPanel.tsx     Before → after tables + the reasoning + pandas code
    QueryPanel.tsx        SQL window function + result preview
    ChartPanel.tsx        Inline-SVG bar chart with a rolling average
    DashboardPanel.tsx    Power BI-style report page in CSS
    WorkflowPanel.tsx     ML workflow diagram, including the iterate loop
    data.ts               The shared sample dataset
  Skills.tsx            Six groups, each with a hover/focus detail readout
  Experience.tsx        Internship timeline, Grade O highlighted
  Education.tsx         Degree + school records with real score meters
  Certifications.tsx    Grouped by issuer, verification buttons pre-wired
  Achievement.tsx       Smart India Hackathon Top 50 feature
  Contact.tsx           Copyable email/phone, profiles, mailto-composing form
  Footer.tsx            Identity, section map, profiles, back to top
  ui/
    Icon.tsx            Every icon on the site, hand-written SVG paths
    Reveal.tsx          Scroll-triggered reveal (JS-gated, motion-aware)
    SectionHeader.tsx   The s/NN hairline + title + lede
    OutLink.tsx         The link that refuses to lie — see §2
    CodeBlock.tsx       Hand-rolled SQL/Python highlighter + copy button
    DemoTag.tsx         The "sample data" marker used on every mock figure
lib/
  config.ts             Links + SEO
  content.ts            All copy
  hooks.ts              useReducedMotion, useInView, useActiveSection,
                        useScrolled, useCopy
scripts/
  make_og.py            Regenerates public/og.png
```

---

## 5. Design decisions

**Truth is load-bearing.** The brief was explicit that nothing may be invented, so honesty is
built into the components rather than left to the copy:

- `OutLink` cannot render a fake URL. An empty string in config produces a pending chip.
- No accuracy figures appear anywhere, because none were recorded. The ML workflow panel says so
  in as many words, and the confusion matrix diagram shows cell labels with no numbers in them.
- Every mock visual carries a `DemoTag` naming exactly what it is: *concept diagram*, *interface
  concept · drawn in CSS, not a screenshot*, *illustrative sample output*, *sample data*.
- There are no skill percentage bars. Each technology carries a sentence about what was actually
  built with it instead — verifiable, and more useful to a reader.
- CGPA 6.6/10, Class XII 74% and Class X 68% are all shown, with real meters. The section says
  plainly that a partial transcript is worth less than an honest one.
- Internships are labelled "virtual internship · guided programme" so no employment is implied.
- The only numbers with real weight — Top 50, Grade O — are the ones that came from the résumé.

**Visual direction.** Near-black ground (`#07080a`), warm bone type (`#edeae3`), one amber signal
accent (`#f2b33d`) and steel (`#6ea8c7`) as the secondary data hue. The amber is deliberate: the
default palette for anything AI is acid green or cyan, and amber-phosphor instrument panels read
as technical without reading as generic. Glow is used in exactly three places — the hero visual,
the hackathon feature and the contact call to action — so it still means something.

**Typography.** Archivo (heavy, tight) for display, Instrument Sans for body, IBM Plex Mono for
anything that behaves like data: labels, table cells, code, axis ticks, section indices. Numbers
are `tabular-nums` everywhere so columns line up.

**Structural device.** Every section opens with a hairline carrying a section index (`s/04`) and
one true fact. It borrows the vernacular of a DataFrame header rather than an ornament, and the
index is derived from the section registry so the numbering cannot drift out of order.

**Motion.** CSS keyframes plus one IntersectionObserver hook — no animation library. Reveals are
gated on `html.js`, so with JavaScript disabled the page is fully readable rather than blank. All
motion collapses under `prefers-reduced-motion`, including the canvas visual, which reads the same
media query in JavaScript.

**Accessibility.** Skip link, visible amber focus ring on every interactive element, real
`<button>`/`<a>` semantics, ARIA tab and combobox patterns with arrow-key support, `aria-disabled`
on pending links with the reason exposed to screen readers, and a visually hidden data table
beside the SVG chart carrying identical numbers. Contrast: bone on ink ≈ 16:1, amber ≈ 10.6:1,
muted text ≈ 5.8:1, faint text ≈ 4.65:1 — all above WCAG AA for their sizes.

**Performance.** No image files in the layout — every visual is CSS or inline SVG. Three Google
fonts, subset and `display: swap`. Zero third-party JS. The canvas visual pauses under reduced
motion and is capped to a small grid.

---

## 6. Editing checklist for later

- Adding a project: append to `projects[]` in `lib/content.ts`, then decide which of the three
  layouts it should use in `components/Projects.tsx` (the dispatch is by project number).
- Adding a section: add it to `sections[]` in `lib/content.ts` first — the navbar, the palette and
  the header numbering all read from there — then render it in `app/page.tsx` in the same order.
- Changing the accent colour: `--color-amber` in `app/globals.css` (`@theme`) and the matching
  `--amber` in `:root` below it. A handful of inline SVG fills use the hex directly; search for
  `#f2b33d`.
