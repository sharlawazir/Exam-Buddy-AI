import { Info } from 'lucide-react';

export function About() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 animate-fade-in">
          <Info className="h-7 w-7" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white animate-fade-in-up">
          About Exam Buddy AI
        </h2>
        <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 animate-fade-in-up-delay-1">
          Exam Buddy AI is an AI-powered study assistant designed to help university students prepare for exams. It combines study planning, concept explanations, quiz generation, note summarization, motivation, and AI chat into one easy-to-use platform.
        </p>
      </div>
    </section>
  );
}
