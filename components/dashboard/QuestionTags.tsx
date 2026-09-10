import { cn } from '@/lib/utils';

const QuestionTags = ({ tags, className }: { tags: string[]; className?: string; }) => {
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-md border border-border/70 bg-secondary/50 px-2 py-0.5 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default QuestionTags;