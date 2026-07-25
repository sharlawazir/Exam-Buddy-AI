import { BrainCircuit, MessageCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface NavbarProps {
  onOpenChat: () => void;
}

export function Navbar({ onOpenChat }: NavbarProps) {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Exam Buddy <span className="text-blue-600 dark:text-blue-400">AI</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {[
              ['Study Planner', '#study-planner'],
              ['Quiz Generator', '#quiz-generator'],
              ['Topic Explainer', '#topic-explainer'],
              ['Notes Summarizer', '#notes-summarizer'],
              ['Study Coach', '#study-coach'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:text-blue-400 dark:hover:bg-slate-800 transition-colors"
              >
                {label}
              </a>
            ))}
            <button
              onClick={onOpenChat}
              className="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              AI Chat
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenChat}
              aria-label="Ask Exam Buddy"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-blue-400 transition-colors md:hidden"
            >
              <MessageCircle className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
