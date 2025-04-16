"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Ticket from "@/components/order/Tickets";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function Testing() {
  const [eventId, setEventId] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleEventIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventId(e.target.value);
  };

  const handleOrderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(e.target.value);
  };

  return (
    <div>
      <div className="container flex gap-2 mb-8">
        <Button variant="default">default</Button>
        <Button variant="destructive">destructive</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="link">link</Button>
        <Button variant="outline">outline</Button>
        <Button variant="secondary">secondary</Button>
      </div>

      <div className="mb-8">
        <Ticket event_id={eventId} />
        <div className="container mt-4">
          <div className="flex items-center gap-4 mb-4 w-full">
            <label htmlFor="orderId">Event ID:</label>
            <Input
              value={eventId}
              onChange={handleEventIdChange}
              className="w-1/3"
              placeholder="Event ID"
            />
          </div>
          <div className="flex items-center gap-4 mb-4 w-full">
            <label htmlFor="orderId">Order ID:</label>
            <Input
              value={orderId}
              onChange={handleOrderIdChange}
              className="w-1/3"
              placeholder="Order ID"
            />
          </div>
          <Link href={`/test/order/${orderId}/checkout`}>
            <Button>Test Order</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
