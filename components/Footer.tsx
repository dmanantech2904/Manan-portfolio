import { site } from "@/lib/content";

export default function Footer({ links }: { links: { id: string; label: string }[] }) {
  return (
    <footer className="bg-green-deep text-cream">
      <div className="container-x flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="display text-3xl">
          Manan Dave<span className="text-gold">.</span>
        </p>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="eyebrow link-line !text-[0.68rem] text-cream/80 hover:text-cream">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow link-line !text-[0.68rem] text-gold"
              >
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="eyebrow link-line !text-[0.68rem] text-gold">
                Email
              </a>
            </li>
          </ul>
        </nav>

        <p className="text-xs text-cream/60">© {new Date().getFullYear()} Manan Dave. All rights reserved.</p>
      </div>
    </footer>
  );
}
