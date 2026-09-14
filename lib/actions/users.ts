import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const GetUserDetails = async (userId: string) => {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      throw new Error("User not authenticated");
    }

    if (!userId) {
      throw new Error("User ID is required");
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),

      with: {
        profile: {
          with: {
            profileSkills: {
              with: {
                skill: true,
              },
            },
          },
        },

        questions: {
          with: {
            answers: {
              with: {
                user: {
                  with: {
                    profile: {
                      with: {
                        profileSkills: {
                          with: {
                            skill: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        answers: {
          with: {
            question: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error getting user details:", error);
    throw new Error("Failed to get user details");
  }
};

export const getAllUsers = async () => {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      throw new Error("User not authenticated");
    }

    const users = await db.query.users.findMany({
      with: {
        profile: {
          with: {
            profileSkills: {
              with: {
                skill: true,
              },
            },
          },
        },

        questions: {
          with: {
            answers: {
              with: {
                user: {
                  with: {
                    profile: {
                      with: {
                        profileSkills: {
                          with: {
                            skill: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        answers: {
          with: {
            question: true,
          },
        },
      },
    });

    return users;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw new Error("Failed to get all users");
  }
};