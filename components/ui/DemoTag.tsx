import type { ReactNode } from "react";

/**
 * Marks a visual as a demonstration built for this page rather than a
 * screenshot of production work. Used on every mock chart, table and panel.
 */
export function DemoTag({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`demo-tag ${className}`}>{children}</span>;
}
