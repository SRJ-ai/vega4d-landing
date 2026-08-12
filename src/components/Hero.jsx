import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { createTimeline, stagger, splitText, utils } from 'animejs';
import { HandCloud } from './canvas/HandCloud';
import { MagneticCta } from './primitives/MagneticCta';
import { brand, hero } from '../data/site';

/**
 * Asymmetric split hero. Copy and the single primary action sit left; the capture
 * instrument occupies the right and bleeds to the viewport edge.
 *
 * The entrance is one authored moment, built as an anime.js timeline: the headline lines
 * clip up word by word, then the instrument frame draws in, then the actions arrive.
 */
export function Hero() {
  const rootRef = useRef(null);
  const frameRefs = useRef({ frame: null, closure: null, contact: null });
  const reduce = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduce) return undefined;

    const lines = Array.from(root.querySelectorAll('[data-line]'));
    const splits = [];
    const wordTargets = [];

    lines.forEach((line) => {
      try {
        const split = splitText(line, { words: { wrap: 'clip' }, chars: false });
        const words = split?.words ?? [];
        if (words.length) {
          splits.push(split);
          wordTargets.push(...words);
        }
      } catch {
        // If the splitter cannot run, the line animates as a whole below.
      }
    });

    const tl = createTimeline({ defaults: { ease: 'outExpo' } });

    if (wordTargets.length) {
      utils.set(wordTargets, { y: '110%', opacity: 0 });
      tl.add(wordTargets, { y: '0%', opacity: 1, duration: 1150, delay: stagger(70) }, 120);
    } else {
      tl.add(lines, { opacity: [0, 1], y: [26, 0], duration: 1000, delay: stagger(90) }, 120);
    }

    tl.add('[data-hero-sub]', { opacity: [0, 1], y: [16, 0], duration: 900 }, 520)
      .add('[data-hero-actions]', { opacity: [0, 1], y: [14, 0], duration: 900 }, 700)
      .add('[data-hero-frame]', { opacity: [0, 1], duration: 1400, ease: 'outQuad' }, 260)
      .add(
        '[data-hero-readout]',
        { opacity: [0, 1], duration: 700, delay: stagger(90) },
        900,
      );

    return () => {
      tl.revert?.();
      splits.forEach((split) => split.revert?.());
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
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--brand-500)] rounded-full blur-[140px] opacity-20 pointer-events-none mix-blend-screen" />
      
      <div className="u-shell relative z-10 grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          {/* Sized so the longer line stays on one line from 1024px up. */}
          <h1 className="u-display text-[clamp(2.5rem,4.6vw,4.25rem)] bg-gradient-to-br from-white via-white to-[var(--brand-300)] bg-clip-text text-transparent drop-shadow-sm">
            {hero.headline.map((line) => (
              <span key={line} data-line className="block overflow-hidden pb-[0.06em]">
                {line}
              </span>
            ))}
          </h1>

          <p
            data-hero-sub
            className="mt-8 max-w-[46ch] text-[1.0625rem] text-[var(--text-200)]"
            style={reduce ? undefined : { opacity: 0 }}
          >
            {hero.subtext}
          </p>

          <div
            data-hero-actions
            className="mt-10 flex flex-wrap items-center gap-3"
            style={reduce ? undefined : { opacity: 0 }}
          >
            <div className="group relative">
              <div className="absolute inset-0 bg-[var(--brand-500)] opacity-40 blur-md transition-opacity duration-300 group-hover:opacity-80" />
              <div className="relative">
                <MagneticCta href="#access">{brand.primaryCta}</MagneticCta>
              </div>
            </div>
            <MagneticCta href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </MagneticCta>
          </div>
        </div>

        <motion.div
          data-hero-frame
          className="lg:col-span-5 relative"
          style={reduce ? undefined : { opacity: 0 }}
        >
          {/* Subtle glow behind the instrument bezel */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-transparent via-[var(--brand-900)]/30 to-[var(--brand-500)]/20 blur-xl z-0" />
          
          <div className="u-bezel u-scanlines bg-[var(--ink-100)]/80 backdrop-blur-md relative z-10 border border-[var(--brand-900)]">
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
