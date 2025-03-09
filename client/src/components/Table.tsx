"use client";
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
import { MoreVerticalIcon } from "lucide-react";

interface TableProps {
  header: string[];
  body: { [key: string]: React.ReactNode }[];
  className?: string;
}

const ActionButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex justify-start items-center gap-2">
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <MoreVerticalIcon className="text-default-600" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="view">View</DropdownItem>
          <DropdownItem key="edit">Edit</DropdownItem>
          <DropdownItem key="delete">Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default function Table({ header, body, className }: TableProps) {
  return (
    <div className={className}>
      <Tb>
        <TableHeader>
          <TableRow className="font-bold text-lg font-mono">
            {header.map((item) => (
              <TableHead key={item} className="border-l-2">
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {header.map((head, colIndex) => {
                if (head === "Action") {
                  return (
                    <TableCell key={`${rowIndex}-${colIndex}`}>
                      {ActionButton({ children: "Action" })}
                    </TableCell>
                  );
                }

                const value = Object.values(row)[colIndex];
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
