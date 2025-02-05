"use client";
import { useState, useMemo } from "react";
import { TableRow } from "@/types/type";

const RoleMapping = {
  1: "admin",
  2: "instructors",
  3: "students",
} as const;

export const useTableFilter = (byrows: TableRow[] = []) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<
    keyof typeof RoleMapping | ""
  >("");

  const filteredRows = useMemo(() => {
    return byrows.filter((row) => {
      const profile = row.profile;
      if (
        !profile ||
        !profile.firstname ||
        !profile.lastname ||
        !profile.email
      ) {
        return false;
      }
      const matchesSearchQuery =
        profile.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole =
        selectedRole === "" ||
        RoleMapping[row.role_id as keyof typeof RoleMapping] ===
          RoleMapping[selectedRole];
      return matchesSearchQuery && matchesRole;
    });
  }, [byrows, searchQuery, selectedRole]);

  return {
    searchQuery,
    setSearchQuery,
    selectedRole,
    setSelectedRole,
    filteredRows,
  };
};
