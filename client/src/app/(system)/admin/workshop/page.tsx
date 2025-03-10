"use client";
import Table from "@/components/Table";
import MockWorkshop from "@/mock/workshop.json";
import { SearchInput } from "@/components/SearchInput";
import React, { useState } from "react";
import { Button } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

interface Instructor {
  id: string;
  firstname: string;
  lastname: string;
  bio: string | null;
  avatar: string;
}

interface WorkshopInstructorLink {
  id: string;
  workshop_id: string;
  instructor_id: string;
  instructor: Instructor;
}

interface Workshop {
  id: string;
  title: string;
  description: string;
  image_url: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  price: string;
  location: string;
  detail: string;
  content: string;
  created_at: string;
  updated_at: string;
  category: {
    id: string;
    name: string;
  };
  workshop_instructor: WorkshopInstructorLink[];
}

export default function Workshop() {
  const userHead = [
    { label: "Title", key: "title", sortable: true },
    {
      label: "Instructor(s)",
      key: "instructors",
      sortable: true,
    },
    { label: "Location", key: "location", sortable: false },
    { label: "Price", key: "price", sortable: false },
    { label: "Start date", key: "start_date", sortable: false },
    { label: "", key: "actions", sortable: false },
  ];

  const userList = MockWorkshop;

  const [searchQuery, setSearchQuery] = useState("");

  const getInstructorNames = (workshop: Workshop): string => {
    return workshop.workshop_instructor
      .map(
        (instructorLink: WorkshopInstructorLink) =>
          `${instructorLink.instructor.firstname} ${instructorLink.instructor.lastname}`
      )
      .join(", ");
  };

  const filteredList = userList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.start_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getInstructorNames(item)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const workshopsWithInstructors = filteredList.map((workshop) => ({
    ...workshop,
    instructors: getInstructorNames(workshop),
  }));

  return (
    <section className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
      <div className="w-full mt-12 flex flex-col justify-center items-start prose prose-neutral dark:prose-invert">
        <div className="flex justify-between gap-3 items-end w-full">
          <SearchInput
            placeholder="Search by title, start date, or instructor"
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
            body={workshopsWithInstructors}
            className="min-w-full shadow-md rounded-lg overflow-hidden"
          />
        </div>
      </div>
    </section>
  );
}
