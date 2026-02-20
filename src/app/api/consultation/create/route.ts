import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      preferredCallTime,
      smokingStatus,
      yearsUsing,
      dailyUsage,
      previousQuitAttempts,
      currentNRT,
      medicalConditions,
    } = body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !smokingStatus ||
      !yearsUsing ||
      !dailyUsage
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In production:
    // 1. Create consultation record in database via Prisma
    // 2. Create Stripe checkout session
    // 3. Return checkout URL

    /*
    const consultation = await prisma.consultation.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth: new Date(dateOfBirth),
        preferredCallTime: new Date(preferredCallTime),
        smokingStatus,
        yearsUsing,
        dailyUsage,
        previousQuitAttempts,
        currentNRT,
        medicalConditions,
      },
    });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: "Pharmacist Consultation",
              description: "15-20 minute phone consultation with AHPRA-registered pharmacist",
            },
            unit_amount: 2995,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/book`,
      customer_email: email,
      metadata: {
        consultationId: consultation.id,
      },
    });

    return NextResponse.json({ url: session.url });
    */

    // Placeholder response
    return NextResponse.json({
      success: true,
      message: "Consultation created (demo mode)",
      id: `cons_${Date.now()}`,
    });
  } catch (error) {
    console.error("Error creating consultation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
