"use client";
import { Button } from "../ui/button";
import Fetch from "@/utils/Fetch";
import { notify } from "@/utils/Notify";
import { loadStripe } from "@stripe/stripe-js";

export default function Pay({ id }: { id: string }) {
  const handlePay = async (id: string) => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
    );

    if (!stripe) return;

    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}/pay`,
      {
        method: "POST",
      }
    );

    if (res.status !== "ok") {
      notify.error("Failed: Something went wrong!");
    }

    stripe.redirectToCheckout({
      sessionId: res.data.session_id,
    });
  };

  return (
    <Button onClick={() => handlePay(id)} className="cursor-pointer">
      Pay
    </Button>
  );
}
