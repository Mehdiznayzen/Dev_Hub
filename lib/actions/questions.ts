import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { questions, users } from "@/drizzle/schema";

interface CreateQuestionProps {
    title: string;
    content: string;
}

export const createQuestion = async (data: CreateQuestionProps) => {
    try {
        // 1. Vérifier l'authentification Clerk
        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            throw new Error("User not authenticated");
        }

        // 2. Trouver l'utilisateur dans notre DB
        const user = await db.query.users.findFirst({
            where: eq(users.clerkUserId, clerkUserId),
        });

        if (!user) {
            throw new Error("User not found in the database");
        }

        // 3. Générer l'ID de la question
        const questionId = crypto.randomUUID();

        // 4. Créer la question
        const question = await db.insert(questions).values({
                id: questionId,
                userId: user.id,
                title: data.title,
                content: data.content,
            }).returning();

        return question;
    } catch (error) {
        console.error("Error creating new question:", error);
        throw new Error("Failed to create new question");
    }
};