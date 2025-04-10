import MOCK from "@/mocks/event.json";
import Fetch from "@/utils/Fetch";

import Link from "next/link";
import EventCard, { EventCardProps } from "../card/EventCard";

const prepareFetch = async () => {
  const API =
    `${process.env.NEXT_PUBLIC_API_URL}/api/event/upcoming?limit=6` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: MOCK.card };
};

export default async function Upcoming() {
  const { data } = await prepareFetch();

  return (
    <section className="container">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">{config.title}</h1>
        <Link href={config.url} className="text-base">
          <p>View All</p>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8">
        {data.map((event: EventCardProps) => (
          <EventCard key={event.id} data={event} />
        ))}
      </div>
    </section>
  );
}

const config = {
  title: "Upcoming Events",
  url: "/c/upcoming",
};
