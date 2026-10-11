'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';

const Section = styled.section<{ minHeight: string }>`
  position: relative;
  min-height: ${({ minHeight }) => minHeight};
`;

const PinWrapper = styled.div<{ isPinned: boolean }>`
  position: ${({ isPinned }) => (isPinned ? 'fixed' : 'absolute')};
  top: ${({ isPinned }) => (isPinned ? 0 : undefined)};
  left: 0;
  right: 0;
  height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  height: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    padding: 0 2rem;
  }
`;

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 0;

  @media (min-width: 1024px) {
    padding: 0;
  }
`;

const Number = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #2563eb;

  @media (prefers-color-scheme: dark) {
    color: #60a5fa;
  }
`;

const Title = styled.h2`
  margin-top: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;

  @media (min-width: 640px) { font-size: 1.875rem; }
  @media (min-width: 1024px) { font-size: 2.25rem; }
  @media (prefers-color-scheme: dark) { color: #fff; }
`;

const Description = styled.p`
  margin-top: 1rem;
  font-size: 1.125rem;
  line-height: 1.75;
  color: #475569;

  @media (prefers-color-scheme: dark) { color: #cbd5e1; }
`;

const Indicators = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const Indicator = styled.button<{ active: boolean }>`
  height: 0.5rem;
  width: ${({ active }) => (active ? '2rem' : '0.5rem')};
  border-radius: 9999px;
  background-color: ${({ active }) => (active ? '#2563eb' : '#cbd5e1')};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (prefers-color-scheme: dark) {
    background-color: ${({ active }) => (active ? '#60a5fa' : '#475569')};
  }
`;

const ImageColumn = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Slide = styled.div<{ active: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.5s ease;
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  width: 100%;
  overflow: hidden;
  border-radius: 1rem;
  background-color: #f1f5f9;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  @media (prefers-color-scheme: dark) { background-color: #1e293b; }
`;

const Caption = styled.figcaption`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: #64748b;

  @media (prefers-color-scheme: dark) { color: #94a3b8; }
`;

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

export function ScrollytellingSection({ id, number, title, description, slides }: ScrollytellingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (sectionHeight + viewportHeight)));
      setIsPinned(rect.top <= 0 && rect.bottom >= viewportHeight);
      const slideIndex = Math.min(slides.length - 1, Math.floor(scrollProgress * slides.length));
      setActiveSlide(slideIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slides.length]);

  return (
    <Section ref={sectionRef} id={id} minHeight={`${(slides.length + 1) * 100}vh`}>
      <PinWrapper isPinned={isPinned}>
        <Grid>
          <TextColumn>
            {number && <Number>{number}</Number>}
            <Title>{title}</Title>
            <Description>{description}</Description>
            <Indicators>
              {slides.map((_, index) => (
                <Indicator key={index} active={index === activeSlide} onClick={() => setActiveSlide(index)} aria-label={`Go to slide ${index + 1}`} />
              ))}
            </Indicators>
          </TextColumn>
          <ImageColumn>
            {slides.map((slide, index) => (
              <Slide key={index} active={index === activeSlide}>
                <figure style={{ width: '100%' }}>
                  <ImageContainer>
                    <Image src={slide.image} alt={slide.alt} fill style={{ objectFit: 'cover' }} sizes="50vw" priority={index === 0} />
                  </ImageContainer>
                  {slide.caption && <Caption>{slide.caption}</Caption>}
                </figure>
              </Slide>
            ))}
          </ImageColumn>
        </Grid>
      </PinWrapper>
    </Section>
  );
}
