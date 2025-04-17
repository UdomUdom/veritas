"use client";
import { useAuth } from "@/context/AuthContext";
import { createSource } from "@/lib/omise";
import Fetch from "@/utils/Fetch";
import { Button } from "../ui/button";
import { SquareCheck } from "lucide-react";

export default function Checkout({ id }: { id: string }) {
  const { user } = useAuth();

  const confirmOrder = async () => {
    const omise_res = (await createSource(1)) as { id: string };

    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}/checkout?method=confirm`,
      {
        method: "POST",
        body: {
          user_id: user?.id,
          source: omise_res.id,
        },
      }
    );

    if (res.status === "ok") {
      window.location.href = `/test/order/${id}/pay`;
    } else {
      alert("Error: " + res.message);
    }
  };

  const cancelOrder = async () => {
    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}/checkout?method=cancel`,
      {
        method: "POST",
      }
    );

    if (res.status === "ok") {
      window.location.href = `/test/order/${id}`;
    } else {
      alert("Error: " + res.message);
    }
  };
  return (
    <div className="flex justify-between items-center mb-12">
      <Button variant="secondary" onClick={cancelOrder}>
        Cancel This Order
      </Button>
      <Button variant="default" className="bg-green-500" onClick={confirmOrder}>
        <SquareCheck />
        <p>Confirm</p>
      </Button>
    </div>
  );
}
