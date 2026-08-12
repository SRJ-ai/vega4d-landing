import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { animate, stagger } from 'animejs';
import { SectionHead } from './primitives/SectionHead';
import { coverage } from '../data/site';

/**
 * Modality coverage as a real matrix: one row per stream, one column per set.
 *
 * Empty cells are drawn as an explicit absence rather than left blank, because "we do not
 * capture this" is information a researcher needs before they license anything.
 *
 * anime.js stages the cells in on first view. The animation communicates reading order,
 * left to right and top to bottom, which is how the table should be scanned.
 */
export function Coverage() {
  const rootRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduce) return undefined;

    const cells = root.querySelectorAll('[data-cell]');
    if (!cells.length) return undefined;

    let animation;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animation = animate(cells, {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 620,
          delay: stagger(22, { grid: [coverage.columns.length + 1, coverage.rows.length] }),
          ease: 'outQuad',
        });
        io.disconnect();
      },
      { threshold: 0.2 },
    );

    io.observe(root);
    return () => {
      io.disconnect();
      animation?.revert?.();
    };
  }, [reduce]);

  return (
    <section className="u-rule">
      <div className="u-shell py-24 lg:py-32">
        <SectionHead title={coverage.heading} body={coverage.body} note={coverage.note} />

        <div ref={rootRef} className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="sr-only">
              Sample rate and resolution per modality for each dataset
            </caption>
            <thead>
              <tr className="border-b border-[var(--line-200)]">
                <th
                  scope="col"
                  className="u-mono py-3 pr-6 text-[10px] font-medium tracking-[0.16em] text-[var(--text-300)] uppercase"
                >
                  Stream
                </th>
                {coverage.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="u-mono py-3 pr-6 text-[11px] font-medium tracking-[0.12em] text-[var(--signal)]"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coverage.rows.map((row, r) => (
                <tr
                  key={row.modality}
                  className={r === coverage.rows.length - 1 ? '' : 'border-b border-[var(--line-100)]'}
                >
                  <th
                    scope="row"
                    data-cell
                    className="py-4 pr-6 text-[0.9375rem] font-normal text-[var(--text-100)]"
                  >
                    {row.modality}
                  </th>
                  {row.values.map((value, c) => (
                    <td
                      key={`${row.modality}-${coverage.columns[c]}`}
                      data-cell
                      className="u-num py-4 pr-6 text-[0.875rem] text-[var(--text-200)]"
                    >
                      {value ?? (
                        <span
                          aria-label="Not captured in this set"
                          className="inline-block h-[1px] w-5 bg-[var(--line-300)] align-middle"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
