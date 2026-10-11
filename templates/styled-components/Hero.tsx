'use client';

import Image from 'next/image';
import styled from 'styled-components';

const HeroWrapper = styled.header`
  position: relative;
  background-color: #f8fafc;

  @media (prefers-color-scheme: dark) {
    background-color: #0f172a;
  }
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 4rem 1rem;

  @media (min-width: 640px) {
    padding: 4rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 6rem 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Company = styled.p`
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #0f172a;

  @media (min-width: 640px) {
    font-size: 3rem;
  }

  @media (min-width: 1024px) {
    font-size: 3.75rem;
  }

  @media (prefers-color-scheme: dark) {
    color: #fff;
  }
`;

const Outcome = styled.p`
  margin-top: 1.5rem;
  font-size: 1.25rem;
  line-height: 1.75;
  color: #475569;

  @media (prefers-color-scheme: dark) {
    color: #cbd5e1;
  }
`;

const Meta = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const MetaLabel = styled.dt`
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

const MetaValue = styled.dd`
  margin-top: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;

  @media (prefers-color-scheme: dark) {
    color: #fff;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 1rem;
  background-color: #f1f5f9;

  @media (min-width: 1024px) {
    aspect-ratio: auto;
    height: 100%;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #1e293b;
  }
`;

interface HeroProps {
  title: string;
  outcome: string;
  role: string;
  timeline: string;
  team: string[];
  platforms: string[];
  company?: string;
  heroImage?: string;
  heroAlt?: string;
}

export function Hero({
  title,
  outcome,
  role,
  timeline,
  team,
  platforms,
  company,
  heroImage,
  heroAlt = '',
}: HeroProps) {
  return (
    <HeroWrapper>
      <Container>
        <Grid>
          <Content>
            {company && <Company>{company}</Company>}
            <Title>{title}</Title>
            <Outcome>{outcome}</Outcome>
            
            <Meta>
              <div>
                <MetaLabel>Role</MetaLabel>
                <MetaValue>{role}</MetaValue>
              </div>
              <div>
                <MetaLabel>Timeline</MetaLabel>
                <MetaValue>{timeline}</MetaValue>
              </div>
              <div>
                <MetaLabel>Team</MetaLabel>
                <MetaValue>{team.length} people</MetaValue>
              </div>
              <div>
                <MetaLabel>Platform</MetaLabel>
                <MetaValue>{platforms.join(', ')}</MetaValue>
              </div>
            </Meta>
          </Content>
          
          {heroImage && (
            <ImageWrapper>
              <Image
                src={heroImage}
                alt={heroAlt}
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ImageWrapper>
          )}
        </Grid>
      </Container>
    </HeroWrapper>
  );
}
