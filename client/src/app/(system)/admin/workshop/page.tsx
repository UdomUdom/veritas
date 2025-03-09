"use client";
import Table from "@/components/Table";
import MockInstrctor from "@/mock/mockInstructors.json";
import { SearchInput } from "@/components/SearchInput";
import React, { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

export default function Workshop() {
  const userHead = [
    { label: "Title", key: "title", sortable: true },
    {
      label: "Instructor",
      key: "workshop_instructor.instructor.firstname",
      sortable: true,
    },
    { label: "Location", key: "location", sortable: false },
    { label: "Price", key: "price", sortable: false },
    { label: "Start date", key: "start_date", sortable: false },
    { label: "", key: "actions", sortable: false },
  ];
  const userList = MockInstrctor;

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
