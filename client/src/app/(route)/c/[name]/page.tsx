import Fetch from "@/utils/Fetch";
import EventCard, { EventCardProps } from "@/components/card/EventCard";

const prepareFetch = async (name: string) => {
  const API =
    `${process.env.NEXT_PUBLIC_API_URL}/api/event/category/${name}` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: [] };
};

export default async function EventByCategory({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const { data } = await prepareFetch(name);

  return (
    <div className="container">
      <h1 className="text-2xl capitalize">{name}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {data.map((event: EventCardProps, index: number) => (
          <EventCard key={index} data={event} />
        ))}
      </div>
    </div>
  );
}
