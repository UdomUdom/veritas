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
    <section className="compact relative bg-base-200 py-24 flex justify-center items-center">
      <div className="card bg-neutral w-80 h-80 shadow-xl flex justify-center items-center">
        <h2 className="card-title mt-10">Schedules</h2>
        <div className="card-body flex justify-center items-center text-center mb-10">
          {events
            .filter(
              (event) => event.day === currentDay && event.hour === currentTime
            )
            .map((event, index) => (
              <div key={index} className="text-center">
                <h3>{event.day}</h3>
                <p>{event.event}</p>
                <p>at {event.hour}</p>
              </div>
            ))}
          {!events.some(
            (event) => event.day === currentDay && event.hour === currentTime
          ) && (
            <div className="text-center">
              <h3>{currentDay}</h3>
              <p>Free Time</p>
              <p>{currentTime}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
