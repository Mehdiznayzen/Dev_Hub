import { GetUserDetails } from "@/lib/actions/users";

export const GET = async (request: Request, { params }: { params: Promise<{ userId: string }> }) => {
  try {
    const { userId } = await params;

    const user = await GetUserDetails(userId);
    return Response.json(
      {
        success: true,
        message: "User GET successfully",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/users/[userId]:", error);

    return Response.json(
      {
        success: false,
        message: "An error occurred processing the request",
      },
      { status: 500 }
    );
  }
};