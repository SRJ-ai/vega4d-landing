import { motion } from 'motion/react';

const reveal = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Section opener. Heading and body stack vertically, never split across columns, and
 * there is no label above the heading anywhere on this page.
 *
 * @param {{title: string, body?: string, note?: string, className?: string}} props
 */
export function SectionHead({ title, body, note, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.08 }}
    >
      <motion.h2
        variants={reveal}
        className="u-display max-w-[22ch] text-[clamp(2rem,4.6vw,3.75rem)] text-[var(--text-100)]"
      >
        {title}
      </motion.h2>
      {body ? (
        <motion.p variants={reveal} className="u-measure mt-6 text-[var(--text-200)]">
          {body}
        </motion.p>
      ) : null}
      {note ? (
        <motion.p
          variants={reveal}
          className="u-mono mt-4 text-[11px] tracking-[0.08em] text-[var(--text-300)]"
        >
          {note}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
