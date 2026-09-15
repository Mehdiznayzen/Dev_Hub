import { auth } from "@clerk/nextjs/server";
import { db } from "../db";

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