'use client';

import Image from 'next/image';
import styled, { css } from 'styled-components';

const Figure = styled.figure<{ $fullWidth?: boolean }>`
  margin: 2rem 0;

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      margin-left: -1rem;
      margin-right: -1rem;

      @media (min-width: 640px) {
        margin-left: -1.5rem;
        margin-right: -1.5rem;
      }

      @media (min-width: 1024px) {
        margin-left: -2rem;
        margin-right: -2rem;
      }
    `}
`;

const ImageWrapper = styled.div<{ $aspectRatio: string }>`
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: #f1f5f9;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio.replace('/', ' / ')};

  @media (prefers-color-scheme: dark) {
    background-color: #1e293b;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const Caption = styled.figcaption`
  margin-top: 0.75rem;
  text-align: center;
  font-size: 0.875rem;
  color: #64748b;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  fullWidth?: boolean;
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1';
}

export function ImageWithCaption({
  src,
  alt,
  caption,
  fullWidth = false,
  aspectRatio = '16/9',
}: ImageWithCaptionProps) {
  return (
    <Figure $fullWidth={fullWidth}>
      <ImageWrapper $aspectRatio={aspectRatio}>
        <StyledImage
          src={src}
          alt={alt}
          fill
          sizes={fullWidth ? '100vw' : '(max-width: 768px) 100vw, 800px'}
        />
      </ImageWrapper>
      {caption && <Caption>{caption}</Caption>}
    </Figure>
  );
}
