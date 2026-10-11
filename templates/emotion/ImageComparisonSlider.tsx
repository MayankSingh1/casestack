'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  cursor: ew-resize;
  user-select: none;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: #f1f5f9;

  @media (prefers-color-scheme: dark) { background-color: #1e293b; }
`;

const ImageLayer = styled.div`
  position: absolute;
  inset: 0;
`;

const BeforeLayer = styled.div<{ width: number }>`
  position: absolute;
  inset: 0;
  overflow: hidden;
  width: ${({ width }) => `${width}%`};
`;

const LabelBefore = styled.div<{ visible: boolean }>`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(4px);
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s ease;
`;

const LabelAfter = styled.div<{ visible: boolean }>`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: #059669;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s ease;
`;

const Slider = styled.div<{ left: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0.25rem;
  cursor: ew-resize;
  background-color: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  left: ${({ left }) => `${left}%`};
  transform: translateX(-50%);
`;

const SliderHandle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  transform: translate(-50%, -50%);
  border-radius: 9999px;
  background-color: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const SliderIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  color: #475569;
`;

interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function ImageComparisonSlider({ beforeImage, afterImage, beforeAlt, afterAlt, beforeLabel = 'Before', afterLabel = 'After' }: ImageComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSliderPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { if (isDragging) handleMove(e.clientX); };
    const handleTouchMove = (e: TouchEvent) => { if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX); };
    const handleUp = () => setIsDragging(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, handleMove]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setSliderPosition((p) => Math.max(0, p - 5));
    else if (e.key === 'ArrowRight') setSliderPosition((p) => Math.min(100, p + 5));
  };

  return (
    <Container ref={containerRef} role="slider" aria-label="Image comparison slider" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(sliderPosition)} tabIndex={0} onKeyDown={handleKeyDown}>
      <ImageLayer><Image src={afterImage} alt={afterAlt} fill style={{ objectFit: 'cover' }} sizes="100vw" /></ImageLayer>
      <BeforeLayer width={sliderPosition}><Image src={beforeImage} alt={beforeAlt} fill style={{ objectFit: 'cover', maxWidth: 'none', width: containerRef.current?.offsetWidth }} sizes="100vw" /></BeforeLayer>
      <LabelBefore visible={sliderPosition > 20}>{beforeLabel}</LabelBefore>
      <LabelAfter visible={sliderPosition < 80}>{afterLabel}</LabelAfter>
      <Slider left={sliderPosition} onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
        <SliderHandle>
          <SliderIcon fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </SliderIcon>
        </SliderHandle>
      </Slider>
    </Container>
  );
}
