"use client";

import { popularTags } from '@/data';
import { communityStats } from '@/lib/utils';

const CommunitySidebar = () => {
  return (
    <aside className="space-y-5">
      <div className="rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-foreground">
          DevHub Community
        </h2>
        <dl className="mt-4 space-y-3">
          {
            communityStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <stat.icon className="h-4 w-4" />
                </span>
                <dd className="text-sm font-semibold text-foreground">
                  {stat.value}
                </dd>
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              </div>
            ))
          }
        </dl>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur-sm">
        <h2 className="text-sm font-semibold text-foreground">Popular Tags</h2>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {
            popularTags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border/70 bg-secondary/50 px-2 py-0.5 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {tag}
              </span>
            ))
          }
        </div>
      </div>
    </aside>
  );
}

export default CommunitySidebar;
