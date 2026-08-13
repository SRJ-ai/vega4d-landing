import { SectionHead } from './primitives/SectionHead';

/**
 * The two environments the rig gets deployed into.
 *
 * The cards were rounded with a gradient hover wash, which is the only place on the page
 * either appeared. They now use the same hairline panel as every other pair on the page.
 */
export function Environments() {
  const environments = [
    {
      title: 'Homes and everyday life',
      description:
        'Complete kitchen layouts, living spaces, and domestic environments, reconstructed to capture dexterous bimanual tasks. Chopping, folding, pouring, and the corrections in between, tracked to sub-millimeter.',
    },
    {
      title: 'Factories and industrial sites',
      description:
        'Heavy-duty tools, assembly lines, and mechanical components, so a model can learn force application and precision insertion rather than the appearance of them.',
    },
  ];

  return (
    <section className="relative w-full bg-[var(--ink-000)] py-24">
      <div className="u-shell">
        <SectionHead
          title="Domestic and industrial capture."
          body="The rigs are modular. They get built into the environment your models need to master rather than filmed against a backdrop of one."
        />

        <div className="mt-16 grid gap-px bg-[var(--line-100)] lg:grid-cols-2">
          {environments.map((environment) => (
            <div
              key={environment.title}
              className="group bg-[var(--ink-100)] p-10 transition-colors duration-300 hover:bg-[var(--ink-200)]"
            >
              <h3 className="u-display text-[1.625rem] text-[var(--text-100)] transition-colors duration-300 group-hover:text-[var(--signal)]">
                {environment.title}
              </h3>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-[var(--text-200)]">
                {environment.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
