import { isLive } from "@/lib/config";
import { Icon, type IconName } from "./Icon";

type Variant = "btn" | "btn-sm" | "chip" | "icon";

type OutLinkProps = {
  /** Empty string means "not published yet" — see lib/config.ts. */
  url: string;
  label: string;
  icon?: IconName;
  variant?: Variant;
  /** Explains the disabled state to sighted and assistive-tech users alike. */
  pending?: string;
  className?: string;
};

const baseFor: Record<Variant, string> = {
  btn: "btn",
  "btn-sm": "btn btn--sm",
  chip: "chip",
  icon: "btn btn--icon",
};

/**
 * An external link that refuses to lie. When the URL in lib/config.ts is still
 * empty it renders as a visibly pending, non-interactive element instead of a
 * link to nowhere — so the site never ships a broken or invented destination.
 */
export function OutLink({
  url,
  label,
  icon,
  variant = "btn",
  pending = "Link not added yet",
  className = "",
}: OutLinkProps) {
  const base = `${baseFor[variant]}${className ? ` ${className}` : ""}`;
  const iconOnly = variant === "icon";

  if (!isLive(url)) {
    return (
      <span className={base} aria-disabled="true" title={`${label} — ${pending}`}>
        {icon ? <Icon name={icon} className={iconOnly ? "h-[18px] w-[18px]" : "h-3.5 w-3.5"} /> : null}
        {iconOnly ? null : <span>{label}</span>}
        <span className="sr-only">
          {label} — {pending}
        </span>
      </span>
    );
  }

  return (
    <a
      className={base}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={iconOnly ? label : undefined}
    >
      {icon ? <Icon name={icon} className={iconOnly ? "h-[18px] w-[18px]" : "h-3.5 w-3.5"} /> : null}
      {iconOnly ? null : <span>{label}</span>}
      {iconOnly ? null : <Icon name="arrow-out" className="h-3 w-3 opacity-60" />}
    </a>
  );
}
