/**
 * This is a module that handles creating and updating payments intents using Stripe
 * It integrates with Stripe API to manage payment processes and uses Prisma to interact the database
 *
 * calculateOrderAmount helps the total order amount bases on the items in the localstorage
 * HTTP POST handler for creating and updating payment intents and orders
 */

import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProduct } from "@/app/product/[productId]/ProductDetails";
import { getCurrentUser } from "@/action/getCurrentUser";

// Environment variables for Stripe secret keys
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

/**
 * Calculate the total price of items in the cart
 * @param items array list inside CartProduct objects including price and quantity
 * @returns total the price
 */
const calculateOrderAmount = (items: CartProduct[]) => {
  const totalPrice = items.reduce((acc: any, item) => {
    const itemTotal = item.price * item.qty;
    return acc + itemTotal;
  }, 0);

  const price: any = totalPrice.toFixed(2);
  return price;
};

/**
 * updating and creating a Stripe payment intent and order in the database
 * @param request incoming the HTTP requests with the order details
 * @returns should have Next.js response object with the payment intent details or an error message
 */
export async function POST(request: Request) {
  // Check for users
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { items, payment_intent_id } = body;
  // calculate by 100 because it's in cent
  const total = calculateOrderAmount(items) * 100;
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };
  // If a payment_intent_id is provided, it means we're updating an existing payment intent.
  if (payment_intent_id) {
    // update the order
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: total,
        }
      );

      const [existing_order, update_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),
        prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: items,
          },
        }),
      ]);

      if (!existing_order) {
        return NextResponse.json(
          { error: "Invalid Payment Intent" },
          { status: 401 }
        );
      }

      return NextResponse.json({ paymentIntent: updated_intent });
    }
  } else {
    // create the order && intent
    //   starting with the intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    // start with the order
    orderData.paymentIntentId = paymentIntent.id;
    await prisma.order.create({
      data: orderData,
    });
    return NextResponse.json({ paymentIntent });
  }
}
