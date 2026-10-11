import Image from 'next/image';
import styles from './BeforeAfter.module.css';

interface BeforeAfterProps {
  before: {
    src: string;
    alt: string;
    label?: string;
  };
  after: {
    src: string;
    alt: string;
    label?: string;
  };
  caption?: string;
}

export function BeforeAfter({ before, after, caption }: BeforeAfterProps) {
  return (
    <figure className={styles.figure}>
      <div className={styles.grid}>
        <div className={styles.item}>
          <div className={styles.labelBefore}>{before.label || 'Before'}</div>
          <div className={styles.imageWrapper}>
            <Image
              src={before.src}
              alt={before.alt}
              fill
              className={styles.image}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.labelAfter}>{after.label || 'After'}</div>
          <div className={styles.imageWrapper}>
            <Image
              src={after.src}
              alt={after.alt}
              fill
              className={styles.image}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
