'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './CountUpMetric.module.css';

interface CountUpMetricProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
  decimals?: number;
}

export function CountUpMetric({
  value,
  prefix = '',
  suffix = '',
  label,
  duration = 2000,
  decimals = 0,
}: CountUpMetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateValue();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const animateValue = () => {
    const startTime = performance.now();
    const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = value * easedProgress;
      setDisplayValue(currentValue);
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplayValue(value);
    };

    requestAnimationFrame(animate);
  };

  const formatValue = (val: number): string => {
    if (decimals > 0) return val.toFixed(decimals);
    return Math.round(val).toLocaleString();
  };

  return (
    <div ref={ref} className={styles.wrapper}>
      <p className={styles.value}>{prefix}{formatValue(displayValue)}{suffix}</p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
