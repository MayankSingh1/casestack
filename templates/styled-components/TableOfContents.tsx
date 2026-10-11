'use client';

import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const Nav = styled.nav<{ $sticky?: boolean }>`
  display: none;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;

  @media (min-width: 1024px) {
    display: block;
  }

  ${({ $sticky }) =>
    $sticky &&
    css`
      position: sticky;
      top: 6rem;
    `}
`;

const Heading = styled.h2`
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #0f172a;

  @media (prefers-color-scheme: dark) {
    color: #fff;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border-left: 1px solid #e2e8f0;

  @media (prefers-color-scheme: dark) {
    border-left-color: #334155;
  }
`;

const Link = styled.a<{ $level: number; $active: boolean }>`
  display: block;
  padding: 0.25rem 0;
  font-size: 0.875rem;
  text-decoration: none;
  border-left: 2px solid transparent;
  margin-left: -1px;
  transition: all 0.15s ease;
  color: #475569;
  padding-left: ${({ $level }) => ($level === 2 ? '1rem' : '2rem')};

  &:hover {
    border-left-color: #94a3b8;
    color: #0f172a;
  }

  ${({ $active }) =>
    $active &&
    css`
      border-left-color: #0f172a;
      font-weight: 500;
      color: #0f172a;
    `}

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;

    &:hover {
      color: #fff;
    }

    ${({ $active }) =>
      $active &&
      css`
        border-left-color: #fff;
        color: #fff;
      `}
  }
`;

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  sticky?: boolean;
}

export function TableOfContents({ items, sticky = true }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <Nav $sticky={sticky} aria-label="Table of contents">
      <Heading>On this page</Heading>
      <List>
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              $level={item.level}
              $active={activeId === item.id}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </List>
    </Nav>
  );
}
