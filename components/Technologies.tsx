import { technologies } from "@/constants";


const Technologies = () => {
  return (
    <section id="projects" className="relative border-y border-border/60 bg-secondary/20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Built for developers, by developers.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            DevHub is home to every stack. Whatever you build with, you&apos;ll
            find people who speak your language.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-3 sm:gap-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="group rounded-xl border border-border bg-card/50 px-5 py-3 text-sm font-semibold text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:text-foreground hover:shadow-lg hover:shadow-primary/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Technologies;