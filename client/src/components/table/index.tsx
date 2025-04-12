"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import TableData from "./TableData";
import TableSearch from "./TableSearch";
import TableFilter from "./TableFilter";
import TableViewOptions from "./TableViewOptions";
import TablePagination from "./TablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  option?: {
    search?: string[];
    filters?: {
      name: string;
      data: string[];
    }[];
  };
  children?: React.ReactNode;
}

export default function Table<TData, TValue>({
  columns,
  data,
  option,
  children,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string;
  }>({});

  const handleClear = () => {
    setSelectedValues({});
    table.resetColumnFilters();
  };

  return (
    <section>
      {children}
      <TableData table={table} columns={columns}>
        <div className="flex items-center py-4 gap-4">
          {option?.search &&
            option.search.map((name, index) => (
              <TableSearch key={index} table={table} search={name} />
            ))}
          {option?.filters && (
            <TableFilter
              table={table}
              option={option.filters}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
            />
          )}
          <button onClick={handleClear}>Clear</button>
          <TableViewOptions table={table} />
        </div>
      </TableData>
      <TablePagination table={table} />
    </section>
  );
}
