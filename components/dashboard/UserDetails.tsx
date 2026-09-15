"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Mail,
  Globe,
  MessageCircle,
  HelpCircle,
  Briefcase,
  CalendarDays,
  Loader2,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Code2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { initials, cn } from "@/lib/utils";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

interface Skill {
  id: string;
  name: string;
}

interface ProfileSkill {
  profileId: string;
  skillId: string;
  skill: Skill;
}

interface Profile {
  id: string;
  userId: string;
  fullName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  role: string | null;
  experience: string | null;
  location: string | null;
  github: string | null;
  linkedin: string | null;
  website: string | null;
  profileSkills: ProfileSkill[];
}

interface User {
  id: string;
  clerkUserId: string;
  email: string;
  username: string | null;
  createdAt: string;
  updatedAt: string;
  profile: Profile | null;
  questions: any[];
  answers: any[];
}

interface UserDetailsProps {
  userId: string;
}

const UserDetails = ({ userId }: UserDetailsProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_GET_USERS}/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (isLoading) {
    return (
      <div className="relative flex min-h-[500px] items-center justify-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 h-72 w-96 -translate-x-1/2 rounded-full bg-primary/8 blur-[140px] animate-pulse-glow" />
        </div>
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Loading user...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative flex min-h-[500px] flex-col items-center justify-center gap-5">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 h-72 w-96 -translate-x-1/2 rounded-full bg-destructive/8 blur-[140px]" />
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border/60 bg-card/40 backdrop-blur-sm">
          <HelpCircle className="h-7 w-7 text-muted-foreground" />
        </div>
        <p className="text-base font-medium text-muted-foreground">
          User not found
        </p>
        <Link
          href={`/dashboard/users`}
          className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-5 py-2.5 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to users
        </Link>
      </div>
    );
  }

  const profile = user.profile;
  const fullName = profile?.fullName || user.username || "Anonymous User";
  const username = user.username || "user";
  const skills = profile?.profileSkills?.map((ps) => ps.skill) || [];
  const questionsCount = user.questions?.length || 0;
  const answersCount = user.answers?.length || 0;
  const createdAt = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative mx-auto w-full max-w-5xl space-y-6">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-10 left-1/4 h-80 w-96 -translate-x-1/2 rounded-full bg-primary/8 blur-[150px] animate-pulse-glow" />
        <div className="absolute right-10 top-40 h-64 w-64 rounded-full bg-accent/8 blur-[130px] animate-pulse-glow delay-300" />
      </div>

      {/* Back */}
      <Link
        href={`/dashboard/${user?.clerkUserId}/users`}
        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mt-10"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        Back to users
      </Link>

      {/* Profile Header */}
      <div className="animate-fade-up overflow-hidden rounded-2xl border border-border/70 bg-card/50 shadow-2xl backdrop-blur-xl">
        {/* Cover */}
        <div className="relative h-36 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-primary/25 via-accent/15 to-primary/20" />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-[80px]" />
          <div className="absolute right-1/4 top-0 h-40 w-40 rounded-full bg-accent/15 blur-[70px]" />
        </div>

        <div className="px-6 pb-6 sm:px-8">
          {/* Avatar + Main Info */}
          <div className="-mt-16 flex flex-col gap-5 sm:flex-row sm:items-end">
            {profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={fullName}
                className="h-28 w-28 rounded-2xl object-cover ring-4 ring-background shadow-xl"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-white ring-4 ring-background shadow-xl shadow-primary/20">
                {initials(fullName)}
              </div>
            )}

            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  {fullName}
                </h1>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Sparkles className="h-3 w-3" />
                </span>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">@{username}</p>
              {profile?.role && (
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Briefcase className="h-3 w-3" />
                  {profile.role}
                </span>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="group rounded-xl border border-border/60 bg-secondary/20 p-4 transition-colors hover:border-primary/30 hover:bg-secondary/30">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <HelpCircle className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs font-medium">Questions</span>
              </div>
              <p className="mt-2.5 text-2xl font-bold text-foreground">
                {questionsCount}
              </p>
            </div>

            <div className="group rounded-xl border border-border/60 bg-secondary/20 p-4 transition-colors hover:border-primary/30 hover:bg-secondary/30">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <MessageCircle className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs font-medium">Answers</span>
              </div>
              <p className="mt-2.5 text-2xl font-bold text-foreground">
                {answersCount}
              </p>
            </div>

            <div className="col-span-2 rounded-xl border border-border/60 bg-secondary/20 p-4 sm:col-span-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs font-medium">Member since</span>
              </div>
              <p className="mt-2.5 text-sm font-semibold text-foreground">
                {createdAt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-6 lg:col-span-2">
          {/* About */}
          <section className="animate-fade-up rounded-2xl border border-border/70 bg-card/50 p-6 shadow-lg backdrop-blur-sm sm:p-7">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Code2 className="h-4 w-4" />
              </span>
              <h2 className="text-lg font-semibold text-foreground">About</h2>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
              {profile?.bio || "No bio provided."}
            </p>
          </section>

          {/* Skills */}
          <section className="animate-fade-up rounded-2xl border border-border/70 bg-card/50 p-6 shadow-lg backdrop-blur-sm sm:p-7">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <TrendingUp className="h-4 w-4" />
              </span>
              <h2 className="text-lg font-semibold text-foreground">Skills</h2>
            </div>

            {skills.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center rounded-lg border border-primary/25 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:border-primary/40 hover:bg-primary/15"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                No skills added.
              </p>
            )}
          </section>

          {/* Questions */}
          <section className="animate-fade-up rounded-2xl border border-border/70 bg-card/50 p-6 shadow-lg backdrop-blur-sm sm:p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <HelpCircle className="h-4 w-4" />
                </span>
                <h2 className="text-lg font-semibold text-foreground">
                  Questions
                </h2>
              </div>
              <span className="rounded-full border border-border/60 bg-secondary/40 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {questionsCount} total
              </span>
            </div>

            {user.questions.length > 0 ? (
              <div className="mt-4 space-y-3">
                {user.questions.map((question) => (
                  <div
                    key={question.id}
                    className="group cursor-pointer rounded-xl border border-border/60 bg-secondary/20 p-4 transition-all duration-200 hover:border-primary/30 hover:bg-secondary/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-medium text-foreground transition-colors group-hover:text-primary">
                        {question.title}
                      </h3>
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {question.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                This user has not asked any questions yet.
              </p>
            )}
          </section>

          {/* Answers */}
          <section className="animate-fade-up rounded-2xl border border-border/70 bg-card/50 p-6 shadow-lg backdrop-blur-sm sm:p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <h2 className="text-lg font-semibold text-foreground">
                  Answers
                </h2>
              </div>
              <span className="rounded-full border border-border/60 bg-secondary/40 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {answersCount} total
              </span>
            </div>

            {user.answers.length > 0 ? (
              <div className="mt-4 space-y-3">
                {user.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className="group rounded-xl border border-border/60 bg-secondary/20 p-4 transition-all duration-200 hover:border-accent/30 hover:bg-secondary/30"
                  >
                    <p className="text-sm leading-6 text-muted-foreground">
                      {answer.content}
                    </p>
                    {answer.question?.title && (
                      <div className="mt-3 flex items-center gap-1.5 border-t border-border/40 pt-3 text-xs font-medium text-primary">
                        <HelpCircle className="h-3 w-3" />
                        {answer.question.title}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                This user has not answered any questions yet.
              </p>
            )}
          </section>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Contact */}
          <section className="animate-fade-up rounded-2xl border border-border/70 bg-card/50 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-foreground">
              Contact & Links
            </h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-secondary/20 px-3 py-2.5 text-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/60 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="break-all text-muted-foreground">
                  {user.email}
                </span>
              </div>

              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-border/40 bg-secondary/20 px-3 py-2.5 text-sm transition-all duration-200 hover:border-primary/40 hover:bg-secondary/30"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/60 text-muted-foreground transition-colors group-hover:text-primary">
                    <SiGithub className="h-4 w-4" />
                  </span>
                  <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                    GitHub
                  </span>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                </a>
              )}

              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-border/40 bg-secondary/20 px-3 py-2.5 text-sm transition-all duration-200 hover:border-primary/40 hover:bg-secondary/30"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/60 text-muted-foreground transition-colors group-hover:text-primary">
                    <FaLinkedin className="h-4 w-4" />
                  </span>
                  <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                    LinkedIn
                  </span>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                </a>
              )}

              {profile?.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-border/40 bg-secondary/20 px-3 py-2.5 text-sm transition-all duration-200 hover:border-primary/40 hover:bg-secondary/30"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/60 text-muted-foreground transition-colors group-hover:text-primary">
                    <Globe className="h-4 w-4" />
                  </span>
                  <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                    Website
                  </span>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                </a>
              )}
            </div>
          </section>

          {/* Professional Information */}
          <section className="animate-fade-up rounded-2xl border border-border/70 bg-card/50 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-foreground">
              Professional
            </h2>
            <div className="mt-4 space-y-4">
              {profile?.role && (
                <div className="rounded-lg border border-border/40 bg-secondary/20 px-3.5 py-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5" />
                    Role
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-foreground">
                    {profile.role}
                  </p>
                </div>
              )}

              {profile?.experience && (
                <div className="rounded-lg border border-border/40 bg-secondary/20 px-3.5 py-3">
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="mt-1.5 text-sm font-medium text-foreground">
                    {profile.experience}
                  </p>
                </div>
              )}

              {profile?.location && (
                <div className="rounded-lg border border-border/40 bg-secondary/20 px-3.5 py-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    Location
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-foreground">
                    {profile.location}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Account */}
          <section className="animate-fade-up rounded-2xl border border-border/70 bg-card/50 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-foreground">Account</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-border/40 pb-3">
                <span className="text-muted-foreground">Username</span>
                <span className="font-medium text-foreground">@{username}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Member since</span>
                <span className="text-right font-medium text-foreground">
                  {createdAt}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
