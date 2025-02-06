"use client";
import { useState } from "react";
import { TableRow } from "@/types/type";
import { LucideEdit } from "lucide-react";
import Link from "next/link";

export default function Profile({ user }: { user: TableRow }) {
  const [editedUser, setEditedUser] = useState<TableRow>(user);

  return (
    <div className="p-6 bg-base-100 rounded-lg ">
      <div className="flex flex-col items-center space-y-6">
        <div className="avatar">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={editedUser.profile.avatar || "/default-avatar.png"}
              alt="Profile Picture"
              onError={(e) => {
                e.currentTarget.src = "/default-avatar.png";
              }}
            />
          </div>
        </div>
        <div className="text-center space-y-3">
          <p className="text-lg font-semibold">
            Name: {editedUser.profile.firstname} {editedUser.profile.lastname}
          </p>
          <p className="text-md text-gray-500">
            Email: {editedUser.profile.email}
          </p>
          <p className="text-md text-gray-500">
            Birthdate: {editedUser.profile.date_of_birth}
          </p>
          <p className="text-md text-gray-500">Bio: {editedUser.profile.bio}</p>
        </div>
        <Link href={`/admin/profile/edit/${editedUser.id}`}>
          <button className="btn btn-primary mt-4">
            <LucideEdit className="w-4 h-4" />
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
}
