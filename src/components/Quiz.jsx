import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions.js';
import { messages } from '../data/messages.js';
import { burst } from '../utils/confetti.js';

export default function Quiz({ onSubmit, onContinue }) {
  const [i, setI] = useState(0);
  const [sel, setSel] = useState({});
  const [reaction, setReaction] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [result, setResult] = useState(null);
  const q = quizQuestions[i];
  const last = i === quizQuestions.length - 1;
  const picked = sel[q.id];

  const pick = (k) => { setSel((s) => ({ ...s, [q.id]: k })); setReaction(messages.reactions[Math.floor(Math.random() * messages.reactions.length)]); };
  const go = (d) => { setI((n) => n + d); setReaction(''); setErr(''); };
  const finish = async () => {
    if (picked === undefined || busy) return;
    setBusy(true); setErr('');
    try {
      const payload = quizQuestions.map((x) => ({ questionId: x.id, question: x.question, selectedIndex: sel[x.id], selectedOption: x.options[sel[x.id]] }));
      const r = await onSubmit(payload);
      setResult(r); burst();
    } catch { setErr(messages.saveError); }
    setBusy(false);
  };

  if (result) {
    const pct = (result.score / result.total) * 100;
    const m = messages.scoreMessages.find((x) => pct >= x.min);
    return (
      <section className="card center">
        <motion.div className="score" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.6 }}>{result.score}/{result.total}</motion.div>
        <h2 className="hand big">{m.title}</h2><p>{m.text}</p>
        <button className="btn" onClick={onContinue}>Next 💗</button>
      </section>
    );
  }
  return (
    <section className="card">
      <h2 className="center">{messages.quizTitle}</h2>
      {i === 0 && <p className="notice">{messages.quizNotice}</p>}
      <p className="muted center">Question {i + 1} of {quizQuestions.length}</p>
      <div className="bar"><motion.i animate={{ width: `${((i + (picked !== undefined ? 1 : 0)) / quizQuestions.length) * 100}%` }} /></div>
      <AnimatePresence mode="wait">
        <motion.div key={q.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
          <h3 className="q">{q.question}</h3>
          <div className="opts" role="radiogroup">
            {q.options.map((o, k) => (
              <motion.button key={k} role="radio" aria-checked={picked === k} className={`opt ${picked === k ? 'on' : ''}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}
                animate={picked === k ? { rotate: [0, -2, 2, 0] } : {}} onClick={() => pick(k)}>{o}</motion.button>
            ))}
          </div>
          <p className="reaction" aria-live="polite">{reaction || '\u00a0'}</p>
        </motion.div>
      </AnimatePresence>
      {err && <p className="error" role="alert">{err}</p>}
      <div className="row">
        <button className="btn ghost" disabled={i === 0 || busy} onClick={() => go(-1)}><ChevronLeft size={18} /> Back</button>
        {last
          ? <button className="btn" disabled={picked === undefined || busy} onClick={finish}>{busy ? 'Saving... 💾' : err ? 'Try again 🔁' : 'Finish 💗'}</button>
          : <button className="btn" disabled={picked === undefined} onClick={() => go(1)}>Next <ChevronRight size={18} /></button>}
      </div>
      {picked === undefined && <p className="muted center small">Pick an answer to continue 👆</p>}
    </section>
  );
}
