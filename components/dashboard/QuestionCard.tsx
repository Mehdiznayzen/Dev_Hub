import { Question } from '@/data';
import { initials } from '@/lib/utils';
import QuestionTags from './QuestionTags';
import QuestionStats from './QuestionsStats';

const avatarColors = [
  'from-blue-500 to-cyan-500',
  'from-violet-500 to-fuchsia-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500',
  'from-indigo-500 to-blue-500',
];



export function QuestionCard({
  question,
  index = 0,
}: {
  question: Question;
  index?: number;
}) {
  const colorIndex = question.id % avatarColors.length;

  return (
    <article
      className="group animate-fade-up border-b border-border/60 p-5 transition-colors duration-200 hover:bg-secondary/20"
      style={{ animationDelay: `${Math.min(index, 6) * 60}ms` }}
    >
      <div className="flex gap-5">
        <QuestionStats
          votes={question.votes}
          answers={question.answers}
          views={question.views}
          accepted={question.accepted}
        />

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-medium leading-snug text-foreground transition-colors hover:text-primary sm:text-[17px]">
            <a href="#" className="hover:text-primary">
              {question.title}
            </a>
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {question.excerpt}
          </p>

          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
            <QuestionTags tags={question.tags} />

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br ${avatarColors[colorIndex]} text-[10px] font-semibold text-white`}
                aria-hidden="true"
              >
                {initials(question.author)}
              </span>
              <span className="font-medium text-foreground/80">
                {question.author}
              </span>
              <span aria-hidden="true">·</span>
              <span>{question.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
