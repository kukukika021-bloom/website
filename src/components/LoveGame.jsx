import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { messages } from '../data/messages.js';
import { burst } from '../utils/confetti.js';

const g = messages.game;
export default function LoveGame({ onSave, onNext }) {
  const [no, setNo] = useState(0);
  const [pos, setPos] = useState({ x: 62, y: 62 });
  const [msg, setMsg] = useState('');
  const [yes, setYes] = useState(false);
  const [save, setSave] = useState('idle'); // idle | saving | saved | error
  const last = useRef(0);
  const enough = no >= g.maxNo;

  const dodge = () => {
    const now = Date.now();
    if (now - last.current < 300) return; // avoid double-counting hover + tap
    last.current = now;
    const n = no + 1;
    setNo(n);
    setPos({ x: 5 + Math.random() * 65, y: 45 + Math.random() * 45 });
    setMsg(n >= g.maxNo ? g.enough : g.noReplies[Math.floor(Math.random() * g.noReplies.length)]);
  };
  const doSave = async (count) => {
    setSave('saving');
    try { await onSave(true, count); setSave('saved'); } catch { setSave('error'); }
  };
  const onYes = () => { if (yes) return; setYes(true); burst(true); doSave(no); };

  return (
    <section className="card center">
      <h2>{g.heading}</h2>
      <h1 className="hand big">{g.question}</h1>
      {!yes ? (
        <>
          <div className="arena">
            <motion.button className="btn yes" animate={{ scale: 1 + Math.min(no, g.maxNo) * 0.12 }} whileTap={{ scale: 0.9 }} onClick={onYes}>{g.yes}</motion.button>
            {!enough && (
              <motion.button className="btn ghost nobtn" style={{ left: `${pos.x}%`, top: `${pos.y}%` }} animate={{ scale: Math.max(0.6, 1 - no * 0.07) }}
                onPointerEnter={(e) => e.pointerType === 'mouse' && dodge()} onClick={dodge}>{g.no}</motion.button>
            )}
          </div>
          <p className="reaction" aria-live="polite">{msg || '\u00a0'}</p>
        </>
      ) : (
        <>
          <motion.h2 className="hand big" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.6 }}>{g.success}</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>{g.followUp}</motion.p>
          <p className={save === 'error' ? 'error' : 'muted'} aria-live="polite">{save === 'saving' ? g.saving : save === 'saved' ? g.saved : save === 'error' ? g.saveError : ''}</p>
          {save === 'error' && <button className="btn ghost" onClick={() => doSave(no)}>{g.retry}</button>}
          <button className="btn" disabled={save !== 'saved'} onClick={onNext}>{g.next}</button>
        </>
      )}
    </section>
  );
}
