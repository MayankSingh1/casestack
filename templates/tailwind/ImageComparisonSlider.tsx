'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

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

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    },
    [isDragging, handleMove]
  );

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
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      className="group relative aspect-video cursor-ew-resize select-none overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800"
      role="slider"
      aria-label="Image comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          className="object-cover"
          sizes="100vw"
          style={{ maxWidth: 'none', width: containerRef.current?.offsetWidth }}
        />
      </div>

      <div
        className="absolute bottom-4 left-4 rounded-full bg-slate-900/80 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm"
        style={{ opacity: sliderPosition > 20 ? 1 : 0 }}
      >
        {beforeLabel}
      </div>
      <div
        className="absolute bottom-4 right-4 rounded-full bg-emerald-600 px-3 py-1 text-sm font-medium text-white"
        style={{ opacity: sliderPosition < 80 ? 1 : 0 }}
      >
        {afterLabel}
      </div>

      <div
        className="absolute bottom-0 top-0 w-1 cursor-ew-resize bg-white shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <svg
            className="h-6 w-6 text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
