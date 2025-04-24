"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Fetch from "@/utils/Fetch";
import OrderCard from "@/components/card/OrderCard";

const prepareFetch = async (id?: string) => {
  const API =
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}/order/to-pay` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: [] };
};

export default function ToPay() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [order, setOrder] = useState<OrderType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await prepareFetch(user?.id);
      setOrder(data);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-4 p-4">
        <h1 className="text-center">Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      {order.map((item, index) => (
        <OrderCard key={index} data={item} />
      ))}
    </div>
  );
}
