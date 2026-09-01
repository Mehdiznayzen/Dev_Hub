import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const ExperienceSelector= ({ experience, setExperience }: { experience: string; setExperience: (experience: string) => void; }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Experience level
      </label>
      <div className="flex flex-wrap gap-2.5">
        {levels.map((level) => {
          const isActive = level === experience;
          return (
            <button
              key={level}
              type="button"
              onClick={() => setExperience(level)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'border-primary/60 bg-primary/10 text-foreground shadow-sm shadow-primary/10'
                  : 'border-border/60 bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:bg-secondary/50 hover:text-foreground'
              )}
            >
              {isActive && <Check className="h-3.5 w-3.5 text-primary" />}
              {level}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ExperienceSelector;