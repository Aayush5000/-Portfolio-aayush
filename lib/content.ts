import { contact } from "@/lib/config";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * All written content, typed. Nothing here is invented: every date, grade,
 * technology and outcome comes from Aayush's résumé. Where a number was not
 * available (model accuracy, user counts) the copy stays qualitative on purpose.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── section registry ──────────────────────────────────────────────────────
   Drives the navbar, the active-section indicator and the ⌘K palette, so the
   page order and the navigation can never drift apart. */

export type Section = {
  id: string;
  /** Long name, used in the palette and section headers. */
  label: string;
  /** Short name for the navbar. Omit to keep it out of the navbar. */
  nav?: string;
  /** Section id used by the navbar indicator (sub-sections point at a parent). */
  parent?: string;
};

export const sections: Section[] = [
  { id: "home", label: "Home", nav: "Home" },
  { id: "about", label: "About", nav: "About" },
  { id: "mindset", label: "How I think about data", parent: "about" },
  { id: "projects", label: "Projects", nav: "Projects" },
  { id: "workbench", label: "Analyst workbench", parent: "projects" },
  { id: "skills", label: "Skills", nav: "Skills" },
  { id: "experience", label: "Experience", nav: "Experience" },
  { id: "education", label: "Education", parent: "experience" },
  { id: "certifications", label: "Certifications", nav: "Certifications" },
  { id: "achievement", label: "Smart India Hackathon", parent: "certifications" },
  { id: "contact", label: "Contact", nav: "Contact" },
];

export const navItems = sections.filter((s) => s.nav);

/** "s/03" style index for a section header. */
export function sectionIndex(id: string): string {
  const i = sections.findIndex((s) => s.id === id);
  return `s/${String(Math.max(i, 0)).padStart(2, "0")}`;
}

/* ── hero ─────────────────────────────────────────────────────────────────── */

export const hero = {
  eyebrow: "AI & Data Science Student",
  name: "Aayush Mishra",
  headline: ["Turning data into models,", "and models into useful products."],
  positioning:
    "AI & Data Science student at Galgotias University, dedicated to machine learning and innovative AI-powered software development.",
  /** The 30-second scan. Four facts, all verifiable from the résumé. */
  glance: [
    { value: "B.Tech AI & DS", label: "Galgotias University · 2023–2027" },
    { value: "Top 50", label: "Smart India Hackathon" },
    { value: "Grade O", label: "AI-ML internship · Eduskills" },
    { value: "3 projects", label: "ML · AI · Full-Stack" },
  ],
} as const;

/* ── about ────────────────────────────────────────────────────────────────── */

export const about = {
  lede: "Turning data into models, and models into useful products.",
  paragraphs: [
    "I study Artificial Intelligence and Data Science at Galgotias University, passionate about machine learning, data science, and AI applications.",
    "I focus on practical AI-driven projects, from digit recognition systems to full-stack web applications for ATS-style resume analysis.",
    "I enjoy solving complex problems, analyzing data, and building intelligent solutions.",
  ],
  snapshot: [
    { key: "education", value: "B.Tech · Artificial Intelligence and Data Science" },
    { key: "institution", value: "Galgotias University, Greater Noida" },
    { key: "graduating", value: "June 2027 · CGPA 6.6 / 10" },
    { key: "focus", value: "AI · Machine Learning · Data Science · Web App" },
    { key: "location", value: contact.location },
    { key: "stage", value: "Final year · " + contact.availability.toLowerCase() },
    { key: "core stack", value: "Python, TensorFlow, Scikit-learn, SQL, Node.js" },
  ],
} as const;

/* ── how I think about data ───────────────────────────────────────────────── */

export type Stage = {
  step: string;
  title: string;
  /** One-line summary shown on the node. */
  summary: string;
  /** The detail, revealed on hover/focus/tap. */
  detail: string;
};

