import { ReactNode } from 'react';
import styles from './SectionBlock.module.css';

interface SectionBlockProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function SectionBlock({ id, title, children, className = '' }: SectionBlockProps) {
  return (
    <section id={id} className={`${styles.section} ${className}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
