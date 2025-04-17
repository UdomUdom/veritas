"use client";
import { createSource } from "@/lib/omise";
import { Button } from "../ui/button";
import Fetch from "@/utils/Fetch";

const handlePay = async (id: string, amount: number) => {
  const omise = (await createSource(amount)) as { id: string };

  const res = await Fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}/pay`,
    {
      method: "POST",
      body: {
        source: omise.id,
      },
    }
  );

  if (res && res.status === "ok") {
    // wait for development
    console.log(res);
  }

  return;
};

export default function Pay({ id, amount }: { id: string; amount: number }) {
  return (
    <Button onClick={() => handlePay(id, amount)} className="cursor-pointer">
      Pay
    </Button>
  );
}
