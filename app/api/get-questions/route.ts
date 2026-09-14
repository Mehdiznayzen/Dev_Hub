import { getAllQuestions } from "@/lib/actions/questions";


export const GET = async () => {
    try {
        const questions = await getAllQuestions();

        return Response.json({
            success: true,
            questions
        }, { status: 200 })
    } catch (error) {
        console.error('Error in GET /get-questions:', error);
        
        return Response.json({
            success: false,
            message : "An error occured while processign the request"
        }, { status: 500 });
    }
}