import { getAllUsers } from "@/lib/actions/users";


export const GET = async () => {
    try {
        const users = await getAllUsers();

        return Response.json(
            {
                success: true,
                message: 'Users GET successfully',
                users,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error in GET /api/users: ', error)

        return Response.json({
            success: false,
            message: "An error occured processing the request"
        }, { status: 500 });
    }
}