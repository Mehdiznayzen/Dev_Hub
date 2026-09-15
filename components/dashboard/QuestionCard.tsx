import {
  Check,
  Eye,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import { Question } from "@/data";
import { avatarColors, initials } from "@/lib/utils";
import Link from "next/link";

export function QuestionCard({ question, index = 0 }: { question: Question; index?: number }) {

  const colorIndex = String(question.id).charCodeAt(0) % avatarColors.length;
  const profile = question.user?.profile;
  const authorName = profile?.fullName || question.user?.username || "Unknown user";
  const username = question.user?.username || "unknown";
  const answerCount = question.answers?.length ?? 0;
  const accepted = question.answers?.some( (answer) => answer.isAccepted) ?? false;
  const formattedDate = new Date(question.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`questions/${question.id}`}
    >
      <article
        className="group animate-fade-up border-b border-border/60 p-5 transition-all duration-200 hover:bg-secondary/20 sm:p-6 cursor-pointer"
        style={{ animationDelay: `${Math.min(index, 6) * 60}ms` }}
        >
        <div className="flex gap-4 sm:gap-6">
          {/* =========================
              CONTENT
          ========================= */}
          <div className="min-w-0 flex-1">
            {/* Title */}
            <div className="flex items-start justify-between gap-4">
              <h3
                className="min-w-0 text-base font-semibold leading-snug text-foreground transition-colors sm:text-lg"
              >
                {question.title}
              </h3>

              <ArrowUpRight
                className="hidden h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100 sm:block"
              />
            </div>

            {/* Description */}
            <p
              className="
                mt-2
                line-clamp-2
                max-w-3xl
                text-sm
                leading-6
                text-muted-foreground
              "
            >
              {question.content}
            </p>

            {/* Bottom section */}
            <div
              className="
                mt-5
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

              {/* Author */}
              <div className="flex items-center gap-2.5">

                {/* Avatar */}
                <div
                  className={`
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-linear-to-br
                    ${avatarColors[colorIndex]}
                    text-[10px]
                    font-bold
                    text-white
                    ring-2
                    ring-background
                  `}
                >
                  {profile?.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={authorName}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    initials(authorName)
                  )}
                </div>

                {/* User info */}
                <div className="flex min-w-0 flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-xs font-semibold text-foreground">
                      {authorName}
                    </span>

                    {
                      accepted && (
                        <span
                          className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-medium text-emerald-400"
                        >
                          <Check className="h-2.5 w-2.5" />
                          Answered
                        </span>
                      )
                    }
                  </div>

                  <span className="text-[11px] text-muted-foreground">
                    @{username}
                  </span>
                </div>
              </div>

              {/* Date */}
              <div
                className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
              >
                <span>Asked</span>
                <span className="text-border">•</span>
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">

              <div className="flex items-center gap-4 text-[11px] text-muted-foreground">

                <div className="flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5 opacity-60" />
                  <span>
                    {answerCount}{" "}
                    {answerCount === 1 ? "answer" : "answers"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 opacity-60" />
                  <span>
                    {question.views}{" "}
                    {question.views === 1 ? "view" : "views"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="
                text-[11px]
                  font-medium
                  text-primary
                  opacity-0
                  transition-opacity
                  group-hover:opacity-100
                "
              >
                View question →
              </button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}