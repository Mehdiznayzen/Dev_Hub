"use client"

import ProfileForm from '@/components/profile/ProfileForm';
import ProfilePreview from '@/components/profile/ProfilePreview';
import { decorativeSnippets } from '@/constants';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>('');
  const [bio, setBio] = useState<string>('');

  const [role, setRole] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [skills, setSkills] = useState<string[]>([]);

  const [location, setLocation] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [github, setGithub] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');

  useEffect(() => {
    if (avatarUrl?.trim() && fullName.trim() && bio.trim() && role.trim() && experience.trim() && skills.length > 0 && location.trim() && website.trim() && github.trim() && linkedin.trim()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [avatarUrl, fullName, bio, role, experience, skills, location, website, github, linkedin]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-105 w-130 -translate-x-1/2 rounded-full bg-primary/12 blur-[150px] animate-pulse-glow" />
        <div className="absolute right-[15%] top-[18%] h-75 w-75 rounded-full bg-accent/12 blur-[130px] animate-pulse-glow delay-300" />
        <div className="absolute left-[15%] bottom-[10%] h-70 w-70 rounded-full bg-primary/8 blur-[120px] animate-pulse-glow delay-500" />
        <div className="absolute inset-0 grid-bg opacity-25 mask-fade-b" />
      </div>

      {/* Decorative snippets */}
      {decorativeSnippets.map((s) => (
        <span
          key={s.text}
          className={`pointer-events-none absolute hidden font-mono text-sm text-muted-foreground/15 select-none lg:block ${s.className}`}
          aria-hidden="true"
        >
          {s.text}
        </span>
      ))}

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Header */}
        <div className="animate-fade-up flex flex-col items-center text-center">
          <Image
            src={"/logo.png"}
            alt='logo'
            width={150}
            height={150}
          />
          <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-gradient">Complete your profile</span>
          </h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
            Tell the DevHub community a little about yourself.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="animate-fade-up delay-200 mt-12 grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-3">
            <ProfileForm 
              disabled={disabled}
              avatarUrl={avatarUrl}
              setAvatarUrl={setAvatarUrl} 
              fullName={fullName}
              setFullName={setFullName} 
              bio={bio}
              setBio={setBio}
              role={role}
              setRole={setRole}
              experience={experience}
              setExperience={setExperience}
              skills={skills}
              setSkills={setSkills}
              location={location}
              setLocation={setLocation}
              website={website}
              setWebsite={setWebsite}
              github={github}
              setGithub={setGithub}
              linkedin={linkedin} 
              setLinkedin={setLinkedin}
            />
          </div>
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-8">
              <ProfilePreview 
                avatarUrl={avatarUrl} 
                fullName={fullName}
                role={role}
                bio={bio}
                location={location}
                skills={skills}
                website={website}
                github={github}
                linkedin={linkedin}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ProfilePage;