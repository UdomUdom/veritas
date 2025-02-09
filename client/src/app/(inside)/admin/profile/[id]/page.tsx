"use client";
import Breadcrumb from "@/components/adminComponents/breadcrumb";

export default function FullProfile() {
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
