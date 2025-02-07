"use client";
import { useState } from "react";

export interface DropdownProps<T extends string | number> {
  options: { value: T; label: string }[];
  selectedValue: T;
  onSelect: (value: T) => void;
  placeholder?: string;
  className?: string;
}

export default function Dropdown<T extends string | number>({
  options,
  selectedValue,
  onSelect,
  placeholder = "Select an option",
  className = "",
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: T) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={`dropdown ${className}`}>
      <button
        className="btn btn-outline-primary dropdown-toggle w-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((opt) => opt.value === selectedValue)?.label ||
          placeholder}
      </button>
      {isOpen && (
        <ul className="dropdown-menu absolute bg-base-100 shadow-lg rounded-lg mt-2 z-10">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-4 py-2 hover:bg-primary cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
