export function Environments() {
  return (
    <section className="relative w-full bg-[var(--ink-000)] py-24">
      <div className="u-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="u-display text-[clamp(2rem,3.5vw,3rem)] leading-tight text-[var(--text-100)]">
            Domestic and industrial capture
          </h2>
          <p className="mt-6 text-[1.125rem] leading-relaxed text-[var(--text-200)]">
            Our clean-room rigs are modular and can be deployed to simulate the exact environments your models need to master.
          </p>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-8">
          <EnvironmentCard 
            title="Homes & everyday life"
            description="We reconstruct complete kitchen layouts, living spaces, and domestic environments to capture dexterous, bimanual tasks—from chopping vegetables to folding laundry—with sub-millimeter tracking."
          />
          <EnvironmentCard 
            title="Factories & industrial sites"
            description="We deploy heavy-duty tools, assembly lines, and mechanical components to capture high-load industrial workflows, enabling your systems to learn force application and precision insertion."
          />
        </div>
      </div>
    </section>
  );
}

function EnvironmentCard({ title, description }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-[var(--line-100)] bg-[var(--ink-100)] p-10 transition-colors hover:border-[var(--brand-500)]">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-900)]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <h3 className="relative z-10 text-2xl font-semibold tracking-tight text-[var(--text-100)]">
        {title}
      </h3>
      <p className="relative z-10 mt-4 text-[1.0625rem] leading-relaxed text-[var(--text-200)]">
        {description}
      </p>
    </div>
  );
}
