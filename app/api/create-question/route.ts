import { createQuestion } from "@/lib/actions/questions";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const question = await createQuestion({
      title: body.title,
      content: body.content,
      tagIds: body.tagIds,
    });

    return NextResponse.json(question, {
      status: 201,
    });
  } catch (error) {
    console.error("Error /api/questions/create:", error);

    if (error instanceof Error) {
      if (error.message === "User not authenticated") {
        return NextResponse.json(
          { error: error.message },
          { status: 401 }
        );
      }

      if (
        error.message === "Question title is required" ||
        error.message === "Question content is required" ||
        error.message === "At least one tag is required"
      ) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      if (
        error.message === "One or more tags do not exist"
      ) {
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