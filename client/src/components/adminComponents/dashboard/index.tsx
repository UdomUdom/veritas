import Breadcrumb from "@/components/adminComponents/breadcrumb";
import Chart from "@/components/adminComponents/chart";
import Table from "@/components/adminComponents/table";

export default function Dashboard() {
  return (
    <div className="space-y-6 p-4 in-h-screen">
      <Breadcrumb paths={[{ name: "Admin", href: "/admin" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className=" p-6 rounded-lg shadow-md">
          <Chart />
        </div>
        <div className=" p-6 rounded-lg shadow-md">
          <Table />
        </div>
      </div>
    </div>
  );
}
