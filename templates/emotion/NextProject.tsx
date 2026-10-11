'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';

const Section = styled.section`
  padding: 4rem 0;
  border-top: 1px solid #e2e8f0;
  background-color: #f8fafc;

  @media (min-width: 640px) {
    padding: 6rem 0;
  }

  @media (prefers-color-scheme: dark) {
    border-top-color: #1e293b;
    background-color: #0f172a;
  }
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const Label = styled.p`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

const Card = styled(Link)`
  display: block;
  margin-top: 2rem;
  overflow: hidden;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    background-color: #1e293b;
  }
`;

const Grid = styled.div`
  display: grid;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: #f1f5f9;

  @media (min-width: 1024px) {
    aspect-ratio: auto;
    height: 100%;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #334155;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;

  @media (min-width: 1024px) {
    padding: 3rem;
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  transition: color 0.15s ease;

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }

  ${Card}:hover & {
    color: #2563eb;
  }

  @media (prefers-color-scheme: dark) {
    color: #fff;

    ${Card}:hover & {
      color: #60a5fa;
    }
  }
`;

const Description = styled.p`
  margin-top: 1rem;
  font-size: 1.125rem;
  color: #475569;

  @media (prefers-color-scheme: dark) {
    color: #cbd5e1;
  }
`;

const CTA = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  font-weight: 500;
  color: #2563eb;

  @media (prefers-color-scheme: dark) {
    color: #60a5fa;
  }
`;

const Arrow = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.15s ease;

  ${Card}:hover & {
    transform: translateX(0.25rem);
  }
`;

interface NextProjectProps {
  title: string;
  slug: string;
  thumbnail?: string;
  description?: string;
}

export function NextProject({ title, slug, thumbnail, description }: NextProjectProps) {
  return (
    <Section>
      <Container>
        <Label>Next Project</Label>

        <Card href={`/work/${slug}`}>
          <Grid>
            {thumbnail && (
              <ImageWrapper>
                <StyledImage
                  src={thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </ImageWrapper>
            )}

            <Content>
              <Title>{title}</Title>
              {description && <Description>{description}</Description>}
              <CTA>
                <span>View project</span>
                <Arrow fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </Arrow>
              </CTA>
            </Content>
          </Grid>
        </Card>
      </Container>
    </Section>
  );
}
