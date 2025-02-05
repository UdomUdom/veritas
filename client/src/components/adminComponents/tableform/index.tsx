"use client";
import { useEffect, useState } from "react";
import {
  SquareArrowOutUpRight,
  UserPlus,
  LucideEdit,
  LucideInfo,
  LucideTrash,
} from "lucide-react";
import Link from "next/link";
import FilterOption from "../uiElements/FilterOption";
import { useTableFilter } from "../hooks/useTableFilter";
import { useTableRows } from "../hooks/useTableRows";
import TableDetails from "./TableDetails";
import { TableRow } from "@/types/type";
import Modal from "../uiElements/Modal";

export default function index() {
  //data fetching
  async function fetchData() {
    const res = await fetch("http://localhost:3000/api/users");
    const data: TableRow[] = await res.json();
    handleAddInitialRows(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const openModal = (row: any) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const { rows, handleDelete, handleAddInitialRows } = useTableRows();
  const { filteredRows, setSearchQuery, setSelectedRole } =
    useTableFilter(rows);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="card-title text-xl font-semibold">Profiles List</h1>
        <Link href="/admin/profile">
          <SquareArrowOutUpRight
            size={24}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          />
        </Link>
      </div>

      <div className="mb-8 flex justify-between items-center">
        <Link href="/admin/profile/add">
          <button className="btn flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Add Profile
          </button>
        </Link>
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
                  <button className="btn btn-sm btn-ghost hover:bg-base-300">
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
                    onClick={() => openModal(row)}
                  >
                    <LucideInfo className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedRow && (
        <Modal title="Profile List" onClose={closeModal}>
          <TableDetails user={selectedRow} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
