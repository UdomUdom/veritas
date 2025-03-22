"use client";
import Table from "@/components/Table";
import { SearchInput } from "@/components/SearchInput";
import React, { useState, useEffect } from "react";

interface Instructor {
  avatar: string;
  firstname: string;
  lastname: string;
  [key: string]: any;
}
import { Button } from "@heroui/react";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

export default function Instructor() {
  const userHead = [
    { label: "Avatar", key: "avatar", sortable: false },
    { label: "Firstname", key: "firstname", sortable: true },
    { label: "Lastname", key: "lastname", sortable: true },
    { label: "", key: "actions", sortable: false },
  ];

  const [userList, setList] = useState<Instructor[]>([]);

  const prepareFetchInstructor = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/instructor`);
      if (!response.ok) {
        throw new Error("Failed to fetch instructor");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    prepareFetchInstructor().then((data) => {
      setList(data || []);
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredList = userList.filter((item) => {
    const matchesSearch =
      item.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastname.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <section className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
      <div className="w-full mt-12 flex flex-col justify-center items-start prose prose-neutral dark:prose-invert">
        <div className="flex justify-between gap-3 items-end w-full">
          <SearchInput
            placeholder="Search by username or email"
            onSearch={(value) => setSearchQuery(value)}
            className="w-full sm:max-w-[44%]"
          />
          <div className="flex gap-3">
            <Link href="/admin/instructor/create" passHref>
              <Button
                className="bg-foreground text-background"
                endContent={<PlusIcon />}
                size="sm"
              >
                Add New
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 w-full overflow-x-auto">
          <Table
            path="instructor"
            header={userHead}
            body={filteredList}
            className="min-w-full shadow-md rounded-lg overflow-hidden"
          />
        </div>
      </div>
    </section>
  );
}
