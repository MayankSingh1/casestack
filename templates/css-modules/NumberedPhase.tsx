import styles from './NumberedPhase.module.css';

interface NumberedPhaseProps {
  current: number;
  total: number;
  title: string;
  showProgress?: boolean;
}

export function NumberedPhase({ current, total, title, showProgress = true }: NumberedPhaseProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.numbers}>
        <span className={styles.current}>{current}</span>
        <span className={styles.separator}>/{total}</span>
      </div>
      {showProgress && (
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} style={{ width: `${(current / total) * 100}%` }} />
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
}
