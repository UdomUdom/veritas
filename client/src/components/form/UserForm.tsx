"use client";
import { Form, Input, Select, SelectItem, Button } from "@heroui/react";
import { LucideTextSelection } from "lucide-react";

export default function UserForm({ data }: { data: any }) {
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch(`${process.env.API_URL}/api/users/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  };
  console.log(data);

  return (
    <Form
      className="w-full max-w-md mx-auto p-4 shadow-md rounded-lg flex flex-col gap-6"
      onSubmit={onSubmit}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid username"
        label="Username"
        labelPlacement="outside"
        name="username"
        placeholder="Enter your username"
        defaultValue={data.username}
        type="text"
        className="w-full"
      />
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        defaultValue={data.email}
        type="email"
        className="w-full"
      />
      <Select
        disableSelectorIconRotation
        className="w-full"
        labelPlacement="outside"
        label="Role"
        name="role"
        value={data.role.name}
        placeholder="Select a role"
        defaultSelectedKeys={[data.role.name]}
        selectorIcon={<LucideTextSelection />}
      >
        <SelectItem key="admin">Admin</SelectItem>
        <SelectItem key="staff">Staff</SelectItem>
        <SelectItem key="user">User</SelectItem>
      </Select>
      <Select
        disableSelectorIconRotation
        className="w-full"
        labelPlacement="outside"
        label="Status"
        name="status"
        value={data.status}
        placeholder="Select a status"
        defaultSelectedKeys={[data.status]}
        selectorIcon={<LucideTextSelection />}
      >
        <SelectItem key="active">Active</SelectItem>
        <SelectItem key="inactive">Inactive</SelectItem>
      </Select>
      <div className="flex justify-end w-full gap-4">
        <Button variant="flat" color="primary" type="submit">
          Submit
        </Button>
        <Button
          variant="flat"
          color="warning"
          onPress={() => window.history.back()}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
}
