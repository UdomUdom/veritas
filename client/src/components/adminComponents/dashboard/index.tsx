import Chart from "@/components/adminComponents/chart";
import TableForm from "@/components/adminComponents/tableform";
import { cookies } from "next/headers";

const FetchRole = async () => {
  const store = await cookies();
  const res = await fetch(process.env.API_URL + "/api/roles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${store.get("session")?.value}`,
    },
    credentials: "include",
  });
  return await res.json();
};

const FetchUser = async () => {
  const store = await cookies();
  const res = await fetch(process.env.API_URL + "/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${store.get("session")?.value}`,
    },
    credentials: "include",
  });
  return await res.json();
};
export default async function Dashboard() {
  const role = await FetchRole();
  const user = await FetchUser();
  return (
    <div className="space-y-6 p-4 in-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 ">
          <Chart role={role} />
        </div>
        <div className=" p-6 ">
          <TableForm role={role} user={user} />
        </div>
      </div>
    </div>
  );
}
