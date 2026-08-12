import { useEffect, useRef } from 'react';
import { useCanvas } from '../../hooks/useCanvas';
import { palette, alpha } from '../../lib/palette';
import { BONES, FINGER_TIPS, poseAt, contactAt } from '../../lib/hand';

/**
 * The hero rendering: a tracked hand cycling through a grasp, drawn the way the
 * capture rig sees it. Keypoints are amber, the loaded contact frames go cyan, and the
 * index fingertip leaves the trace the vectorizer actually fits.
 *
 * Pointer parallax is read from a ref, never from React state, so moving the mouse
 * does not re-render the tree.
 *
 * @param {{onFrame?: (info: {closure: number, contact: boolean, frame: number}) => void,
 *          cycle?: number}} props
 */
export function HandCloud({ onFrame, cycle = 5.5 }) {
  const tilt = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const trail = useRef([]);
  const reportRef = useRef(onFrame);
  reportRef.current = onFrame;

  useEffect(() => {
    const onMove = (event) => {
      tilt.current.tx = (event.clientX / window.innerWidth - 0.5) * 2;
      tilt.current.ty = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const canvasRef = useCanvas((ctx, { w, h, t }) => {
    const phase = (t % cycle) / cycle;
    const { points, closure } = poseAt(phase);
    const contact = contactAt(phase);

    // Ease the parallax so a fast mouse does not snap the scene.
    tilt.current.x += (tilt.current.tx - tilt.current.x) * 0.06;
    tilt.current.y += (tilt.current.ty - tilt.current.y) * 0.06;

    const scale = Math.min(w, h) * 0.62;
    const cx = w / 2 + tilt.current.x * w * 0.035;
    const cy = h / 2 + tilt.current.y * h * 0.03;
    const project = (p) => ({
      x: cx + p.x * scale * (1 + p.z * 0.14) + tilt.current.x * p.z * 26,
      y: cy - p.y * scale * (1 + p.z * 0.14) + tilt.current.y * p.z * 20,
      z: p.z,
    });

    const screen = points.map(project);

    drawDepthField(ctx, w, h, screen, t);

    // Bones as hairlines. The skeleton is structure, not decoration, so it stays thin.
    ctx.lineWidth = 1;
    for (const [a, b] of BONES) {
      const pa = screen[a];
      const pb = screen[b];
      const depth = (pa.z + pb.z) / 2;
      ctx.strokeStyle = alpha(contact ? palette.live : palette.signal, 0.2 + depth * 0.28);
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    }

    // Index fingertip trace, the path the vectorizer fits per sequence.
    const tip = screen[8];
    trail.current.push({ x: tip.x, y: tip.y });
    if (trail.current.length > 90) trail.current.shift();
    ctx.beginPath();
    trail.current.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.strokeStyle = alpha(palette.live, 0.32);
    ctx.lineWidth = 1;
    ctx.stroke();

    // Keypoints. Radius carries depth, fill carries contact state.
    screen.forEach((p, i) => {
      const isTip = FINGER_TIPS.includes(i);
      const r = (i === 0 ? 3.6 : isTip ? 2.9 : 2.1) * (1 + p.z * 0.5);
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(1, r), 0, Math.PI * 2);
      ctx.fillStyle = contact && isTip ? palette.live : palette.signal;
      ctx.globalAlpha = 0.55 + p.z * 0.4;
      ctx.fill();
      ctx.globalAlpha = 1;

      if (isTip) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(2, r + 4.5), 0, Math.PI * 2);
        ctx.strokeStyle = alpha(contact ? palette.live : palette.signal, 0.28);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    reportRef.current?.({
      closure,
      contact,
      frame: Math.floor(phase * 480),
    });
  });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="h-full w-full"
      style={{ background: palette.ink }}
    />
  );
}

/*
  A sparse dot field that brightens near the hand. It stands in for the depth stream:
  the rig knows where the volume is occupied, not just where the joints are.
*/
function drawDepthField(ctx, w, h, screen, t) {
  const step = 26;
  const wrist = screen[0];
  ctx.save();
  for (let x = step / 2; x < w; x += step) {
    for (let y = step / 2; y < h; y += step) {
      const d = Math.hypot(x - wrist.x, y - wrist.y);
      const near = Math.max(0, 1 - d / (Math.min(w, h) * 0.62));
      if (near <= 0.02) continue;
      const flicker = 0.72 + 0.28 * Math.sin(t * 1.6 + x * 0.05 + y * 0.03);
      ctx.fillStyle = alpha(palette.signal, near * near * 0.3 * flicker);
      ctx.fillRect(x, y, 1.4, 1.4);
    }
  }
  ctx.restore();
}
