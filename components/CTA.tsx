import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)] opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-100 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-primary/20 to-accent/20 blur-[120px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
          Your next great idea starts with the right community.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-balance">
          Join developers who share knowledge, build projects and grow
          together.
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40"
          >
            Join DevHub
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTA;