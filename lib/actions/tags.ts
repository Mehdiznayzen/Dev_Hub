import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { tags } from "@/drizzle/schema";

interface CreateTagProps {
  name: string;
  description?: string;
}

export const getAllTags = async () => {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      throw new Error("User not authenticated");
    }

    const allTags = await db.query.tags.findMany({
      orderBy: (tags, { desc }) => [
        desc(tags.createdAt),
      ],
    });

    return allTags;
  } catch (error) {
    console.error("Error getting all tags:", error);
    throw error;
  }
};

export const createTag = async (data: CreateTagProps) => {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      throw new Error("User not authenticated");
    }

    const name = data.name.trim();
    const description = data.description?.trim() || null;

    if (!name) {
      throw new Error("Tag name is required");
    }

    const existingTag = await db.query.tags.findFirst({
      where: eq(tags.name, name),
    });
    if (existingTag) {
      throw new Error("Tag already exists");
    }

    const [newTag] = await db.insert(tags).values({
        name,
        description,
    }).returning();

    return {
      success: true,
      tag: newTag,
    };
  } catch (error) {
    console.error("Error creating tag:", error);

    throw error;
  }
};