'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styles from './ImageComparisonSlider.module.css';

interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function ImageComparisonSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: ImageComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseMove, handleTouchMove]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setSliderPosition((prev) => Math.max(0, prev - 5));
    else if (e.key === 'ArrowRight') setSliderPosition((prev) => Math.min(100, prev + 5));
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      role="slider"
      aria-label="Image comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.afterImage}>
        <Image src={afterImage} alt={afterAlt} fill className={styles.image} sizes="100vw" />
      </div>
      <div className={styles.beforeImage} style={{ width: `${sliderPosition}%` }}>
        <Image src={beforeImage} alt={beforeAlt} fill className={styles.image} sizes="100vw" style={{ maxWidth: 'none', width: containerRef.current?.offsetWidth }} />
      </div>
      <div className={styles.labelBefore} style={{ opacity: sliderPosition > 20 ? 1 : 0 }}>{beforeLabel}</div>
      <div className={styles.labelAfter} style={{ opacity: sliderPosition < 80 ? 1 : 0 }}>{afterLabel}</div>
      <div className={styles.slider} style={{ left: `${sliderPosition}%` }} onMouseDown={handleMouseDown} onTouchStart={handleMouseDown}>
        <div className={styles.sliderHandle}>
          <svg className={styles.sliderIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
}
