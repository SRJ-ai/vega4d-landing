import { Link } from 'react-router-dom';
import { brand, footer } from '../data/site';

export function SiteFooter() {
  return (
    <footer className="u-rule">
      <div className="u-shell py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="u-mono text-[11px] tracking-[0.1em] text-[var(--text-300)]">
            &copy; {new Date().getFullYear()} {brand.name}
          </p>

          <nav aria-label="Legal" className="flex flex-wrap gap-6">
            {footer.links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="u-mono text-[11px] tracking-[0.1em] text-[var(--text-200)] no-underline transition-colors hover:text-[var(--text-100)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="u-mono mt-8 border-t border-[var(--line-100)] pt-6 text-[11px] text-[var(--text-300)]">
          {footer.legal}
        </p>
      </div>
    </footer>
  );
}
