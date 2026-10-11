'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface HorizontalGalleryProps {
  images: GalleryImage[];
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1';
}

export function HorizontalGallery({
  images,
  aspectRatio = '16/9',
}: HorizontalGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    return () => scrollElement?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const aspectClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '1/1': 'aspect-square',
  };

  return (
    <div className="group relative -mx-4 sm:-mx-6 lg:-mx-8">
      <button
        onClick={() => scroll('left')}
        className={`absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-opacity dark:bg-slate-800/90 ${
          canScrollLeft
            ? 'opacity-0 group-hover:opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-label="Scroll left"
      >
        <svg
          className="h-6 w-6 text-slate-600 dark:text-slate-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={() => scroll('right')}
        className={`absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-opacity dark:bg-slate-800/90 ${
          canScrollRight
            ? 'opacity-0 group-hover:opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-label="Scroll right"
      >
        <svg
          className="h-6 w-6 text-slate-600 dark:text-slate-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide sm:gap-6 sm:px-6 lg:px-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((image, index) => (
          <figure
            key={index}
            className="w-[85vw] flex-shrink-0 snap-center sm:w-[70vw] lg:w-[50vw]"
          >
            <div
              className={`relative overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 ${aspectClasses[aspectRatio]}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, 50vw"
              />
            </div>
            {image.caption && (
              <figcaption className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
