'use client';

import * as React from 'react';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AuthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  leadingText?: string;
  isPassword?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const CustomInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  (
    { label, hint, leadingText, isPassword = false, icon: Icon, id, className, type, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const [visible, setVisible] = React.useState(false);

    const inputType = isPassword ? (visible ? 'text' : 'password') : type;

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <Icon
              className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          )}
          {leadingText && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {leadingText}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={cn(
              'flex h-11 w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
              (Icon || leadingText) && 'pl-10',
              isPassword && 'pr-10',
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground"
              aria-label={visible ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {visible ? (
                <EyeOff className="h-4.5 w-4.5" />
              ) : (
                <Eye className="h-4.5 w-4.5" />
              )}
            </button>
          )}
        </div>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    );
  }
);
CustomInput.displayName = 'CustomInput';

export { CustomInput };
