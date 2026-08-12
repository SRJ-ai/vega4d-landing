/*
  Canvas cannot read CSS custom properties, so the renderers read from here.
  These values mirror src/styles/tokens.css. Change both together.
*/

export const palette = {
  ink: '#05060a',
  panel: '#0b0e16',
  line: 'rgba(233, 238, 247, 0.10)',
  lineStrong: 'rgba(233, 238, 247, 0.22)',
  text: '#eef2f8',
  textDim: '#7a8494',
  signal: '#ffb24d',
  signalDeep: '#ff7a18',
  live: '#6ee7f9',
};

/** rgba() from a hex value plus alpha, so renderers can fade a palette colour. */
export function alpha(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
