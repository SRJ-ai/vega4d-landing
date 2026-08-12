import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaretDown } from '@phosphor-icons/react';
import { SectionHead } from './primitives/SectionHead';
import { faq } from '../data/site';

export function FAQ() {
  return (
    <section id="faq" className="u-rule bg-[var(--ink-000)]">
      <div className="u-shell py-24 lg:py-32">
        <SectionHead title={faq.heading} />
        
        <div className="mt-16 max-w-[800px]">
          {faq.items.map((item, i) => (
            <FAQItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--line-100)]">
      <button
        type="button"
        className="flex w-full items-center justify-between py-6 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="u-display text-[1.125rem] text-[var(--text-100)]">
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CaretDown size={20} color="var(--text-300)" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="u-measure pb-6 text-[0.9375rem] text-[var(--text-200)]">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
