import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { answers, questions, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

interface CreateAnswerProps {
  questionId: string,
  content: string
}

export const getAllAnswers = async () => {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      throw new Error("User not authenticated");
    }

    const answers = await db.query.answers.findMany({
      with: {
        user: {
          with: {
            profile: true,
          },
        },
        question: {
          with: {
            user: {
              with: {
                profile: true,
              },
            },
          },
        },
      },
      orderBy: (answers, { desc }) => [
        desc(answers.createdAt),
      ],
    });

    return answers;
  } catch (error) {
    console.error("Error getting all answers:", error);
    throw new Error("Failed to get all answers");
  }
};

export const getUserAnswers = async () => {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      throw new Error("User not authenticated");
    }

    const user = await db.query.users.findFirst({
      where: eq(users.clerkUserId, clerkUserId),
    });
    if (!user) {
      throw new Error("User not found");
    }

    const userAnswers = await db.query.answers.findMany({
      where: eq(answers.userId, user.id),

      with: {
        user: {
          with: {
            profile: true,
          },
        },

        question: {
          with: {
            user: {
              with: {
                profile: true,
              },
            },
            questionTags: {
              with: {
                tag: true,
              },
            },
          },
        },
      },

      orderBy: (answers, { desc }) => [
        desc(answers.createdAt),
      ],
    });

    return userAnswers;

  } catch (error) {
    console.error("Error getting user answers: ", error);
    throw error;
  }
};

export const createAnswer = async (data: CreateAnswerProps) => {
  try {
    
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      throw new Error("User not authenticated");
    }

    if (!data.questionId) {
      throw new Error("Question ID is required");
    }

    const cleanContent = data.content.trim();
    if (!cleanContent) {
      throw new Error("Answer content is required");
    };

    const user = await db.query.users.findFirst({
      where: eq(users.clerkUserId, clerkUserId),
    });
    if (!user) {
      throw new Error("User not found");
    }

    const question = await db.query.questions.findFirst({
      where: (questions, { eq }) => eq(questions.id, data.questionId),
    });
    if (!question) {
      throw new Error("Question not found");
    }

    const [newAnswer] = await db.insert(answers).values({
        id: crypto.randomUUID(),
        questionId: data.questionId,
        userId: user.id,
        content: cleanContent,
        isAccepted: false,
      }).returning();

    return {
      success: true,
      answer: newAnswer,
    };

  } catch (error) {
    console.error("Error creating answer: ", error);
    throw error;
  }
}