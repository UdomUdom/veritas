"use client";
import Avatar from "@/components/build/Avatar";
import TableColumnHeader from "@/components/table/TableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { LucideEdit } from "lucide-react";
import Link from "next/link";

interface User {
  id: string;
  title: string;
  description: string;
  image: string;
  content: string;
  author: string;
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
    accessorKey: "author",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Author" />
    ),
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
        <Link href={`/admin/blog/edit/${data.id}`}>
          <LucideEdit className="h-4 w-4" />
        </Link>
      );
    },
  },
];
