import { SectionHead } from './primitives/SectionHead';

/**
 * Why capture happens in-house.
 *
 * Two claims were softened from the earlier copy: "completely eliminating the ethical
 * risks" and "Zero PII" are absolutes the project cannot evidence. The two-column pair
 * lost its coloured left bars in favour of the hairline the rest of the page uses.
 */
export function PrivacyValidation() {
  const points = [
    {
      title: 'Rejection at 0.8 mm tolerance',
      body: 'Every captured sequence is replayed against the 12-camera source footage. If the skeleton vectors drift past 0.8 mm at any point, the session is rejected rather than corrected.',
    },
    {
      title: 'Known provenance, controlled PII',
      body: 'Capture happens with consented operators in a controlled space, so sequences do not carry bystanders recorded without consent. Every clip ships with its chain of custody.',
    },
  ];

  return (
    <section className="relative w-full border-y border-[var(--line-100)] bg-[var(--ink-000)] py-24">
      <div className="u-shell">
        <SectionHead
          title="Validation by design, not by crowdsourcing."
          body="Egocentric footage collected in the wild is noisy and carries personal data nobody agreed to share. Bringing capture in-house is what makes the validation step possible at all: the rig knows where every camera was, so drift can be measured rather than guessed."
        />

        <div className="mt-16 grid grid-cols-1 gap-px bg-[var(--line-100)] md:grid-cols-2">
          {points.map((point) => (
            <div key={point.title} className="flex flex-col gap-4 bg-[var(--ink-000)] p-8">
              <h3 className="u-display text-[1.375rem] text-[var(--text-100)]">{point.title}</h3>
              <p className="text-[var(--text-200)]">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
