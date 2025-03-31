"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
        <Link href="/orders">
          <h2
            className={`text-xl w-fit ${
              path === "/orders" ? "border-b-2 pb-2" : "opacity-30"
            }`}
          >
            All Orders
          </h2>
        </Link>
        <Link href="/orders/payment">
          <h2
            className={`text-xl w-fit ${
              path === "/orders/payment" ? "border-b-2 pb-2" : "opacity-30"
            }`}
          >
            To Pay
          </h2>
        </Link>
      </div>
      <hr className="opacity-10 mb-4" />
      {children}
    </div>
  );
}
