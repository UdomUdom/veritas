import { useState, useMemo } from "react";
import { TableRow } from "@/types/type";
import { UserRole } from "@/data/dashboard";

export const useTableFilter = (rows: TableRow[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<
    (typeof UserRole)[keyof typeof UserRole] | ""
  >("");

  const filteredRows = useMemo(
    () =>
      rows.filter(
        (row) =>
          (row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
          (selectedRole === "" || row.role === selectedRole)
      ),
    [rows, searchQuery, selectedRole]
  );

  return {
    searchQuery,
    setSearchQuery,
    selectedRole,
    setSelectedRole,
    filteredRows,
  };
};
