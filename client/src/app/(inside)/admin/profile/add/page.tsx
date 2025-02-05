"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/adminComponents/breadcrumb";
import Button from "@/components/button/Button";

const RoleMapping = {
  1: "admin",
  2: "instructors",
  3: "students",
} as const;
type RoleId = keyof typeof RoleMapping;

export default function AddProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // username: "",
    // password: "",
    // status: "active" as "active" | "inactive",
    // role_id: 1 as RoleId,
    // profile: {
    //   firstname: "",
    //   lastname: "",
    //   email: "",
    //   date_of_birth: "",
    //   gender: "other",
    //   phone_number: "",
    //   address: "",
    //   bio: "",
    //   avatar: "",
    // },
    username: "testuser",
    password: "password123",
    status: "active",
    role_id: 1,
    profile: {
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      date_of_birth: "1990-01-01",
      gender: "male",
      phone_number: "1234567890",
      address: "123 Main St",
      bio: "Test bio",
      avatar: "https://example.com/avatar.jpg",
    },
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
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to create profile");
      }
      router.push("/admin/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-center mb-8">Add Profile</h1>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
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
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
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
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name
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
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="profile.email"
                  value={formData.profile.email}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Date of Birth
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
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
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
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
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="profile.address"
                value={formData.profile.address}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                name="profile.bio"
                value={formData.profile.bio}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Bio"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Avatar URL
              </label>
              <input
                type="url"
                name="profile.avatar"
                value={formData.profile.avatar}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <Button
              type="submit"
              className="btn btn-primary w-full mt-6"
              text={isSubmitting ? "Submitting..." : "Add Profile"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
