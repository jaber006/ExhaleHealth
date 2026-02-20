import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing Stripe signature" },
        { status: 400 }
      );
    }

    // In production:
    /*
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const consultationId = session.metadata?.consultationId;

        if (consultationId) {
          await prisma.consultation.update({
            where: { id: consultationId },
            data: {
              paymentStatus: "paid",
              paymentIntentId: session.payment_intent as string,
            },
          });

          // Send confirmation email via Resend
          // await resend.emails.send({
          //   from: "Exhale <noreply@exhale.health>",
          //   to: session.customer_email!,
          //   subject: "Consultation Booking Confirmed — Exhale",
          //   html: `...`,
          // });
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        console.log("Payment failed:", paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    */

    // Placeholder response
    console.log("Webhook received (demo mode):", body.substring(0, 100));

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
