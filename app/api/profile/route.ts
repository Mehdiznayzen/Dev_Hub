import { searchProfile } from "@/lib/actions/profile";

export async function GET() {
  try {
    const profile = await searchProfile();

    return Response.json(
      {
        success: true,
        profile,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/profile:", error);

    return Response.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch profile",
      },
      { status: 500 }
    );
  }
}