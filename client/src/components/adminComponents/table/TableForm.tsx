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
      role: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-base-100 rounded-lg shadow-md"
    >
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
        />
      </div>
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
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold">Birthdate</span>
        </label>
        <input
          type="text"
          value={formValues.birthdate}
          onChange={(e) =>
            setFormValues({ ...formValues, birthdate: e.target.value })
          }
          placeholder="dd/mm/yyyy"
          pattern="\d{2}/\d{2}/\d{4}"
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-control mb-6">
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
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Saving..." : initialValues ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
}
