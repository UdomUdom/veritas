"use client";
import { useState, useMemo } from "react";
import { TableRow } from "@/types/type";
import { RoleMapping } from "../tableform/index";

export const useTableFilter = (byrows: TableRow[] | null | undefined = []) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<RoleMapping | "">("");

  const rows = Array.isArray(byrows) ? byrows : [];

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
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
        selectedRole === "" || row.role_id === selectedRole.id;
      return matchesSearchQuery && matchesRole;
    });
  }, [rows, searchQuery, selectedRole]);

  return {
    searchQuery,
    setSearchQuery,
    selectedRole,
    setSelectedRole,
    filteredRows,
  };
};
