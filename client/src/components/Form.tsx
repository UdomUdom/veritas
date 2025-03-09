"use client";
import { Form as Frm, Input } from "@heroui/react";

export default function Form() {
  return (
    <Frm className="w-full max-w-xs flex flex-col gap-4">
      <Input
        isRequired
        errorMessage="Please enter a valid username"
        label="Username"
        labelPlacement="outside"
        name="username"
        placeholder="Enter your username"
        type="text"
      />
    </Frm>
  );
}
