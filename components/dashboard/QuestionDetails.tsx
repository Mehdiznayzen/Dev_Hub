"use client";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  Eye,
  MessageSquare,
  MapPin,
  Globe,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

import { Question } from "@/data";
import { avatarColors, initials } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

const QuestionDetails = ({ questionId }: { questionId: string }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(process.env.NEXT_PUBLIC_API_GET_QUESTION_DETAILS!, {
            params: {
              questionId,
            },
          }
        );

        if (response.status === 200) {
          setQuestion(response.data.question);
        }
      } catch (error) {
        console.error("Error fetching question:", error);
        setError("Unable to load this question.");
      } finally {
        setIsLoading(false);
      }
    };

    if (questionId) {
      fetchQuestion();
    }
  }, [questionId]);

  // Loading
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />

          <p className="text-sm text-muted-foreground">
            Loading question...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error || !question) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground/50" />

          <h2 className="mt-4 text-lg font-semibold text-foreground">
            Question not found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error || "This question does not exist."}
          </p>

          <Link
            href={`/dashboard/${question?.user.clerkUserId}/questions`}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to questions
          </Link>
        </div>
      </div>
    );
  }

  const profile = question.user?.profile;

  const authorName = profile?.fullName || question.user?.username || "Unknown user";

  const username = question.user?.username || "unknown";

  const answerCount = question.answers?.length ?? 0;

  const colorIndex = String(question.id).charCodeAt(0) % avatarColors.length;

  const formattedQuestionDate = new Date(question.createdAt).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Back */}
        <Link
          href={`/dashboard/${question?.user.clerkUserId}/questions`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to questions
        </Link>

        {/* Question */}
        <article className="overflow-hidden rounded-2xl border border-border/70 bg-card/50 shadow-xl shadow-black/5 backdrop-blur-sm">

          {/* Header */}
          <div className="border-b border-border/60 p-6 sm:p-8">

            <h1 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
              {question.title}
            </h1>

            {/* Stats */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">

              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                Asked {formattedQuestionDate}
              </div>

              <div className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                {question.views}{" "}
                {question.views === 1 ? "view" : "views"}
              </div>

              <div className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" />
                {answerCount}{" "}
                {answerCount === 1 ? "answer" : "answers"}
              </div>

            </div>

            {/* Author */}
            <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-background/40 p-4">

              <div className="flex min-w-0 items-center gap-3">

                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br ${avatarColors[colorIndex]} text-xs font-bold text-white ring-2 ring-background`}
                >
                  {profile?.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={authorName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initials(authorName)
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {authorName}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    @{username}
                  </p>
                </div>

              </div>

              {profile?.role && (
                <span className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:inline-flex">
                  {profile.role}
                </span>
              )}

            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">

            <p className="whitespace-pre-wrap text-sm leading-7 text-foreground/90 sm:text-base">
              {question.content}
            </p>

            {/* Author info */}
            {(profile?.bio ||
              profile?.location ||
              profile?.github ||
              profile?.linkedin ||
              profile?.website) && (
              <div className="mt-8 rounded-xl border border-border/50 bg-secondary/20 p-5">

                <h3 className="mb-4 text-sm font-semibold text-foreground">
                  About the author
                </h3>

                {profile.bio && (
                  <p className="mb-4 text-sm leading-6 text-muted-foreground">
                    {profile.bio}
                  </p>
                )}

                <div className="flex flex-wrap gap-3">

                  {profile.location && (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-background/60 px-3 py-2 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {profile.location}
                    </span>
                  )}

                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-background/60 px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-primary"
                    >
                      <SiGithub className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                  )}

                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-background/60 px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-primary"
                    >
                      <FaLinkedin className="h-3.5 w-3.5" />
                      LinkedIn
                    </a>
                  )}

                  {profile.website && (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-background/60 px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Website
                    </a>
                  )}

                </div>
              </div>
            )}
          </div>
        </article>

        {/* Answers */}
        <section className="mt-8">

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">
              {answerCount}{" "}
              {answerCount === 1 ? "Answer" : "Answers"}
            </h2>
          </div>

          {answerCount === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/70 bg-card/30 px-6 py-12 text-center">

              <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground/50" />

              <h3 className="mt-4 text-sm font-semibold text-foreground">
                No answers yet
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Be the first developer to answer this question.
              </p>

            </div>
          ) : (
            <div className="space-y-5">

              {question.answers.map((answer) => {

                const answerProfile =
                  answer.user?.profile;

                const answerAuthorName =
                  answerProfile?.fullName ||
                  answer.user?.username ||
                  "Unknown user";

                const answerUsername =
                  answer.user?.username ||
                  "unknown";

                const answerColorIndex =
                  String(answer.id).charCodeAt(0) %
                  avatarColors.length;

                const answerDate =
                  new Date(answer.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  );

                return (
                  <article
                    key={answer.id}
                    className={`overflow-hidden rounded-2xl border ${
                      answer.isAccepted
                        ? "border-emerald-500/30 bg-emerald-500/5"
                        : "border-border/70 bg-card/40"
                    }`}
                  >

                    {/* Accepted */}
                    {answer.isAccepted && (
                      <div className="flex items-center gap-2 border-b border-emerald-500/20 bg-emerald-500/10 px-5 py-3 text-xs font-medium text-emerald-400">
                        <Check className="h-4 w-4" />
                        Accepted answer
                      </div>
                    )}

                    <div className="p-5 sm:p-6">

                      <p className="whitespace-pre-wrap text-sm leading-7 text-foreground/90 sm:text-base">
                        {answer.content}
                      </p>

                      {/* Answer author */}
                      <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">

                        <div className="flex items-center gap-3">

                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br ${avatarColors[answerColorIndex]} text-[10px] font-bold text-white`}
                          >
                            {answerProfile?.avatarUrl ? (
                              <img
                                src={answerProfile.avatarUrl}
                                alt={answerAuthorName}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              initials(answerAuthorName)
                            )}
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-foreground">
                              {answerAuthorName}
                            </p>

                            <p className="text-[11px] text-muted-foreground">
                              @{answerUsername}
                            </p>
                          </div>

                        </div>

                        <span className="text-[11px] text-muted-foreground">
                          {answerDate}
                        </span>

                      </div>
                    </div>
                  </article>
                );
              })}

            </div>
          )}

        </section>
      </div>
    </div>
  );
};

export default QuestionDetails;