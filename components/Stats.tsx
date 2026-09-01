import { stats } from "@/constants";

const Stats = () => {
  return (
    <section className="relative border-y border-border/60 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <dl className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="group">
              <dd className="bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent transition-transform duration-300 group-hover:scale-105 sm:text-5xl">
                {stat.value}
              </dd>
              <dt className="mt-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default Stats;