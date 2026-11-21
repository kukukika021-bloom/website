export default function ProgressBar({ steps, current }) {
  return (
    <nav className="progress" aria-label="Progress">
      {steps.map((s, i) => (
        <span key={s} className={`dot ${i < current ? 'done' : ''} ${i === current ? 'now' : ''}`} title={s}>{i <= current ? '💗' : '🤍'}</span>
      ))}
    </nav>
  );
}
