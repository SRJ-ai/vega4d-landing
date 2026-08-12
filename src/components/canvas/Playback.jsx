import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { animate, utils } from 'animejs';
import { useCanvas } from '../../hooks/useCanvas';
import { palette, alpha } from '../../lib/palette';
import { BONES, FINGER_TIPS, READOUTS, poseAt, contactAt, flexionDeg } from '../../lib/hand';

const TOTAL_FRAMES = 480;

/**
 * Scrubbable playback of one capture sequence.
 *
 * The playhead advances on its own until the visitor takes the timeline, then it follows
 * them. Nothing here goes through React state: the loop writes the canvas, the range
 * input's value, and the readout text nodes directly, so dragging costs no re-renders.
 *
 * Which joints are reported comes from the hand model, not from props.
 */
export function Playback() {
  const phase = useRef(0);
  const scrubbing = useRef(false);
  const lastAuto = useRef(0);
  const rangeRef = useRef(null);
  const valueRefs = useRef([]);
  const frameRef = useRef(null);
  const contactRef = useRef(null);
  const reduce = useReducedMotion();

  const canvasRef = useCanvas((ctx, { w, h, t }) => {
    if (!scrubbing.current && !reduce) {
      const dt = lastAuto.current ? t - lastAuto.current : 0;
      phase.current = (phase.current + dt / 7) % 1;
      if (rangeRef.current) rangeRef.current.value = String(Math.round(phase.current * 1000));
    }
    lastAuto.current = t;

    const p = phase.current;
    const { points, closure } = poseAt(p);
    const contact = contactAt(p);

    const splitX = w > 720 ? w * 0.46 : w;
    drawSkeleton(ctx, points, splitX, h, contact);
    if (w > 720) drawLanes(ctx, splitX, 0, w - splitX, h, p);

    // Readouts are DOM text, so the values stay selectable and screen-reader visible.
    const els = valueRefs.current;
    READOUTS.forEach(([, finger, joint], i) => {
      const el = els[i];
      if (!el) return;
      el.textContent = `${utils.round(flexionDeg(closure, finger, joint), 1).toFixed(1)}°`;
    });
    if (frameRef.current) {
      frameRef.current.textContent = String(Math.round(p * TOTAL_FRAMES)).padStart(3, '0');
    }
    if (contactRef.current) {
      const on = contact;
      contactRef.current.textContent = on ? 'LOADED' : 'OPEN';
      contactRef.current.style.color = on ? palette.live : palette.textDim;
    }
  });

  // anime.js drives the one-off acknowledgement when the visitor grabs the timeline.
  useEffect(() => {
    const el = rangeRef.current;
    if (!el || reduce) return undefined;

    const onPointerDown = () => {
      scrubbing.current = true;
      animate(el, { scale: [1, 1.012, 1], duration: 420, ease: 'outQuad' });
    };
    const onPointerUp = () => {
      scrubbing.current = false;
    };
    const onInput = () => {
      phase.current = Number(el.value) / 1000;
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('input', onInput);
    window.addEventListener('pointerup', onPointerUp);
    el.addEventListener('keydown', () => {
      scrubbing.current = true;
    });
    el.addEventListener('blur', onPointerUp);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('input', onInput);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [reduce]);

  return (
    <div className="u-bezel bg-[var(--ink-100)]">
      <div className="relative h-[300px] sm:h-[380px] lg:h-[440px]">
        <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
      </div>

      {/* The canvas is hidden from assistive tech, so its lanes are named here. */}
      <p className="sr-only">
        A hand skeleton plays back beside three signal lanes: {LANES.join(', ')}. The joint
        angles, frame number, and contact state below update as the sequence plays.
      </p>

      <div className="grid grid-cols-2 border-t border-[var(--line-100)] sm:grid-cols-3 lg:grid-cols-6">
        {READOUTS.map(([label], i) => (
          <div
            key={label}
            className="border-r border-b border-[var(--line-100)] px-4 py-3 last:border-r-0 sm:border-b-0"
          >
            <div className="u-mono text-[10px] tracking-[0.14em] text-[var(--text-300)] uppercase">
              {label}
            </div>
            <div
              ref={(el) => {
                valueRefs.current[i] = el;
              }}
              className="u-num mt-1 text-[15px] text-[var(--text-100)]"
            >
              0.0&deg;
            </div>
          </div>
        ))}
        <div className="border-r border-b border-[var(--line-100)] px-4 py-3 sm:border-b-0">
          <div className="u-mono text-[10px] tracking-[0.14em] text-[var(--text-300)] uppercase">
            Frame
          </div>
          <div ref={frameRef} className="u-num mt-1 text-[15px] text-[var(--text-100)]">
            000
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="u-mono text-[10px] tracking-[0.14em] text-[var(--text-300)] uppercase">
            Contact
          </div>
          <div ref={contactRef} className="u-mono mt-1 text-[15px] text-[var(--text-300)]">
            OPEN
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--line-100)] px-4 py-4">
        <label htmlFor="scrub" className="u-mono sr-only">
          Scrub the capture sequence
        </label>
        <input
          ref={rangeRef}
          id="scrub"
          type="range"
          min="0"
          max="1000"
          defaultValue="0"
          className="v4-scrub w-full"
          aria-label="Scrub the capture sequence"
        />
      </div>
    </div>
  );
}

