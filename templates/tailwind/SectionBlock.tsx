import { ReactNode } from 'react';

interface SectionBlockProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function SectionBlock({ id, title, children, className = '' }: SectionBlockProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-12 sm:py-16 lg:py-20 ${className}`}
    >
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
        {children}
      </div>
    </section>
  );
}
