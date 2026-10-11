import styles from './MetricCallout.module.css';

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
  const columnClass = {
    2: styles.cols2,
    3: styles.cols3,
    4: styles.cols4,
  }[columns];

  return (
    <div className={`${styles.container} ${columnClass}`}>
      {metrics.map((metric, index) => (
        <div key={index} className={styles.metric}>
          <p className={styles.value}>{metric.value}</p>
          {metric.change && (
            <p
              className={`${styles.change} ${
                metric.positive !== false ? styles.positive : styles.negative
              }`}
            >
              {metric.change}
            </p>
          )}
          <p className={styles.label}>{metric.label}</p>
        </div>
      ))}
    </div>
  );
}
