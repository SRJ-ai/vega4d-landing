import { SectionHead } from './primitives/SectionHead';

/**
 * What teams do with the data.
 *
 * The list was numbered 1 to 5 in filled circles. These are parallel uses, not a sequence,
 * so the numbering asserted an order that does not exist. Hairlines separate them instead.
 */
export function Applications() {
  const apps = [
    'Pretraining vision-language-action models',
    'Learning fine-grained task structure, including affordances and slippage',
    'Seeding high-fidelity simulation and scenario generation',
    'Benchmarking model dexterity and generalisation',
    'Improving robustness across complex manipulation tasks',
  ];

  return (
    <section className="relative w-full border-t border-[var(--line-100)] bg-[var(--ink-000)] py-24">
      <div className="u-shell grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHead
            title="What teams use Vega4D for."
            body="Capture at this fidelity carries contact and force, so it supports more than imitation learning."
          />
        </div>

        <ul className="lg:col-span-6 lg:col-start-7">
          {apps.map((app) => (
            <li
              key={app}
              className="border-t border-[var(--line-100)] py-5 text-[1.0625rem] text-[var(--text-100)] last:border-b last:border-[var(--line-100)]"
            >
              {app}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
