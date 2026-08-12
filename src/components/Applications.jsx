export function Applications() {
  const apps = [
    "Pretraining vision-language-action (VLA) models",
    "Learning fine-grained task structure (affordances, slippage)",
    "High-fidelity simulation seeding and scenario generation",
    "Benchmarking robotic dexterity and generalization",
    "Improving robustness across complex manipulation tasks"
  ];

  return (
    <section className="relative w-full border-t border-[var(--line-100)] bg-[var(--ink-000)] py-24">
      <div className="u-shell grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="u-display text-[clamp(2rem,3.5vw,3rem)] leading-tight text-[var(--text-100)]">
            What teams use Vega4D for
          </h2>
          <p className="mt-6 text-[1.125rem] leading-relaxed text-[var(--text-200)]">
            Our instrument-grade capture goes far beyond simple imitation learning, enabling the next generation of physical AI capabilities.
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="flex flex-col gap-6">
            {apps.map((app, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-4 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand-900)] text-[0.75rem] text-[var(--brand-300)]">
                  {i + 1}
                </span>
                <span className="text-[1.125rem] text-[var(--text-100)]">{app}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
