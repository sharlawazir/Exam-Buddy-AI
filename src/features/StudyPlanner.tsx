import { useState, type FormEvent } from 'react';
import { CalendarCheck, Sparkles } from 'lucide-react';
import { FeatureCard } from '@/components/FeatureCard';
import { ResultCard } from '@/components/ResultCard';
import { callAi, type AiResponse } from '@/lib/ai';

export function StudyPlanner() {
  const [subject, setSubject] = useState('');
  const [examDate, setExamDate] = useState('');
  const [hours, setHours] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiResponse | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !examDate || !hours.trim()) return;
    setLoading(true);
    setResult(null);
    const res = await callAi('study-planner', { subject, examDate, hours });
    setResult(res);
    setLoading(false);
  };

  const inputCls =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400';
  const labelCls = 'block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5';

  return (
    <FeatureCard
      id="study-planner"
      icon={CalendarCheck}
      title="Study Planner"
      description="Generate a personalized day-by-day study plan tailored to your exam timeline."
      accent="from-blue-500 to-sky-500"
    >
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="sp-subject" className={labelCls}>Subject</label>
          <input
            id="sp-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Organic Chemistry"
            className={inputCls}
            required
          />
        </div>
        <div>
          <label htmlFor="sp-date" className={labelCls}>Exam Date</label>
          <input
            id="sp-date"
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className={inputCls}
            required
          />
        </div>
        <div>
          <label htmlFor="sp-hours" className={labelCls}>Hours / Day</label>
          <input
            id="sp-hours"
            type="number"
            min="1"
            max="16"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="e.g. 3"
            className={inputCls}
            required
          />
        </div>
        <div className="sm:col-span-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/30 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            <Sparkles className="h-4 w-4" />
            {loading ? 'Generating...' : 'Generate Study Plan'}
          </button>
        </div>
      </form>

      <ResultCard loading={loading} error={result?.error ?? null} content={result?.content ?? null} preview={result?.preview ?? false} />
    </FeatureCard>
  );
}
