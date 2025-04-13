"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const url_path = [
  {
    name: "All Tickets",
    url: "/wallet",
  },
  {
    name: "Active Tickets",
    url: "/wallet/active-tickets",
  },
  {
    name: "Past Tickets",
    url: "/wallet/past-tickets",
  },
  {
    name: "To Pay",
    url: "/wallet/to-pay",
  },
];

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      <div className="flex flex-row gap-8">
        {url_path.map((item, index) => (
          <Link key={index} href={item.url}>
            <h2
              className={`text-xl w-fit ${
                path === item.url ? "border-b-2 pb-2" : "opacity-30"
              }`}
            >
              {item.name}
            </h2>
          </Link>
        ))}
      </div>
      <hr className="opacity-10 mb-4" />
      {children}
    </div>
  );
}
