"use client";

import EmptyState from "@/components/dashboard/EmptyState";
import PageShell from "@/components/dashboard/PageShell";
import axios from "axios";
import { TagIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Tag {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
}

const TagsPage = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTags = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(process.env.NEXT_PUBLIC_API_GET_ALL_TAG!);

      setTags(response.data.tags || []);
    } catch (error) {
      console.error("Error fetching tags:", error);
      setTags([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <PageShell
      title="Tags"
      subtitle="Explore topics and technologies from the developer community"
      showAddTag
    >
      {
        isLoading ? (
          <div className="flex min-h-75 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : tags.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {
              tags.map((tag) => (
                <a
                  key={tag.id}
                  href="#"
                  className="group rounded-xl border border-border/70 bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/60 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <TagIcon className="h-4 w-4" />
                    </span>

                    <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                      {tag.name}
                    </h3>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {tag.description || "No description available."}
                  </p>

                  <p className="mt-3 text-xs font-medium text-muted-foreground">
                    0 questions
                  </p>
                </a>
              ))
            }
          </div>
        ) : (
          <EmptyState
            title="No tags found"
            description="There are no tags available yet."
          />
        )
      }
    </PageShell>
  );
};

export default TagsPage;