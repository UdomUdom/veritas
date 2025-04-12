import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";

interface TableSearchProps<TData> {
  table: Table<TData>;
  search: string;
}

export default function TableSearch<TData>({
  table,
  search,
}: TableSearchProps<TData>) {
  return (
    <Input
      placeholder={`Search ${search}`}
      value={(table.getColumn(search)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(search)?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  );
}
