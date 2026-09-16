import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { eq } from "drizzle-orm";
import {
  users,
  questions,
  tags,
  questionTags,
} from "@/drizzle/schema";

interface CreateQuestionProps {
  title: string;
  content: string;
  tagIds: number[];
}

export const getAllQuestions = async () => {
    try {
        const { userId: clerkUserId } = await auth();
        if(!clerkUserId){
            throw new Error("User not authenticated");
        }

        const questions = await db.query.questions.findMany({
            with: {
                user: {
                    with: {
                        profile: true
                    }
                },
                answers: true
            }
        });
        return questions;
    } catch (error) {
        console.error("Error getting all questions: ", error);
        throw new Error("Failed to get all questions");
    }
}

export const getQuestionById = async (questionId: string) => {
    try {
        const { userId: clerkUserId } = await auth();
        if(!clerkUserId){
            throw new Error("User not authenticated");
        }

        const question = await db.query.questions.findFirst({
            where: eq(questions.id, questionId),
            with: {
                user: {
                    with: {
                        profile: true
                    }
                },
                answers: {
                    with: {
                        user: {
                            with: {
                                profile: true,
                            },
                        },
                    },
                },
            }
        });

        if(!question){
            throw new Error("Question not found.")
        }

        return question;
    } catch (error) {
        console.error("Error getting question by ID:", error);
        throw new Error("Failed to get question");
    }
}

export const createQuestion = async (data: CreateQuestionProps) => {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      throw new Error("User not authenticated");
    }

    const title = data.title.trim();
    const content = data.content.trim();
    const tagIds = data.tagIds ?? [];

    if (!title) {
      throw new Error("Question title is required");
    }

    if (!content) {
      throw new Error("Question content is required");
    }

    if (tagIds.length === 0) {
      throw new Error("At least one tag is required");
    }

    // Récupérer l'utilisateur DB
    const user = await db.query.users.findFirst({
      where: eq(users.clerkUserId, clerkUserId),
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Vérifier que TOUS les tags existent
    const existingTags = await db.query.tags.findMany({
      where: (tags, { inArray }) =>
        inArray(tags.id, tagIds),
    });

    if (existingTags.length !== tagIds.length) {
      throw new Error("One or more tags do not exist");
    }

    // Créer la question
    const [newQuestion] = await db
      .insert(questions)
      .values({
        id: crypto.randomUUID(),
        userId: user.id,
        title,
        content,
      })
      .returning();

    // Créer les relations question <-> tags
    await db.insert(questionTags).values(
      tagIds.map((tagId) => ({
        questionId: newQuestion.id,
        tagId,
      }))
    );

    return {
      success: true,
      question: newQuestion,
      tags: existingTags,
    };
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};