import { createQuestion } from "@/lib/actions/questions";

export const POST = async (request: Request) => {
    try {
        const body = await request.json();

        const question = await createQuestion(body);
        return Response.json({
            success: true,
            message: "Question created successfully",
            question
        }, { status: 200 });
    } catch (error) {
        console.error('Error in POST /create-question:', error);
        
        return Response.json({
            success: false,
            message : "An error occured while processign the request"
        }, { status: 500 });
    }
}