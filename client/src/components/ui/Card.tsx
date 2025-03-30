import Image from "./Image";
import { MapPin } from "lucide-react";
import { ShortDate } from "@/utils/FormatDate";

interface CardProps {
  data: {
    id: number;
    image: string;
    title: string;
    location: string;
    start_date: string;
    end_date: string;
  };
}

export default function Card({ data }: CardProps) {
  const { image, title, location, start_date, end_date } = data;

  return (
    <div>
      <Image src={image} alt={title} className="rounded-lg shadow-xl" />
      <p className="text-sm text-red-500 mb-2">
        {ShortDate(start_date)} - {ShortDate(end_date)}
      </p>
      <h2 className="font-semibold">{title}</h2>
      <div className="text-sm text-gray-400 flex items-center gap-1 mt-2"></div>
      <MapPin size={16} />
      <p>{location}</p>
    </div>
  );
}
