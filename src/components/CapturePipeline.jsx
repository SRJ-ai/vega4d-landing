import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { StageGlyph } from './canvas/StageGlyph';
import { SectionHead } from './primitives/SectionHead';
import { pipeline } from '../data/site';

/**
 * The four capture stages as a pinned horizontal pan.
 *
 * The scroll hijack is doing real work here: the pipeline is a sequence, and reading it
 * sideways matches the way the data actually moves through the rig. Motion owns the
 * scroll in this component; anime.js is not used inside it, so the two engines never
 * drive the same frames.
 *
 * Below 1024px and under reduced motion the pan collapses to a plain vertical stack.
 */
export function CapturePipeline() {
  const wrapRef = useRef(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const panned = wide && !reduce;
  const count = pipeline.stages.length;

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  
  // The flex container is count * 100vw wide. Moving it by -(count - 1) * 100vw is equivalent to moving it by -((count - 1) / count) * 100%.
  // For 4 items, -300vw is exactly -75%.
  const x = useTransform(scrollYProgress, (latest) => {
    const progress = Math.max(0, Math.min(1, (latest - 0.04) / (0.96 - 0.04)));
    return `-${progress * 75}%`;
  });
  const railWidth = useTransform(scrollYProgress, [0.04, 0.96], ['12%', '100%']);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // The range of progress is ~0.04 to ~0.96 for the actual slide, so map it roughly.
    let index = Math.round(latest * (count - 1));
    if (index < 0) index = 0;
    if (index >= count) index = count - 1;
    setActiveIndex(index);
  });

  return (
    <section id="pipeline" className="u-rule">
      <div className="u-shell py-24 lg:py-32">
        <SectionHead title={pipeline.heading} body={pipeline.body} />
      </div>

      {panned ? (
        <motion.div ref={wrapRef} style={{ height: `${count * 100}vh` }}>
          <div className="sticky top-0 h-[100dvh] overflow-hidden border-t border-[var(--line-100)]">
            <motion.div className="flex h-full" style={{ width: `${count * 100}%`, x }}>
              {pipeline.stages.map((stage) => (
                <div key={stage.key} style={{ width: `${100 / count}%` }} className="h-full shrink-0">
                  <StagePanel stage={stage} />
                </div>
              ))}
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 border-t border-[var(--line-100)]">
              <div className="h-[3px] bg-[var(--ink-300)]">
                <motion.div className="h-full bg-[var(--signal)]" style={{ width: railWidth }} />
              </div>
              <div className="u-shell flex justify-between py-3">
                {pipeline.stages.map((stage, index) => (
                  <button
                    key={stage.key}
                    onClick={() => {
                      if (wrapRef.current) {
                        const rect = wrapRef.current.getBoundingClientRect();
                        const absoluteTop = rect.top + window.scrollY;
                        window.scrollTo({
                          top: absoluteTop + index * window.innerHeight,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className={`u-mono text-[10px] tracking-[0.16em] uppercase hover:text-[var(--text-100)] transition-colors cursor-pointer bg-transparent border-none p-0 ${activeIndex === index ? 'text-[var(--text-100)] font-medium' : 'text-[var(--text-300)]'}`}
                  >
                    {stage.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="border-t border-[var(--line-100)]">
          {pipeline.stages.map((stage) => (
            <div key={stage.key} className="u-shell border-b border-[var(--line-100)] py-12">
              <StageBody stage={stage} />
              <div className="u-bezel mt-8 h-[180px] bg-[var(--ink-100)]">
                <StageGlyph variant={stage.key} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function StagePanel({ stage }) {
  return (
    <article
      className="relative flex h-full w-full shrink-0 items-center border-r border-[var(--line-100)]"
      aria-label={stage.title}
    >
      <div className="u-guides" aria-hidden="true" />
      <div className="u-shell relative grid w-full items-center gap-12 pb-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <StageBody stage={stage} />
        </div>

        <div className="u-bezel h-[300px] bg-[var(--ink-100)] lg:col-span-7 lg:h-[520px]">
          <StageGlyph variant={stage.key} />
        </div>
      </div>
    </article>
  );
}

function StageBody({ stage }) {
  return (
    <div>
      <h3 className="u-display text-[clamp(2rem,3.6vw,3.25rem)] text-[var(--text-100)]">
        {stage.title}
      </h3>
      <p className="u-measure mt-5 max-w-[42ch] text-[var(--text-200)]">{stage.body}</p>

      <dl className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-3">
        {stage.spec.map(([term, value]) => (
          <div key={term}>
            <dt className="u-mono text-[10px] tracking-[0.14em] text-[var(--text-300)] uppercase">
              {term}
            </dt>
            <dd className="u-num mt-1 text-[15px] text-[var(--text-100)]">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