export const pipeline: Stage[] = [
  {
    step: "01",
    title: "Raw data",
    summary: "Read it before trusting it",
    detail:
      "Whatever the source hands over — exports, form entries, scraped text, pixel arrays. First pass is always shape, data types, missing counts and values that cannot physically exist.",
  },
  {
    step: "02",
    title: "Clean",
    summary: "Every fix is an assumption",
    detail:
      "Nulls, duplicates, mixed date formats, stray whitespace, impossible numbers. I write the cleaning decisions down, because each one is an assumption someone may need to challenge later.",
  },
  {
    step: "03",
    title: "Explore",
    summary: "Find the question worth asking",
    detail:
      "Distributions first, relationships second. Group, pivot, plot, sort. Exploratory work is not about confirming a hunch — it is about finding which question the data can actually answer.",
  },
  {
    step: "04",
    title: "Analyze",
    summary: "Is the gap bigger than the noise?",
    detail:
      "Compare against a baseline, look at spread and not just averages, and stay honest about sample size. A number without context is not a finding.",
  },
  {
    step: "05",
    title: "Visualize",
    summary: "One idea per chart",
    detail:
      "The right chart type, labelled axes, sensible scales, nothing drawn that is not information. If a chart needs a paragraph to explain it, it is the wrong chart.",
  },
  {
    step: "06",
    title: "Decide",
    summary: "State the limits with the answer",
    detail:
      "Finish with a recommendation and its boundaries: what the data supports, what it does not, and what I would measure next to close the gap.",
  },
];

export const modelNote = {
  title: "When the answer needs a model",
  body: "Split the data before touching it, keep a set the model has never seen, and read the confusion matrix rather than a single score. Evaluation choices decide whether a result means anything — that is the habit the AI-ML programme drilled hardest.",
};

/* ── projects ─────────────────────────────────────────────────────────────── */

export type Project = {
  no: string;
  title: string;
  subtitle: string;
  period: string;
  /** Sortable, for the "chronology" line. */
  year: string;
  stack: string[];
  themes: ProjectTheme[];
  problem: string;
  solution: string;
  impact: string;
  highlights: string[];
  /** Paste a repository URL here when the code is public. */
  repoUrl: string;
  /** Paste a live demo URL here if you deploy it. */
  liveUrl: string;
};

/** A deliberately small vocabulary — it is what the filter chips are built from. */
export const projectThemes = [
  "Data",
  "Machine learning",
  "Automation",
  "Product thinking",
  "Full stack",
] as const;

export type ProjectTheme = (typeof projectThemes)[number];


export const projects: Project[] = [
  {
    no: "01",
    title: "NUMX",
    subtitle: "AI-powered digit recognition system",
    period: "October – November 2024",
    year: "2024",
    stack: ["Python", "TensorFlow", "Tkinter"],
    themes: ["Machine learning", "Automation", "Data"],
    problem:
      "Manual numerical data entry is slow, repetitive and error-prone.",
    solution:
      "Built an AI-powered digit recognition system using a TensorFlow-based neural network to classify handwritten and digital numerical input.",
    impact:
      "Fast and reliable digit detection designed to reduce manual data-entry effort and enable intelligent automation for numerical processing.",
    highlights: [
      "TensorFlow-based neural network",
      "Handwritten and digital input classification",
      "Fast and reliable digit detection",
      "Designed for intelligent automation",
    ],
    repoUrl: "",
    liveUrl: "",
  },
  {
    no: "02",
    title: "Flow Mate",
    subtitle: "AI-driven mobile productivity application",
    period: "August – October 2025",
    year: "2025",
    stack: ["React.js", "JavaScript", "Tailwind CSS", "HTML/CSS"],
    themes: ["Product thinking", "Full stack"],
    problem:
      "Productivity apps often fail to support hands-busy learning scenarios like commuting or chores.",
    solution:
      "AI-driven mobile productivity application integrating audio-based learning modules and community-driven engagement features.",
    impact:
      "Improved productivity through audio-based learning and gamified motivation.",
    highlights: [
      "Audio-based learning",
      "Community engagement",
      "Gamified motivation",
      "Daily engagement",
      "User retention",
    ],
    repoUrl: "https://github.com/Aayush5000/FlowMate",
    liveUrl: "",
  },
  {
    no: "03",
    title: "AI Resume Analyzer",
    subtitle: "Full-stack Java web application for resume analysis",
    period: "May 2026",
    year: "2026",
    stack: ["HTML", "CSS", "JavaScript", "Java", "Apache Tomcat"],
    themes: ["Automation", "Data", "Full stack"],
    problem:
      "Applicants often lack visibility into why they are filtered out in ATS-style resume screenings.",
    solution:
      "Full-stack Java web application performing ATS-style resume analysis through automated keyword extraction and scoring.",
    impact:
      "Provides ATS-style resume analysis, automated keyword extraction, and resume scoring to help candidates improve their applications.",
    highlights: [
      "Automated keyword extraction",
      "ATS-style resume analysis",
      "Resume scoring",
      "Responsive JSP/HTML/CSS dashboard",
      "Parsed resume data",
      "Keyword-based evaluation feedback",
    ],
    repoUrl: "https://github.com/Aayush5000/AI_Resume_Analyzer",
    liveUrl: "",
  },
];

