"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart() {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverOffset: 4,
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
      <Pie data={data} />
    </div>
  );
}
