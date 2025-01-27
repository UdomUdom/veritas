"use client";
import { useState, useCallback } from "react";
import Modal from "@/components/adminComponents/uiElements/Modal";
import { mockUsers } from "@/data/mockUsers";
import { LucidePlus, LucideEdit, LucideTrash, LucideInfo } from "lucide-react";
import TableDetails from "./TableDetails";
import { TableRow } from "@/types/type";
import TableForm from "./TableForm";

export default function TableClient() {
  const user = mockUsers[0];
  const [rows, setRows] = useState<TableRow[]>([
    { id: 1, name: "John Doe", age: 25, email: "john@example.com" },
    { id: 2, name: "Jane Smith", age: 30, email: "jane@example.com" },
  ]);
  const [editRow, setEditRow] = useState<TableRow | null>(null);
  const [details, setDetails] = useState<TableRow | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEdit = useCallback((row: TableRow) => {
    setEditRow(row);
  }, []);

  const handleDetails = useCallback((row: TableRow) => {
    setDetails(row);
  }, []);

  const handleSave = useCallback((updatedRow: TableRow) => {
    if (!updatedRow.name || !updatedRow.email || updatedRow.age <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
    setEditRow(null);
  }, []);

  const handleAdd = useCallback((newRow: TableRow) => {
    setRows((prevRows) => [...prevRows, newRow]);
    setIsAddModalOpen(false);
  }, []);

  const handleDelete = useCallback((id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditRow(null);
    setDetails(null);
    setIsAddModalOpen(false);
  }, []);

  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h2 className="card-title text-2xl font-bold mb-6">User Profiles</h2>

      <div className="mb-6">
        <button
          className="btn btn-primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          <LucidePlus className="mr-2" />
          Add Profile
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Actions</th>
              <th className="text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-base-200 transition-colors">
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => handleEdit(row)}
                  >
                    <LucideEdit className="w-4 h-4" />
                  </button>
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => handleDelete(row.id)}
                  >
                    <LucideTrash className="w-4 h-4" />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => handleDetails(row)}
                  >
                    <LucideInfo className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TableDetails
        editRow={editRow}
        details={details}
        user={user}
        onSave={handleSave}
        onClose={handleCloseModal}
      />

      {isAddModalOpen && (
        <Modal title="Add Profile" onClose={handleCloseModal}>
          <TableForm onSubmit={handleAdd} onCancel={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
