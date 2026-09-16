"use client";

import EmptyState from "@/components/dashboard/EmptyState";
import PageShell from "@/components/dashboard/PageShell";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface UserAnswer {
  id: string;
  content: string;
  isAccepted: boolean;
  createdAt: string;
  question: {
    id: string;
    title: string;
    content: string;
    questionTags?: {
      tag: {
        id: number;
        name: string;
      };
    }[];
  };
}

const MyAnswersPage = () => {
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyAnswers = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(process.env.NEXT_PUBLIC_API_GET_USER_ANSWERS!);

        if (response.status === 200) {
          setAnswers(response.data.answers ?? []);
        }
      } catch (error) {
        console.error("Error fetching my answers:", error);
        setAnswers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyAnswers();
  }, []);

  return (
    <PageShell
      title="My Answers"
      subtitle="Manage and track the answers you've posted"
      showAskButton
      showSearch
      searchPlaceholder="Search my answers..."
    >
      <div className="mt-6">
        {
          isLoading ? (
            <div className="flex min-h-75 items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />

                <p className="text-sm text-muted-foreground">
                  Loading your answers...
                </p>
              </div>
            </div>
          ) : answers.length > 0 ? (
            <div className="space-y-4">
              {
                answers.map((answer) => (
                  <div
                    key={answer.id}
                    className="rounded-xl border border-border bg-card p-5"
                  >
                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground">
                        Answer to
                      </p>

                      <h3 className="mt-1 text-lg font-semibold">
                        {answer.question.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {answer.content}
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      {
                        answer.isAccepted && (
                          <span className="rounded-md bg-green-500/10 px-2 py-1 text-xs text-green-500">
                            Accepted
                          </span>
                        )
                      }

                      {
                        answer.question.questionTags?.map(({ tag }) => (
                          <span
                            key={tag.id}
                            className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary"
                          >
                            {tag.name}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <EmptyState
              title="You haven't answered any questions yet"
              description="Answer questions from the community and share your knowledge."
            />
          )
        }
      </div>
    </PageShell>
  );
};

export default MyAnswersPage;