import MOCK from "@/mock/more.json";
import Link from "next/link";
import EventCard from "../card/EventCard";

export default function News() {
  const data = MOCK.news;

  return (
    <section className="container">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">News</h1>
        <Link href="/s/news" className="text-base">
          <p>View All</p>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8">
        {data.map((event) => (
          <EventCard key={event.id} data={event} />
        ))}
      </div>
    </section>
  );
}
