"use client";
import React, { useState } from "react";
import { StaffProfile, ProfileSettingProps } from "@/types/type";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/adminComponents/breadcrumb";

export default function ProfileSetting({
  user,
  onSave,
  isLoading: externalLoading,
}: ProfileSettingProps) {
  const [editedUser, setEditedUser] = useState<StaffProfile>(user);
  const [internalLoading, setInternalLoading] = useState(false);
  const router = useRouter();

  const isLoading = externalLoading || internalLoading;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setInternalLoading(true);

    try {
      await onSave(editedUser);
      router.push("/admin/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setInternalLoading(false);
    }
  };

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
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  value={editedUser.firstName}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, firstName: e.target.value })
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  value={editedUser.lastName}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, lastName: e.target.value })
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                value={editedUser.phoneNumber}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, phoneNumber: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <textarea
                value={editedUser.address}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, address: e.target.value })
                }
                className="textarea textarea-bordered w-full"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => router.push("/admin/profile")}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
