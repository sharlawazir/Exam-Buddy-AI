import { type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string; // tailwind gradient classes e.g. "from-blue-500 to-sky-500"
  children: ReactNode;
}

export function FeatureCard({ id, icon: Icon, title, description, accent, children }: FeatureCardProps) {
  return (
    <section
      id={id}
      className="scroll-mt-20 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-800 animate-fade-in"
    >
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{description}</p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
