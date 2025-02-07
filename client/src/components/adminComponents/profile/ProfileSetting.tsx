"use client";
import React, { useState } from "react";
import { TableRow, ProfileSettingProps } from "@/types/type";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/adminComponents/breadcrumb";
import { Eye, EyeOff, UserPenIcon } from "lucide-react";

export default function ProfileSetting({
  user,
  onSave,
  isLoading: externalLoading,
}: ProfileSettingProps) {
  const [editedUser, setEditedUser] = useState<TableRow>(user);
  const [internalLoading, setInternalLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
          <h1 className="text-3xl font-bold text-center flex justify-center items-center">
            <UserPenIcon className="w-8 h-8 inline-block mr-2" />
            Edit Profile
          </h1>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  value={editedUser.username}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, username: e.target.value })
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={editedUser.password}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, password: e.target.value })
                    }
                    className="input-ghost w-full pr-10"
                    required
                  />
                  <button
                    type="button"
                    className=""
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  value={editedUser.profile.firstname}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      profile: {
                        ...editedUser.profile,
                        firstname: e.target.value,
                      },
                    })
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
                  value={editedUser.profile.lastname}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      profile: {
                        ...editedUser.profile,
                        lastname: e.target.value,
                      },
                    })
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  value={editedUser.profile.email}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      profile: { ...editedUser.profile, email: e.target.value },
                    })
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
                  value={editedUser.profile.phone_number}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      profile: {
                        ...editedUser.profile,
                        phone_number: e.target.value,
                      },
                    })
                  }
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date of Birth</span>
                </label>
                <input
                  type="date"
                  value={editedUser.profile.date_of_birth}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      profile: {
                        ...editedUser.profile,
                        date_of_birth: e.target.value,
                      },
                    })
                  }
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  value={editedUser.profile.gender}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      profile: {
                        ...editedUser.profile,
                        gender: e.target.value,
                      },
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  value={editedUser.status}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      status: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  value={String(editedUser.role_id)}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      role_id: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value={1}>Admin</option>
                  <option value={2}>Instructors</option>
                  <option value={3}>Students</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <textarea
                value={editedUser.profile.address}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    profile: { ...editedUser.profile, address: e.target.value },
                  })
                }
                className="textarea textarea-bordered w-full"
                rows={3}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                value={editedUser.profile.bio}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    profile: { ...editedUser.profile, bio: e.target.value },
                  })
                }
                className="textarea textarea-bordered w-full"
                rows={3}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Avatar</span>
              </label>
              <input
                type="url"
                value={editedUser.profile.avatar}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    profile: { ...editedUser.profile, avatar: e.target.value },
                  })
                }
                className="input input-bordered w-full"
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
