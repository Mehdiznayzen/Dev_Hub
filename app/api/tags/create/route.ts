import { createTag } from "@/lib/actions/tags";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const body = await request.json();

        const tag = await createTag({
            name: body.name,
            description: body.description
        });

        return NextResponse.json({
            tag,
        }, { status: 201 });
    } catch (error) {
        console.error("Error /api/tags/create: ", error);

        if(error instanceof Error){
            if(error.message === "User not authenticated"){
                return NextResponse.json({
                    error: error.message,
                }, { status: 401 });
            };

            if(error.message === "Tag already exists"){
                return NextResponse.json({
                    error: error.message,
                }, { status: 409 });
            }

            if(error.message === "Tag name is required"){
                return NextResponse.json({
                    error: error.message,
                }, { status: 409 });
            }

            return NextResponse.json({
                error: error.message
            }, { status: 500 });
        }

    }
}