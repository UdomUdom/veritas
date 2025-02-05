"use client";
import { TableRow } from "@/types/type";
import { useState } from "react";

interface TableFormProps {
  initialValues?: TableRow;
  onSubmit: (row: TableRow) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function TableForm({
  initialValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: TableFormProps) {
  const [formValues, setFormValues] = useState<TableRow>(
    initialValues || {
      id: 0,
      firstName: "",
      lastName: "",
      birthdate: "",
      email: "",
      role: "staff",
      avatar: "",
      faculty: "",
      address: "",
      phoneNumber: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormValues({ ...formValues, phoneNumber: value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-base-100 rounded-lg shadow-md"
    >
      {/* First Name */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold">First Name</span>
        </label>
        <input
          type="text"
          value={formValues.firstName}
          onChange={(e) =>
            setFormValues({ ...formValues, firstName: e.target.value })
          }
          className="input input-bordered w-full"
          required
          disabled={isLoading}
          aria-label="First Name"
        />
      </div>

      {/* Last Name */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold">Last Name</span>
        </label>
        <input
          type="text"
          value={formValues.lastName}
          onChange={(e) =>
            setFormValues({ ...formValues, lastName: e.target.value })
          }
          className="input input-bordered w-full"
          required
          disabled={isLoading}
          aria-label="Last Name"
        />
      </div>

      {/* Birthdate */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold">Birthdate</span>
        </label>
        <input
          type="date"
          value={formValues.birthdate}
          onChange={(e) =>
            setFormValues({ ...formValues, birthdate: e.target.value })
          }
          className="input input-bordered w-full"
          required
          disabled={isLoading}
          aria-label="Birthdate"
        />
      </div>

      {/* Email */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold">Email</span>
        </label>
        <input
          type="email"
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          className="input input-bordered w-full"
          required
          disabled={isLoading}
          aria-label="Email"
        />
      </div>

      {/* Role */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold">Role</span>
        </label>
        <select
          value={formValues.role}
          onChange={(e) =>
            setFormValues({ ...formValues, role: e.target.value })
          }
          className="select select-bordered w-full"
          required
          disabled={isLoading}
          aria-label="Role"
        >
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Avatar */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold">Avatar URL</span>
        </label>
        <input
          type="url"
          value={formValues.avatar}
          onChange={(e) =>
            setFormValues({ ...formValues, avatar: e.target.value })
          }
          className="input input-bordered w-full"
          disabled={isLoading}
          aria-label="Avatar URL"
        />
      </div>

      {/* Faculty */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold">Faculty</span>
        </label>
        <input
          type="text"
          value={formValues.faculty}
          onChange={(e) =>
            setFormValues({ ...formValues, faculty: e.target.value })
          }
          className="input input-bordered w-full"
          disabled={isLoading}
          aria-label="Faculty"
        />
      </div>

      {/* Address */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold">Address</span>
        </label>
        <input
          type="text"
          value={formValues.address}
          onChange={(e) =>
            setFormValues({ ...formValues, address: e.target.value })
          }
          className="input input-bordered w-full"
          disabled={isLoading}
          aria-label="Address"
        />
      </div>

      {/* Phone Number */}
      <div className="form-control mb-6">
        <label className="label">
          <span className="label-text font-semibold">Phone Number</span>
        </label>
        <input
          type="text"
          value={formValues.phoneNumber}
          onChange={handlePhoneNumberChange}
          className="input input-bordered w-full"
          disabled={isLoading}
          aria-label="Phone Number"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onCancel}
          disabled={isLoading}
          aria-label="Cancel"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
          aria-label={initialValues ? "Save" : "Add"}
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : initialValues ? (
            "Save"
          ) : (
            "Add"
          )}
        </button>
      </div>
    </form>
  );
}
