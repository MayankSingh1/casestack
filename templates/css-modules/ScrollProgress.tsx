'use client';

import { useEffect, useState } from 'react';
import styles from './ScrollProgress.module.css';

interface Chapter {
  id: string;
  title: string;
}

interface ScrollProgressProps {
  chapters: Chapter[];
  showPercentage?: boolean;
}

export function ScrollProgress({ chapters, showPercentage = false }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
      
      if (!prefersReducedMotion) {
        setProgress(scrollProgress);
      }

      let currentChapter: string | null = null;
      for (const chapter of chapters) {
        const element = document.getElementById(chapter.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            currentChapter = chapter.id;
          }
        }
      }
      setActiveChapter(currentChapter);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters]);

  const handleChapterClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.progressBar} style={{ width: `${progress * 100}%` }} role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} />
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.chapters}>
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => handleChapterClick(chapter.id)}
                className={`${styles.chapter} ${activeChapter === chapter.id ? styles.chapterActive : ''}`}
              >
                {chapter.title}
              </button>
            ))}
          </div>
          {showPercentage && <span className={styles.percentage}>{Math.round(progress * 100)}%</span>}
        </div>
      </nav>
    </div>
  );
}
