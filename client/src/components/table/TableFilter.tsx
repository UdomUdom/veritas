import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TableSearchProps<TData> {
  table: Table<TData>;
  option: {
    name: string;
    data: string[];
  }[];
  selectedValues: {
    [key: string]: string;
  };
  setSelectedValues: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
}

export default function TableFilter<TData>({
  table,
  option,
  selectedValues,
  setSelectedValues,
}: TableSearchProps<TData>) {
  return (
    <>
      {option.map((select, index) => (
        <Select
          key={index}
          value={selectedValues[select.name] || ""}
          onValueChange={(value) => {
            setSelectedValues((prev) => ({ ...prev, [select.name]: value }));
            table.getColumn(select.name)?.setFilterValue(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={`Filter ${select.name}`} />
          </SelectTrigger>
          <SelectContent>
            {select.data.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </>
  );
}
