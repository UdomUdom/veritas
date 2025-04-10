import MOCK from "@/mocks/event.json";
import Fetch from "@/utils/Fetch";

import EventCard, { EventCardProps } from "@/components/card/EventCard";

const prepareFetch = async () => {
  const API = process.env.NEXT_PUBLIC_API_URL || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: MOCK.card };
};

export default async function Popular() {
  const { data } = await prepareFetch();

  return (
    <section className="container">
      <h1 className="text-2xl">Popular Events</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8">
        {data.map((event: EventCardProps, index: number) => (
          <EventCard key={index} data={event} />
        ))}
      </div>
    </section>
  );
}