/* The hand, drawn large. Same skeleton the hero uses, at playback scale. */
function drawSkeleton(ctx, points, w, h, contact) {
  const scale = Math.min(w, h) * 0.58;
  const cx = w / 2;
  const cy = h / 2;
  const screen = points.map((p) => ({
    x: cx + p.x * scale * (1 + p.z * 0.12),
    y: cy - p.y * scale * (1 + p.z * 0.12),
    z: p.z,
  }));

  ctx.save();
  ctx.strokeStyle = alpha(palette.text, 0.06);
  ctx.lineWidth = 1;
  for (let gx = 0; gx < w; gx += 40) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, h);
    ctx.stroke();
  }
  ctx.restore();

  ctx.lineWidth = 1.2;
  for (const [a, b] of BONES) {
    const pa = screen[a];
    const pb = screen[b];
    ctx.strokeStyle = alpha(contact ? palette.live : palette.signal, 0.34 + (pa.z + pb.z) * 0.2);
    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);
    ctx.lineTo(pb.x, pb.y);
    ctx.stroke();
  }

  screen.forEach((p, i) => {
    const isTip = FINGER_TIPS.includes(i);
    ctx.beginPath();
    ctx.arc(p.x, p.y, (isTip ? 3.4 : 2.4) * (1 + p.z * 0.4), 0, Math.PI * 2);
    ctx.fillStyle = contact && isTip ? palette.live : palette.signal;
    ctx.globalAlpha = 0.6 + p.z * 0.35;
    ctx.fill();
    ctx.globalAlpha = 1;
  });
}

const LANES = ['Grip closure', 'Tactile pressure', 'Depth occupancy'];

/* Three signal lanes with a playhead, labelled in place so a reader knows which is which. */
function drawLanes(ctx, x0, y0, w, h, phase) {
  const lanes = LANES.length;
  const laneH = h / lanes;

  ctx.save();
  ctx.translate(x0, y0);

  ctx.strokeStyle = alpha(palette.text, 0.1);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, h);
  ctx.stroke();

  for (let l = 0; l < lanes; l += 1) {
    const top = l * laneH;
    const mid = top + laneH / 2;

    ctx.strokeStyle = alpha(palette.text, 0.08);
    ctx.beginPath();
    ctx.moveTo(0, top);
    ctx.lineTo(w, top);
    ctx.stroke();

    ctx.font = '10px "Azeret Mono", ui-monospace, monospace';
    ctx.fillStyle = palette.textDim;
    ctx.fillText(LANES[l].toUpperCase(), 14, top + 18);

    ctx.strokeStyle = alpha(palette.signal, 0.5);
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 3) {
      const u = x / w;
      const { closure } = poseAt(u);
      const value =
        l === 0
          ? closure
          : l === 1
            ? Math.max(0, closure - 0.35) * 1.5
            : 0.4 + Math.sin(u * 9) * 0.16 * closure;
      const y = mid + (0.5 - value) * laneH * 0.62;
      if (x) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
    }
    ctx.stroke();
  }

  const px = phase * w;
  ctx.strokeStyle = alpha(palette.live, 0.85);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(px, 0);
  ctx.lineTo(px, h);
  ctx.stroke();
  ctx.fillStyle = palette.live;
  ctx.fillRect(px - 2.5, 0, 5, 3);

  ctx.restore();
}
