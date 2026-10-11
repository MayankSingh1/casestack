import styles from './MetaGrid.module.css';

interface MetaItem {
  label: string;
  value: string | string[];
}

interface MetaGridProps {
  items: MetaItem[];
  columns?: 2 | 3 | 4;
}

export function MetaGrid({ items, columns = 4 }: MetaGridProps) {
  const columnClass = {
    2: styles.cols2,
    3: styles.cols3,
    4: styles.cols4,
  }[columns];

  return (
    <dl className={`${styles.grid} ${columnClass}`}>
      {items.map((item, index) => (
        <div key={index}>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.value}>
            {Array.isArray(item.value) ? item.value.join(', ') : item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
