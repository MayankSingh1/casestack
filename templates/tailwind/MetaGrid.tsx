interface MetaItem {
  label: string;
  value: string | string[];
}

interface MetaGridProps {
  items: MetaItem[];
  columns?: 2 | 3 | 4;
}

export function MetaGrid({ items, columns = 4 }: MetaGridProps) {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <dl className={`grid gap-6 ${gridCols[columns]}`}>
      {items.map((item, index) => (
        <div key={index}>
          <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {item.label}
          </dt>
          <dd className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
            {Array.isArray(item.value) ? item.value.join(', ') : item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
