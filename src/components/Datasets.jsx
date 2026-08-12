import { motion } from 'motion/react';
import { DensityField } from './canvas/DensityField';
import { SectionHead } from './primitives/SectionHead';
import { datasets } from '../data/site';

const FIELDS = ['points', 'scan', 'lattice'];

/**
 * Three sets, three cells, no empty tiles. The lead set takes the tall cell on the left;
 * the two smaller sets stack beside it.
 *
 * Each cell carries its own rendered field, so the grid is not three text boxes. There is
 * no per-cell action: everything on this page routes to the one access request.
 */
export function Datasets() {
  return (
    <section id="datasets" className="u-rule">
      <div className="u-shell py-24 lg:py-32">
        <SectionHead title={datasets.heading} note={datasets.note} />

        <div className="mt-14 grid gap-px bg-[var(--line-100)] lg:grid-cols-2">
          {datasets.items.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden bg-[var(--ink-100)] p-7 sm:p-9 ${
                item.feature ? 'lg:row-span-2' : ''
              }`}
            >
              <DensityField variant={FIELDS[i] ?? 'points'} seed={i * 13 + 5} />

              <div className="relative flex h-full flex-col">
                <div className="u-mono text-[11px] tracking-[0.16em] text-[var(--signal)]">
                  {item.id}
                </div>

                <h3
                  className={`u-display mt-3 text-[var(--text-100)] ${
                    item.feature
                      ? 'text-[clamp(1.75rem,3.2vw,2.75rem)]'
                      : 'text-[clamp(1.375rem,2.2vw,1.875rem)]'
                  }`}
                >
                  {item.title}
                </h3>

                <p className="mt-4 max-w-[44ch] text-[0.9375rem] text-[var(--text-200)]">
                  {item.body}
                </p>

                <dl
                  className={`mt-8 grid gap-6 ${item.feature ? 'sm:grid-cols-3' : 'grid-cols-3'}`}
                >
                  {item.figures.map(([term, value]) => (
                    <div key={term}>
                      <dt className="u-mono text-[10px] tracking-[0.14em] text-[var(--text-300)] uppercase">
                        {term}
                      </dt>
                      <dd
                        className={`u-num mt-1 text-[var(--text-100)] ${
                          item.feature ? 'text-[1.5rem]' : 'text-[1.125rem]'
                        }`}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-10">
                  <ul className="flex flex-wrap gap-2">
                    {item.modalities.map((modality) => (
                      <li
                        key={modality}
                        className="u-mono border border-[var(--line-200)] px-2.5 py-1 text-[10px] tracking-[0.1em] text-[var(--text-200)]"
                      >
                        {modality}
                      </li>
                    ))}
                  </ul>
                  <p className="u-mono mt-4 text-[11px] text-[var(--text-300)]">{item.license}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
