import type { SVGProps } from "react";

export type IconName =
  | "github"
  | "linkedin"
  | "leetcode"
  | "mail"
  | "phone"
  | "pin"
  | "arrow-down"
  | "arrow-out"
  | "copy"
  | "check"
  | "close"
  | "menu"
  | "search"
  | "terminal";

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; className?: string };

/**
 * Inline SVG icon set. Hand-rolled rather than pulled from a library so the
 * bundle stays at three dependencies and the stroke weight matches the type.
 */
export function Icon({ name, className = "h-4 w-4", ...rest }: IconProps) {
  const shared = {
    viewBox: "0 0 24 24",
    className,
    "aria-hidden": true as const,
    ...rest,
  };

  if (name === "github") {
    return (
      <svg {...shared} fill="currentColor">
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.93c-3.19.69-3.87-1.54-3.87-1.54-.53-1.34-1.29-1.69-1.29-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.23 2.75.12 3.04.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg {...shared} fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.42v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    );
  }

  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "leetcode":
      return (
        <svg {...shared} {...stroke}>
          <path d="M13.8 3 7.2 9.6a3.4 3.4 0 0 0 0 4.8L13.8 21" />
          <path d="M10.4 12h9.4" />
        </svg>
      );
    case "mail":
      return (
        <svg {...shared} {...stroke}>
          <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2" />
          <path d="m3.5 6.5 8.5 6.2 8.5-6.2" />
        </svg>
      );
    case "phone":
      return (
        <svg {...shared} {...stroke}>
          <path d="M6.4 3.2h2.9l1.5 3.9-2 1.4a11.4 11.4 0 0 0 6.7 6.7l1.4-2 3.9 1.5v2.9a2 2 0 0 1-2.2 2A17.2 17.2 0 0 1 4.4 5.4a2 2 0 0 1 2-2.2Z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...shared} {...stroke}>
          <path d="M12 21.2s6.8-5.7 6.8-11a6.8 6.8 0 1 0-13.6 0c0 5.3 6.8 11 6.8 11Z" />
          <circle cx="12" cy="10.1" r="2.4" />
        </svg>
      );
    case "arrow-down":
      return (
        <svg {...shared} {...stroke}>
          <path d="M12 4.5v15m0 0 6-6m-6 6-6-6" />
        </svg>
      );
    case "arrow-out":
      return (
        <svg {...shared} {...stroke}>
          <path d="M7 17 17 7m0 0h-7m7 0v7" />
        </svg>
      );
    case "copy":
      return (
        <svg {...shared} {...stroke}>
          <rect x="9" y="9" width="11.5" height="11.5" rx="2" />
          <path d="M5.5 15H4.5a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1H14a1 1 0 0 1 1 1v1" />
        </svg>
      );
    case "check":
      return (
        <svg {...shared} {...stroke}>
          <path d="m4.5 12.5 5 5 10-11" />
        </svg>
      );
    case "close":
      return (
        <svg {...shared} {...stroke}>
          <path d="m5.5 5.5 13 13m0-13-13 13" />
        </svg>
      );
    case "menu":
      return (
        <svg {...shared} {...stroke}>
          <path d="M3.5 8.5h17M3.5 15.5h10" />
        </svg>
      );
    case "search":
      return (
        <svg {...shared} {...stroke}>
          <circle cx="11" cy="11" r="6.4" />
          <path d="m15.8 15.8 4.4 4.4" />
        </svg>
      );
    case "terminal":
      return (
        <svg {...shared} {...stroke}>
          <rect x="2.75" y="4" width="18.5" height="16" rx="2" />
          <path d="m7 10.2 2.4 2-2.4 2M12.6 14.6H17" />
        </svg>
      );
    default:
      return null;
  }
}
