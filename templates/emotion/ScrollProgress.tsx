'use client';

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
`;

const ProgressBar = styled.div<{ width: number }>`
  height: 0.25rem;
  width: ${({ width }) => `${width}%`};
  background-color: #2563eb;
  transition: width 0.15s ease;

  @media (prefers-color-scheme: dark) { background-color: #60a5fa; }
`;

const Nav = styled.nav`
  border-bottom: 1px solid #e2e8f0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);

  @media (prefers-color-scheme: dark) {
    border-bottom-color: #1e293b;
    background-color: rgba(15, 23, 42, 0.8);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0.75rem 1rem;

  @media (min-width: 640px) { padding: 0.75rem 1.5rem; }
  @media (min-width: 1024px) { padding: 0.75rem 2rem; }
`;

const Chapters = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  overflow-x: auto;
`;

const Chapter = styled.button<{ active: boolean }>`
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ active }) => (active ? '#2563eb' : '#475569')};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover { color: #0f172a; }

  @media (prefers-color-scheme: dark) {
    color: ${({ active }) => (active ? '#60a5fa' : '#94a3b8')};
    &:hover { color: #fff; }
  }
`;

const Percentage = styled.span`
  margin-left: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;

  @media (prefers-color-scheme: dark) { color: #94a3b8; }
`;

interface ChapterType { id: string; title: string; }
interface ScrollProgressProps { chapters: ChapterType[]; showPercentage?: boolean; }

export function ScrollProgress({ chapters, showPercentage = false }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, window.scrollY / scrollHeight)));

      let current: string | null = null;
      for (const chapter of chapters) {
        const element = document.getElementById(chapter.id);
        if (element && element.getBoundingClientRect().top <= window.innerHeight / 3) current = chapter.id;
      }
      setActiveChapter(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters]);

  const handleClick = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Wrapper>
      <ProgressBar width={progress * 100} role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} />
      <Nav>
        <Container>
          <Chapters>
            {chapters.map((ch) => (
              <Chapter key={ch.id} onClick={() => handleClick(ch.id)} active={activeChapter === ch.id}>{ch.title}</Chapter>
            ))}
          </Chapters>
          {showPercentage && <Percentage>{Math.round(progress * 100)}%</Percentage>}
        </Container>
      </Nav>
    </Wrapper>
  );
}
