'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { questions as allQuestions } from '@/data/index';
import type { Question } from '@/data/index';
import QuestionFilters from './QuestionsFilters';
import { useSearch } from './useSearch';

interface QuestionsHeaderProps {
    count: number;
    onAskQuestion: () => void;
}

const QuestionsHeader = ({
  count,
  onAskQuestion,
}: QuestionsHeaderProps) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            All Questions
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {count.toLocaleString()} questions
          </p>
        </div>

        <Button
          onClick={onAskQuestion}
          className="group bg-linear-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/40 hover:brightness-110"
        >
          <Plus className="h-4 w-4" />
          Ask Question
        </Button>
      </div>

      <QuestionFilters />
    </div>
  );
}

export default QuestionsHeader;
