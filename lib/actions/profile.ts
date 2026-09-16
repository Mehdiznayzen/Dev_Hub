import {
    profiles,
    profileSkills,
    skills,
    users,
} from "@/drizzle/schema";

import { db } from "../db";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

interface CreateProfileData {
    fullName: string;
    username: string;
    bio: string;
    role: string;
    experience: string;
    skills: string[];
    location: string;
    website: string;
    github: string;
    linkedin: string;
    avatarUrl: string | null;
}

/* =========================================================
   SEARCH PROFILE
========================================================= */

export const searchProfile = async () => {
    try {
        const { userId: clerkUserId } = await auth();

        // Aucun utilisateur connecté
        if (!clerkUserId) {
            return null;
        }

        // Chercher notre user avec son Clerk ID
        const user = await db.query.users.findFirst({
            where: eq(users.clerkUserId, clerkUserId),
        });

        // User Clerk existe mais pas encore dans notre DB
        if (!user) {
            return null;
        }

        // Chercher le profile
        const profile = await db.query.profiles.findFirst({
            where: eq(profiles.userId, user.id),
            with: {
                profileSkills: {
                    with: {
                        skill: true,
                    },
                },
            },
        });

        // User existe mais pas encore de profile
        if (!profile) {
            return null;
        }

        return profile;

    } catch (error) {
        console.error("Error searching profile:", error);

        throw new Error("Failed to search profile");
    }
};


/* =========================================================
   CREATE PROFILE
========================================================= */

export const createProfile = async (data: CreateProfileData) => {
    try {
        /* -----------------------------------------
           1. Récupérer Clerk User ID
        ----------------------------------------- */

        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            throw new Error("User not authenticated");
        }


        /* -----------------------------------------
           2. Trouver notre user dans PostgreSQL
        ----------------------------------------- */

        const user = await db.query.users.findFirst({
            where: eq(users.clerkUserId, clerkUserId),
        });

        if (!user) {
            throw new Error(
                `User not found in database for Clerk ID: ${clerkUserId}`
            );
        }

        /* -----------------------------------------
           3. Vérifier si le profile existe déjà
        ----------------------------------------- */

        const existingProfile = await db.query.profiles.findFirst({
            where: eq(profiles.userId, user.id),
        });

        if (existingProfile) {
            throw new Error("Profile already exists");
        }


        /* -----------------------------------------
           4. Créer le profile
        ----------------------------------------- */

        const profileId = crypto.randomUUID();

        const [profile] = await db
            .insert(profiles)
            .values({
                id: profileId,

                // IMPORTANT !!!
                // profiles.userId référence users.id
                userId: user.id,

                fullName: data.fullName,
                avatarUrl: data.avatarUrl,
                bio: data.bio,
                role: data.role,
                experience: data.experience,
                location: data.location,
                github: data.github,
                linkedin: data.linkedin,
                website: data.website,
            })
            .returning();


        /* -----------------------------------------
           5. Créer / récupérer les skills
        ----------------------------------------- */

        for (const skillName of data.skills) {

            // Nettoyer le nom
            const cleanSkillName = skillName.trim();

            if (!cleanSkillName) {
                continue;
            }

            /* Chercher le skill existant */

            const existingSkill = await db.query.skills.findFirst({
                where: eq(
                    skills.name,
                    cleanSkillName
                ),
            });

            let skillId: string;

            /* -----------------------------------------
               Skill existe
            ----------------------------------------- */

            if (existingSkill) {

                skillId = existingSkill.id;

            }

            /* -----------------------------------------
               Skill n'existe pas
            ----------------------------------------- */

            else {

                skillId = crypto.randomUUID();

                await db
                    .insert(skills)
                    .values({
                        id: skillId,
                        name: cleanSkillName,
                    });
            }


            /* -----------------------------------------
               6. Vérifier si le lien existe déjà
            ----------------------------------------- */

            const existingProfileSkill =
                await db.query.profileSkills.findFirst({
                    where: (profileSkillsTable, { and, eq }) =>
                        and(
                            eq(
                                profileSkillsTable.profileId,
                                profileId
                            ),
                            eq(
                                profileSkillsTable.skillId,
                                skillId
                            )
                        ),
                });


            /* -----------------------------------------
               7. Relier profile -> skill
            ----------------------------------------- */

            if (!existingProfileSkill) {

                await db
                    .insert(profileSkills)
                    .values({
                        profileId,
                        skillId,
                    });
            }
        }


        /* -----------------------------------------
           8. Retourner le profile avec ses skills
        ----------------------------------------- */
        const createdProfile =
            await db.query.profiles.findFirst({
                where: eq(profiles.id, profileId),

                with: {
                    profileSkills: {
                        with: {
                            skill: true,
                        },
                    },
                },
            });


        return createdProfile;

    } catch (error) {
        console.error("Error creating profile:", error);
        throw new Error("Failed to create profile");
    }
};