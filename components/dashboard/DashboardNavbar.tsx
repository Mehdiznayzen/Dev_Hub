'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader, Menu, Search, Terminal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';

interface QuestionsNavbarProps {
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchChange?: (v: string) => void;
}

const DashboardNavbar = ({ searchPlaceholder = 'Search questions...', searchValue, onSearchChange }: QuestionsNavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isSearchable = onSearchChange !== undefined;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border/60 bg-background/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href={"/"}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"

        >
          <Image 
            src={"/logo.png"}
            alt='logo'
            width={150}
            height={150}
          />
        </Link>

        <div className="relative ml-auto hidden flex-1 max-w-xs sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchValue}
            onChange={isSearchable ? (e) => onSearchChange?.(e.target.value) : undefined}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="h-10 w-full rounded-lg border border-input bg-background/60 pl-9 pr-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>

        <div className="mt-1.5">
          <ClerkLoading>
            <Loader className='animate-spin' />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 sm:hidden',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="space-y-3 px-4 py-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchValue}
              onChange={isSearchable ? (e) => onSearchChange?.(e.target.value) : undefined}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="h-10 w-full rounded-lg border border-input bg-background/60 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardNavbar;