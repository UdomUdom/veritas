"use client";
import Breadcrumb from "@/components/adminComponents/breadcrumb";
import {
  ClipboardList,
  LucideEdit,
  LucideTrash,
  LucideInfo,
  UserPlus,
} from "lucide-react";
import { TableRow } from "@/types/type";
import { useEffect, useState } from "react";
import FilterOption from "@/components/adminComponents/uiElements/FilterOption";
import { useTableFilter } from "@/components/adminComponents/hooks/useTableFilter";
import { useTableRows } from "@/components/adminComponents/hooks/useTableRows";
import Link from "next/link";
import Pagination from "@/components/adminComponents/uiElements/Pagination";

const RoleMapping = {
  1: "admin",
  2: "instructors",
  3: "students",
} as const;

export default function Profile() {
  async function fetchData() {
    const res = await fetch("/api/users");
    const data: TableRow[] = await res.json();
    handleAddInitialRows(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const { rows, handleDelete, handleAddInitialRows } = useTableRows();
  const { filteredRows, setSearchQuery, setSelectedRole } =
    useTableFilter(rows);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <section className="container mx-auto bg-base-200 pt-8">
      <div className="p-4">
        <Breadcrumb
          paths={[
            { name: "Admin", href: "/admin" },
            { name: "Profile", href: "/admin/profile" },
          ]}
        />
        <div className="mx-auto p-6">
          <h1 className="text-3xl p-4 font-bold text-center flex justify-center items-center">
            <ClipboardList className="w-8 h-8 inline-block mr-2" />
            Profile list
          </h1>
          <div className="card bg-base-100 shadow-xl p-6 rounded-lg">
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
                  <tr className="">
                    <th className="p-4 text-left font-semibold">Firstname</th>
                    <th className="p-4 text-left font-semibold">Lastname</th>
                    <th className="p-4 text-left font-semibold">Email</th>
                    <th className="p-4 text-left font-semibold">Gender</th>
                    <th className="p-4 text-left font-semibold">Birthdate</th>
                    <th className="p-4 text-left font-semibold">Role</th>
                    <th className="p-4 text-left font-semibold">Status</th>
                    <th className="p-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row) => (
                    <tr key={row.id}>
                      <td className="p-4">{row.profile?.firstname}</td>
                      <td className="p-4">{row.profile?.lastname}</td>
                      <td className="p-4">{row.profile?.email}</td>
                      <td className="p-4">{row.profile?.gender}</td>
                      <td className="p-4">{row.profile?.date_of_birth}</td>
                      <td className="p-4">
                        {RoleMapping[row.role_id as keyof typeof RoleMapping]}
                      </td>
                      <td className="p-4">{row.status}</td>
                      <td className="p-4">
                        <Link href={`/admin/profile/${row.id}`}>
                          <button className="btn btn-sm btn-ghost hover:bg-base-300">
                            <LucideInfo className="w-4 h-4" />
                          </button>
                        </Link>
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
          </div>
        </div>
      </div>
    </section>
  );
}
