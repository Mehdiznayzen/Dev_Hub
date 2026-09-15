import { getAllAnswers } from "@/lib/actions/answers";

export const GET = async () => {
  try {
    const answers = await getAllAnswers();

    return Response.json({
        success: true,
        message: "Answers retrieved successfully",
        answers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/get-answers:", error);

    return Response.json({
        success: false,
        message: "Failed to get answers",
      },
      { status: 500 }
    );
  }
};