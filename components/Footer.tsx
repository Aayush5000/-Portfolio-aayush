import { Icon } from "@/components/ui/Icon";
import { OutLink } from "@/components/ui/OutLink";
import { contact, socials } from "@/lib/config";
import { footerLine, navItems } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_auto] lg:gap-14">
          <div>
            <p className="display text-[1.75rem]">Aayush Mishra</p>
            <p className="eyebrow mt-3.5">Data Analyst • Data Science • AI</p>
            <p className="mt-5 flex items-center gap-2.5 text-[13.5px] text-faint">
              <Icon name="pin" className="h-4 w-4 shrink-0" />
              {contact.location}
            </p>
            <p className="mt-2 flex items-center gap-2.5 text-[13.5px]">
              <Icon name="mail" className="h-4 w-4 shrink-0 text-faint" />
              <a href={`mailto:${contact.email}`} className="link-underline text-mute">
                {contact.email}
              </a>
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="label">sections</p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="link-underline text-[14px] text-mute">
                    {item.nav}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label">profiles</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {socials.map((social) => (
                <OutLink
                  key={social.id}
                  url={social.url}
                  label={social.label}
                  icon={social.id}
                  variant="icon"
                  pending={social.note}
                />
              ))}
            </div>
            <a href="#home" className="btn btn--sm mt-6">
              <Icon name="arrow-down" className="h-3.5 w-3.5 rotate-180" />
              <span>Back to top</span>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="sec-meta">© {year} Aayush Mishra</p>
          <p className="text-[13px] text-faint">{footerLine}</p>
        </div>
      </div>
    </footer>
  );
}
