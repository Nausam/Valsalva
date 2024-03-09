import stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let product;

  try {
    product = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    console.log("Stripe webhook event:", product);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const productType = product.type;

  // CREATE
  if (productType === "checkout.session.completed") {
    const { id, amount_total, metadata } = product.data.object;

    const order = {
      stripeId: id,
      productId: metadata?.productId || "",
      buyerId: metadata?.buyerId || "",
      totalAmount: amount_total ? (amount_total / 100).toString() : "0",
      footPocketColor: metadata?.footPocketColor || "",
      bladeAngle: metadata?.bladeAngle || "",
      softness: metadata?.softness || "",
      bladeSize: metadata?.bladeSize || "",
      bladeCut: metadata?.bladeCut || "",
      imageUrl: metadata?.imageUrl || "",
      createdAt: new Date(),
    };

    const newOrder = await createOrder(order);
    return NextResponse.json({ message: "OK", order: newOrder });
  }

  return new Response("", { status: 200 });
}
