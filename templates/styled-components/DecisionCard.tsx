'use client';

import { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  margin: 1.5rem 0;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background-color: #fff;

  @media (prefers-color-scheme: dark) {
    border-color: #334155;
    background-color: rgba(30, 41, 59, 0.5);
  }
`;

const Header = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background-color: #f8fafc;

  @media (prefers-color-scheme: dark) {
    border-color: #334155;
    background-color: #1e293b;
  }
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;

  @media (prefers-color-scheme: dark) {
    color: #fff;
  }
`;

const Body = styled.div`
  padding: 1.5rem;
`;

const Chosen = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #ecfdf5;

  @media (prefers-color-scheme: dark) {
    background-color: rgba(6, 78, 59, 0.2);
  }
`;

const ChosenHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkmark = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background-color: #059669;
  color: #fff;
  font-size: 0.875rem;
`;

const ChosenName = styled.span`
  font-weight: 600;
  color: #065f46;

  @media (prefers-color-scheme: dark) {
    color: #6ee7b7;
  }
`;

const ChosenDescription = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #047857;

  @media (prefers-color-scheme: dark) {
    color: #34d399;
  }
`;

const Toggle = styled.button`
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #0f172a;
  }

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;

    &:hover {
      color: #fff;
    }
  }
`;

const Alternatives = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Alternative = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;

  @media (prefers-color-scheme: dark) {
    border-color: #334155;
  }
`;

const AltName = styled.span`
  font-weight: 500;
  color: #334155;

  @media (prefers-color-scheme: dark) {
    color: #cbd5e1;
  }
`;

const AltDescription = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #64748b;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DetailLabel = styled.h4`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

const DetailText = styled.p`
  margin-top: 0.25rem;
  color: #334155;

  @media (prefers-color-scheme: dark) {
    color: #cbd5e1;
  }
`;

interface Option {
  name: string;
  description: string;
  chosen?: boolean;
}

interface DecisionCardProps {
  decision: string;
  options: Option[];
  rationale: string;
  tradeoffs?: string;
}

export function DecisionCard({
  decision,
  options,
  rationale,
  tradeoffs,
}: DecisionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const chosenOption = options.find((o) => o.chosen);

  return (
    <Card>
      <Header>
        <Title>{decision}</Title>
      </Header>

      <Body>
        {chosenOption && (
          <Chosen>
            <ChosenHeader>
              <Checkmark>✓</Checkmark>
              <ChosenName>{chosenOption.name}</ChosenName>
            </ChosenHeader>
            <ChosenDescription>{chosenOption.description}</ChosenDescription>
          </Chosen>
        )}

        <Toggle onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '− Hide alternatives' : '+ Show alternatives considered'}
        </Toggle>

        {isExpanded && (
          <Alternatives>
            {options
              .filter((o) => !o.chosen)
              .map((option, index) => (
                <Alternative key={index}>
                  <AltName>{option.name}</AltName>
                  <AltDescription>{option.description}</AltDescription>
                </Alternative>
              ))}
          </Alternatives>
        )}

        <Details>
          <div>
            <DetailLabel>Rationale</DetailLabel>
            <DetailText>{rationale}</DetailText>
          </div>

          {tradeoffs && (
            <div>
              <DetailLabel>Trade-offs</DetailLabel>
              <DetailText>{tradeoffs}</DetailText>
            </div>
          )}
        </Details>
      </Body>
    </Card>
  );
}
