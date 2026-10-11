'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './ScrollytellingSection.module.css';

interface ScrollytellingSlide {
  image: string;
  alt: string;
  caption?: string;
}

interface ScrollytellingSectionProps {
  id: string;
  number?: string;
  title: string;
  description: string;
  slides: ScrollytellingSlide[];
}

export function ScrollytellingSection({
  id,
  number,
  title,
  description,
  slides,
}: ScrollytellingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      const scrollProgress = Math.max(
        0,
        Math.min(1, (viewportHeight - rect.top) / (sectionHeight + viewportHeight))
      );

      setIsPinned(rect.top <= 0 && rect.bottom >= viewportHeight);
      
      const slideIndex = Math.min(
        slides.length - 1,
        Math.floor(scrollProgress * slides.length)
      );
      setActiveSlide(slideIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [slides.length]);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <section id={id} className={styles.sectionReduced}>
        <div className={styles.container}>
          {number && <span className={styles.number}>{number}</span>}
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.slidesStacked}>
            {slides.map((slide, index) => (
              <figure key={index} className={styles.slideStacked}>
                <div className={styles.imageWrapper}>
                  <Image src={slide.image} alt={slide.alt} fill className={styles.image} sizes="100vw" />
                </div>
                {slide.caption && <figcaption className={styles.caption}>{slide.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      className={styles.section}
      style={{ minHeight: `${(slides.length + 1) * 100}vh` }}
    >
      <div className={`${styles.pinWrapper} ${isPinned ? styles.pinned : ''}`}>
        <div className={styles.grid}>
          <div className={styles.textColumn}>
            {number && <span className={styles.number}>{number}</span>}
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <div className={styles.indicators}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === activeSlide ? styles.indicatorActive : ''}`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className={styles.imageColumn}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${styles.slide} ${index === activeSlide ? styles.slideActive : ''}`}
              >
                <figure className={styles.figure}>
                  <div className={styles.imageContainer}>
                    <Image src={slide.image} alt={slide.alt} fill className={styles.image} sizes="50vw" priority={index === 0} />
                  </div>
                  {slide.caption && <figcaption className={styles.caption}>{slide.caption}</figcaption>}
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
