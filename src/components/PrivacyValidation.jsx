export function PrivacyValidation() {
  return (
    <section className="relative w-full border-y border-[var(--line-100)] bg-[var(--ink-000)] py-24">
      <div className="u-shell">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="u-display text-4xl text-[var(--text-100)]">
            Validation by design, not by crowdsourcing
          </h2>
          <p className="mt-6 text-[1.1rem] leading-relaxed text-[var(--text-200)]">
            Egocentric data is often chaotic, noisy, and full of PII. We solve this by bringing the capture process entirely in-house. Our data is recorded in a controlled clean-room environment by trained professionals wearing instrumented rigs, completely eliminating the ethical risks and validation errors of crowdsourced GoPro footage.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4 border-l-2 border-[var(--brand-500)] pl-6">
            <h3 className="text-xl font-medium text-[var(--text-100)]">0.8mm Tolerance Rejection</h3>
            <p className="text-[var(--text-200)]">
              Every captured sequence is programmatically replayed against the 12-camera source footage. If the skeleton vectors drift past a 0.8mm tolerance at any point, the entire session is rejected.
            </p>
          </div>
          <div className="flex flex-col gap-4 border-l-2 border-[var(--brand-500)] pl-6">
            <h3 className="text-xl font-medium text-[var(--text-100)]">Zero PII & Clear Licensing</h3>
            <p className="text-[var(--text-200)]">
              Because we don't rely on random partners or household help for capture, our datasets are fundamentally free of unintended PII (Personally Identifiable Information). You get clear chain-of-custody for every clip.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
