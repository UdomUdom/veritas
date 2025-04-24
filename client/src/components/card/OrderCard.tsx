import Link from "next/link";
import Image from "../build/Image";
import { Button } from "../ui/button";

interface OrderCardProps {
  data: OrderType;
}

export default function OrderCard({ data }: OrderCardProps) {
  return (
    <div className="w-full flex flex-col gap-4 p-4 border border-gray-300 mb-4">
      <div className="pb-2 border-b flex justify-between items-center">
        <p className="font-semibold">Order No. #{data.id}</p>
        <p>{data.status}</p>
      </div>
      <div className="flex justify-between gap-8">
        <div className="flex gap-4">
          <Image src={data.event.image} alt={data.event_id} className="h-48" />
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">{data.event.title}</h2>
            <p className="text-sm text-gray-400">{data.event.start_date}</p>
            <p className="text-sm text-gray-400">{data.event.location}</p>
          </div>
        </div>
        <Link href={`/order/${data.id}`}>
          <Button className="cursor-pointer">View Tickets</Button>
        </Link>
      </div>
    </div>
  );
}
