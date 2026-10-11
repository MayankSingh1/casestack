'use client';

import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const Value = styled.p`
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #0f172a;

  @media (min-width: 640px) { font-size: 3rem; }
  @media (min-width: 1024px) { font-size: 3.75rem; }
  @media (prefers-color-scheme: dark) { color: #fff; }
`;

const Label = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;

  @media (prefers-color-scheme: dark) { color: #94a3b8; }
`;

interface CountUpMetricProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
  decimals?: number;
}

export function CountUpMetric({ value, prefix = '', suffix = '', label, duration = 2000, decimals = 0 }: CountUpMetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const startTime = performance.now();
        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setDisplayValue(value * easeOutQuart(progress));
          if (progress < 1) requestAnimationFrame(animate);
          else setDisplayValue(value);
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated, duration]);

  const formatValue = (val: number) => decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();

  return (
    <Wrapper ref={ref}>
      <Value>{prefix}{formatValue(displayValue)}{suffix}</Value>
      <Label>{label}</Label>
    </Wrapper>
  );
}
