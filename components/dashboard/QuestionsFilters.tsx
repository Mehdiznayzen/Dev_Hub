'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const filters = ['Newest', 'Active', 'Unanswered', 'Popular'];

const QuestionFilters = () => {
  const [active, setActive] = useState('Newest');

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex rounded-lg border border-border/70 bg-secondary/30 p-0.5">
        {
            filters.map((filter) => (
                <button
                    key={filter}
                    type="button"
                    onClick={() => setActive(filter)}
                    aria-pressed={active === filter}
                    className={cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    active === filter
                        ? 'bg-primary/15 text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                >
                    {filter}
                </button>
            ))
        }
      </div>

      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-secondary/30 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
      >
        <SlidersHorizontal className="h-3.5 w-3.5" />
        Filters
      </button>
    </div>
  );
}

export default QuestionFilters;
