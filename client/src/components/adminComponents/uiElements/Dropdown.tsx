"use client";
import { useState } from "react";

export interface RoleMapping {
  id: number;
  name: string;
}

export interface DropdownProps {
  options: RoleMapping[];
  selectedValue?: RoleMapping | "";
  onSelect: (value: RoleMapping | "") => void;
  placeholder?: string;
  className?: string;
}

export default function Dropdown({
  options,
  selectedValue,
  onSelect,
  placeholder = "Select an option",
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: RoleMapping | "") => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={`dropdown ${className}`}>
      <button
        className="btn btn-outline-primary dropdown-toggle w-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue ? selectedValue.name : placeholder}
      </button>
      {isOpen && (
        <ul className="dropdown-menu absolute bg-base-100 shadow-lg rounded-lg mt-2 z-10">
          <li
            key="all"
            onClick={() => handleSelect("")}
            className="px-4 py-2 hover:bg-primary cursor-pointer"
          >
            All Roles
          </li>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-primary cursor-pointer"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
