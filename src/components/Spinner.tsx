import { Loader2 } from 'lucide-react';

export function Spinner({ label = 'Generating...' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-8 text-blue-600 dark:text-blue-400">
      <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
