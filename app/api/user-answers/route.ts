import { getUserAnswers } from "@/lib/actions/answers";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const answers = await getUserAnswers();

    console.log("User answers:", answers);

    return NextResponse.json(
      {
        success: true,
        answers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error GET /api/user-answers:", error);

    if (error instanceof Error) {
      if (error.message === "User not authenticated") {
        return NextResponse.json(
          { error: error.message },
          { status: 401 }
        );
      }

      if (error.message === "User not found") {
        return NextResponse.json(
          { error: error.message },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to get user answers" },
      { status: 500 }
    );
  }
}