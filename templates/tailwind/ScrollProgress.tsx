'use client';

import { useEffect, useState } from 'react';

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
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

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
    <div className="fixed left-0 right-0 top-0 z-50">
      <div
        className="h-1 bg-blue-600 transition-all duration-150 dark:bg-blue-400"
        style={{ width: `${progress * 100}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => handleChapterClick(chapter.id)}
                className={`whitespace-nowrap text-sm font-medium transition-colors ${
                  activeChapter === chapter.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {chapter.title}
              </button>
            ))}
          </div>
          
          {showPercentage && (
            <span className="ml-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              {Math.round(progress * 100)}%
            </span>
          )}
        </div>
      </nav>
    </div>
  );
}
