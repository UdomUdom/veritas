"use client";
import Tabler from "@/components/Table";

export default function Dashboard() {
  return (
    <section className="container">
      <div>
        <h1>Dashboard</h1>
        <Tabler filterBy="name" filterButton="role" />
      </div>
    </section>
  );
}
