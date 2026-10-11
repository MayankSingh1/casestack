'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

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
      <section id={id} className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {number && (
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {number}
            </span>
          )}
          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {description}
          </p>
          <div className="mt-8 space-y-8">
            {slides.map((slide, index) => (
              <figure key={index}>
                <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                {slide.caption && (
                  <figcaption className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {slide.caption}
                  </figcaption>
                )}
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
      className="relative"
      style={{ minHeight: `${(slides.length + 1) * 100}vh` }}
    >
      <div
        className={`${
          isPinned ? 'fixed top-0' : 'absolute'
        } left-0 right-0 h-screen`}
        style={{
          top: isPinned ? 0 : undefined,
          bottom: !isPinned && sectionRef.current?.getBoundingClientRect().bottom 
            ? sectionRef.current.getBoundingClientRect().bottom < window.innerHeight 
              ? 0 
              : undefined 
            : undefined,
        }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="grid h-full gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center py-16 lg:py-0">
              {number && (
                <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {number}
                </span>
              )}
              <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {description}
              </p>
              
              <div className="mt-8 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === activeSlide
                        ? 'w-8 bg-blue-600 dark:bg-blue-400'
                        : 'w-2 bg-slate-300 dark:bg-slate-600'
                    }`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="relative flex items-center">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center transition-opacity duration-500 ${
                    index === activeSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <figure className="w-full">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-2xl dark:bg-slate-800">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        sizes="50vw"
                        priority={index === 0}
                      />
                    </div>
                    {slide.caption && (
                      <figcaption className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                        {slide.caption}
                      </figcaption>
                    )}
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
