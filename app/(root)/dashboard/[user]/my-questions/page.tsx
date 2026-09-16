"use client";

import EmptyState from "@/components/dashboard/EmptyState";
import PageShell from "@/components/dashboard/PageShell";
import QuestionFilters from "@/components/dashboard/QuestionsFilters";
import QuestionList from "@/components/dashboard/QuestionsList";
import { Question } from "@/data";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const MyQuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyQuestions = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(process.env.NEXT_PUBLIC_API_GET_USER_QUESTIONS!);

        if (response.status === 200) {
          setQuestions(response.data.questions ?? []);
        }
      } catch (error) {
        console.error("Error fetching my questions:", error);
        setQuestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyQuestions();
  }, []);

  return (
    <PageShell
      title="My Questions"
      subtitle="Manage and track the questions you've asked"
      showAskButton
      showSearch
      searchPlaceholder="Search my questions..."
    >

      <div className="mt-6">
        {isLoading ? (
          <div className="flex min-h-75 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />

              <p className="text-sm text-muted-foreground">
                Loading your questions...
              </p>
            </div>
          </div>
        ) : questions.length > 0 ? (
          <QuestionList questions={questions} />
        ) : (
          <EmptyState
            title="You haven't asked any questions yet"
            description="Ask your first question and get help from the developer community."
          />
        )}
      </div>
    </PageShell>
  );
};

export default MyQuestionsPage;