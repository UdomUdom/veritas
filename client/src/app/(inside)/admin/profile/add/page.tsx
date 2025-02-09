"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/adminComponents/breadcrumb";
import Button from "@/components/button/Button";
import { UserPlus } from "lucide-react";

const RoleMapping = {
  1: "admin",
  2: "instructors",
  3: "students",
} as const;
type RoleId = keyof typeof RoleMapping;

export default function AddProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    status: "active" as "active" | "inactive",
    role_id: 1 as RoleId,
    profile: {
      firstname: "",
      lastname: "",
      email: "",
      date_of_birth: "",
      gender: "other",
      phone_number: "",
      address: "",
      bio: "",
      avatar: "",
    },
    /* ==================== Mock user for add ==================== */
    //
    // username: "testuser",
    // password: "password123",
    // status: "active",
    // role_id: 1,
    // profile: {
    //   firstname: "John",
    //   lastname: "Doe",
    //   email: "john.doe@example.com",
    //   date_of_birth: "1990-01-01",
    //   gender: "male",
    //   phone_number: "1234567890",
    //   address: "123 Main St",
    //   bio: "Test bio",
    //   avatar: "https://example.com/avatar.jpg",
    // },
    //
    /* ==================== Mock user for add ==================== */
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("profile.")) {
      const profileField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          [profileField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
  //   try {
  //     const response = await fetch("/api/users", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to create profile");
  //     }
  //     router.push("/admin/profile");
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "Something went wrong");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <div className="container mx-auto bg-base-200 pt-8">
      <div className="p-4">
        <Breadcrumb
          paths={[
            { name: "Admin", href: "/admin" },
            { name: "Profile", href: "/admin/profile" },
            { name: "Add Profile", href: "#" },
          ]}
        />
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-center flex justify-center items-center">
            <UserPlus className="w-8 h-8 inline-block mr-2" />
            Add Profile
          </h1>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  name="profile.firstname"
                  value={formData.profile.firstname}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  name="profile.lastname"
                  value={formData.profile.lastname}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="profile.email"
                  value={formData.profile.email}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  name="profile.phone_number"
                  value={formData.profile.phone_number}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date of Birth</span>
                </label>
                <input
                  type="date"
                  name="profile.date_of_birth"
                  value={formData.profile.date_of_birth}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  name="profile.gender"
                  value={formData.profile.gender}
                  onChange={handleChange}
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
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
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
                  name="role_id"
                  value={formData.role_id}
                  onChange={handleChange}
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
                name="profile.address"
                value={formData.profile.address}
                onChange={handleChange}
                required
                className="textarea textarea-bordered w-full"
                placeholder="Address"
                rows={3}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="profile.bio"
                value={formData.profile.bio}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Bio"
                rows={3}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Avatar</span>
              </label>
              <input
                type="url"
                name="profile.avatar"
                value={formData.profile.avatar}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button
                type="button"
                className="btn btn-ghost"
                text="Cancel"
                onClick={() => router.push("/admin/profile")}
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                className="btn btn-primary"
                text={isSubmitting ? "Submitting..." : "Add Profile"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
