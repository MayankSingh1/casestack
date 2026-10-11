'use client';

import { useState } from 'react';
import styles from './DecisionCard.module.css';

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
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{decision}</h3>
      </div>

      <div className={styles.body}>
        {chosenOption && (
          <div className={styles.chosen}>
            <div className={styles.chosenHeader}>
              <span className={styles.checkmark}>✓</span>
              <span className={styles.chosenName}>{chosenOption.name}</span>
            </div>
            <p className={styles.chosenDescription}>{chosenOption.description}</p>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.toggle}
        >
          {isExpanded ? '− Hide alternatives' : '+ Show alternatives considered'}
        </button>

        {isExpanded && (
          <div className={styles.alternatives}>
            {options
              .filter((o) => !o.chosen)
              .map((option, index) => (
                <div key={index} className={styles.alternative}>
                  <span className={styles.altName}>{option.name}</span>
                  <p className={styles.altDescription}>{option.description}</p>
                </div>
              ))}
          </div>
        )}

        <div className={styles.details}>
          <div className={styles.detail}>
            <h4 className={styles.detailLabel}>Rationale</h4>
            <p className={styles.detailText}>{rationale}</p>
          </div>

          {tradeoffs && (
            <div className={styles.detail}>
              <h4 className={styles.detailLabel}>Trade-offs</h4>
              <p className={styles.detailText}>{tradeoffs}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
