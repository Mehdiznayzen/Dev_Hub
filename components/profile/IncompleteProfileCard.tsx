import Link from "next/link";
import { ArrowRight, CircleAlert } from "lucide-react";

const IncompleteProfileCard = () => {
  return (
    <div className="glass-strong animate-fade-up w-full max-w-sm rounded-2xl p-5 shadow-xl">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CircleAlert className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-card-foreground">
            Complete your profile
          </h3>

          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Your profile is not complete yet. Add more information to
            help other developers discover you.
          </p>
        </div>
      </div>

      {/* Button */}
      <Link
        href="/profile"
        className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:brightness-110 hover:shadow-primary/30"
      >
        Complete profile

        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default IncompleteProfileCard;