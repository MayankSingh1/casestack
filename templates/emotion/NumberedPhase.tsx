'use client';

import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Numbers = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
`;

const Current = styled.span`
  font-size: 1.875rem;
  font-weight: 700;
  color: #2563eb;
  @media (prefers-color-scheme: dark) { color: #60a5fa; }
`;

const Separator = styled.span`
  font-size: 1.125rem;
  color: #94a3b8;
  @media (prefers-color-scheme: dark) { color: #64748b; }
`;

const ProgressTrack = styled.div`
  display: none;
  flex: 1;
  height: 0.25rem;
  overflow: hidden;
  border-radius: 9999px;
  background-color: #e2e8f0;
  @media (min-width: 640px) { display: block; }
  @media (prefers-color-scheme: dark) { background-color: #334155; }
`;

const ProgressBar = styled.div<{ width: number }>`
  height: 100%;
  border-radius: 9999px;
  background-color: #2563eb;
  width: ${({ width }) => `${width}%`};
  transition: width 0.5s ease;
  @media (prefers-color-scheme: dark) { background-color: #60a5fa; }
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  @media (prefers-color-scheme: dark) { color: #fff; }
`;

interface NumberedPhaseProps { current: number; total: number; title: string; showProgress?: boolean; }

export function NumberedPhase({ current, total, title, showProgress = true }: NumberedPhaseProps) {
  return (
    <Wrapper>
      <Numbers>
        <Current>{current}</Current>
        <Separator>/{total}</Separator>
      </Numbers>
      {showProgress && <ProgressTrack><ProgressBar width={(current / total) * 100} /></ProgressTrack>}
      <Title>{title}</Title>
    </Wrapper>
  );
}
