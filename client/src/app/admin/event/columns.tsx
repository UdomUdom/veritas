"use client";
import Avatar from "@/components/build/Avatar";
import TableColumnHeader from "@/components/table/TableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { LucideEdit } from "lucide-react";
import Link from "next/link";

interface User {
  id: string;
  title: string;
  image: string;
  location: string;
  status: string;
  scheduled_publish_at: string;
  created_at: string;
  updated_at: string;
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => <TableColumnHeader column={column} title="Image" />,
    cell: ({ row }) => {
      const data = row.original;
      const user = {
        email: data.title,
        avatar: data.image,
      };
      return <Avatar className="mx-auto" user={user} />;
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => <TableColumnHeader column={column} title="Title" />,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Location" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      switch (data.status) {
        case "draft":
          return (
            <div className="bg-gray-100 flex items-center gap-2 rounded-full p-2 w-fit">
              <span className="text-gray-500">{data.status}</span>
            </div>
          );
        case "scheduled":
          return (
            <div className="bg-yellow-100 flex items-center gap-2 rounded-full p-2 w-fit">
              <span className="text-yellow-500">{data.status}</span>
            </div>
          );
        case "published":
          return (
            <div className="bg-green-100 flex items-center gap-2 rounded-full p-2 w-fit">
              <span className="text-green-500">{data.status}</span>
            </div>
          );
        case "archived":
          return (
            <div className="bg-red-100 flex items-center gap-2 rounded-full p-2 w-fit">
              <span className="text-red-500">{data.status}</span>
            </div>
          );
        default:
          return null;
      }
    },
  },
  {
    accessorKey: "scheduled_publish_at",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Publish At" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span>
          {new Date(data.scheduled_publish_at).toISOString().split("T")[0]}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span>{new Date(data.created_at).toISOString().split("T")[0]}</span>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Uodated At" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span>{new Date(data.updated_at).toISOString().split("T")[0]}</span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link href={`/admin/event/edit/${data.id}`}>
          <LucideEdit className="h-4 w-4" />
        </Link>
      );
    },
  },
];
