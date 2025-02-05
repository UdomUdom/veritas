"use client";
import { useState } from "react";
import { TableRow } from "@/types/type";

export const useTableRows = () => {
  const [rows, setRows] = useState<TableRow[]>([]);

  const handleAddInitialRows = (initialRows: TableRow[]) => {
    setRows(initialRows);
  };

  const handleSave = (updatedRow: TableRow) => {
    setRows((prev) =>
      prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
  };

  const handleDelete = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  return {
    rows,
    handleSave,
    handleDelete,
    handleAddInitialRows,
  };
};
