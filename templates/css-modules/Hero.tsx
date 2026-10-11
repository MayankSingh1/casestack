import Image from 'next/image';
import styles from './Hero.module.css';

interface HeroProps {
  title: string;
  outcome: string;
  role: string;
  timeline: string;
  team: string[];
  platforms: string[];
  company?: string;
  heroImage?: string;
  heroAlt?: string;
}

export function Hero({
  title,
  outcome,
  role,
  timeline,
  team,
  platforms,
  company,
  heroImage,
  heroAlt = '',
}: HeroProps) {
  return (
    <header className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            {company && <p className={styles.company}>{company}</p>}
            
            <h1 className={styles.title}>{title}</h1>
            
            <p className={styles.outcome}>{outcome}</p>
            
            <dl className={styles.meta}>
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>Role</dt>
                <dd className={styles.metaValue}>{role}</dd>
              </div>
              
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>Timeline</dt>
                <dd className={styles.metaValue}>{timeline}</dd>
              </div>
              
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>Team</dt>
                <dd className={styles.metaValue}>{team.length} people</dd>
              </div>
              
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>Platform</dt>
                <dd className={styles.metaValue}>{platforms.join(', ')}</dd>
              </div>
            </dl>
          </div>
          
          {heroImage && (
            <div className={styles.imageWrapper}>
              <Image
                src={heroImage}
                alt={heroAlt}
                fill
                className={styles.image}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
