import { rigStrip } from '../data/site';

/**
 * The band under the hero: what teams build with this data, then what the rig does.
 *
 * This replaces a logo wall that named NVIDIA, Stanford, DeepMind, OpenAI, UC Berkeley,
 * and Meta AI as customers. None of those relationships exist on record. Categories of
 * work claim nothing about who is using us; when real, permitted logos exist, they belong
 * here as actual SVG marks rather than as styled text.
 */
export function RigStrip() {
  // Two passes of the spec list so the scroll has no visible seam at the wrap point.
  const track = [...rigStrip.specs, ...rigStrip.specs];

  return (
    <section
      aria-label="Applications and capture rig specification"
      className="relative w-full overflow-hidden border-y border-[var(--line-100)] bg-[var(--ink-100)] py-14"
    >
      <div className="u-shell flex flex-col items-center gap-7">
        <p className="u-mono text-[11px] tracking-[0.16em] text-[var(--text-300)] uppercase">
          {rigStrip.label}
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-3">
          {rigStrip.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-[var(--radius-pill)] border border-[var(--line-200)] bg-[var(--ink-200)] px-5 py-2.5 text-[14.5px] text-[var(--text-100)]"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="relative mt-12 w-full overflow-hidden border-t border-[var(--line-100)] pt-6"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div className="v4-marquee flex w-max items-center">
          {track.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="u-mono flex items-center gap-8 px-8 text-[11.5px] tracking-[0.12em] whitespace-nowrap text-[var(--text-300)] uppercase"
            >
              {item}
              <span aria-hidden="true" className="h-3 w-px bg-[var(--line-200)]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
