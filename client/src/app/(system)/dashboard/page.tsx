import Tabler from "@/components/Table";

export default function Dashboard() {
  return (
    <section className="container">
      <div>
        <Tabler filterBy="name" filterButton="role" />
      </div>
    </section>
  );
}
