"use client";
import Table from "@/components/Table";
import { SearchInput } from "@/components/SearchInput";
import React, { useState, useEffect } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ChevronDownIcon } from "lucide-react";

interface User {
  avatar?: string;
  username: string;
  email: string;
  role: { name: string };
  status: string;
  actions?: string;
}

export default function User() {
  const userHead = [
    { label: "Avatar", key: "avatar", sortable: false },
    { label: "Username", key: "username", sortable: true },
    { label: "Email", key: "email", sortable: true },
    { label: "Role", key: "role", sortable: false },
    { label: "Status", key: "status", sortable: true },
    { label: "", key: "actions", sortable: false },
  ];

  const [userList, setList] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const prepareFetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    prepareFetchUsers().then((data) => {
      setList(data || []);
    });
  }, []);

  const roleOptions = Array.from(
    new Set(userList.map((item) => item?.role?.name?.toLowerCase()))
  );

  const filteredList = userList
    .filter((item) => {
      const matchesSearch =
        item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole =
        selectedRoles.length === 0 ||
        selectedRoles.includes(item.role.name.toLowerCase());

      return matchesSearch && matchesRole;
    })
    .map((item) => ({
      ...item,
      role: item.role.name,
    }));

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
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Role
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection={false}
                aria-label="Filter by Role"
                closeOnSelect={false}
                selectedKeys={new Set(selectedRoles)}
                selectionMode="multiple"
                onSelectionChange={(keys) =>
                  setSelectedRoles(Array.from(keys as Set<string>))
                }
              >
                {roleOptions.map((role) => (
                  <DropdownItem key={role} className="capitalize">
                    {role}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="mt-8 w-full overflow-x-auto">
          <Table
            path="user"
            header={userHead}
            body={filteredList}
            className="min-w-full shadow-md rounded-lg overflow-hidden"
          />
        </div>
      </div>
    </section>
  );
}
