const BASE = import.meta.env.VITE_API_URL || '/api';
async function post(body) {
  let res;
  try {
    res = await fetch(`${BASE}/quiz/submit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  } catch { throw new Error('Cannot reach the server'); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message || 'Server error');
  return data; // only returned once the server confirms the save
}
export const submitQuiz = (submissionId, answers) => post({ submissionId, stage: 'quiz', answers });
export const submitFinal = (submissionId, yesClicked, noAttempts) => post({ submissionId, stage: 'final', yesClicked, noAttempts });
