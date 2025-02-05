import { LucideEdit, LucideInfo, LucideTrash } from "lucide-react";
import { useTableFilter } from "../hooks/useTableFilter";
import { useTableRows } from "../hooks/useTableRows";

export default function TableList() {
  //use hooks
  const { rows, handleDelete } = useTableRows();
  const { filteredRows, setSearchQuery, setSelectedRole } =
    useTableFilter(rows);

  //open modal
  const openModal = () => {
    console.log("open modal");
  };

  return (
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
                  onClick={() => openModal()}
                >
                  <LucideInfo className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
