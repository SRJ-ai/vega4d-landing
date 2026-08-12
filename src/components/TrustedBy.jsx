export function TrustedBy() {
  return (
    <section className="relative w-full border-t border-[var(--line-100)] bg-[var(--ink-100)] py-12">
      <div className="u-shell flex flex-col items-center justify-center gap-6">
        <p className="u-mono text-center text-[11px] tracking-[0.14em] text-[var(--text-300)] uppercase">
          Trusted by teams building physical AI
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-60 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100">
          {/* Placeholder text-logos for academic/industry partners */}
          <span className="font-sans text-xl font-bold tracking-tight text-[var(--text-200)]">STANFORD</span>
          <span className="font-sans text-xl font-bold tracking-tight text-[var(--text-200)]">UC BERKELEY</span>
          <span className="font-sans text-xl font-bold tracking-tight text-[var(--text-200)]">DeepMind</span>
          <span className="font-sans text-xl font-bold tracking-tight text-[var(--text-200)]">NVIDIA</span>
          <span className="font-sans text-xl font-bold tracking-tight text-[var(--text-200)]">OpenAI</span>
        </div>
      </div>
    </section>
  );
}
