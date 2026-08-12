import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { List, X } from '@phosphor-icons/react';
import { brand, nav } from '../data/site';

/**
 * Fixed navigation. One line at every desktop width, 64px tall, hairline underneath.
 * The bar only takes a background once the page has scrolled, so the hero stays whole.
 */
export function Nav() {
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setLifted(v > 24));

  return (
    <header
      className="fixed inset-x-0 top-0"
      style={{ zIndex: 'var(--z-nav)' }}
    >
      <motion.div
        className="border-b transition-colors duration-300"
        style={{
          borderColor: lifted ? 'var(--line-200)' : 'transparent',
          backgroundColor: lifted ? 'rgba(5, 6, 10, 0.86)' : 'transparent',
          backdropFilter: lifted ? 'blur(14px)' : 'none',
        }}
      >
        <div className="u-shell flex h-16 items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-3 no-underline">
            <Mark />
            <span className="u-display text-[17px] tracking-[-0.02em]">{brand.name}</span>
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="u-mono text-[11px] tracking-[0.14em] text-[var(--text-200)] uppercase no-underline transition-colors hover:text-[var(--text-100)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#access"
              className="u-btn hidden !py-2.5 !text-[11px] no-underline sm:inline-flex"
            >
              {brand.primaryCta}
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center border border-[var(--line-200)] text-[var(--text-100)] lg:hidden"
            >
              {open ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
            </button>
          </div>
        </div>
      </motion.div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-b border-[var(--line-200)] bg-[var(--ink-100)] lg:hidden"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="u-mono block border-t border-[var(--line-100)] px-[var(--gutter)] py-4 text-[12px] tracking-[0.14em] text-[var(--text-200)] uppercase no-underline"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#access"
            onClick={() => setOpen(false)}
            className="u-mono block border-t border-[var(--line-100)] px-[var(--gutter)] py-4 text-[12px] tracking-[0.14em] text-[var(--signal)] uppercase no-underline"
          >
            {brand.primaryCta}
          </a>
        </div>
      ) : null}
    </header>
  );
}

/* The existing Vega4D mark, preserved from the previous build. */
function Mark() {
  return (
    <span className="flex h-8 w-8 items-center justify-center bg-[var(--signal)] text-[var(--ink-000)]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="6" y="3" width="5" height="18" rx="2.5" transform="rotate(-35 9 12)" />
        <rect x="12" y="3" width="5" height="18" rx="2.5" transform="rotate(-35 15 12)" />
      </svg>
    </span>
  );
}
