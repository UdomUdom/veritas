"use client";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/adminComponents/breadcrumb";

export default function EditProfilePage() {
  const router = useRouter();

  return (
    <div className="container mx-auto bg-base-200 pt-8">
      <div className="p-4">
        <Breadcrumb
          paths={[
            { name: "Admin", href: "/admin" },
            { name: "Profile", href: "/admin/profile" },
            { name: "Edit Profile", href: "#" },
          ]}
        />
        <div className="max-w-4xl mx-auto p-6">
          <h2 className="card-title text-center text-2xl font-bold mb-6">
            edit profile
          </h2>
        </div>
      </div>
    </div>
  );
}
