import { MousePointerClick, Keyboard, Sparkles } from 'lucide-react';

const STEPS = [
  {
    icon: MousePointerClick,
    number: '1',
    title: 'Choose a Tool',
    description:
      'Select Study Planner, Quiz Generator, Topic Explainer, Notes Summarizer, Study Coach, or AI Chat.',
  },
  {
    icon: Keyboard,
    number: '2',
    title: 'Enter Your Topic',
    description: 'Type your subject, question, or notes.',
  },
  {
    icon: Sparkles,
    number: '3',
    title: 'Get Instant AI Help',
    description: 'Receive fast, clear, and personalised responses powered by Grok AI.',
  },
];

export function HowItWorks() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900/50 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            How It Works
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Three simple steps to better exam preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map(({ icon: Icon, number, title, description }, i) => (
            <div
              key={title}
              className={`relative text-center animate-fade-in-up-delay-${i + 1}`}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/30">
                <Icon className="h-7 w-7" />
              </div>
              <div className="absolute top-0 right-1/2 translate-x-10 -translate-y-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-blue-600 border border-blue-200 dark:bg-slate-800 dark:text-blue-400 dark:border-blue-800">
                {number}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-xs mx-auto">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
