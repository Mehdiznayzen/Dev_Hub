import { ArrowRight, Heart, MessageCircle, Eye, Star, GitBranch } from 'lucide-react';

function HeroPreview() {
  return (
    <div className="relative">
      {/* Glow behind card */}
      <div className="absolute -inset-4 rounded-3xl bg-linear-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" />

      <div className="relative rounded-2xl border border-border bg-card/80 p-5 shadow-2xl backdrop-blur-xl">
        {/* Window chrome */}
        <div className="mb-4 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs font-medium text-muted-foreground">
            devhub.app/feed
          </span>
        </div>

        {/* Profile mini-row */}
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-border/60 bg-secondary/30 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent text-sm font-bold text-white">
            AK
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">
              Alex Karimov
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Full-Stack Engineer · React · Next.js
            </p>
          </div>
          <button className="rounded-md bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
            Follow
          </button>
        </div>

        {/* Post body */}
        <div className="mb-3 rounded-xl border border-border/60 bg-secondary/20 p-4">
          <h3 className="text-sm font-semibold text-foreground">
            Building a real-time collab editor with Next.js + WebSockets
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Just shipped a CRDT-based collaborative code editor. Here&apos;s how
            I handled conflict resolution and presence awareness...
          </p>

          {/* Code snippet */}
          <pre className="mt-3 overflow-x-auto rounded-lg border border-border/60 bg-background/60 p-3 text-[11px] leading-relaxed">
            <code className="font-mono text-muted-foreground">
              <span className="text-accent">const</span>{' '}
              <span className="text-primary">doc</span> ={' '}
              <span className="text-accent">new</span> Y.Doc();
              {'\n'}
              <span className="text-primary">wsProvider</span> ={' '}
              <span className="text-accent">new</span> WebsocketProvider(
              {'\n'}  <span className="text-green-400">'wss://collab.dev'</span>,
              <span className="text-green-400">'room-42'</span>, doc
              {'\n'});
            </code>
          </pre>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['Next.js', 'TypeScript', 'WebSockets'].map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Engagement row */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5 text-red-400/80" /> 248
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MessageCircle className="h-3.5 w-3.5 text-primary/80" /> 42
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5" /> 1.2k
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-yellow-400/80" /> 89
          </span>
        </div>

        {/* Floating project card */}
        <div className="absolute -bottom-6 -right-4 hidden w-48 rounded-xl border border-border bg-card p-3 shadow-xl backdrop-blur-xl animate-float sm:block">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
              <GitBranch className="h-4 w-4 text-accent" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-foreground">
                edge-functions-kit
              </p>
              <p className="text-[10px] text-muted-foreground">12 contributors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-grid mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-125 w-200 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-75 w-75 rounded-full bg-accent/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              The Community for Developers
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Build.{' '}
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                Share.
              </span>{' '}
              Connect.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl text-balance">
              Everything developers need to learn, build, share and grow
              together.
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground/80 text-balance">
              Share your knowledge, ask questions, showcase your projects, and
              connect with developers who are building the future.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary/30 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-border/80 hover:bg-secondary/60"
              >
                Explore Community
              </a>
            </div>
          </div>

          {/* Right: fake dashboard preview */}
          <div className="animate-fade-in-up [animation-delay:200ms]">
            <HeroPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;