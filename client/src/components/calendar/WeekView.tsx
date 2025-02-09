"use client";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

interface Event {
  id: string;
  title: string;
  start: string;
  end?: string;
}

export default function WeekView() {
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch mock data from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Add event
  const handleDateClick = (arg: any) => {
    const title = prompt("Enter event title:");
    if (title) {
      const newEvent: Event = {
        id: String(events.length + 1),
        title,
        start: arg.dateStr,
      };
      setEvents([...events, newEvent]);
    }
  };

  // Delete event
  const handleEventClick = (arg: any) => {
    if (window.confirm(`Delete event "${arg.event.title}"?`)) {
      setEvents(events.filter((event) => event.id !== arg.event.id));
    }
  };

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{}}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
        contentHeight="auto"
        aspectRatio={1.35}
      />
    </div>
  );
}
