'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

export function useSearch<T>(
  items: T[],
  getSearchable: (item: T) => string
) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => getSearchable(item).toLowerCase().includes(q));
  }, [items, query, getSearchable]);

  return { query, setQuery, filtered };
}

interface SearchInputProps {
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    className?: string;
}

export function SearchInput({ value, onChange, placeholder, className }: SearchInputProps) {
  return (
    <div className={`relative ${className ?? ''}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-10 w-full rounded-lg border border-input bg-background/60 pl-9 pr-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
      />
    </div>
  );
}
