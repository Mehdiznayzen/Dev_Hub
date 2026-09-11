'use client';

import CommunitySidebar from "@/components/dashboard/CommunitySidebar";
import EmptyState from "@/components/dashboard/EmptyState";
import PageShell from "@/components/dashboard/PageShell";
import QuestionFilters from "@/components/dashboard/QuestionsFilters";
import { useQuestionsSearch } from "@/components/dashboard/QuestionsHeader";
import QuestionList from "@/components/dashboard/QuestionsList";


export default function QuestionsPage() {
  const { filtered } = useQuestionsSearch();

  return (
    <PageShell
      active="Questions"
      title="Questions"
      subtitle="Explore questions from the developer community"
      showAskButton
      showSearch
    >

      <QuestionFilters />

      <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-8">
        <div>
          {
            filtered.length > 0 ? (
              <QuestionList questions={filtered} />
            ) : (
              <EmptyState
                title="No questions found"
                description="Try adjusting your search terms or browse all questions."
              />
            )
          }
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <CommunitySidebar />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
