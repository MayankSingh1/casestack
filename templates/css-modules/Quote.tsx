import styles from './Quote.module.css';

interface QuoteProps {
  text: string;
  source?: string;
  role?: string;
  variant?: 'default' | 'pullquote';
}

export function Quote({ text, source, role, variant = 'default' }: QuoteProps) {
  if (variant === 'pullquote') {
    return (
      <blockquote className={styles.pullquote}>
        <p className={styles.pullquoteText}>"{text}"</p>
        {source && (
          <footer className={styles.footer}>
            <cite className={styles.cite}>
              — {source}
              {role && <span className={styles.role}>, {role}</span>}
            </cite>
          </footer>
        )}
      </blockquote>
    );
  }

  return (
    <blockquote className={styles.default}>
      <p className={styles.defaultText}>"{text}"</p>
      {source && (
        <footer className={styles.footer}>
          <cite className={styles.cite}>
            — {source}
            {role && <span className={styles.role}>, {role}</span>}
          </cite>
        </footer>
      )}
    </blockquote>
  );
}
