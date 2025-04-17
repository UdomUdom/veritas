"use client";
import Fetch from "@/utils/Fetch";
import { Button } from "../ui/button";
import { SquareCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Checkout({ id }: { id: string }) {
  const router = useRouter();

  const confirmOrder = async () => {
    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}/checkout?method=confirm`,
      {
        method: "POST",
      }
    );

    if (res.status !== "ok") {
      return alert("Error: " + res.message);
    }

    router.push(`/order/${id}/pay`);
  };

  const cancelOrder = async () => {
    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}/checkout?method=cancel`,
      {
        method: "POST",
      }
    );

    if (res.status !== "ok") {
      return alert("Error: " + res.message);
    }

    router.push(`/order/${id}`);
  };
  return (
    <div className="flex justify-between items-center mb-12">
      <Button
        variant="secondary"
        className="cursor-pointer"
        onClick={cancelOrder}
      >
        Cancel This Order
      </Button>
      <Button
        variant="default"
        className="bg-green-500 cursor-pointer"
        onClick={confirmOrder}
      >
        <SquareCheck />
        <p>Confirm</p>
      </Button>
    </div>
  );
}
