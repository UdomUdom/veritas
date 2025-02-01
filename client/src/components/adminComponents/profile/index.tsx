"use client";
import { useState } from "react";
import { StaffProfile } from "@/types/type";
import Link from "next/link";

interface ProfileProps {
  user: StaffProfile;
}

export default function Profile({ user }: ProfileProps) {
  const [editedUser, setEditedUser] = useState<StaffProfile>(user);

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="card-title text-center text-2xl font-bold mb-6">
        Profile Details
      </h2>
      <div className="flex flex-col items-center space-y-6">
        <div className="avatar">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={editedUser.avatar || "/default-avatar.png"}
              alt="Profile Picture"
              onError={(e) => {
                e.currentTarget.src = "/default-avatar.png";
              }}
            />
          </div>
        </div>
        <div className="text-center space-y-3">
          <p className="text-lg font-semibold">
            Name: {editedUser.firstName} {editedUser.lastName}
          </p>
          <p className="text-md text-gray-500">Email: {editedUser.email}</p>
          <p className="text-md text-gray-500">
            Birthdate: {editedUser.birthdate}
          </p>
          <p className="text-md text-gray-500">Faculty: {editedUser.faculty}</p>
        </div>
        <Link href={`/admin/profile/edit/${editedUser.id}`}>
          <button className="btn btn-primary mt-4">Edit Profile</button>
        </Link>
      </div>
    </div>
  );
}
