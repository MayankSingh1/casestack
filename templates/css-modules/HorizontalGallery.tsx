'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HorizontalGallery.module.css';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface HorizontalGalleryProps {
  images: GalleryImage[];
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1';
}

export function HorizontalGallery({ images, aspectRatio = '16/9' }: HorizontalGalleryProps) {
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
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const aspectClass = {
    '16/9': styles.aspect169,
    '4/3': styles.aspect43,
    '3/2': styles.aspect32,
    '1/1': styles.aspect11,
  }[aspectRatio];

  return (
    <div className={styles.wrapper}>
      <button onClick={() => scroll('left')} className={`${styles.arrow} ${styles.arrowLeft} ${canScrollLeft ? styles.arrowVisible : ''}`} aria-label="Scroll left">
        <svg className={styles.arrowIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={() => scroll('right')} className={`${styles.arrow} ${styles.arrowRight} ${canScrollRight ? styles.arrowVisible : ''}`} aria-label="Scroll right">
        <svg className={styles.arrowIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div ref={scrollRef} className={styles.scrollContainer}>
        {images.map((image, index) => (
          <figure key={index} className={styles.figure}>
            <div className={`${styles.imageWrapper} ${aspectClass}`}>
              <Image src={image.src} alt={image.alt} fill className={styles.image} sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, 50vw" />
            </div>
            {image.caption && <figcaption className={styles.caption}>{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}
