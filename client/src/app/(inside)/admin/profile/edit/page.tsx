"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StaffProfile, ProfileSettingProps } from "@/types/type";
import ProfileSetting from "@/components/adminComponents/profile/ProfileSetting";
import Breadcrumb from "@/components/adminComponents/breadcrumb";

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<StaffProfile | null>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const mockUser: StaffProfile = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        birthdate: "1990-01-01",
        faculty: "Science",
        avatar: "/profile.jpg",
        address: "",
        phoneNumber: "",
        role: "",
      };
      setUser(mockUser);
    };

    fetchUserData();
  }, []);

  const handleSave = async (updatedUser: StaffProfile) => {
    console.log("Updated User:", updatedUser);

    router.push("/admin/profile");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
            Edit Profile
          </h2>
          <ProfileSetting
            user={user}
            onSave={handleSave}
            onClose={() => router.push("/admin/profile")}
            isLoading={false}
          />
        </div>
      </div>
    </div>
  );
}
