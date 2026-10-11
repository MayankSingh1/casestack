interface Metric {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

interface MetricCalloutProps {
  metrics: Metric[];
  columns?: 2 | 3 | 4;
}

export function MetricCallout({ metrics, columns = 3 }: MetricCalloutProps) {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={`my-8 grid gap-4 rounded-2xl bg-slate-50 p-6 dark:bg-slate-800/50 sm:gap-6 sm:p-8 ${gridCols[columns]}`}
    >
      {metrics.map((metric, index) => (
        <div key={index} className="text-center">
          <p className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {metric.value}
          </p>
          {metric.change && (
            <p
              className={`mt-1 text-sm font-semibold ${
                metric.positive !== false
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {metric.change}
            </p>
          )}
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}
