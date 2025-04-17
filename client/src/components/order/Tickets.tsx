"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Fetch from "@/utils/Fetch";
import { useAuth } from "@/context/AuthContext";

interface TicketProps {
  event_id: string;
}

interface TicketType {
  id: string;
  type: string;
  price: number;
  available: number;
  sale_start: string;
  sale_end: string;
}

interface CartType {
  id: string;
  type: string;
  price: number;
  quantity: number;
  items: TicketType[];
  total: number;
}

const prepareFetch = async (id: string) => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/event/ticket/${id}` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: TicketMock };
};

export default function Ticket({ event_id }: TicketProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [cart, setCart] = useState<CartType[]>([]);

  const addToCart = (ticketType: string) => {
    const ticket = tickets.find((t: TicketType) => t.type === ticketType);
    const existingItem = cart.find(
      (item: CartType) => item.type === ticketType
    );

    if (existingItem) {
      setCart(
        cart.map((item: CartType) =>
          item.type === ticketType
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: ticket?.id,
          type: ticket?.type,
          price: ticket?.price,
          quantity: 1,
        } as CartType,
      ]);
    }
  };

  const removeFromCart = (ticketType: string) => {
    const existingItem = cart.find((item) => item.type === ticketType);

    if (existingItem?.quantity === 1) {
      setCart(cart.filter((item) => item.type !== ticketType));
    } else {
      setCart(
        cart.map((item) =>
          item.type === ticketType
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    ticketType: string
  ) => {
    const ticket = tickets.find((t: TicketType) => t.type === ticketType);

    if (e.target.value === "0") {
      setCart(cart.filter((item) => item.type !== ticketType));
    } else {
      setCart([
        {
          id: ticket?.id,
          type: ticket?.type,
          price: ticket?.price,
          quantity: parseInt(e.target.value),
        } as CartType,
      ]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await prepareFetch(event_id);
      setTickets(data);
      setLoading(false);
    };

    fetchData();
  }, [event_id]);

  const handlePlaceOrder = async () => {
    const order_items = cart.map((item) => ({
      event_ticket_id: item.id,
      quantity: item.quantity,
    }));

    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/order/placeorder`,
      {
        method: "POST",
        body: {
          user_id: user?.id,
          event_id,
          total: calculateTotal(),
          items: order_items,
        },
      }
    );
  };

  if (loading) return null;

  return (
    <section className="bg-gray-100 py-10">
      <div className="container">
        <h1 className="text-2xl font-semibold">Tickets</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="col-span-2 flex flex-col gap-4">
            {tickets?.map((ticket, index) => (
              <div
                key={index}
                className="font-semibold p-4 bg-white flex justify-between items-center h-fit"
              >
                <h2 className="text-xl flex">
                  <span className="hidden sm:inline">{ticket.type}</span>
                  <span className="sm:hidden">
                    {String(ticket.type || "").slice(0, 3)}
                  </span>
                </h2>
                <div className="flex items-center gap-4">
                  <h2 className="text-xl">&#3647; {ticket.price.toFixed(2)}</h2>
                  <div className="text-lg ">
                    <Button
                      className="text-xl font-bold cursor-pointer"
                      onClick={() => removeFromCart(ticket.type)}
                    >
                      -
                    </Button>
                    <select
                      className="appearance-none px-2 outline-none"
                      value={
                        cart.find((item) => item.type === ticket.type)
                          ?.quantity || 0
                      }
                      onChange={(e) => handleSelectChange(e, ticket.type)}
                    >
                      {[
                        ...Array(Math.min(ticket.available, 10) + 1).keys(),
                      ].map((_, index) => (
                        <option
                          key={index}
                          value={index}
                          className="text-center"
                        >
                          {index}
                        </option>
                      ))}
                    </select>
                    <Button
                      className="text-xl font-bold cursor-pointer"
                      onClick={() => addToCart(ticket.type)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold">Cart Details</h3>
            <div className="flex flex-col justify-between gap-4 mt-4">
              {cart.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <p>{item.type}</p>
                  <div className="flex justify-between">
                    <p>&#3647; {item.price}</p>
                    <p>x {item.quantity}</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center font-semibold">
                <p>Total</p>
                <p className="text-2xl">&#3647; {calculateTotal()}</p>
              </div>
              <Button
                className="cursor-pointer"
                onClick={handlePlaceOrder}
                disabled={cart.length === 0 || event_id === ""}
              >
                Place Order
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
    id: "1",
    type: "regular",
    price: 100,
    available: 500,
    sale_start: "2025-04-01",
    sale_end: "2025-04-20",
  },
  {
    id: "2",
    type: "vip",
    price: 250,
    available: 100,
    sale_start: "2025-04-01",
    sale_end: "2025-04-20",
  },
];
