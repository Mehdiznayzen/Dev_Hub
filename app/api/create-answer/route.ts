import { createAnswer } from "@/lib/actions/answers";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const answer = await createAnswer({
      questionId: body.questionId,
      content: body.content,
    });

    return NextResponse.json(answer, {
      status: 201,
    });
  } catch (error) {
    console.error("Error POST /api/answers/create:", error);

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

      if (error.message === "Question not found") {
        return NextResponse.json(
          { error: error.message },
          { status: 404 }
        );
      }

      if (error.message === "Answer content is required") {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      if (error.message === "Question ID is required") {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
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