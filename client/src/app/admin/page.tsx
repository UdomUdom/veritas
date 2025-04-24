"use client";
import React, { useEffect, useState } from "react";
import AdminStatCard from "@/components/admin/AdminStatCard";
import { Building, Users, Calendar } from "lucide-react";
import Fetch from "@/utils/Fetch";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Bar,
  Line,
} from "recharts";

const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];

interface User {
  id: string;
  gender: string;
  role: [
    {
      id: string;
      name: string;
    }
  ];
}

export default function Dashboard() {
  const [userData, setUserData] = useState<User[] | null>(null);
  const [organizerData, setOrganizerData] = useState<{ length: number } | null>(
    null
  );
  const [eventData, setEventData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userAPI = `${process.env.NEXT_PUBLIC_API_URL}/api/user`;
        const userRes = await Fetch(userAPI);
        if (userRes && userRes.status === "ok") {
          const processedUserData = userRes.data.map((user: User) => ({
            ...user,
            gender: user.gender || "unknown",
          }));
          setUserData(processedUserData);
        } else {
          setError("Failed to fetch user data.");
        }

        const organizerAPI = `${process.env.NEXT_PUBLIC_API_URL}/api/organizer`;
        const organizerRes = await Fetch(organizerAPI);
        if (organizerRes && organizerRes.status === "ok") {
          setOrganizerData(organizerRes.data);
        } else {
          setError("Failed to fetch organizer data.");
        }

        const eventAPI = `${process.env.NEXT_PUBLIC_API_URL}/api/event`;
        const eventRes = await Fetch(eventAPI);
        if (eventRes && eventRes.status === "ok") {
          setEventData(eventRes.data);
        } else {
          setError("Failed to fetch event data.");
        }

        const orderAPI = `${process.env.NEXT_PUBLIC_API_URL}/api/order/status/paid`;
        const orderRes = await Fetch(orderAPI);
        if (orderRes && orderRes.status === "ok") {
          const formattedOrderData = orderRes.data.map((item: any) => ({
            ...item,
            updated_at: formatDate(item.updated_at),
          }));

          const aggregatedOrders = formattedOrderData.reduce(
            (acc: any[], current: { updated_at: string; amount: number }) => {
              const existingEntry = acc.find(
                (entry) => entry.updated_at === current.updated_at
              );
              if (existingEntry) {
                existingEntry.amount += current.amount;
              } else {
                acc.push({ ...current });
              }
              return acc;
            },
            [] as any[]
          );

          setOrder(aggregatedOrders);
        } else {
          setError("Failed to fetch order status");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getStatData = () => {
    return [
      {
        icon: <Users />,
        title: "Active Users",
        description: "Total active users on the platform",
        value: loading ? "Loading..." : userData?.length?.toString() || "N/A",
        color: COLORS[0],
      },
      {
        icon: <Building />,
        title: "Active Organizers",
        description: "Total active event organizers",
        value: loading
          ? "Loading..."
          : organizerData?.length?.toString() || "N/A",
        color: COLORS[1],
      },
      {
        icon: <Calendar />,
        title: "All Events",
        description: "Total events hosted on the platform",
        value: loading ? "Loading..." : eventData?.length?.toString() || "N/A",
        color: COLORS[2],
      },
    ];
  };

  const getUserGenderData = () => {
    if (!userData) return [];
    const genderCount = userData.reduce((acc, user) => {
      if (acc[user.gender]) {
        acc[user.gender]++;
      } else {
        acc[user.gender] = 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(genderCount).map(([gender, count]) => ({
      name: gender,
      value: count,
    }));
  };

  const statData = getStatData();
  const userGenderData = getUserGenderData();

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 ">
        {statData.map((card, index) => (
          <AdminStatCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            value={card.value}
            footer={
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: card.color }}
                />
              </div>
            }
          />
        ))}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-8 ">
          <div className="bg-white shadow-xl rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">User Gender Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userGenderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userGenderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-white shadow-xl rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Order Status Updates</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart width={730} height={250} data={order}>
                <XAxis
                  dataKey="updated_at"
                  label={{
                    value: "Updated At",
                    position: "insideBottom",
                    offset: -10,
                  }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />

                <Bar dataKey="amount" barSize={20} fill="#413ea0" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
