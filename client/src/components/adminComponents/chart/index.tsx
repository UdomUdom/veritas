"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { SquareArrowOutUpRight } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";
import { TableRow } from "@/types/type";

ChartJS.register(ArcElement, Tooltip, Legend);

import { useState } from "react";

export default function Chart({ role }: { role: any }) {
  const [data, setData] = useState<TableRow[]>([]);

  useEffect(() => {
    setData(role);
  }, []);

  const roleData = {
    labels: ["Admin", "Teacher", "Student"],
    datasets: [
      {
        label: "Role",
        data: data.map((item) => item.role_id),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="card-title text-xl font-semibold">Chart</h2>
        <Link href="/admin/dashboard">
          <SquareArrowOutUpRight
            size={24}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          />
        </Link>
      </div>
      <Pie data={roleData} />
    </div>
  );
}
