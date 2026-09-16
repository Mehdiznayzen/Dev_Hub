import { getAllTags } from "@/lib/actions/tags";
import { NextResponse } from "next/server";


export const GET = async () => {
  try {
    const tags = await getAllTags();

    return NextResponse.json({
        success: true,
        tags,
      }, { status: 200 });
  } catch (error) {
    console.error("Error GET /api/tags:", error);

    if (error instanceof Error) {
      if (error.message === "User not authenticated") {
        return NextResponse.json(
          { error: error.message },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}