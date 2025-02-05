import Dashboard from "@/components/adminComponents/dashboard";
import Breadcrumb from "@/components/adminComponents/breadcrumb";

export default function AdminDashboard() {
  return (
    <section className="container mx-auto bg-base-200 pt-8">
      <div className="p-4">
        <Breadcrumb paths={[{ name: "Admin", href: "/admin" }]} />
        <Dashboard />
      </div>
    </section>
  );
}
