import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Welcome from './components/Welcome.jsx';
import Quiz from './components/Quiz.jsx';
import LoveGame from './components/LoveGame.jsx';
import Confession from './components/Confession.jsx';
import FinalSurprise from './components/FinalSurprise.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import { submitQuiz, submitFinal } from './services/api.js';
import { newId } from './utils/confetti.js';

const STEPS = ['Hello', 'Quiz', 'Question', 'Letter', 'Surprise'];

function Floaters() {
  const items = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    e: ['💗', '✨', '💖', '🤍', '✨'][i % 5], left: Math.random() * 100, size: 12 + Math.random() * 18,
    dur: 12 + Math.random() * 14, delay: -Math.random() * 20 })), []);
  return <div className="floaters" aria-hidden="true">{items.map((h, i) => (
    <span key={i} style={{ left: `${h.left}%`, fontSize: h.size, animationDuration: `${h.dur}s`, animationDelay: `${h.delay}s` }}>{h.e}</span>))}</div>;
}

export default function App() {
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  const [id, setId] = useState(newId);
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const restart = () => { setId(newId()); setStep(0); setRun((r) => r + 1); };
  const screens = [
    <Welcome onNext={next} />,
    <Quiz onSubmit={(answers) => submitQuiz(id, answers)} onContinue={next} />,
    <LoveGame onSave={(yes, no) => submitFinal(id, yes, no)} onNext={next} />,
    <Confession onNext={next} />,
    <FinalSurprise onRestart={restart} />,
  ];
  return (
    <div className="app">
      <Floaters />
      <ProgressBar steps={STEPS} current={step} />
      <AnimatePresence mode="wait">
        <motion.main key={`${run}-${step}`} className="screen" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -24, scale: 0.98 }} transition={{ duration: 0.4 }}>
          {screens[step]}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
