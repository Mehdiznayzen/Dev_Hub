import { getUserQuestions } from "@/lib/actions/questions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const questions = await getUserQuestions();
    console.log("questions: " ,questions)

    return NextResponse.json(
      {
        success: true,
        questions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error GET /api/user-questions:", error);

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
    }

    return NextResponse.json(
      { error: "Failed to get user questions" },
      { status: 500 }
    );
  }
}