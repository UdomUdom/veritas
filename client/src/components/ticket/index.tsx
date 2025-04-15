"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Fetch from "@/utils/Fetch";

interface TicketType {
  event_id: string;
  type: "regular" | "vip";
  price: number;
  quantity: number | 10;
  sale_start: string;
  sale_end: string;
}

interface CartType {
  type: "regular" | "vip";
  price: number;
  quantity: number;
  items: TicketType[];
  total: number;
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
          type: ticket?.type,
          price: ticket?.price,
          quantity: parseInt(e.target.value),
        } as CartType,
      ]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await prepareFetch();
      setTickets(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handlePlaceOrder = () => {
    // const orderData = {
    //   items: cart.map((item: CartType) => ({
    //     type: item.type,
    //     quantity: item.quantity,
    //     pricePerItem: item.price,
    //     subtotal: item.price * item.quantity,
    //   })),
    //   total: calculateTotal(),
    //   orderDate: new Date().toISOString(),
    // };

    console.log("Order Items:", cart);
    console.log("Order Total:", calculateTotal());
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
                <h2 className="text-xl">{ticket.type}</h2>
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
                      {[...Array(Math.min(ticket.quantity, 10) + 1).keys()].map(
                        (_, index) => (
                          <option
                            key={index}
                            value={index}
                            className="text-center"
                          >
                            {index}
                          </option>
                        )
                      )}
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
              <Button className="cursor-pointer" onClick={handlePlaceOrder}>
                Get Tickets
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
    sale_start: "2025-04-01",
    sale_end: "2025-04-20",
  },
  {
    type: "vip",
    price: 250,
    quantity: 100,
    sale_start: "2025-04-01",
    sale_end: "2025-04-20",
  },
];
