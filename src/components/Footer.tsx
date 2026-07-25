import { BrainCircuit, Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
              <BrainCircuit className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">
              Exam Buddy <span className="text-blue-600 dark:text-blue-400">AI</span>
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Helping Students Study Smarter with AI
            </p>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Built by Sharla Wazir
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Powered by Gemini AI
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-blue-400 transition-colors"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
          © 2026 Exam Buddy AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
