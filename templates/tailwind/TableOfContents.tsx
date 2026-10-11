'use client';

import { useEffect, useState } from 'react';

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
    <nav
      className={`hidden lg:block ${
        sticky ? 'sticky top-24' : ''
      } max-h-[calc(100vh-8rem)] overflow-y-auto`}
      aria-label="Table of contents"
    >
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
        On this page
      </h2>
      <ul className="space-y-2 border-l border-slate-200 dark:border-slate-700">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block border-l-2 py-1 text-sm transition-colors ${
                item.level === 2 ? 'pl-4' : 'pl-8'
              } ${
                activeId === item.id
                  ? 'border-slate-900 font-medium text-slate-900 dark:border-white dark:text-white'
                  : 'border-transparent text-slate-600 hover:border-slate-400 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
