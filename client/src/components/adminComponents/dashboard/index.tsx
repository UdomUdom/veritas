"use client";
import Chart from "@/components/adminComponents/chart";
import TableForm from "@/components/adminComponents/tableform";
import { useEffect } from "react";

const FetchRole = async () => {
  const res = await fetch(process.env.API_URL + "/api/roles", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return res;
};
export default function Dashboard() {
  useEffect(() => {
    FetchRole().then((data) => {
      console.log(data);
    });
  }, []);
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
