'use client';

import { useState } from 'react';

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
    <div className="my-6 overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/50">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {decision}
        </h3>
      </div>

      <div className="p-6">
        {chosenOption && (
          <div className="mb-4 rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/20">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-sm text-white">
                ✓
              </span>
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                {chosenOption.name}
              </span>
            </div>
            <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">
              {chosenOption.description}
            </p>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mb-4 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          {isExpanded ? '− Hide alternatives' : '+ Show alternatives considered'}
        </button>

        {isExpanded && (
          <div className="mb-4 space-y-3">
            {options
              .filter((o) => !o.chosen)
              .map((option, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-200 p-4 dark:border-slate-700"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {option.name}
                  </span>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {option.description}
                  </p>
                </div>
              ))}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Rationale
            </h4>
            <p className="mt-1 text-slate-700 dark:text-slate-300">{rationale}</p>
          </div>

          {tradeoffs && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Trade-offs
              </h4>
              <p className="mt-1 text-slate-700 dark:text-slate-300">{tradeoffs}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
