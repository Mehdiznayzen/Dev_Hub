interface ProfileCompletionProps {
  percent: number;
}

const ProfileCompletion = ({ percent }: ProfileCompletionProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          Profile completion
        </span>

        <span className="text-sm font-medium text-primary">
          {percent}%
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/60">
        <div
          className="h-full rounded-full bg-linear-to-r from-primary to-accent transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProfileCompletion;