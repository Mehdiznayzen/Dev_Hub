"use client";

import CommunitySidebar from "@/components/dashboard/CommunitySidebar";
import EmptyState from "@/components/dashboard/EmptyState";
import PageShell from "@/components/dashboard/PageShell";
import QuestionFilters from "@/components/dashboard/QuestionsFilters";
import QuestionList from "@/components/dashboard/QuestionsList";
import { Question } from "@/data";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(process.env.NEXT_PUBLIC_API_GET_QUESTIONS!);

        if (response.status === 200) {
          setQuestions(response.data.questions);
        }
      } catch (error) {
        console.error("Error GET questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <PageShell
      title="Questions"
      subtitle="Explore questions from the developer community"
      showAskButton
      showSearch
    >
      <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-8">
        <div>
          {isLoading ? (
            <div className="flex min-h-100 items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />

                <p className="text-sm text-muted-foreground">
                  Loading questions...
                </p>
              </div>
            </div>
          ) : questions.length > 0 ? (
            <QuestionList 
              questions={questions} 
            />
          ) : (
            <EmptyState
              title="No questions found"
              description="Try adjusting your search terms or browse all questions."
            />
          )}
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