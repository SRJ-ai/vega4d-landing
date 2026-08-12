import { useCanvas } from '../../hooks/useCanvas';
import { palette, alpha } from '../../lib/palette';

/**
 * Background field for a dataset tile. Each variant renders that set's shape of data
 * rather than a decorative gradient.
 *
 * points  - occupancy density, for the bimanual set
 * scan    - a rolling scanline sweep, for the tool set
 * lattice - indexed grasp primitives on a grid, for the reach set
 *
 * @param {{variant: 'points' | 'scan' | 'lattice', seed?: number}} props
 */
export function DensityField({ variant, seed = 7 }) {
  const canvasRef = useCanvas(
    (ctx, frame) => {
      const draw = RENDERERS[variant];
      if (draw) draw(ctx, frame, seed);
    },
    { deps: [variant, seed] },
  );

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

const RENDERERS = {
  points(ctx, { w, h, t }, seed) {
    const count = Math.round((w * h) / 2600);
    for (let i = 0; i < count; i += 1) {
      const s = (i + seed) * 78.233;
      const x = (Math.sin(s) * 0.5 + 0.5) * w;
      const baseY = (Math.sin(s * 2.1) * 0.5 + 0.5) * h;
      const y = baseY + Math.sin(t * 0.5 + i * 0.4) * 5;
      const cluster = Math.max(0, 1 - Math.abs(x - w * 0.62) / (w * 0.5));
      ctx.fillStyle = alpha(palette.signal, 0.05 + cluster * 0.2);
      ctx.fillRect(x, y, 1.5, 1.5);
    }
  },

  scan(ctx, { w, h, t }) {
    const y = ((t * 34) % (h + 60)) - 30;
    const grad = ctx.createLinearGradient(0, y - 30, 0, y + 30);
    grad.addColorStop(0, alpha(palette.signal, 0));
    grad.addColorStop(0.5, alpha(palette.signal, 0.07));
    grad.addColorStop(1, alpha(palette.signal, 0));
    ctx.fillStyle = grad;
    ctx.fillRect(0, y - 30, w, 60);

    ctx.strokeStyle = alpha(palette.text, 0.05);
    ctx.lineWidth = 1;
    for (let gy = 0; gy < h; gy += 8) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
      ctx.stroke();
    }
  },

  lattice(ctx, { w, h, t }) {
    const step = 22;
    const lit = Math.floor(t * 4);
    let i = 0;
    for (let x = step; x < w; x += step) {
      for (let y = step; y < h; y += step) {
        i += 1;
        const on = (i + lit) % 17 === 0;
        ctx.fillStyle = on ? alpha(palette.live, 0.32) : alpha(palette.text, 0.08);
        ctx.fillRect(x, y, on ? 3 : 1.5, on ? 3 : 1.5);
      }
    }
  },
};
