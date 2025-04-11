"use client";
import Fetch from "@/utils/Fetch";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import TicketCard from "./TicketCard";

interface TicketType {
  type: "regular" | "vip";
  price: number;
  quantity: number | 10;
  sale_start_date: string;
  sale_end_date: string;
}

interface CartType {
  type: TicketType["type"];
  price: number;
  quantity: number;
}

const prepareFetch = async () => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: TicketMock };
};

export default function Ticket() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const updateQuantity = (type: TicketType["type"], amount: number) => {
    const key = type;
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(0, (prev[key] || 0) + amount),
    }));
  };

  const handleCheckout = () => {
    const cart: CartType[] = tickets
      .map((ticket) => {
        const key = ticket.type;
        const quantity = quantities[key] || 0;
        return {
          type: ticket.type,
          price: ticket.price,
          quantity,
        };
      })
      .filter((item) => item.quantity > 0);

    console.log("🧾 Checkout payload:", cart);
  };

  const total = tickets.reduce((sum, ticket) => {
    const key = ticket.type;
    const quantity = quantities[key] || 0;
    return sum + quantity * ticket.price;
  }, 0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await prepareFetch();
      setTickets(data);

      const initialQuantities: Record<string, number> = {};
      data.forEach((ticket: TicketType) => {
        const key = ticket.type;
        initialQuantities[key] = 0;
      });
      setQuantities(initialQuantities);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return null;

  return (
    <section className="bg-gray-100 py-10">
      <div className="container">
        <h1 className="text-2xl font-semibold">Tickets</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="col-span-2 flex flex-col gap-4">
            {tickets?.map((ticket, index) => (
              <TicketCard
                key={index}
                data={ticket}
                updateQuantity={updateQuantity}
                quantities={quantities}
              />
            ))}
          </div>
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold">Cart Details</h3>
            <div className="flex flex-col justify-between gap-4 mt-4">
              {tickets.map((ticket, index) => {
                const key = ticket.type;
                const quantity = quantities[key] || 0;
                if (quantity === 0) return null;
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <p>{ticket.type}</p>
                    <div className="flex justify-between">
                      <p>&#3647; {ticket.price.toFixed(2)}</p>
                      <p>x {quantity}</p>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between items-center font-semibold">
                <p>Total</p>
                <p className="text-2xl">&#3647; {total.toFixed(2)}</p>
              </div>
              <Button className="cursor-pointer" onClick={handleCheckout}>
                Buy Tickets
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TicketMock = [
  {
    type: "regular",
    price: 100,
    quantity: 500,
    sale_start_date: "2025-04-01",
    sale_end_date: "2025-04-20",
  },
  {
    type: "vip",
    price: 250,
    quantity: 100,
    sale_start_date: "2025-04-01",
    sale_end_date: "2025-04-20",
  },
];
