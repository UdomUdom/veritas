"use client";
import { useState } from "react";
import {
  Table as Tb,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { LucideEdit, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";

interface Header {
  label: string;
  key: string;
  sortable: boolean;
}

interface TableProps {
  header: Header[];
  body: Array<{ [key: string]: any }>;
  className?: string;
  path: string;
}

type SortDirection = "asc" | "desc" | null;

export default function Table({ header, body, className, path }: TableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  }>({
    key: "",
    direction: null,
  });

  const sortedData = [...body].sort((a, b) => {
    if (sortConfig.direction === null) {
      return 0;
    }

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue === undefined || bValue === undefined) {
      return 0;
    }

    const aString = String(aValue);
    const bString = String(bValue);

    if (sortConfig.direction === "asc") {
      return aString.localeCompare(bString);
    } else {
      return bString.localeCompare(aString);
    }
  });

  const handleSort = (key: string) => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      } else {
        direction = "asc";
      }
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown size={16} />;
    }
    if (sortConfig.direction === "asc") {
      return <ArrowUp size={16} />;
    }
    if (sortConfig.direction === "desc") {
      return <ArrowDown size={16} />;
    }
    return <ArrowUpDown size={16} />;
  };

  return (
    <div className={className}>
      <Tb>
        <TableHeader>
          <TableRow className="font-bold text-lg font-mono">
            {header.map((item) => (
              <TableHead
                key={item.key}
                onClick={() => item.sortable && handleSort(item.key)}
                style={{ cursor: item.sortable ? "pointer" : "default" }}
              >
                <div className="flex items-center gap-1">
                  {item.label}
                  {item.sortable && (
                    <span className="ml-1">{getSortIcon(item.key)}</span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {header.map((head, colIndex) => {
                if (head.key === "actions") {
                  return (
                    <TableCell key={`${rowIndex}-${colIndex}`}>
                      <Link href={`/admin/${path}/${row.id}`}>
                        <Button isIconOnly size="sm" variant="light">
                          <LucideEdit size={18} className="text-default-500" />
                        </Button>
                      </Link>
                    </TableCell>
                  );
                }
                if (head.key === "avatar") {
                  return (
                    <TableCell key={`${rowIndex}-${colIndex}`}>
                      <img
                        src={row[head.key] as string}
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    </TableCell>
                  );
                }

                const value = row[head.key];
                return (
                  <TableCell key={`${rowIndex}-${colIndex}`}>{value}</TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Tb>
    </div>
  );
}
