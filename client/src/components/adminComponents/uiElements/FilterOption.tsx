import { useState } from "react";
import Dropdown from "./Dropdown";
import Searchbar from "./Searchbar";
import { RoleMapping } from "../tableform/index";

interface FilterOptionProps {
  onSearchChange: (query: string) => void;
  onRoleChange: (roleId: RoleMapping | "") => void;
  roles: RoleMapping[];
}

export default function FilterOption({
  onSearchChange,
  onRoleChange,
  roles,
}: FilterOptionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<RoleMapping | "">("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleRoleChange = (roleId: RoleMapping | "") => {
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
        options={roles}
        selectedValue={selectedRole}
        onSelect={handleRoleChange}
        placeholder="Role"
      />
    </div>
  );
}
