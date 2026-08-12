export function DataTrust() {
  return (
    <section className="relative w-full border-t border-[var(--line-100)] bg-[var(--ink-000)] py-24">
      <div className="u-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="u-display text-[clamp(2rem,3.5vw,3rem)] leading-tight text-[var(--text-100)]">
            Data you can trust—at scale
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-medium text-[var(--text-100)]">Capture Protocols</h3>
            <ul className="space-y-3 text-[var(--text-200)]">
              <li className="flex items-start"><span className="mr-2 text-[var(--brand-500)]">•</span> Hard-mounted 12-camera rigged setup</li>
              <li className="flex items-start"><span className="mr-2 text-[var(--brand-500)]">•</span> Controlled lighting and physics modeling</li>
              <li className="flex items-start"><span className="mr-2 text-[var(--brand-500)]">•</span> Frame-perfect synchronization</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-medium text-[var(--text-100)]">Quality Pipeline</h3>
            <ul className="space-y-3 text-[var(--text-200)]">
              <li className="flex items-start"><span className="mr-2 text-[var(--brand-500)]">•</span> Automated 0.8mm tolerance checks</li>
              <li className="flex items-start"><span className="mr-2 text-[var(--brand-500)]">•</span> Strict rejection of corrupt tensors</li>
              <li className="flex items-start"><span className="mr-2 text-[var(--brand-500)]">•</span> Rigorous versioning for reproducibility</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-medium text-[var(--text-100)]">Provenance</h3>
            <ul className="space-y-3 text-[var(--text-200)]">
              <li className="flex items-start"><span className="mr-2 text-[var(--brand-500)]">•</span> Clear chain-of-custody for every sequence</li>
              <li className="flex items-start"><span className="mr-2 text-[var(--brand-500)]">•</span> Operator and rig metadata</li>
              <li className="flex items-start"><span className="mr-2 text-[var(--brand-500)]">•</span> Full traceability without PII risks</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
