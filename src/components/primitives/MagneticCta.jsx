import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';

/**
 * Primary action with a magnetic pull toward the cursor.
 *
 * The pull is feedback: it tells the visitor the control is live before they click.
 * Pointer position lives in motion values, so tracking the cursor never re-renders.
 *
 * @param {{href?: string, children: React.ReactNode, variant?: 'solid' | 'ghost',
 *          onClick?: () => void, type?: 'button' | 'submit', disabled?: boolean,
 *          className?: string}} props
 */
export function MagneticCta({
  href,
  children,
  variant = 'solid',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 22, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 22, mass: 0.4 });
  // The label trails the shell slightly, which reads as weight rather than as a slide.
  const labelX = useTransform(x, (v) => v * 0.35);
  const labelY = useTransform(y, (v) => v * 0.35);

  const handleMove = (event) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    mx.set(Math.max(-10, Math.min(10, dx * 0.3)));
    my.set(Math.max(-7, Math.min(7, dy * 0.3)));
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const classes = `u-btn ${variant === 'ghost' ? 'u-btn--ghost' : ''} ${className}`;
  const inner = (
    <motion.span style={reduce ? undefined : { x: labelX, y: labelY }}>{children}</motion.span>
  );
  const motionProps = {
    ref,
    className: classes,
    style: reduce ? undefined : { x, y },
    onPointerMove: handleMove,
    onPointerLeave: reset,
  };

  if (href) {
    return (
      <motion.a {...motionProps} href={href}>
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps} type={type} onClick={onClick} disabled={disabled}>
      {inner}
    </motion.button>
  );
}