/* ── skills ───────────────────────────────────────────────────────────────── */

export type Skill = { name: string; note: string };
export type SkillGroup = { id: string; title: string; caption: string; items: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages / Data",
    caption: "Core analytical toolkit",
    items: [
      { name: "Python", note: "Primary language for data manipulation and AI." },
      { name: "Java", note: "Basic knowledge for backend applications." },
      { name: "SQL", note: "Data querying and management." },
      { name: "pandas", note: "Data manipulation and analysis." },
      { name: "NumPy", note: "Numerical computing." },
      { name: "Matplotlib", note: "Data visualization." },
      { name: "Plotly", note: "Interactive data visualization." },
    ],
  },
  {
    id: "ml",
    title: "ML / AI",
    caption: "Applied machine learning",
    items: [
      { name: "TensorFlow", note: "Neural network modelling." },
      { name: "CNNs", note: "Convolutional neural networks for image classification." },
      { name: "Scikit-learn", note: "Machine learning algorithms and evaluation." },
    ],
  },
  {
    id: "data",
    title: "Databases / Backend / Big Data",
    caption: "Infrastructure and data handling",
    items: [
      { name: "Power BI", note: "Data visualization and business intelligence." },
      { name: "MongoDB", note: "NoSQL database." },
      { name: "MySQL", note: "Relational database management." },
      { name: "Node.js", note: "Server-side JavaScript." },
      { name: "Express", note: "Backend web application framework." },
      { name: "Apache Tomcat", note: "Java application server." },
      { name: "Apache Hadoop", note: "Big data framework." },
      { name: "Hive", note: "Data warehousing." },
      { name: "Spark", note: "Large-scale data processing." },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools",
    caption: "Productivity and workflow",
    items: [
      { name: "Git", note: "Version control." },
      { name: "GitHub", note: "Code hosting and collaboration." },
      { name: "VS Code", note: "Code editor." },
      { name: "CMD", note: "Terminal usage." },
      { name: "Jupyter Notebooks", note: "Interactive computing." },
    ],
  },
];

export const analyticalConcepts = [
  "Data Cleaning",
  "Data Visualization",
  "Statistical Analysis",
  "Model Evaluation",
  "Code Reviews",
  "Research Discussions",
];

export const softSkills = [
  "Teamwork",
  "Communication",
  "Problem-Solving",
  "Leadership",
  "Adaptability",
  "Analytical Thinking",
];

/* ── experience ───────────────────────────────────────────────────────────── */

export type Experience = {
  role: string;
  org: string;
  support: string;
  period: string;
  year: string;
  /** Kept explicit so nothing reads as employment. */
  kind: string;
  worked: string;
  learned: string;
  outcome: string;
  badge?: string;
  stack: string[];
};

