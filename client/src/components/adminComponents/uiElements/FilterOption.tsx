import { useState } from "react";
import Dropdown from "./Dropdown";
import Searchbar from "./Searchbar";
import { UserRole } from "@/data/dashboard";

interface FilterOptionProps {
  onSearchChange: (query: string) => void;
  onRoleChange: (role: (typeof UserRole)[keyof typeof UserRole] | "") => void;
}

const roleOptions = [
  { value: UserRole.STAFF, label: "Staff" },
  { value: UserRole.TEACHER, label: "Teacher" },
  { value: UserRole.STUDENT, label: "Student" },
  { value: UserRole.ADMIN, label: "Admin" },
  { value: "", label: "All" },
];

export default function FilterOption({
  onSearchChange,
  onRoleChange,
}: FilterOptionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<
    (typeof UserRole)[keyof typeof UserRole] | ""
  >("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleRoleChange = (
    role: (typeof UserRole)[keyof typeof UserRole] | ""
  ) => {
    setSelectedRole(role);
    onRoleChange(role);
  };

  return (
    <div className="flex gap-4">
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
