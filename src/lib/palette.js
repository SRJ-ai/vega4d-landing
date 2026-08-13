/*
  Canvas cannot read CSS custom properties, so the renderers read from here.
  These values mirror src/styles/tokens.css. Change both together.
*/

export const palette = {
  ink: '#0c0a09',
  panel: '#131110',
  line: 'rgba(240, 230, 211, 0.10)',
  lineStrong: 'rgba(240, 230, 211, 0.22)',
  text: '#f0e6d3',
  textDim: '#8b8171',
  signal: '#c8e64a',
  signalDeep: '#a9c72e',
  live: '#d9f56b',
};

/** rgba() from a hex value plus alpha, so renderers can fade a palette colour. */
export function alpha(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
