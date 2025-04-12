"use client";
import Avatar from "@/components/build/Avatar";
import TableColumnHeader from "@/components/table/TableColumnHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { LucideEdit } from "lucide-react";
import { OrganizerForm } from "./form";

interface OrganizerType {
  id: string;
  name: string;
  image: string;
  email: string;
  phone: string;
  website: string;
}

export const columns: ColumnDef<OrganizerType>[] = [
  {
    accessorKey: "avatar",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Avatar" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      const user = {
        email: data.email,
        avatar: data.image,
      };
      return <Avatar className="mx-auto" user={user} />;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => <TableColumnHeader column={column} title="name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <TableColumnHeader column={column} title="Phone" />,
  },
  {
    accessorKey: "website",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Website" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <a
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {data.website}
        </a>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <LucideEdit className="h-4 w-4" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Organizer</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <OrganizerForm core={data} />
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
