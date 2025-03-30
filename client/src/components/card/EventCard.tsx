import Link from "next/link";
import Image from "@/components/ui/Image";
import { MapPin } from "lucide-react";
import { ShortDate } from "@/utils/FormatDate";

export interface EventCardProps {
  id: string;
  title: string;
  image: string;
  location: string;
  start_date: string;
  end_date: string;
}

export default function EventCard({ data }: { data: EventCardProps }) {
  return (
    <Link href={`/event/${data.id}`} className="flex flex-col gap-4">
      <Image
        src={data.image}
        alt={data.title}
        className="rounded-lg shadow-xl"
      />
      <p className="text-sm text-red-500">
        {ShortDate(data.start_date)} - {ShortDate(data.end_date)}
      </p>
      <h2 className="font-semibold text-black">{data.title}</h2>
      <div className="text-sm text-gray-400 flex items-center gap-1">
        <MapPin size={16} />
        <p>{data.location}</p>
      </div>
    </Link>
  );
}
