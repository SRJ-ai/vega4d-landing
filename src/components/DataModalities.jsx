export function DataModalities() {
  return (
    <section className="relative w-full bg-[var(--ink-000)] py-24">
      <div className="u-shell">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="u-display text-4xl text-[var(--text-100)]">
            Egocentric datasets designed for training
          </h2>
          <p className="mt-4 text-[1.1rem] text-[var(--text-200)]">
            Choose from off-the-shelf primitives or request custom capture. All data is clean, pre-validated, and delivered in sharded WebDataset format.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <ModalityCard 
            title="Data Modalities"
            items={[
              "Egocentric 12-camera rigged RGB video",
              "21-keypoint per-hand skeleton vectors",
              "6-DoF wrist rotations",
              "Time-synced metadata (<0.4ms drift)"
            ]}
          />
          <ModalityCard 
            title="Annotation Options"
            items={[
              "Pressure-derived contact/grasp labels",
              "Task labels + step segmentation",
              "Object identification and affordances",
              "Failure mode / slip detection"
            ]}
          />
          <ModalityCard 
            title="Delivery Formats"
            items={[
              "Sharded WebDataset tensors",
              "Secure AWS/GCP bucket transfer",
              "Structured manifests (provenance & specs)"
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function ModalityCard({ title, items }) {
  return (
    <div className="u-bezel flex flex-col justify-start bg-[var(--ink-100)] p-8 transition-transform hover:-translate-y-1">
      <h3 className="u-mono text-sm tracking-widest text-[var(--brand-300)] uppercase">{title}</h3>
      <ul className="mt-6 space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start text-[var(--text-200)]">
            <span className="mr-3 text-[var(--brand-500)]">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
