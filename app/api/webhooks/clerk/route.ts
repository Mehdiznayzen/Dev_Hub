import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { verifyWebhook } from '@clerk/backend/webhooks';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const event = await verifyWebhook(request);

    console.log('Clerk webhook:', event.type);

    switch (event.type) {
      // ==========================================
      // USER CREATED
      // ==========================================
      case 'user.created': {
        const user = event.data;
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

        console.log('USER CREATED:', {
          id: user.id,
          email,
          username: user.username,
        });

        await db.insert(users).values({
            id: crypto.randomUUID(),
            clerkUserId: user.id,
            email,
            username: user.username ?? null,
          }).onConflictDoNothing({
            target: users.clerkUserId,
          });

        break;
      }

      // ==========================================
      // USER UPDATED
      // ==========================================
      case 'user.updated': {
        const user = event.data;

        // Vérifier que l'ID existe
        if (!user.id) {
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

        await db.update(users).set({
            email,
            username: user.username ?? null,
            updatedAt: new Date(),
          })
          .where(eq(users.clerkUserId, user.id));

        break;
      }

      // ==========================================
      // USER DELETED
      // ==========================================
      case 'user.deleted': {
        const user = event.data;

        // Vérifier que l'ID existe
        if (!user.id) {
          return Response.json(
            {
              success: false,
              message: 'Clerk user ID not found',
            },
            { status: 400 }
          );
        }

        console.log('USER DELETED:', user.id);

        await db
          .delete(users)
          .where(eq(users.clerkUserId, user.id));

        break;
      }

      // ==========================================
      // OTHER EVENTS
      // ==========================================
      default: {
        console.log('Unhandled Clerk event:', event.type);
      }
    }

    return Response.json(
      {
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Clerk webhook error:', error);

    return Response.json(
      {
        success: false,
        message: 'Webhook processing failed',
      },
      {
        status: 400,
      }
    );
  }
}