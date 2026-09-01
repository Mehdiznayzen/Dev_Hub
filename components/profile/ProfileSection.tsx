import { cn } from '@/lib/utils';

type ProfileSectionProps = {
    title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const ProfileSection = ({ title, description, children, className }: ProfileSectionProps) => {
  return (
    <section className={cn('space-y-5', className)}>
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default ProfileSection;