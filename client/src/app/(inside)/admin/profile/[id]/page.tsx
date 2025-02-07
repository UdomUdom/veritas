"use client";
import { TableRow } from "@/types/type";
import { useEffect } from "react";
import Breadcrumb from "@/components/adminComponents/breadcrumb";

export default function FullProfile() {
  async function fetchData() {
    const res = await fetch("/api/users");
    const data: TableRow[] = await res.json();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="container mx-auto bg-base-200 pt-8">
      <div className="p-4">
        <Breadcrumb
          paths={[
            { name: "Admin", href: "/admin" },
            { name: "Profile", href: "/admin/profile" },
            { name: "Details", href: "#" },
          ]}
        />
      </div>
    </section>
  );
}
