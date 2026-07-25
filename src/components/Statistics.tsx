import { BookOpen, Bot, GraduationCap } from 'lucide-react';

const STATS = [
  { icon: BookOpen, emoji: '📚', label: '5 AI Study Tools' },
  { icon: Bot, emoji: '🤖', label: 'Powered by Gemini AI' },
  { icon: GraduationCap, emoji: '🎓', label: 'Designed for University Students' },
];

export function Statistics() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {STATS.map(({ icon: Icon, emoji, label }, i) => (
          <div
            key={label}
            className={`group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-blue-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800 transition-all animate-fade-in-up-delay-${i + 1}`}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl">{emoji}</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
