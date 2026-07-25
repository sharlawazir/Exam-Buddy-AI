import { Sparkles, CalendarCheck, FileText, Brain, Lightbulb, Heart, Rocket } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/30 animate-float" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-900/30 animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300 mb-6 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5" />
          AI-powered exam preparation
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white animate-fade-in-up">
          Exam Buddy <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">AI</span>
        </h1>

        <p className="mt-4 text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-200 animate-fade-in-up-delay-1">
          Your Personal AI Study Partner
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 animate-fade-in-up-delay-2">
          Plan smarter, revise faster, understand difficult concepts, generate quizzes, summarize notes, and prepare for exams with the power of AI.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up-delay-2">
          {[
            { icon: CalendarCheck, label: 'Study Plans' },
            { icon: Brain, label: 'Quizzes' },
            { icon: Lightbulb, label: 'Explanations' },
            { icon: FileText, label: 'Summaries' },
            { icon: Heart, label: 'Motivation' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
            >
              <Icon className="h-4 w-4 text-blue-500" />
              {label}
            </div>
          ))}
        </div>

        <a
          href="#tools"
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:scale-105 transition-all animate-fade-in-up-delay-3"
        >
          <Rocket className="h-5 w-5" />
          Start Learning Now
        </a>
      </div>
    </section>
  );
}
