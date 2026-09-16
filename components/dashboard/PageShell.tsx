'use client';

import { useState, type ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageBackground from '@/components/dashboard/PageBackground';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import AskQuestionModal from '@/components/dashboard/AskQuestionModal';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useUser } from '@clerk/nextjs';
import AddTagModal from './AddTagModal';
interface PageShellProps {
    title?: string;
    subtitle?: string;
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchChange?: (v: string) => void;
    showAskButton?: boolean;
    showAddTag?: boolean;
    showSearch?: boolean;
    children: ReactNode;
    rightPanel?: ReactNode;
}

const PageShell = ({ title, subtitle, searchPlaceholder, searchValue, onSearchChange, showAskButton, showSearch = false, children, rightPanel, showAddTag }: PageShellProps) => {  
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { user } = useUser();
  const [modalTagOpen, setModalTagOpen] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen">
      <PageBackground />

      <DashboardNavbar
        searchPlaceholder={searchPlaceholder}
        searchValue={showSearch ? searchValue : undefined}
        onSearchChange={showSearch ? onSearchChange : undefined}
      />

      <AskQuestionModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />

      <AddTagModal 
        open={modalTagOpen}
        onClose={() => setModalTagOpen(false)} 
      />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
          <DashboardSidebar />

          <div className="min-w-0">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
                  )}
                </div>
                {
                  showAskButton && (
                    <Button
                      onClick={() => setModalOpen(true)}
                      className="group bg-linear-to-r from-primary to-accent cursor-pointer text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/40 hover:brightness-110"
                    >
                      <Plus className="h-4 w-4" />
                      Ask Question
                    </Button>
                  )
                }

                {
                  showAddTag && (
                    <Button
                      onClick={() => setModalTagOpen(true)}
                      className="group bg-linear-to-r from-primary to-accent cursor-pointer text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/40 hover:brightness-110"
                    >
                      <Plus className="h-4 w-4" />
                      New Tag
                    </Button>
                  )
                }
              </div>
              {children}
            </div>

            {rightPanel && <div className="mt-6">{rightPanel}</div>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default PageShell;