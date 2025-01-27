"use client";
import { useState } from "react";
import Modal from "@/components/adminComponents/uiElements/Modal";
import Profile from "@/components/adminComponents/profile";
import { mockUsers } from "@/data/mockUsers";

interface TableRow {
  id: number;
  name: string;
  age: number;
  email: string;
}

export default function Table() {
  const user = mockUsers[0];
  const [rows, setRows] = useState<TableRow[]>([
    { id: 1, name: "John Doe", age: 25, email: "john@example.com" },
    { id: 2, name: "Jane Smith", age: 30, email: "jane@example.com" },
  ]);
  const [editRow, setEditRow] = useState<TableRow | null>(null);
  const [details, setDetails] = useState<TableRow | null>(null);

  const handleEdit = (row: TableRow) => {
    setEditRow(row);
  };

  const handleDetails = (row: TableRow) => {
    setDetails(row);
  };

  const handleSave = (updatedRow: TableRow) => {
    if (!updatedRow.name || !updatedRow.email || updatedRow.age <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }
    setRows(rows.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
    setEditRow(null);
  };

  const handleCloseModal = () => {
    setEditRow(null);
    setDetails(null);
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h2 className="card-title text-2xl font-bold mb-6">Editable Table</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Age</th>
              <th className="text-left">Email</th>
              <th className="text-left">Actions</th>
              <th className="text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-base-200 transition-colors">
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary mr-2"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleDetails(row)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editRow && (
        <Modal title="Edit Row" onClose={handleCloseModal}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(editRow);
            }}
          >
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={editRow.name}
                onChange={(e) =>
                  setEditRow({ ...editRow, name: e.target.value })
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
                value={editRow.age}
                onChange={(e) =>
                  setEditRow({ ...editRow, age: +e.target.value })
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
                value={editRow.email}
                onChange={(e) =>
                  setEditRow({ ...editRow, email: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Details Modal */}
      {details && (
        <Modal title="Profile" onClose={handleCloseModal}>
          <Profile user={user} />
        </Modal>
      )}
    </div>
  );
}
