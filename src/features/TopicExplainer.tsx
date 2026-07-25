import { useState, type FormEvent } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';
import { FeatureCard } from '@/components/FeatureCard';
import { ResultCard } from '@/components/ResultCard';
import { callAi, type AiResponse } from '@/lib/ai';

export function TopicExplainer() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiResponse | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setResult(null);
    const res = await callAi('topic-explainer', { topic });
    setResult(res);
    setLoading(false);
  };

  const inputCls =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400';

  return (
    <FeatureCard
      id="topic-explainer"
      icon={Lightbulb}
      title="Topic Explainer"
      description="Get a clear, structured explanation of any concept with analogies and examples."
      accent="from-amber-500 to-orange-500"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="te-topic" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
            Topic
          </label>
          <input
            id="te-topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Photosynthesis"
            className={inputCls}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/30 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          <Sparkles className="h-4 w-4" />
          {loading ? 'Explaining...' : 'Explain Topic'}
        </button>
      </form>

      <ResultCard loading={loading} error={result?.error ?? null} content={result?.content ?? null} preview={result?.preview ?? false} />
    </FeatureCard>
  );
}
