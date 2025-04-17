"use client";
import { createSource } from "@/lib/omise";
import { Button } from "../ui/button";
import Fetch from "@/utils/Fetch";
import { useRouter } from "next/navigation";

export default function Pay({ id, amount }: { id: string; amount: number }) {
  const router = useRouter();

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

    if (res.status !== "ok") {
      return alert("Failed: Something went wrong!");
    }

    return router.push(res.data.authorize_uri);
  };

  return (
    <Button onClick={() => handlePay(id, amount)} className="cursor-pointer">
      Pay
    </Button>
  );
}
