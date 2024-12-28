"use client";
import { days, hours } from "@/data/calendar";

// Mock preview data from the backend
const events = [
  { day: "Monday", hour: "9.00", event: "learn" },
  { day: "Wednesday", hour: "14.00", event: "learn" },
  { day: "Friday", hour: "16.00", event: "party" },
];

export default function WeekView({ height = "auto" }) {
  const today = new Date();
  const currentDay = days[today.getDay()];
  const currentTime = `${today.getHours()}.00`;

  return (
    <section
      className="relative bg-base-200 py-12 px-4 lg:px-10"
      style={{ height }}
    >
      <div className="max-w-7xl mx-auto overflow-auto">
        <table className="table-auto w-full text-base-content">
          <thead className="sticky top-0 bg-base-100 z-10">
            <tr className="grid grid-cols-2 lg:grid-cols-8 border-t border-base-300">
              <th className="border-r border-base-300 p-3 text-center min-w-[80px] lg:w-24">
                Time
              </th>
              {days.map((day, index) => (
                <th
                  key={index}
                  className={`border-b border-base-300 p-3 text-center min-w-[120px] lg:w-auto ${
                    day === currentDay ? "bg-base-300 rounded-xl" : ""
                  }${day !== currentDay ? "hidden xl:table-cell" : ""}`}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, hourIndex) => (
              <tr
                key={hourIndex}
                className="grid grid-cols-2 lg:grid-cols-8 border-b border-base-300"
              >
                <th className="border-r border-base-300 p-3 text-center bg-base-100 min-w-[80px] lg:w-24">
                  {hour}
                </th>
                {days.map((day, dayIndex) => {
                  const event = events.find(
                    (e) => e.hour === hour && e.day === day
                  );
                  return (
                    <td
                      key={dayIndex}
                      className={`border-r border-base-300 p-3 text-center hover:bg-info hover:text-info-content duration-200 ${
                        event ? "bg-base-300" : ""
                      } ${
                        day === currentDay && hour === currentTime
                          ? "bg-info text-info-content"
                          : ""
                      }${day !== currentDay ? "hidden xl:table-cell" : ""}`}
                    >
                      {event ? event.event : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
