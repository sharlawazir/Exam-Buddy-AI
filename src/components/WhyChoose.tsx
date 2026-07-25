import { Clock, Zap, Target, Heart } from 'lucide-react';

const REASONS = [
  {
    icon: Clock,
    title: 'Save Study Time',
    description: 'Create personalised study plans in seconds.',
  },
  {
    icon: Zap,
    title: 'Learn Faster',
    description: 'Understand difficult concepts with simple AI explanations.',
  },
  {
    icon: Target,
    title: 'Practice with AI',
    description: 'Generate quizzes and test your knowledge instantly.',
  },
  {
    icon: Heart,
    title: 'Stay Motivated',
    description: 'Receive motivational study tips to stay focused.',
  },
];

export function WhyChoose() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Why Choose Exam Buddy AI?
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Everything you need to study smarter, not harder.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {REASONS.map(({ icon: Icon, title, description }, i) => (
          <div
            key={title}
            className={`group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1.5 hover:border-blue-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800 transition-all animate-fade-in-up-delay-${i + 1}`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
