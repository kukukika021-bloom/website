import confetti from 'canvas-confetti';
export function burst(big = false) {
  const colors = ['#ff9ec7', '#c9b6ff', '#ffd6c0', '#ffffff', '#ff6fa5'];
  const heart = confetti.shapeFromText ? confetti.shapeFromText({ text: '💗', scalar: 2 }) : null;
  const o = { colors, ticks: 220, disableForReducedMotion: true };
  confetti({ ...o, particleCount: big ? 120 : 70, spread: 90, origin: { y: 0.65 } });
  if (heart) confetti({ ...o, particleCount: big ? 30 : 16, spread: 120, scalar: 2, shapes: [heart], origin: { y: 0.65 } });
}
export const newId = () => (crypto.randomUUID ? crypto.randomUUID()
  : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 3) | 8).toString(16); }));
