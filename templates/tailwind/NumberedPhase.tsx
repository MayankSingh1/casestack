interface NumberedPhaseProps {
  current: number;
  total: number;
  title: string;
  showProgress?: boolean;
}

export function NumberedPhase({
  current,
  total,
  title,
  showProgress = true,
}: NumberedPhaseProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {current}
        </span>
        <span className="text-lg text-slate-400 dark:text-slate-500">
          /{total}
        </span>
      </div>
      
      {showProgress && (
        <div className="hidden h-1 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 sm:block">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500 dark:bg-blue-400"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
    </div>
  );
}
