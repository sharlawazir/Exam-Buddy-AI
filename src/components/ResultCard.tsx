import { useState } from 'react';
import { Check, Copy, AlertCircle, Sparkles } from 'lucide-react';

interface ResultCardProps {
  loading: boolean;
  error: string | null;
  content: string | null;
  preview: boolean;
}

export function ResultCard({ loading, error, content, preview }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  if (loading) {
    return (
      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/50 dark:border-slate-700 dark:bg-slate-800/50 p-4 animate-fade-in">
        <div className="h-2 w-24 rounded-full bg-blue-200 dark:bg-slate-600 mb-3 animate-pulse" />
        <div className="h-2 w-3/4 rounded-full bg-blue-100 dark:bg-slate-700 mb-2 animate-pulse" />
        <div className="h-2 w-2/3 rounded-full bg-blue-100 dark:bg-slate-700 mb-2 animate-pulse" />
        <div className="h-2 w-1/2 rounded-full bg-blue-100 dark:bg-slate-700 animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40 p-4 animate-fade-in">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-700 dark:text-red-300">Something went wrong</p>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!content) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be blocked; silently ignore */
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 shadow-sm animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 px-5 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            AI Result
          </span>
          {preview && (
            <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
              Preview
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="px-5 py-4">
        <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-slate-700 dark:text-slate-200">
          {content}
        </pre>
      </div>
    </div>
  );
}
