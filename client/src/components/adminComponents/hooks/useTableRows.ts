import { useState, useCallback } from "react";
import { TableRow } from "@/types/type";

export const useTableRows = (initialRows: TableRow[]) => {
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
