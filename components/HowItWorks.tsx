import { steps } from "@/constants";

const HowItWorks = () => {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dots mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)] opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            How DevHub works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Three simple steps to go from visitor to valued community member.
          </p>
        </div>

        <div className="relative mt-16 grid gap-8 lg:grid-cols-3">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-linear-to-r from-transparent via-border to-transparent lg:block" />

          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-border bg-card/50 p-8 transition-all duration-300 hover:border-primary/40 hover:bg-card"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent text-xl font-bold text-white shadow-lg shadow-primary/20">
                {step.number}
              </span>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;