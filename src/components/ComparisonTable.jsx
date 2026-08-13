import { Check, X } from '@phosphor-icons/react';
import { SectionHead } from './primitives/SectionHead';

/**
 * Instrument capture set against crowdsourced footage, row by row.
 *
 * Claims here describe our own pipeline only. The earlier version asserted that "leading
 * AI labs are abandoning crowdsourced GoPro footage", which is a claim about third parties
 * that nothing in the project supports, and stated a flat "Zero" privacy risk.
 */
export function ComparisonTable() {
  const comparisons = [
    {
      feature: 'Tracking precision',
      vega: 'Sub-millimeter, hardware-calibrated',
      crowd: 'High drift, software-estimated',
    },
    {
      feature: 'Contact labels',
      vega: 'Pressure-derived from instrumented gloves',
      crowd: 'Human-guessed from video',
    },
    {
      feature: 'Quality assurance',
      vega: 'Automated rejection past 0.8 mm tolerance',
      crowd: 'Manual spot-checking',
    },
    {
      feature: 'Privacy exposure',
      vega: 'Consented operators, no bystanders in frame',
      crowd: 'Unconsented strangers in unconstrained video',
    },
    {
      feature: 'Environmental control',
      vega: 'Fixed lighting, no motion blur',
      crowd: 'Unpredictable lighting, heavy occlusion',
    },
  ];

  return (
    <section className="relative w-full border-t border-[var(--line-100)] bg-[var(--ink-000)] py-24">
      <div className="u-shell">
        <SectionHead
          title="What instrument capture buys you."
          body="The same task, recorded two ways. The difference shows up in what your model can learn from contact."
        />

        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--line-200)]">
                <th className="u-mono w-1/3 px-6 py-5 text-[10px] font-medium tracking-[0.16em] text-[var(--text-300)] uppercase">
                  Specification
                </th>
                <th className="u-mono w-1/3 bg-[var(--ink-100)] px-6 py-5 text-[11px] font-medium tracking-[0.12em] text-[var(--signal)]">
                  Vega4D
                </th>
                <th className="u-mono w-1/3 px-6 py-5 text-[11px] font-medium tracking-[0.12em] text-[var(--text-300)]">
                  Crowdsourced footage
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr
                  key={row.feature}
                  className={
                    idx === comparisons.length - 1 ? '' : 'border-b border-[var(--line-100)]'
                  }
                >
                  <th
                    scope="row"
                    className="px-6 py-6 text-[0.9375rem] font-normal text-[var(--text-100)]"
                  >
                    {row.feature}
                  </th>
                  <td className="bg-[var(--ink-100)] px-6 py-6 text-[0.9375rem] text-[var(--text-100)]">
                    <div className="flex items-start gap-3">
                      <Check
                        size={15}
                        weight="bold"
                        color="var(--signal)"
                        className="mt-1 shrink-0"
                      />
                      <span>{row.vega}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-[0.9375rem] text-[var(--text-300)]">
                    <div className="flex items-start gap-3">
                      <X size={15} weight="bold" className="mt-1 shrink-0 opacity-60" />
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
