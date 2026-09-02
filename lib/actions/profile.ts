import { profiles, profileSkills, skills, users } from "@/drizzle/schema";
import { db } from "../db";
import { auth } from '@clerk/nextjs/server';
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

export const searchProfile = async () => {
    try {
        const { userId } = await auth();
        if(!userId){
            throw new Error('User not authenticated');
        }

        const profile = await db.query.profiles.findFirst({
            where: eq(profiles.userId, userId)
        });

        if (!profile) {
            return null;
        }

        return profile;
    } catch (error) {
        console.error('Error searching profile:', error);
        throw new Error('Failed to search profile');
    }
}

export const createProfile = async (data: CreateProfileData) => {
    try {
        // 1. Récupérer l'utilisateur connecté avec Clerk
        const { userId: clerkUserId } = await auth();
        if (!clerkUserId) {
            throw new Error('User not authenticated');
        }

        // 2. Trouver l'utilisateur dans notre DB
        const user = await db.query.users.findFirst({
            where: eq(users.clerkUserId, clerkUserId),
        });
        if(!user) {
            throw new Error('User not found in the database');
        }

        // 3. Créer le profil
        const profileId = crypto.randomUUID();

        const [profile] = await db.insert(profiles).values({
            id: profileId,
            userId: clerkUserId,
            fullName: data.fullName,
            bio: data.bio,
            role: data.role,
            experience: data.experience,
            location: data.location,
            website: data.website,
            github: data.github,
            linkedin: data.linkedin,
            avatarUrl: data.avatarUrl
        }).returning();

        // 4. Créer / récupérer les skills
        for(const skillName of data.skills){
            const existingSkill = await db.query.skills.findFirst({
                where: eq(skills.name, skillName),
            });

            let skillId: string;

            if (existingSkill) {
                skillId = existingSkill.id;
            } else {
                skillId = crypto.randomUUID();

                await db.insert(skills).values({
                    id: skillId,
                    name: skillName,
                });
            }

            // 5. Relier le skill au profil
            await db.insert(profileSkills).values({
                profileId,
                skillId,
            });
        };

        return profile;

    } catch (error) {
        console.error('Error creating profile:', error);
        throw new Error('Failed to create profile');
    }
}