import { SearchX } from 'lucide-react';

const EmptyState = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border/70 bg-card/40 px-6 py-16 text-center backdrop-blur-sm">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground">
        <SearchX className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default EmptyState;