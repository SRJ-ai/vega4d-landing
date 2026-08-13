import { Check } from '@phosphor-icons/react';
import { SectionHead } from './primitives/SectionHead';

/**
 * What ships with a set: streams, annotations, and delivery.
 *
 * Carries id="datasets" because the nav and the hero's secondary action both point there,
 * and this is the section that answers "what do I actually get".
 *
 * The three columns were matched cards with a lift-on-hover and a unicode tick standing in
 * for an icon. They are now hairline-divided columns with a drawn icon.
 */
export function DataModalities() {
  const groups = [
    {
      title: 'Data modalities',
      items: [
        'Egocentric 12-camera RGB video',
        '21-keypoint per-hand skeleton vectors',
        '6-DoF wrist rotations',
        'Time-synced metadata under 0.4 ms drift',
      ],
    },
    {
      title: 'Annotation options',
      items: [
        'Pressure-derived contact and grasp labels',
        'Task labels with step segmentation',
        'Object identification and affordances',
        'Failure mode and slip detection',
      ],
    },
    {
      title: 'Delivery formats',
      items: [
        'Sharded WebDataset tensors',
        'Secure AWS or GCP bucket transfer',
        'Structured manifests with provenance and specs',
      ],
    },
  ];

  return (
    <section id="datasets" className="relative w-full bg-[var(--ink-000)] py-24">
      <div className="u-shell">
        <SectionHead
          title="Egocentric datasets, built for training runs."
          body="Take an off-the-shelf set or commission capture against your own task list. Everything is validated before it ships, in sharded WebDataset format."
        />

        <div className="mt-16 grid gap-px bg-[var(--line-100)] lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title} className="bg-[var(--ink-100)] p-8">
              <h3 className="u-mono text-[11px] tracking-[0.16em] text-[var(--signal)] uppercase">
                {group.title}
              </h3>
              <ul className="mt-7 space-y-4">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[var(--text-200)]">
                    <Check
                      size={14}
                      weight="bold"
                      color="var(--signal)"
                      className="mt-1.5 shrink-0"
                    />
                    <span>{item}</span>
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
