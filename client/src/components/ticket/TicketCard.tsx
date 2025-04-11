"use client";
import { Button } from "../ui/button";

interface TicketCardProps {
  data: {
    type: "regular" | "vip";
    price: number;
    quantity: number;
    sale_start_date: string;
    sale_end_date: string;
  };
  updateQuantity: (type: "regular" | "vip", amount: number) => void;
  quantities: Record<string, number>;
}

export default function TicketCard({
  data,
  updateQuantity,
  quantities,
}: TicketCardProps) {
  const key = data.type;
  const quantity = quantities[key] || 0;
  const maxQuantity = Math.min(data.quantity, 10);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedQuantity = parseInt(e.target.value, 10);
    updateQuantity(data.type, selectedQuantity - quantity);
  };

  return (
    <div className="font-semibold p-4 bg-white flex justify-between items-center h-fit">
      <h2 className="text-xl">{data.type}</h2>
      <div className="flex items-center gap-4">
        <h2 className="text-xl">&#3647; {data.price.toFixed(2)}</h2>
        <div className="text-lg ">
          <Button
            className="text-xl font-bold cursor-pointer"
            onClick={() => updateQuantity(data.type, -1)}
            disabled={quantity === 0}
          >
            -
          </Button>
          <select
            className="appearance-none px-2 outline-none"
            value={quantity}
            onChange={handleSelectChange}
          >
            {[...Array(maxQuantity + 1).keys()].map((_, index) => (
              <option key={index} value={index} className="text-center">
                {index}
              </option>
            ))}
          </select>
          <Button
            className="text-xl font-bold cursor-pointer"
            onClick={() => updateQuantity(data.type, 1)}
            disabled={quantity >= maxQuantity}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
