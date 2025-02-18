"use client";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";
import React from "react";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onSearch?: (value: string) => void;
}

export const SearchInput = ({
  placeholder = "Search...",
  className,
  onSearch,
}: SearchInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <Input
      classNames={{
        base: `max-w-full md:max-w-[24rem] h-10 ${className}`,
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder={placeholder}
      size="sm"
      startContent={<Search size={18} />}
      type="search"
      onChange={handleChange}
    />
  );
};
