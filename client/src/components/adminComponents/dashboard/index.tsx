import Chart from "@/components/adminComponents/chart";
import Table from "@/components/adminComponents/table";
import TableForm from "@/components/adminComponents/tableform";

export default function Dashboard() {
  return (
    <div className="space-y-6 p-4 in-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 ">
          <Chart />
        </div>
        <div className=" p-6 ">
          <Table />
        </div>
        <div className=" p-6 ">
          <TableForm />
        </div>
      </div>
    </div>
  );
}
