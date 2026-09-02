import { createProfile } from "@/lib/actions/profile";


export const POST = async (request: Request) => {
  try {

    const body = await request.json();

    const profile = await createProfile(body);

    return Response.json(
      {
        success: true,
        message: 'Profile created successfully',
        profile,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in POST /add-profile:', error);

    return Response.json(
      {
        success: false,
        message: 'An error occurred while processing the request',
      },
      { status: 500 }
    );
  }
};