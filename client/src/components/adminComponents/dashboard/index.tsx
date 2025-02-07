import Chart from "@/components/adminComponents/chart";
import TableForm from "@/components/adminComponents/tableform";
import { fetchData } from "@/libs/fetch";
import { getCookie } from "@/libs/cookies";
import { redirect } from "next/navigation";

const fetchRole = async () => {
  const res = await fetchData("GET", "/api/roles");
  const data = await res.json();
  console.log(data, "role ha");
};

export default async function Dashboard() {
  const session = await getCookie("session");
  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  fetchRole();
  return (
    <div className="space-y-6 p-4 in-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 ">
          <Chart />
        </div>
        <div className=" p-6 ">
          <TableForm />
        </div>
      </div>
    </div>
  );
}
