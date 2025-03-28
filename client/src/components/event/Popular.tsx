import MOCK from "@/mock/event.json";
import EventCard from "../card/EventCard";

export default function Popular() {
  const data = MOCK.card;

  return (
    <section className="container">
      <h1 className="text-2xl">Popular Events</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8">
        {data.map((event) => (
          <EventCard key={event.id} data={event} />
        ))}
      </div>
    </section>
  );
}
