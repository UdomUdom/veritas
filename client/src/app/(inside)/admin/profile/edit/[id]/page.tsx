"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProfileSetting from "@/components/adminComponents/profile/ProfileSetting";
import { TableRow } from "@/types/type";

export default function EditProfilePage() {
  const params = useParams();
  const [user, setUser] = useState<TableRow[] | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${params.id}`);
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, [params.id]);

  const handleSave = async (updatedUser: TableRow) => {
    const response = await fetch(`/api/users/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return <ProfileSetting user={user} onSave={handleSave} />;
}
