import { SectionHead } from './primitives/SectionHead';

/**
 * Capture, quality, and provenance in three columns.
 *
 * The bullets were unicode dots. They are hairline rows now, which also stops this section
 * reading as a third stack of matched cards.
 */
export function DataTrust() {
  const columns = [
    {
      title: 'Capture protocols',
      items: [
        'Hard-mounted 12-camera rig',
        'Controlled lighting and physics modelling',
        'Frame-perfect synchronisation',
      ],
    },
    {
      title: 'Quality pipeline',
      items: [
        'Automated 0.8 mm tolerance checks',
        'Corrupt tensors rejected, never repaired',
        'Versioning that keeps a run reproducible',
      ],
    },
    {
      title: 'Provenance',
      items: [
        'Chain of custody for every sequence',
        'Operator and rig metadata',
        'Traceability without carrying personal data',
      ],
    },
  ];

  return (
    <section className="relative w-full border-t border-[var(--line-100)] bg-[var(--ink-000)] py-24">
      <div className="u-shell">
        <SectionHead
          title="Data you can trust, at scale."
          body="Three things decide whether a set survives contact with a training run: how it was captured, what was thrown away, and whether you can prove where it came from."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-16">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="u-mono text-[11px] tracking-[0.16em] text-[var(--signal)] uppercase">
                {column.title}
              </h3>
              <ul className="mt-6">
                {column.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-[var(--line-100)] py-4 text-[0.9375rem] text-[var(--text-200)] last:border-b last:border-[var(--line-100)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
