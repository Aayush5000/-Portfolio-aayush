import type { ReactNode } from "react";
import { DemoTag } from "@/components/ui/DemoTag";

/**
 * Every workbench panel is laid out the same way — the reasoning on the left,
 * the artefact on the right — so switching tabs never moves the goalposts.
 */
export function PanelShell({
  title,
  blurb,
  tag,
  aside,
  children,
}: {
  title: string;
  blurb: string;
  tag: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-9 lg:grid-cols-[minmax(0,285px)_minmax(0,1fr)] lg:gap-14">
      <div>
        <h3 className="text-[1.35rem] sm:text-[1.5rem]">{title}</h3>
        <p className="mt-4 text-[14.5px] leading-relaxed text-mute">{blurb}</p>
        <DemoTag className="mt-6">{tag}</DemoTag>
        {aside ? <div className="mt-7 border-t border-line pt-6">{aside}</div> : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
