import { useState } from 'react';
import { motion } from 'framer-motion';
import { messages } from '../data/messages.js';
import { burst } from '../utils/confetti.js';

const f = messages.final;
export default function FinalSurprise({ onRestart }) {
  const [open, setOpen] = useState(false);
  const openIt = () => { setOpen(true); setTimeout(() => burst(true), 450); setTimeout(() => burst(), 1100); };
  return (
    <section className="card center">
      {!open && <h2>{f.heading}</h2>}
      <div className={`gift ${open ? 'open' : ''}`} aria-hidden="true"><div className="lid" /><div className="box" /></div>
      {!open && <motion.button className="btn" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92 }} onClick={openIt}>{f.button}</motion.button>}
      {open && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <h1 className="hand big">{f.title}</h1>
          <p>{f.sub}</p>
          <ul className="perks">{f.perks.map((p, i) => <motion.li key={p} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 + i * 0.3 }}>{p}</motion.li>)}</ul>
          <p>{f.outro}</p><p><b>{f.refunds}</b></p>
          <p className="hand foot">{f.footer}</p>
          <button className="btn ghost" onClick={onRestart}>{f.restart}</button>
        </motion.div>
      )}
    </section>
  );
}
