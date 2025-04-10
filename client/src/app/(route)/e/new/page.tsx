import MOCK from "@/mocks/event.json";
import Fetch from "@/utils/Fetch";
import Banner from "@/components/banner/Banner";

import EventCard, { EventCardProps } from "@/components/card/EventCard";

const prepareFetch = async () => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/event/new` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: MOCK.card };
};

export default async function New() {
  const { data } = await prepareFetch();

  return (
    <section>
      <Banner
        src="https://cdn.sanity.io/images/i8rpoiwu/production/9f9d01a77d3afb25f3b37adc9a1fe97de9bcc39a-4000x2599.jpg"
        alt="banner"
        text="New Events"
      />
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {data.map((event: EventCardProps, index: number) => (
            <EventCard key={index} data={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
