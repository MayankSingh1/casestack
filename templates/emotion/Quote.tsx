'use client';

import styled from '@emotion/styled';

const Pullquote = styled.blockquote`
  margin: 3rem 0;
  padding-left: 1.5rem;
  border-left: 4px solid #0f172a;

  @media (prefers-color-scheme: dark) {
    border-left-color: #fff;
  }
`;

const PullquoteText = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  font-style: italic;
  line-height: 1.625;
  color: #0f172a;

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }

  @media (prefers-color-scheme: dark) {
    color: #fff;
  }
`;

const DefaultQuote = styled.blockquote`
  margin: 1.5rem 0;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: #f8fafc;

  @media (prefers-color-scheme: dark) {
    background-color: rgba(30, 41, 59, 0.5);
  }
`;

const DefaultText = styled.p`
  font-size: 1.125rem;
  font-style: italic;
  color: #334155;

  @media (prefers-color-scheme: dark) {
    color: #cbd5e1;
  }
`;

const Footer = styled.footer`
  margin-top: 0.75rem;
`;

const Cite = styled.cite`
  font-size: 0.875rem;
  font-style: normal;
  color: #64748b;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

const Role = styled.span`
  color: #64748b;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

interface QuoteProps {
  text: string;
  source?: string;
  role?: string;
  variant?: 'default' | 'pullquote';
}

export function Quote({ text, source, role, variant = 'default' }: QuoteProps) {
  if (variant === 'pullquote') {
    return (
      <Pullquote>
        <PullquoteText>"{text}"</PullquoteText>
        {source && (
          <Footer>
            <Cite>
              — {source}
              {role && <Role>, {role}</Role>}
            </Cite>
          </Footer>
        )}
      </Pullquote>
    );
  }

  return (
    <DefaultQuote>
      <DefaultText>"{text}"</DefaultText>
      {source && (
        <Footer>
          <Cite>
            — {source}
            {role && <Role>, {role}</Role>}
          </Cite>
        </Footer>
      )}
    </DefaultQuote>
  );
}
