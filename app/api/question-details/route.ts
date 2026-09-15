import { getQuestionById } from "@/lib/actions/questions";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);

    const questionId = searchParams.get("questionId");

    if (!questionId) {
      return Response.json(
        {
          success: false,
          message: "questionId is required",
        },
        { status: 400 }
      );
    }

    const question = await getQuestionById(questionId);

    return Response.json(
      {
        success: true,
        message: "Question GET successfully",
        question,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/question-details:", error);

    return Response.json(
      {
        success: false,
        message: "An error occurred while processing the request",
      },
      { status: 500 }
    );
  }
};