'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  margin: 0 -1rem;
  @media (min-width: 640px) { margin: 0 -1.5rem; }
  @media (min-width: 1024px) { margin: 0 -2rem; }
`;

const Arrow = styled.button<{ $visible: boolean }>`
  position: absolute;
  top: 50%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  transform: translateY(-50%);
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Wrapper}:hover & {
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  }

  @media (prefers-color-scheme: dark) { background-color: rgba(30, 41, 59, 0.9); }
`;

const ArrowLeft = styled(Arrow)`left: 1rem;`;
const ArrowRight = styled(Arrow)`right: 1rem;`;

const ArrowIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  color: #475569;
  @media (prefers-color-scheme: dark) { color: #cbd5e1; }
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0 1rem 1rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }

  @media (min-width: 640px) { gap: 1.5rem; padding: 0 1.5rem 1rem; }
  @media (min-width: 1024px) { padding: 0 2rem 1rem; }
`;

const Figure = styled.figure`
  flex-shrink: 0;
  width: 85vw;
  scroll-snap-align: center;
  @media (min-width: 640px) { width: 70vw; }
  @media (min-width: 1024px) { width: 50vw; }
`;

const ImageWrapper = styled.div<{ $aspect: string }>`
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: #f1f5f9;
  aspect-ratio: ${({ $aspect }) => $aspect.replace('/', ' / ')};
  @media (prefers-color-scheme: dark) { background-color: #1e293b; }
`;

const Caption = styled.figcaption`
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #64748b;
  @media (prefers-color-scheme: dark) { color: #94a3b8; }
`;

interface GalleryImage { src: string; alt: string; caption?: string; }
interface HorizontalGalleryProps { images: GalleryImage[]; aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1'; }

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
    if (el) { el.addEventListener('scroll', checkScroll); checkScroll(); }
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: (dir === 'left' ? -1 : 1) * scrollRef.current.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <Wrapper>
      <ArrowLeft onClick={() => scroll('left')} $visible={canScrollLeft} aria-label="Scroll left">
        <ArrowIcon fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></ArrowIcon>
      </ArrowLeft>
      <ArrowRight onClick={() => scroll('right')} $visible={canScrollRight} aria-label="Scroll right">
        <ArrowIcon fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></ArrowIcon>
      </ArrowRight>
      <ScrollContainer ref={scrollRef}>
        {images.map((img, i) => (
          <Figure key={i}>
            <ImageWrapper $aspect={aspectRatio}><Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, 50vw" /></ImageWrapper>
            {img.caption && <Caption>{img.caption}</Caption>}
          </Figure>
        ))}
      </ScrollContainer>
    </Wrapper>
  );
}
