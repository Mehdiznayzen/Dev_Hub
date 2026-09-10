import { Check, MessageSquare, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

type Stat = {
  value: number;
  label: string;
};

interface QuestionStatsProps {
    votes: number;
    answers: number;
    views: number;
    accepted: boolean;
}

const QuestionStats = ({ votes, answers, views, accepted }: QuestionStatsProps) => {
  const stats: Stat[] = [
    { value: votes, label: 'votes' },
    { value: answers, label: 'answers' },
    { value: views, label: 'views' },
  ];

  return (
    <div className="flex shrink-0 flex-col items-end gap-2 text-right sm:w-24">
      {stats.map((stat) => {
        const isAnswers = stat.label === 'answers';
        return (
          <div
            key={stat.label}
            className={cn(
              'flex items-center gap-1.5 text-sm',
              isAnswers && accepted
                ? 'text-emerald-400'
                : 'text-muted-foreground'
            )}
          >
            {isAnswers && accepted ? (
              <Check className="h-3.5 w-3.5" />
            ) : isAnswers ? (
              <MessageSquare className="h-3.5 w-3.5 opacity-60" />
            ) : (
              <Eye className="h-3.5 w-3.5 opacity-60" />
            )}
            <span className="font-medium text-foreground">{stat.value}</span>
            <span className="hidden text-xs sm:inline">{stat.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default QuestionStats;