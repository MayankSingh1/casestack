'use client';

import Image from 'next/image';
import styled from 'styled-components';

const Figure = styled.figure`
  margin: 2rem 0;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

const Item = styled.div`
  position: relative;
`;

const LabelBefore = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
  z-index: 10;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  background-color: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(4px);
`;

const LabelAfter = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
  z-index: 10;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  background-color: #059669;
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: #f1f5f9;

  @media (prefers-color-scheme: dark) {
    background-color: #1e293b;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const Caption = styled.figcaption`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: #64748b;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

interface BeforeAfterProps {
  before: {
    src: string;
    alt: string;
    label?: string;
  };
  after: {
    src: string;
    alt: string;
    label?: string;
  };
  caption?: string;
}

export function BeforeAfter({ before, after, caption }: BeforeAfterProps) {
  return (
    <Figure>
      <Grid>
        <Item>
          <LabelBefore>{before.label || 'Before'}</LabelBefore>
          <ImageWrapper>
            <StyledImage
              src={before.src}
              alt={before.alt}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </ImageWrapper>
        </Item>

        <Item>
          <LabelAfter>{after.label || 'After'}</LabelAfter>
          <ImageWrapper>
            <StyledImage
              src={after.src}
              alt={after.alt}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </ImageWrapper>
        </Item>
      </Grid>

      {caption && <Caption>{caption}</Caption>}
    </Figure>
  );
}
