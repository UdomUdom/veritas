"use client";
import { useState } from "react";

export interface DropdownProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
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

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={`dropdown ${className}`}>
      <button
        className="btn btn-outline dropdown-toggle hover:bg-base-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((opt) => opt.value === selectedValue)?.label ||
          placeholder}
      </button>
      {isOpen && (
        <ul className="dropdown-menu bg-base-100 shadow-lg rounded-lg mt-2">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-4 py-2 hover:bg-base-200 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
