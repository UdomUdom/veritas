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
import Pagination from "../uiElements/Pagination";

const RoleMapping = {
  1: "admin",
  2: "instructors",
  3: "students",
} as const;
export default function Index() {
  //data fetching
  async function fetchData() {
    const res = await fetch("/api/users");
    const data: TableRow[] = await res.json();
    handleAddInitialRows(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

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

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="card bg-base-100 shadow-xl p-5 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="card-title text-xl font-semibold">Profiles List</h1>
        <Link href="/admin/profile">
          <SquareArrowOutUpRight
            size={24}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          />
        </Link>
      </div>

      <div className="mb-8 justify-between items-center md:flex ">
        <Link href="/admin/profile/add">
          <button className="btn flex items-center gap-2 mb-4 md:mb-0 w-full md:w-auto">
            <UserPlus className="w-5 h-5" />
            <span className="hidden md:flex">Add Profile</span>
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
              <th className="p-4 text-left font-semibold">Firstname</th>
              <th className="p-4 text-left font-semibold">Lastname</th>
              <th className="p-4 text-left font-semibold">Role</th>
              <th className="p-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-base-200 transition-colors border-b border-base-100"
              >
                <td className="p-4">{row.profile.firstname}</td>
                <td className="p-4"> {row.profile.lastname}</td>
                <td className="p-4">
                  {RoleMapping[row.role_id as keyof typeof RoleMapping]}
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    className="btn btn-sm btn-ghost hover:bg-base-300"
                    onClick={() => openModal(row)}
                  >
                    <LucideInfo className="w-4 h-4" />
                  </button>
                  <Link href={`/admin/profile/edit/${row.id}`}>
                    <button className="btn btn-sm btn-ghost hover:bg-base-300">
                      <LucideEdit className="w-4 h-4" />
                    </button>
                  </Link>
                  <button
                    className="btn btn-sm btn-ghost hover:bg-base-300"
                    onClick={() => handleDelete(row.id)}
                  >
                    <LucideTrash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center">
        <Pagination
          currentPage={currentPage}
          totalRows={filteredRows.length}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
      {isModalOpen && selectedRow && (
        <Modal title="Profile Details" onClose={closeModal}>
          <TableDetails user={selectedRow} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
