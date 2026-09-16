"use client";

import { useEffect, useState } from "react";
import { Users, MessageCircle, TrendingUp } from "lucide-react";
import axios from "axios";

interface TagsProps {
  id: number,
  name: string,
  description: string
}

const CommunitySidebar = () => {
  const [tags, setTags] = useState<TagsProps[]>([]);
  const [communitydata, setCommunitydata] = useState([
    {
      icon: Users,
      label: "developers",
      value: "0",
    },
    {
      icon: TrendingUp,
      label: "questions",
      value: "0",
    },
    {
      icon: MessageCircle,
      label: "answers",
      value: "0",
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        setIsLoading(true);

        const [responseUsers, responseQuestions, responseAnswers, responseTags] = await Promise.all([
          axios.get(process.env.NEXT_PUBLIC_API_GET_USERS!),
          axios.get(process.env.NEXT_PUBLIC_API_GET_QUESTIONS!),
          axios.get(process.env.NEXT_PUBLIC_API_GET_ANSWERS_DETAILS!),
          axios.get(process.env.NEXT_PUBLIC_API_GET_ALL_TAG!),
        ]);

        const usersCount = responseUsers.data.users?.length ?? 0;
        const questionsCount = responseQuestions.data.questions.length ?? 0;
        const answersCount = responseAnswers.data.answers.length ?? 0;
        const tags = responseTags.data.tags;
        setTags(tags.slice(0, 5))

        setCommunitydata([
          {
            icon: Users,
            label: "developers",
            value: usersCount.toString(),
          },
          {
            icon: TrendingUp,
            label: "questions",
            value: questionsCount.toString(),
          },
          {
            icon: MessageCircle,
            label: "answers",
            value: answersCount,
          },
        ]);
      } catch (error) {
        console.error(
          "Error while fetching community data:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunityData();
  }, []);

  return (
    <aside className="space-y-5">
      <div className="rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-foreground">
          DevHub Community
        </h2>

        <dl className="mt-4 space-y-3">
          {communitydata.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <stat.icon className="h-4 w-4" />
              </span>

              <dd className="text-sm font-semibold text-foreground">
                {isLoading ? "..." : stat.value}
              </dd>

              <dt className="text-sm text-muted-foreground">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-foreground">
          Popular Tags
        </h2>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {
            tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-md border border-border/70 bg-secondary/50 px-2 py-0.5 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {tag.name}
              </span>
            ))
          }
        </div>
      </div>
    </aside>
  );
};

export default CommunitySidebar;