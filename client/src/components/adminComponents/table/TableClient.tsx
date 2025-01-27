"use client";
import { useState, useCallback, useMemo } from "react";
import Modal from "@/components/adminComponents/uiElements/Modal";
import { mockUsers } from "@/data/mockUsers";
import {
  LucidePlus,
  LucideEdit,
  LucideTrash,
  LucideInfo,
  SquareArrowOutUpRight,
} from "lucide-react";
import { TableRow } from "@/types/type";
import { UserRole } from "@/data/dashboard";
import TableDetails from "./TableDetails";
import TableForm from "./TableForm";
import Link from "next/link";
import Dropdown from "@/components/adminComponents/uiElements/Dropdown";
import Searchbar from "@/components/adminComponents/uiElements/Searchbar"; // Import the new Searchbar component

const useTableRows = (initialRows: TableRow[]) => {
  const [rows, setRows] = useState<TableRow[]>(initialRows);

  const handleSave = useCallback((updatedRow: TableRow) => {
    if (!updatedRow.firstName || !updatedRow.email || !updatedRow.birthdate) {
      alert("Please fill in all fields correctly.");
      return;
    }
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
  }, []);

  const handleAdd = useCallback((newRow: TableRow) => {
    setRows((prevRows) => [...prevRows, newRow]);
  }, []);

  const handleDelete = useCallback((id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  }, []);

  return { rows, handleSave, handleAdd, handleDelete };
};

export default function TableClient() {
  const user = mockUsers[0];
  const initialRows = useMemo(
    () => [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        birthdate: "1998-12-12",
        email: "john@example.com",
        role: UserRole.STAFF,
        avatar: "",
        faculty: "",
        address: "",
        phoneNumber: "",
      },
      {
        id: 2,
        firstName: "Jane",
        role: UserRole.TEACHER,
        avatar: "",
        faculty: "",
        address: "",
        phoneNumber: "",
        lastName: "Smith",
        birthdate: "1998-12-12",
        email: "jane@example.com",
      },
    ],
    []
  );

  const { rows, handleSave, handleAdd, handleDelete } =
    useTableRows(initialRows);
  const [editRow, setEditRow] = useState<TableRow | null>(null);
  const [details, setDetails] = useState<TableRow | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<
    (typeof UserRole)[keyof typeof UserRole] | ""
  >("");

  const filteredRows = rows.filter(
    (row) =>
      (row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedRole === "" || row.role === selectedRole)
  );

  const handleEdit = useCallback((row: TableRow) => {
    setEditRow(row);
  }, []);

  const handleDetails = useCallback((row: TableRow) => {
    setDetails(row);
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditRow(null);
    setDetails(null);
    setIsAddModalOpen(false);
  }, []);

  const roleOptions = [
    { value: UserRole.STAFF, label: "Staff" },
    { value: UserRole.TEACHER, label: "Teacher" },
    { value: UserRole.STUDENT, label: "Student" },
    { value: UserRole.ADMIN, label: "Admin" },
    { value: "", label: "All" },
  ];

  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="card-title text-2xl font-bold">Staff Profiles</h2>
        <Link href="/admin/staffmanagement">
          <SquareArrowOutUpRight
            size={24}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          />
        </Link>
      </div>
      <div className="mb-8 flex justify-between items-center">
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => setIsAddModalOpen(true)}
        >
          <LucidePlus className="w-5 h-5" />
          Add Profile
        </button>
        <div className="flex gap-4">
          <Searchbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <Dropdown
            options={roleOptions}
            selectedValue={selectedRole}
            onSelect={setSelectedRole}
            placeholder="Filter by Role"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th className="p-4 text-left font-semibold">Name</th>
              <th className="p-4 text-left font-semibold">Email</th>
              <th className="p-4 text-left font-semibold">Actions</th>
              <th className="p-4 text-left font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-base-200 transition-colors border-b border-base-100"
              >
                <td className="p-4">
                  {row.firstName} {row.lastName}
                </td>
                <td className="p-4">{row.email}</td>
                <td className="p-4 flex gap-2">
                  <button
                    className="btn btn-sm btn-ghost hover:bg-base-300"
                    onClick={() => handleEdit(row)}
                  >
                    <LucideEdit className="w-4 h-4" />
                  </button>
                  <button
                    className="btn btn-sm btn-ghost hover:bg-base-300"
                    onClick={() => handleDelete(row.id)}
                  >
                    <LucideTrash className="w-4 h-4" />
                  </button>
                </td>
                <td className="p-4">
                  <button
                    className="btn btn-sm btn-ghost hover:bg-base-300"
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
