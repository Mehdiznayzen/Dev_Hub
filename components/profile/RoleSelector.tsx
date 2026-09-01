'use client';

import { roles } from '@/constants';
import { cn } from '@/lib/utils';

interface RoleSelectorProps {
  role: string;
  setRole: (role: string) => void;
}

const RoleSelector = ({ role, setRole }: RoleSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        What do you do?
      </label>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {roles.map((item) => {
          const isActive = role === item.label;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setRole(item.label)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-xl border px-3 py-3.5 text-center transition-all duration-200 cursor-pointer',
                isActive
                  ? 'border-primary/60 bg-primary/10 text-foreground shadow-sm shadow-primary/10'
                  : 'border-border/60 bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:bg-secondary/50 hover:text-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              />

              <span className="text-xs font-medium leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelector;