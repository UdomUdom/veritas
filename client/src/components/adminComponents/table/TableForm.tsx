"use client";
import { TableRow } from "@/types/type";
import { useState } from "react";

interface TableFormProps {
  initialValues?: TableRow;
  onSubmit: (row: TableRow) => void;
  onCancel: () => void;
}

export default function TableForm({
  initialValues,
  onSubmit,
  onCancel,
}: TableFormProps) {
  const [formValues, setFormValues] = useState<TableRow>(
    initialValues || { id: 0, name: "", age: 0, email: "" }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          value={formValues.name}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Age</span>
        </label>
        <input
          type="number"
          value={formValues.age}
          onChange={(e) =>
            setFormValues({ ...formValues, age: +e.target.value })
          }
          className="input input-bordered w-full"
          min="1"
          required
        />
      </div>
      <div className="form-control mb-6">
        <label className="label">
          <span className="label-text">Email</span>
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
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {initialValues ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
}
