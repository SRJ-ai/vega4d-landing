import { CheckCircle2, XCircle } from 'lucide-react';

export function ComparisonTable() {
  const comparisons = [
    {
      feature: "Tracking Precision",
      vega: "Sub-millimeter, hardware-calibrated",
      crowd: "High drift, software-estimated"
    },
    {
      feature: "Contact Labels",
      vega: "Pressure-derived from instrumented gloves",
      crowd: "Human-guessed from video"
    },
    {
      feature: "Quality Assurance",
      vega: "Automated 0.8mm tolerance rejection",
      crowd: "Manual spot-checking"
    },
    {
      feature: "PII & Privacy Risk",
      vega: "Zero (Clean-room, masked operators)",
      crowd: "High (Strangers in unconstrained video)"
    },
    {
      feature: "Environmental Control",
      vega: "Perfect lighting, no motion blur",
      crowd: "Unpredictable lighting, heavy occlusion"
    }
  ];

  return (
    <section className="relative w-full border-t border-[var(--line-100)] bg-[var(--ink-000)] py-24">
      <div className="u-shell">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="u-display text-[clamp(2rem,3.5vw,3rem)] leading-tight text-[var(--text-100)]">
            The Clean-Room Advantage
          </h2>
          <p className="mt-6 text-[1.125rem] leading-relaxed text-[var(--text-200)]">
            Why leading AI labs are abandoning crowdsourced GoPro footage for instrument-grade capture.
          </p>
        </div>

        <div className="mx-auto max-w-5xl overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--line-200)]">
                <th className="py-6 px-6 text-sm font-medium tracking-wide text-[var(--text-300)] uppercase w-1/3">
                  Specification
                </th>
                <th className="py-6 px-6 text-lg font-semibold text-[var(--brand-500)] w-1/3 bg-[var(--ink-100)]/30 rounded-t-lg">
                  Vega4D
                </th>
                <th className="py-6 px-6 text-lg font-semibold text-[var(--text-200)] w-1/3">
                  Crowdsourced Datasets
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line-100)]">
              {comparisons.map((row, idx) => (
                <tr key={idx} className="transition-colors hover:bg-[var(--ink-100)]/50">
                  <td className="py-6 px-6 font-medium text-[var(--text-100)]">
                    {row.feature}
                  </td>
                  <td className="py-6 px-6 text-[var(--text-100)] bg-[var(--ink-100)]/30">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[var(--brand-500)] shrink-0 mt-0.5" />
                      <span>{row.vega}</span>
                    </div>
                  </td>
                  <td className="py-6 px-6 text-[var(--text-300)]">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 opacity-50 shrink-0 mt-0.5" />
                      <span>{row.crowd}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
