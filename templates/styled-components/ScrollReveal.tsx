'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ $visible: boolean; $transform: string; $duration: number; $delay: number }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible, $transform }) => ($visible ? 'translate(0, 0)' : $transform)};
  transition: opacity ${({ $duration }) => $duration}ms ease-out ${({ $delay }) => $delay}ms, 
              transform ${({ $duration }) => $duration}ms ease-out ${({ $delay }) => $delay}ms;
  will-change: opacity, transform;
`;

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScrollReveal({ children, direction = 'up', delay = 0, duration = 600, className = '' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(30px)';
      case 'down': return 'translateY(-30px)';
      case 'left': return 'translateX(30px)';
      case 'right': return 'translateX(-30px)';
      default: return 'translate(0, 0)';
    }
  };

  return (
    <Wrapper ref={ref} className={className} $visible={isVisible} $transform={getTransform()} $duration={duration} $delay={delay}>
      {children}
    </Wrapper>
  );
}
