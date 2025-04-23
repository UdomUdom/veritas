import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface ProductData {
  id: string;
  event_id: string;
  total: number;
}

export const createCheckoutSession = async (data: ProductData) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["promptpay"],
      line_items: [
        {
          price_data: {
            currency: "thb",
            product_data: {
              name: data.event_id,
            },
            unit_amount: data.total * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.DOMAIN}/order/${data.id}/success`,
      cancel_url: `${process.env.DOMAIN}/order/${data.id}/cancel`,
    });

    return session;
  } catch (error) {
    throw new Error("Failed to create checkout session");
  }
};