export const experience: Experience[] = [
  {
    role: "AI-ML Virtual Internship",
    org: "Eduskills",
    support: "Supported by Google for Developers",
    period: "October 2025 – December 2025",
    year: "2025",
    kind: "Virtual internship · 10 weeks",
    worked:
      "Completed a 10-week AI-ML virtual internship, applied machine-learning concepts through model-development workflows.",
    learned:
      "AI-driven problem solving and model development workflows.",
    outcome: "Achieved Outstanding (Grade O) performance.",
    badge: "Grade O · Outstanding",
    stack: ["AI-ML", "Model Development"],
  },
  {
    role: "Android Developer Virtual Internship",
    org: "Eduskills",
    support: "Supported by Google",
    period: "July 2025 – September 2025",
    year: "2025",
    kind: "Virtual internship",
    worked:
      "Built Android applications through guided modules, applied structured problem solving, participated in iterative testing, and worked with Kotlin and UI components.",
    learned:
      "Android UI components and Kotlin development, plus collaborative code reviews.",
    outcome: "Successfully completed guided modules.",
    stack: ["Kotlin", "Android UI"],
  },
];

/* ── education ────────────────────────────────────────────────────────────── */

export type Education = {
  qualification: string;
  field?: string;
  institution: string;
  place?: string;
  period: string;
  /** Label + the real value, plus the real maximum. No invented conversions. */
  score: { label: string; value: number; max: number; display: string };
  note?: string;
  featured?: boolean;
};

export const education: Education[] = [
  {
    qualification: "B.Tech",
    field: "Artificial Intelligence and Data Science",
    institution: "Galgotias University",
    place: "Greater Noida, India",
    period: "August 2023 – June 2027",
    score: { label: "CGPA", value: 6.6, max: 10, display: "6.6/10" },
    featured: true,
  },
  {
    qualification: "Class XII",
    institution: "Vidya Mandir Public School",
    period: "April 2023",
    score: { label: "Result", value: 68, max: 100, display: "68%" },
  },
  {
    qualification: "Class X",
    institution: "Vivekanand Public School",
    period: "April 2021",
    score: { label: "Result", value: 68, max: 100, display: "68%" },
  },
];

/* ── certifications ───────────────────────────────────────────────────────── */

export type Certification = {
  name: string;
  /** Add a verification URL when you have one; empty renders as "link pending". */
  credentialUrl: string;
};

export type CertGroup = { issuer: string; items: Certification[] };

export const certifications: CertGroup[] = [
  {
    issuer: "Oracle",
    items: [
      { name: "Generative AI", credentialUrl: "" },
      { name: "Data Scientist", credentialUrl: "" },
      { name: "OCI AI Foundation", credentialUrl: "" },
    ],
  },
  {
    issuer: "AWS",
    items: [
      { name: "Solutions Architecture", credentialUrl: "" },
      { name: "GenAI Powered Data Analytics", credentialUrl: "" },
    ],
  },
  {
    issuer: "NPTEL",
    items: [{ name: "Design Thinking 2025", credentialUrl: "" }],
  },
];

export const certCount = certifications.reduce((n, g) => n + g.items.length, 0);

/* ── achievement ──────────────────────────────────────────────────────────── */

export const achievement = {
  rank: "Top 50",
  event: "Smart India Hackathon (SIH)",
  where: "Galgotias University",
  claim: "Secured a Top 50 position among thousands of participants at Galgotias University.",
  context:
    "Smart India Hackathon is a national-level problem-solving competition.",
} as const;

/* ── contact ──────────────────────────────────────────────────────────────── */

export const contactCopy = {
  headline: ["Let's connect", "and talk AI."],
  body: "I am actively looking for opportunities in AI and Data Science. If you want to discuss AI projects, data science, or have a role that matches my skills, email is the fastest way to reach me.",
  formNote:
    "This form has no server behind it — sending opens a pre-filled draft in your email client, so nothing gets silently lost.",
} as const;

export const footerLine = "Built with curiosity, data, and code.";
