'use client';

import { Globe, MapPin } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

interface ProfilePreviewProps {
  avatarUrl: string | null;
  fullName: string;
  role?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  github?: string;
  linkedin?: string;
  website?: string;
}

const ProfilePreview = ({
  avatarUrl,
  fullName,
  role,
  bio,
  location,
  skills = [],
  github,
  linkedin,
  website,
}: ProfilePreviewProps) => {
  const { user } = useUser();

  // Initiales pour l'avatar par défaut
  const initials = fullName
    ? fullName
        .split(' ')
        .map((name) => name[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'DU';

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-sm font-semibold text-foreground">
          Profile preview
        </h2>

        <p className="mt-1 text-xs text-muted-foreground">
          This is how your profile will look to the community.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-6 shadow-2xl backdrop-blur-xl">

        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-32 w-48 -translate-x-1/2 rounded-full bg-primary/15 blur-[80px]" />

          <div className="absolute bottom-0 right-0 h-28 w-40 rounded-full bg-accent/10 blur-[80px]" />
        </div>

        {/* Avatar + Name */}
        <div className="flex flex-col items-center text-center">

          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={fullName || 'Avatar'}
              className="h-20 w-20 rounded-full object-cover shadow-lg shadow-primary/25"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent text-2xl font-semibold text-white shadow-lg shadow-primary/25">
              {initials}
            </div>
          )}

          <h3 className="mt-4 text-lg font-semibold text-foreground">
            {fullName || 'Your name'}
          </h3>

          <p className="text-sm text-muted-foreground">
            @{user?.username || 'username'}
          </p>

          {/* Role */}
          {role && (
            <span className="mt-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {role}
            </span>
          )}

        </div>

        {/* Bio */}
        <p className="mt-5 text-center text-sm leading-relaxed text-muted-foreground">
          {bio || 'Your bio will appear here.'}
        </p>

        {/* Location */}
        {location && (
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-5 flex flex-wrap justify-center gap-1.5 border-t border-border/60 pt-5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-secondary/50 px-2 py-1 text-xs font-medium text-foreground/80"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Social */}
        {(github || linkedin || website) && (
          <div className="mt-5 flex items-center justify-center gap-2 border-t border-border/60 pt-5">

            {github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <SiGithub className="h-4 w-4" />
              </Link>
            )}

            {linkedin && (
              <Link
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-4 w-4" />
              </Link>
            )}

            {website && (
              <Link
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </Link>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default ProfilePreview;