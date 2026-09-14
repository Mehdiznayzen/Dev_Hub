"use client";

import EmptyState from "@/components/dashboard/EmptyState";
import PageShell from "@/components/dashboard/PageShell";
import { avatarColors, initials } from "@/lib/utils";
import axios from "axios";
import {
  MapPin,
  MessageCircle,
  HelpCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const ShowUsersPage = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_GET_USERS!
        );

        if (response.status === 200) {
          setUserData(response.data.users);
        }
      } catch (error) {
        console.error("Error GET users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <PageShell
      active="Users"
      title="Users"
      subtitle="Discover developers from the community"
      showSearch
      showAskButton={false}
    >
      {/* =========================
          LOADER
      ========================= */}

      {isLoading ? (
        <div className="flex min-h-100 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />

            <p className="text-sm text-muted-foreground">
              Loading developers...
            </p>
          </div>
        </div>
      ) : userData.length > 0 ? (
        /* =========================
           USERS
        ========================= */

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {userData.map((user, index) => {
            const profile = user.profile;

            const fullName =
              profile?.fullName ||
              user.username ||
              "Anonymous User";

            const username = user.username || "user";

            const skills =
              profile?.profileSkills?.map(
                (profileSkill) => profileSkill.skill
              ) || [];

            const answersCount = user.answers?.length || 0;

            const questionsCount = user.questions?.length || 0;

            const avatarColor = avatarColors[index % avatarColors.length];

            return (
              <Link
                key={user.id}
                href={`/dashboard/${user.clerkUserId}/users/${user.id}`}
                className="group rounded-xl border border-border/70 bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/60 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* =========================
                    HEADER
                ========================= */}

                <div className="flex items-center gap-3">
                  {/* Avatar */}

                  {profile?.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={fullName}
                      className="h-12 w-12 rounded-full object-cover shadow-lg ring-2 ring-border"
                    />
                  ) : (
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${avatarColor} text-sm font-semibold text-white shadow-lg`}
                    >
                      {initials(fullName)}
                    </span>
                  )}

                  {/* Name */}

                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                      {fullName}
                    </h3>

                    <p className="truncate text-xs text-muted-foreground">
                      @{username}
                    </p>
                  </div>
                </div>

                {/* =========================
                    ROLE
                ========================= */}

                {profile?.role && (
                  <p className="mt-3 text-sm font-medium text-foreground/80">
                    {profile.role}
                  </p>
                )}

                {/* =========================
                    LOCATION
                ========================= */}

                {profile?.location && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />

                    <span className="truncate">
                      {profile.location}
                    </span>
                  </div>
                )}

                {/* =========================
                    SKILLS
                ========================= */}

                {skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="rounded-md border border-border/70 bg-secondary/50 px-2 py-0.5 text-xs font-medium text-foreground/80"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* =========================
                    STATS
                ========================= */}

                <div className="mt-4 flex items-center gap-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                  {/* Answers */}

                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="h-3.5 w-3.5" />

                    <strong className="text-foreground">
                      {answersCount}
                    </strong>

                    answers
                  </span>

                  {/* Questions */}

                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="h-3.5 w-3.5" />

                    <strong className="text-foreground">
                      {questionsCount}
                    </strong>

                    questions
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No users found"
          description="Try a different search to find developers."
        />
      )}
    </PageShell>
  );
};

export default ShowUsersPage;
