'use client';

import { ReactNode } from 'react';
import styled from '@emotion/styled';

const Section = styled.section`
  scroll-margin-top: 6rem;
  padding: 3rem 0;

  @media (min-width: 640px) {
    padding: 4rem 0;
  }

  @media (min-width: 1024px) {
    padding: 5rem 0;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #0f172a;

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }

  @media (prefers-color-scheme: dark) {
    color: #fff;
  }
`;

const Content = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-size: 1.125rem;
  line-height: 1.75;
  color: #475569;

  @media (prefers-color-scheme: dark) {
    color: #cbd5e1;
  }
`;

interface SectionBlockProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function SectionBlock({ id, title, children, className = '' }: SectionBlockProps) {
  return (
    <Section id={id} className={className}>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Section>
  );
}
