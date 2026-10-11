interface QuoteProps {
  text: string;
  source?: string;
  role?: string;
  variant?: 'default' | 'pullquote';
}

export function Quote({ text, source, role, variant = 'default' }: QuoteProps) {
  if (variant === 'pullquote') {
    return (
      <blockquote className="my-12 border-l-4 border-slate-900 pl-6 dark:border-white">
        <p className="text-2xl font-medium italic leading-relaxed text-slate-900 dark:text-white sm:text-3xl">
          "{text}"
        </p>
        {source && (
          <footer className="mt-4">
            <cite className="not-italic text-slate-600 dark:text-slate-400">
              — {source}
              {role && <span className="text-slate-500">, {role}</span>}
            </cite>
          </footer>
        )}
      </blockquote>
    );
  }

  return (
    <blockquote className="my-6 rounded-lg bg-slate-50 p-6 dark:bg-slate-800/50">
      <p className="text-lg italic text-slate-700 dark:text-slate-300">
        "{text}"
      </p>
      {source && (
        <footer className="mt-3">
          <cite className="text-sm not-italic text-slate-500 dark:text-slate-400">
            — {source}
            {role && <span>, {role}</span>}
          </cite>
        </footer>
      )}
    </blockquote>
  );
}
