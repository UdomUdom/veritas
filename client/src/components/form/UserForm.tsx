"use client";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import { LucideTextSelection } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function UserForm({ data }: { data: any }) {
  const router = useRouter();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    // const res = await fetch(`${process.env.API_URL}/api/users/${data.id}`, {
    //   method: "PUT",
    //   body: JSON.stringify(payload),
    // });

    try {
      const res = await fetch(`${process.env.API_URL}/api/users/${data.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...payload,
          avatar: avatarUrl,
          role_id: payload.role,
        }),
      });

      const result = await res.json();

      if (result.status === "error") {
        return toast({
          title: "Failed",
          description: result.message,
          variant: "destructive",
        });
      }

      toast({
        title: "Success",
        description: result.message,
        variant: "default",
      });

      router.push("/admin/user");
    } catch (error) {
      toast({
        title: "Error",
        // description: `${error}`,
        description: "An error occurred, please try again later",
        variant: "destructive",
      });
    }
  };

  const [role, setRole] = useState([]);

  const fetchRole = async () => {
    const response = await fetch(`${process.env.API_URL}/api/role`);
    const data = await response.json();

    return data.data;
  };

  useEffect(() => {
    fetchRole().then((data) => {
      setRole(data);
    });
  }, []);

  const [avatarUrl, setAvatarUrl] = useState(data?.avatar || "");
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarUrl(e.target.value);
  };

  return (
    <Form
      className="w-full max-w-md mx-auto p-4 shadow-md rounded-lg flex flex-col gap-6"
      onSubmit={onSubmit}
    >
      <Popover
        showArrow
        backdrop="opaque"
        classNames={{
          base: ["before:bg-default-200"],
          content: [
            "py-3 px-4 border border-default-200",
            "bg-gradient-to-br from-white to-default-300",
            "dark:from-default-100 dark:to-default-50",
          ],
        }}
        placement="right"
      >
        <PopoverTrigger className="cursor-pointer">
          <Avatar
            className="w-50 h-50 mx-auto rounded-full scale-100"
            src={avatarUrl || "https://placehold.co/250x250"}
            alt="Instructor Avatar"
          />
        </PopoverTrigger>
        <PopoverContent className="p-4">
          <Input
            isRequired
            errorMessage="Please enter a valid avatar URL"
            label="Avatar"
            labelPlacement="outside"
            name="avatar"
            placeholder="Enter your avatar URL"
            defaultValue={avatarUrl}
            onChange={handleAvatarChange}
            type="text"
            className="w-full"
          />
        </PopoverContent>
      </Popover>

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
        value={data.role.id}
        placeholder="Select a role"
        defaultSelectedKeys={[data.role.id]}
        selectorIcon={<LucideTextSelection />}
      >
        {role.map((role: { id: string; name: string }) => (
          <SelectItem key={role.id}>{role.name}</SelectItem>
        ))}
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
