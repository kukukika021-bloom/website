import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { messages } from '../data/messages.js';

const c = messages.confession;
const full = c.letter.join('\n\n');
export default function Confession({ onNext }) {
  const [open, setOpen] = useState(false);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!open) return undefined;
    const t = setInterval(() => setN((v) => { if (v >= full.length) { clearInterval(t); return v; } return v + 1; }), 38);
    return () => clearInterval(t);
  }, [open]);
  const done = n >= full.length;
  return (
    <section className="card center">
      {!open && <h2>{c.intro}</h2>}
      <div className={`envelope ${open ? 'open' : ''}`} aria-hidden="true">
        <div className="paper" /><div className="flap" /><div className="front" /><span className="seal">💗</span>
      </div>
      {!open && <motion.button className="btn" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92 }} onClick={() => setOpen(true)}>{c.button}</motion.button>}
      {open && (
        <motion.div className="letter" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <p className="hand">{full.slice(0, done ? full.length : n)}{!done && <span className="caret">|</span>}</p>
        </motion.div>
      )}
      {open && (done
        ? <motion.button className="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onNext}>{c.next}</motion.button>
        : <button className="btn ghost small" onClick={() => setN(full.length)}>{c.skip}</button>)}
    </section>
  );
}
