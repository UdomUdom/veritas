import Link from "next/link";
import { days } from "@/data/calendar";

const events = [
  { day: "Monday", hour: "9.00", event: "learn" },
  { day: "Wednesday", hour: "14.00", event: "learn" },
  { day: "Friday", hour: "16.00", event: "party" },
  { day: "Thursday", hour: "6.00", event: "play hard" },
];

export default function CompactView() {
  const today = new Date();
  const currentDay = days[today.getDay()];
  const currentTime = `${today.getHours()}.00`;

  return (
    <section className="compact relative bg-base-200 py-24">
      <div className="card bg-base-300 w-80 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Schedules</h2>
          {events
            .filter(
              (event) => event.day === currentDay && event.hour === currentTime
            )
            .map((event, index) => (
              <div key={index}>
                <h3>{event.day}</h3>
                <p>{event.event}</p>
                <p>at {event.hour}</p>
              </div>
            ))}
          {!events.some(
            (event) => event.day === currentDay && event.hour === currentTime
          ) && (
            <div>
              <h3>{currentDay}</h3>
              <p>Free Time</p>
              <p>{currentTime}</p>
            </div>
          )}
          <div className="card-actions">
            <Link href="/schedules">
              <button className="btn btn-primary btn-xs">Full Schedules</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
