"use client";
// Mock preview data from the backend
const events = [
  { day: "Monday", hour: "9.00", event: "learn" },
  { day: "Wednesday", hour: "14.00", event: "learn" },
  { day: "Friday", hour: "16.00", event: "party" },
];

const hours = [
  "9.00",
  "10.00",
  "11.00",
  "12.00",
  "13.00",
  "14.00",
  "15.00",
  "16.00",
  "17.00",
  "18.00",
  "19.00",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function WeekView({ height = "auto" }) {
  const today = new Date();
  const currentDay = days[today.getDay()];
  // const currentTime = `${today.getHours()}.00`;

  return (
    <section className="relative bg-base-200 py-24" style={{ height }}>
      <div className="max-w-7xl mx-auto" style={{ overflowX: "auto" }}>
        <table className="table w-full text-base-content">
          <thead className="sticky top-0 bg-base-100 z-10">
            <tr className="grid grid-cols-8 border-t border-base-300">
              <th className="border-r border-base-300 p-2 "></th>
              {days.map((day, index) => (
                <th
                  key={index}
                  className={`border-b border-base-200 p-2 text-center ${
                    day === currentDay ? "bg-base-300 rounded-xl" : ""
                  }`}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="grid grid-rows-7 ">
            {hours.map((hour, hourIndex) => (
              <tr
                key={hourIndex}
                className="grid grid-cols-8 border-b border-base-100 "
              >
                <th className="border-r border-base-100 p-2 text-center bg-base-100 ">
                  {hour}
                </th>
                {days.map((day, dayIndex) => {
                  const event = events.find(
                    (e) => e.hour === hour && e.day === day
                  );
                  return (
                    <td
                      key={dayIndex}
                      className={`border-r border-base-100 p-2 text-center hover:bg-info hover:text-info-content ${
                        event ? "bg-base-300" : ""
                      }`}
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

      <style jsx>{`
        @media (max-width: 575px) {
          .table {
            font-size: 12px;
          }
        }

        @media (max-width: 767px) {
          .table {
            font-size: 14px;
          }

          tbody.grid-cols-12 > tr > td {
            display: none;
          }

          tbody.grid-cols-12 > tr > td:nth-child(1),
          tbody.grid-cols-12
            > tr
            > td:nth-child(${days.indexOf(currentDay) + 2}) {
            display: table-cell;
          }
        }

        @media (max-width: 991px) {
          .table {
            font-size: 16px;
          }
        }

        @media (max-width: 1199px) {
          .table {
            font-size: 18px;
          }
        }

        @media (min-width: 1200px) {
          .table {
            font-size: 20px;
          }
        }

        .hover\:bg-gray-300:hover {
          background-color: #d1d5db;
        }
      `}</style>
    </section>
  );
}
