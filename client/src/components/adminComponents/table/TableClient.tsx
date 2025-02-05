"use client";
import { useState, useCallback, useMemo } from "react";
import Modal from "@/components/adminComponents/uiElements/Modal";
import { mockUsers } from "@/data/mockUsers";
import {
  LucideEdit,
  LucideTrash,
  LucideInfo,
  UserPlus,
  SquareArrowOutUpRight,
} from "lucide-react";
import { TableRow } from "@/types/type";
import { UserRole } from "@/data/dashboard";
import TableDetails from "./TableDetails";
import TableForm from "./TableForm";
import Link from "next/link";
import FilterOption from "../uiElements/FilterOption";
import { useTableRows } from "../hooks/useTableRows";
import { useTableFilter } from "../hooks/useTableFilter";

export default function TableClient() {
  const user = mockUsers[0];
  const initialRows = useMemo(
    () => [
      {
        id: 1,
        profile: {
          firstName: "John",
          lastName: "Doe",
          birthdate: "1998-12-12",
          email: "john@example.com",
        },
        role: UserRole.STAFF,
        avatar: "",
        faculty: "",
        address: "",
        phoneNumber: "",
      },
      {
        id: 2,
        profile: {
          firstName: "Jane",
          lastName: "Smith",
          birthdate: "1998-12-12",
          email: "jane@example.com",
        },

        role: UserRole.TEACHER,
        avatar: "",
        faculty: "",
        address: "",
        phoneNumber: "",
      },
    ],
    []
  );

  const { rows, handleSave, handleAddInitialRows, handleDelete } =
    useTableRows();
  const [editRow, setEditRow] = useState<TableRow | null>(null);
  const [details, setDetails] = useState<TableRow | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { filteredRows, setSearchQuery, setSelectedRole } =
    useTableFilter(rows);

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
          className="btn flex items-center gap-2"
          onClick={() => setIsAddModalOpen(true)}
        >
          <UserPlus className="w-5 h-5" />
          Add Profile
        </button>
        <FilterOption
          onSearchChange={setSearchQuery}
          onRoleChange={setSelectedRole}
        />
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
                  {row.profile.firstname} {row.profile.lastname}
                </td>
                <td className="p-4">{row.profile.email}</td>
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
