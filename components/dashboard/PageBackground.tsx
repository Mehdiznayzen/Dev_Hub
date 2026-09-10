const PageBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-1/4 top-0 h-90 w-130 -translate-x-1/2 rounded-full bg-primary/10 blur-[150px] animate-pulse-glow" />
      <div className="absolute right-[10%] top-[20%] h-70 w-70 rounded-full bg-accent/10 blur-[130px] animate-pulse-glow delay-300" />
      <div className="absolute inset-0 grid-bg opacity-20 mask-fade-b" />
    </div>
  );
}

export default PageBackground;