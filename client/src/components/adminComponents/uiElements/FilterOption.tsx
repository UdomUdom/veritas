import { useState } from "react";
import Dropdown from "./Dropdown";
import Searchbar from "./Searchbar";

const RoleMapping = {
  1: "Admin",
  2: "Instructors",
  3: "Students",
} as const;

type RoleId = keyof typeof RoleMapping;

interface FilterOptionProps {
  onSearchChange: (query: string) => void;
  onRoleChange: (roleId: RoleId | "") => void;
}

const roleOptions = [
  { value: 1 as const, label: "Admin" },
  { value: 2 as const, label: "Instructors" },
  { value: 3 as const, label: "Students" },
  { value: "" as const, label: "All" },
];

export default function FilterOption({
  onSearchChange,
  onRoleChange,
}: FilterOptionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<RoleId | "">("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleRoleChange = (roleId: RoleId | "") => {
    setSelectedRole(roleId);
    onRoleChange(roleId);
  };

  return (
    <div className="flex gap-4 ">
      <Searchbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <Dropdown
        options={roleOptions}
        selectedValue={selectedRole}
        onSelect={handleRoleChange}
        placeholder="Filter by Role"
      />
    </div>
  );
}
