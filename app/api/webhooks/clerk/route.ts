import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { verifyWebhook } from '@clerk/backend/webhooks';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  console.log('========== WEBHOOK START ==========');

  try {
    console.log('1. Vérification du webhook...');

    const event = await verifyWebhook(request);

    console.log('2. Webhook vérifié:', event.type);

    switch (event.type) {
      case 'user.created': {
        const user = event.data;

        console.log('3. User reçu:', user.id);

        const email = user.email_addresses?.[0]?.email_address;

        console.log('4. Email:', email);

        if (!email) {
          console.error('5. EMAIL MANQUANT');

          return Response.json(
            {
              success: false,
              message: 'User email not found',
            },
            { status: 400 }
          );
        }

        console.log('6. Tentative insertion DB...');

        const result = await db
          .insert(users)
          .values({
            id: crypto.randomUUID(),
            clerkUserId: user.id,
            email,
            username: user.username ?? null,
          })
          .returning();

        console.log('7. UTILISATEUR INSÉRÉ:', result);

        break;
      }

      case 'user.updated': {
        const user = event.data;

        if (!user.id) {
            console.error('Clerk user ID not found');

            return Response.json(
            {
                success: false,
                message: 'Clerk user ID not found',
            },
            { status: 400 }
            );
        }

        const email = user.email_addresses?.[0]?.email_address;

        if (!email) {
            return Response.json(
            {
                success: false,
                message: 'User email not found',
            },
            { status: 400 }
            );
        }

        console.log('USER UPDATED:', {
            id: user.id,
            email,
            username: user.username,
        });

        const result = await db
            .update(users)
            .set({
                email,
                username: user.username ?? null,
                updatedAt: new Date(),
            })
            .where(eq(users.clerkUserId, user.id))
            .returning();

            console.log('USER UPDATED IN DB:', result);

            break;
        }

        case 'user.deleted': {
            const user = event.data;

            if (!user.id) {
                console.error('Clerk user ID not found');

                return Response.json(
                {
                    success: false,
                    message: 'Clerk user ID not found',
                },
                { status: 400 }
                );
            }

            console.log('USER DELETED:', user.id);

            const result = await db
                .delete(users)
                .where(eq(users.clerkUserId, user.id))
                .returning();

            console.log('USER DELETED FROM DB:', result);

            break;
        }

        default:
            console.log('Unhandled Clerk event:', event.type);
        }

    console.log('========== WEBHOOK SUCCESS ==========');

    return Response.json(
      {
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('========== WEBHOOK ERROR ==========');
    console.error(error);

    if (error instanceof Error) {
      console.error('ERROR MESSAGE:', error.message);
      console.error('ERROR STACK:', error.stack);
    }

    console.error('====================================');

    return Response.json(
      {
        success: false,
        message: 'Webhook processing failed',
      },
      {
        status: 500,
      }
    );
  }
}