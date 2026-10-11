'use client';

import styled, { css } from 'styled-components';

const Container = styled.div<{ $columns: number }>`
  display: grid;
  gap: 1rem;
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: #f8fafc;

  @media (min-width: 640px) {
    gap: 1.5rem;
    padding: 2rem;
  }

  ${({ $columns }) =>
    $columns === 2 &&
    css`
      grid-template-columns: repeat(2, 1fr);
    `}

  ${({ $columns }) =>
    $columns === 3 &&
    css`
      grid-template-columns: repeat(3, 1fr);
    `}

  ${({ $columns }) =>
    $columns === 4 &&
    css`
      grid-template-columns: repeat(2, 1fr);

      @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
      }
    `}

  @media (prefers-color-scheme: dark) {
    background-color: rgba(30, 41, 59, 0.5);
  }
`;

const Metric = styled.div`
  text-align: center;
`;

const Value = styled.p`
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #0f172a;

  @media (min-width: 640px) {
    font-size: 3rem;
  }

  @media (prefers-color-scheme: dark) {
    color: #fff;
  }
`;

const Change = styled.p<{ $positive: boolean }>`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ $positive }) => ($positive ? '#059669' : '#dc2626')};

  @media (prefers-color-scheme: dark) {
    color: ${({ $positive }) => ($positive ? '#34d399' : '#f87171')};
  }
`;

const Label = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

interface MetricItem {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

interface MetricCalloutProps {
  metrics: MetricItem[];
  columns?: 2 | 3 | 4;
}

export function MetricCallout({ metrics, columns = 3 }: MetricCalloutProps) {
  return (
    <Container $columns={columns}>
      {metrics.map((metric, index) => (
        <Metric key={index}>
          <Value>{metric.value}</Value>
          {metric.change && (
            <Change $positive={metric.positive !== false}>{metric.change}</Change>
          )}
          <Label>{metric.label}</Label>
        </Metric>
      ))}
    </Container>
  );
}
