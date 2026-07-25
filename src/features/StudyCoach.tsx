import { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { FeatureCard } from '@/components/FeatureCard';
import { ResultCard } from '@/components/ResultCard';
import { callAi, type AiResponse } from '@/lib/ai';

export function StudyCoach() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiResponse | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setResult(null);
    const res = await callAi('study-coach', {});
    setResult(res);
    setLoading(false);
  };

  return (
    <FeatureCard
      id="study-coach"
      icon={Heart}
      title="Study Coach"
      description="Need a boost? Get a personalized motivational message and a practical study tip."
      accent="from-rose-500 to-pink-500"
    >
      <button
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-500/30 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        <Sparkles className="h-4 w-4" />
        {loading ? 'Coaching...' : 'Motivate Me'}
      </button>

      <ResultCard loading={loading} error={result?.error ?? null} content={result?.content ?? null} preview={result?.preview ?? false} />
    </FeatureCard>
  );
}
