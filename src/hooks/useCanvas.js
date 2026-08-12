import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Canvas contract shared by every renderer on the page.
 *
 * - sizes from the container with devicePixelRatio capped at 2
 * - runs on requestAnimationFrame, and only while the element is on screen
 * - draws exactly one frame when the visitor asked for reduced motion
 * - cleans up its observer and its frame on unmount
 *
 * @param {(ctx: CanvasRenderingContext2D, frame: {w:number,h:number,t:number,dpr:number}) => void} draw
 * @param {{deps?: unknown[], still?: boolean}} [options] still forces the single-frame path.
 */
export function useCanvas(draw, options = {}) {
  const { deps = [], still = false } = options;
  const canvasRef = useRef(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;

  const reduce = useReducedMotion();
  const frozen = still || reduce;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;
    const start = performance.now();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint(performance.now());
    };

    const paint = (now) => {
      ctx.clearRect(0, 0, w, h);
      drawRef.current(ctx, { w, h, t: (now - start) / 1000, dpr });
    };

    const loop = (now) => {
      paint(now);
      if (visible && !frozen) raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pausing offscreen is what keeps six live canvases affordable on a laptop.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible && !frozen) raf = requestAnimationFrame(loop);
        else if (visible) paint(performance.now());
      },
      { rootMargin: '120px' },
    );
    io.observe(canvas);

    resize();
    if (!frozen) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frozen, ...deps]);

  return canvasRef;
}
