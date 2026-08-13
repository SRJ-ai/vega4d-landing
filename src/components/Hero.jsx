import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { createTimeline, stagger, utils } from 'animejs';
import { CheckCircle } from '@phosphor-icons/react';
import { HandCloud } from './canvas/HandCloud';
import { MagneticCta } from './primitives/MagneticCta';
import { brand, hero } from '../data/site';

/**
 * Centred hero. A category pill, the headline with its second line in italic, one primary
 * action, and the capture instrument sitting full width beneath the copy.
 *
 * The entrance is one authored moment, built as an anime.js timeline: the headline lines
 * clip up word by word, then the instrument frame draws in, then the actions arrive.
 */
// Elements the entrance stages in. Listed here so the cleanup can restore exactly this set.
const FADE_IN = [
  '[data-hero-badge]',
  '[data-hero-sub]',
  '[data-hero-actions]',
  '[data-hero-assurances]',
  '[data-hero-frame]',
];

export function Hero() {
  const rootRef = useRef(null);
  const frameRefs = useRef({ frame: null, closure: null, contact: null });
  const reduce = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduce) return undefined;

    /*
      Whole lines rise inside their own clip, rather than word by word.

      Per-word splitting rewrites the headline's DOM, and this effect runs twice under
      StrictMode: the second pass re-split the already-split markup, nested the wrappers,
      and left the headline stranded at opacity 0. Line-level animation reads almost the
      same and cannot desynchronise from the markup.
    */
    const lineInners = Array.from(root.querySelectorAll('[data-line] > span'));
    const staged = FADE_IN.map((sel) => root.querySelector(sel)).filter(Boolean);

    // Hidden from script, never from the markup, so a failed timeline cannot leave the
    // hero blank and the copy is present with JavaScript switched off.
    utils.set(staged, { opacity: 0 });
    utils.set(lineInners, { y: '108%' });

    const tl = createTimeline({ defaults: { ease: 'outExpo' } });

    tl.add(lineInners, { y: '0%', duration: 1150, delay: stagger(110) }, 120);

    tl.add('[data-hero-badge]', { opacity: [0, 1], y: [10, 0], duration: 700 }, 0)
      .add('[data-hero-sub]', { opacity: [0, 1], y: [16, 0], duration: 900 }, 520)
      .add('[data-hero-assurances]', { opacity: [0, 1], y: [12, 0], duration: 800 }, 860)
      .add('[data-hero-actions]', { opacity: [0, 1], y: [14, 0], duration: 900 }, 700)
      .add('[data-hero-frame]', { opacity: [0, 1], duration: 1400, ease: 'outQuad' }, 260)
      .add(
        '[data-hero-readout]',
        { opacity: [0, 1], duration: 700, delay: stagger(90) },
        900,
      );

    return () => {
      tl.revert?.();
      // Whatever happened to the timeline, the hero ends up readable.
      utils.set(staged, { opacity: 1, y: 0 });
      utils.set(lineInners, { y: '0%' });
    };
  }, [reduce]);

  const handleFrame = ({ closure, contact, frame }) => {
    const refs = frameRefs.current;
    if (refs.frame) refs.frame.textContent = String(frame).padStart(3, '0');
    if (refs.closure) refs.closure.textContent = `${Math.round(closure * 100)}%`;
    if (refs.contact) refs.contact.textContent = contact ? 'LOADED' : 'OPEN';
  };

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-24 pb-14 lg:pt-24"
    >
      <div className="u-shell relative z-10 flex w-full flex-col items-center">
        <div className="flex max-w-[56rem] flex-col items-center text-center">
          <span
            data-hero-badge
            className="rounded-[var(--radius-pill)] border border-[var(--signal-line)] bg-[var(--signal-wash)] px-4 py-1.5 text-[13px] text-[var(--signal)]"
          >
            {hero.badge}
          </span>

          <h1 className="u-display mt-8 text-[clamp(2.25rem,5vw,4.25rem)] text-[var(--text-100)]">
            {hero.headline.map((line, i) => (
              <span key={line} data-line className="block overflow-hidden pb-[0.08em]">
                <span className={`block ${i === 1 ? 'u-display-em' : ''}`}>{line}</span>
              </span>
            ))}
          </h1>

          <p
            data-hero-sub
            className="mt-7 max-w-[52ch] text-[1.0625rem] text-[var(--text-200)]"
          >
            {hero.subtext}
          </p>

          <div
            data-hero-actions
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticCta href="#access">{brand.primaryCta}</MagneticCta>
            <MagneticCta href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </MagneticCta>
          </div>

          <ul
            data-hero-assurances
            className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
          >
            {hero.assurances.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[13.5px] text-[var(--text-300)]"
              >
                <CheckCircle size={14} weight="regular" color="var(--signal)" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          data-hero-frame
          className="relative mt-16 w-full max-w-[62rem]"
        >
          <div className="u-bezel u-scanlines relative z-10 bg-[var(--ink-100)]">
            <div className="h-[340px] sm:h-[420px] lg:h-[520px]">
              <HandCloud onFrame={handleFrame} />
            </div>

            <div className="grid grid-cols-3 border-t border-[var(--line-100)]">
              <Readout
                label="Frame"
                initial="000"
                innerRef={(el) => {
                  frameRefs.current.frame = el;
                }}
              />
              <Readout
                label="Closure"
                initial="0%"
                innerRef={(el) => {
                  frameRefs.current.closure = el;
                }}
              />
              <Readout
                label="Contact"
                initial="OPEN"
                mono
                innerRef={(el) => {
                  frameRefs.current.contact = el;
                }}
              />
            </div>
          </div>

          <p className="u-mono mt-4 text-[11px] tracking-[0.08em] text-[var(--text-300)] text-right">
            {hero.instrumentLabel}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Readout({ label, initial, innerRef, mono = false }) {
  return (
    <div
      data-hero-readout
      className="border-r border-[var(--line-100)] px-4 py-3 last:border-r-0"
    >
      <div className="u-mono text-[10px] tracking-[0.14em] text-[var(--text-300)] uppercase">
        {label}
      </div>
      <div
        ref={innerRef}
        className={`${mono ? 'u-mono' : 'u-num'} mt-1 text-[15px] text-[var(--text-100)]`}
      >
        {initial}
      </div>
    </div>
  );
}
