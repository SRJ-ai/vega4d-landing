import { useCanvas } from '../../hooks/useCanvas';
import { palette, alpha } from '../../lib/palette';
import { poseAt } from '../../lib/hand';

/**
 * One small renderer per pipeline stage. Each one draws what that stage does to the
 * data rather than an icon standing in for it.
 *
 * @param {{variant: 'capture' | 'vectorize' | 'validate' | 'ship'}} props
 */
export function StageGlyph({ variant }) {
  const canvasRef = useCanvas(
    (ctx, frame) => {
      const draw = RENDERERS[variant];
      if (draw) draw(ctx, frame);
    },
    { deps: [variant] },
  );

  return <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />;
}

const RENDERERS = {
  /* Twelve cameras on a ring, sweeping the volume in sync. */
  capture(ctx, { w, h, t }) {
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.36;

    ctx.strokeStyle = alpha(palette.text, 0.08);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.42, 0, 0, Math.PI * 2);
    ctx.stroke();

    const sweep = (t * 0.55) % 1;
    for (let i = 0; i < 12; i += 1) {
      const a = (i / 12) * Math.PI * 2;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r * 0.42;
      const active = Math.abs(((i / 12) % 1) - sweep) < 0.09;

      ctx.strokeStyle = alpha(active ? palette.live : palette.signal, active ? 0.7 : 0.22);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(cx, cy);
      ctx.stroke();

      ctx.fillStyle = active ? palette.live : alpha(palette.signal, 0.6);
      ctx.fillRect(x - 2.5, y - 2.5, 5, 5);
    }

    ctx.fillStyle = palette.text;
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
  },

  /* A noise cloud on the left resolving into a fitted skeleton on the right. */
  vectorize(ctx, { w, h, t }) {
    const { points } = poseAt((t * 0.16) % 1);
    const scale = Math.min(w, h) * 0.62;
    const cy = h / 2;

    for (let i = 0; i < 140; i += 1) {
      const seed = i * 12.9898;
      const rx = (Math.sin(seed) * 0.5 + 0.5) * w * 0.42;
      const ry = (Math.sin(seed * 1.7) * 0.5 + 0.5) * h;
      const jitter = Math.sin(t * 2 + i) * 1.6;
      ctx.fillStyle = alpha(palette.text, 0.16);
      ctx.fillRect(rx + jitter, ry, 1.3, 1.3);
    }

    ctx.strokeStyle = alpha(palette.signal, 0.5);
    ctx.lineWidth = 1;
    points.forEach((p, i) => {
      if (i === 0) return;
      const x = w * 0.68 + p.x * scale * 0.6;
      const y = cy - p.y * scale * 0.6;
      ctx.beginPath();
      ctx.arc(x, y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = palette.signal;
      ctx.fill();
      if (i % 4 !== 1) {
        const prev = points[i - 1];
        ctx.beginPath();
        ctx.moveTo(w * 0.68 + prev.x * scale * 0.6, cy - prev.y * scale * 0.6);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    });

    ctx.strokeStyle = alpha(palette.live, 0.4);
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(w * 0.46, h * 0.12);
    ctx.lineTo(w * 0.46, h * 0.88);
    ctx.stroke();
    ctx.setLineDash([]);
  },

  /* Source trace, fitted trace, and the tolerance band between them. */
  validate(ctx, { w, h, t }) {
    const mid = h / 2;
    const band = h * 0.13;

    ctx.fillStyle = alpha(palette.signal, 0.07);
    ctx.fillRect(0, mid - band, w, band * 2);

    ctx.strokeStyle = alpha(palette.text, 0.22);
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 4) {
      const y = mid + Math.sin(x * 0.035 + t * 0.9) * band * 0.72;
      if (x) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
    }
    ctx.stroke();

    let rejected = false;
    ctx.strokeStyle = palette.signal;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 4) {
      const drift = Math.sin(x * 0.02 + t * 0.4) * band * 0.5;
      const y = mid + Math.sin(x * 0.035 + t * 0.9) * band * 0.72 + drift * 0.34;
      if (Math.abs(y - mid) > band) rejected = true;
      if (x) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
    }
    ctx.stroke();

    if (rejected) {
      ctx.strokeStyle = alpha(palette.signalDeep, 0.85);
      ctx.lineWidth = 1;
      ctx.strokeRect(w - 34, mid - band - 8, 26, 16);
    }
  },

  /* Sequences packing into fixed shards, with a checksum tick per completed shard. */
  ship(ctx, { w, h, t }) {
    const cols = 14;
    const rows = 6;
    const cw = (w - 16) / cols;
    const ch = (h - 16) / rows;
    const filled = Math.floor(((t * 7) % (cols * rows + 12)) | 0);

    for (let i = 0; i < cols * rows; i += 1) {
      const x = 8 + (i % cols) * cw;
      const y = 8 + Math.floor(i / cols) * ch;
      const on = i < filled;
      ctx.fillStyle = on ? alpha(palette.signal, 0.72) : alpha(palette.text, 0.07);
      ctx.fillRect(x, y, cw - 3, ch - 3);
    }

    const done = Math.min(rows, Math.floor(filled / cols));
    ctx.strokeStyle = palette.live;
    ctx.lineWidth = 1.4;
    for (let r = 0; r < done; r += 1) {
      const y = 8 + r * ch + ch / 2 - 2;
      ctx.beginPath();
      ctx.moveTo(w - 6, y);
      ctx.lineTo(w - 3, y + 3);
      ctx.lineTo(w + 2, y - 3);
      ctx.stroke();
    }
  },
};
