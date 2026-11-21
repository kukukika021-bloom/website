import { motion } from 'framer-motion';
import { messages } from '../data/messages.js';
export default function Welcome({ onNext }) {
  const [l1, ...rest] = messages.welcome.lines;
  return (
    <section className="card center">
      <motion.svg viewBox="0 0 100 90" width="130" animate={{ scale: [1, 1.12, 1, 1.08, 1] }} transition={{ duration: 1.6, repeat: Infinity }}>
        <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffb3d1" /><stop offset="1" stopColor="#ff6fa5" /></linearGradient></defs>
        <path d="M50 85 C10 55 0 30 18 14 C32 2 46 10 50 22 C54 10 68 2 82 14 C100 30 90 55 50 85Z" fill="url(#g)" />
        <circle cx="38" cy="40" r="4" fill="#5b3a56" /><circle cx="62" cy="40" r="4" fill="#5b3a56" />
        <ellipse cx="30" cy="50" rx="7" ry="4" fill="#ff8fb8" opacity=".6" /><ellipse cx="70" cy="50" rx="7" ry="4" fill="#ff8fb8" opacity=".6" />
        <path d="M44 52 Q50 58 56 52" stroke="#5b3a56" strokeWidth="3" fill="none" strokeLinecap="round" />
      </motion.svg>
      <h1 className="hand big">{l1}</h1>
      {rest.map((t, i) => <motion.p key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.5 }}>{t}</motion.p>)}
      <motion.button className="btn" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92, rotate: -2 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }} onClick={onNext}>{messages.welcome.button}</motion.button>
    </section>
  );
}
