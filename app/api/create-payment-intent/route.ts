import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

// create strapi instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export async function POST(req: NextRequest) {
  const { data } = await req.json();
  const { amount } = data;

  try {
    // payment intent: holds important information about the payment, including: supported payment methods, amount, currency, and more
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100, // stripe only works with cents
      currency: "USD",
    });

    return new NextResponse(paymentIntent.client_secret, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      { message: "An unknown error occurred" },
      {
        status: 500,
      }
    );
  }
}
