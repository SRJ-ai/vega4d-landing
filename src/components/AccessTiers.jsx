import { motion } from 'motion/react';
import { SectionHead } from './primitives/SectionHead';
import { tiers } from '../data/site';

/**
 * Access levels as full-width bands rather than three matched cards.
 *
 * Each band is one row of the same grid, so the eye reads down a column (who it is for,
 * what is included, terms) instead of comparing three boxes side by side. Hover tints the
 * row and lights its name; no coloured edge bars, no elevation.
 */
export function AccessTiers() {
  return (
    <section className="u-rule">
      <div className="u-shell py-24 lg:py-32">
        <SectionHead title={tiers.heading} body={tiers.body} />
      </div>

      <div className="border-t border-[var(--line-100)]">
        {tiers.items.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.06 }}
            className="group border-b border-[var(--line-100)] transition-colors duration-300 hover:bg-[var(--ink-200)]"
          >
            <div className="u-shell grid gap-6 py-10 lg:grid-cols-12 lg:items-baseline lg:gap-8">
              <h3 className="u-display text-[clamp(1.75rem,3vw,2.5rem)] text-[var(--text-100)] transition-colors duration-300 group-hover:text-[var(--signal)] lg:col-span-3">
                {tier.name}
              </h3>

              <p className="text-[0.9375rem] text-[var(--text-200)] lg:col-span-4">{tier.who}</p>

              <ul className="space-y-2 lg:col-span-3">
                {tier.includes.map((line) => (
                  <li key={line} className="u-mono text-[11.5px] text-[var(--text-200)]">
                    {line}
                  </li>
                ))}
              </ul>

              <p className="u-mono text-[11px] tracking-[0.14em] text-[var(--text-300)] uppercase lg:col-span-2 lg:text-right">
                {tier.terms}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
