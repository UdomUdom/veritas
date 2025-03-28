"use client";
import { AutoComplete } from "antd";

const options = [
  { value: "Burns Bay Road" },
  { value: "Downing Street" },
  { value: "Wall Street" },
];

export default function Search() {
  return (
    <AutoComplete
      className="w-full lg:w-[400px]"
      options={options}
      placeholder="Search"
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  );
}
