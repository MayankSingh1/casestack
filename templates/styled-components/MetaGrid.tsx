'use client';

import styled, { css } from 'styled-components';

const Grid = styled.dl<{ $columns: number }>`
  display: grid;
  gap: 1.5rem;

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
`;

const Label = styled.dt`
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

const Value = styled.dd`
  margin-top: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;

  @media (prefers-color-scheme: dark) {
    color: #fff;
  }
`;

interface MetaItem {
  label: string;
  value: string | string[];
}

interface MetaGridProps {
  items: MetaItem[];
  columns?: 2 | 3 | 4;
}

export function MetaGrid({ items, columns = 4 }: MetaGridProps) {
  return (
    <Grid $columns={columns}>
      {items.map((item, index) => (
        <div key={index}>
          <Label>{item.label}</Label>
          <Value>{Array.isArray(item.value) ? item.value.join(', ') : item.value}</Value>
        </div>
      ))}
    </Grid>
  );
}
