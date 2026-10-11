import Image from 'next/image';
import Link from 'next/link';
import styles from './NextProject.module.css';

interface NextProjectProps {
  title: string;
  slug: string;
  thumbnail?: string;
  description?: string;
}

export function NextProject({ title, slug, thumbnail, description }: NextProjectProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.label}>Next Project</p>

        <Link href={`/work/${slug}`} className={styles.card}>
          <div className={styles.grid}>
            {thumbnail && (
              <div className={styles.imageWrapper}>
                <Image
                  src={thumbnail}
                  alt=""
                  fill
                  className={styles.image}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}

            <div className={styles.content}>
              <h3 className={styles.title}>{title}</h3>
              {description && <p className={styles.description}>{description}</p>}
              <div className={styles.cta}>
                <span>View project</span>
                <svg
                  className={styles.arrow}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
