"use client";
import {
  Form,
  Input,
  Button,
  Textarea,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface InstructorData {
  id?: string;
  avatar?: string;
  firstname: string;
  lastname: string;
  bio: string;
}

interface InstructorFormProps {
  method: "POST" | "PUT";
  data?: InstructorData;
}

export default function InstructorForm({ data, method }: InstructorFormProps) {
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        `${process.env.API_URL}/api/instructor/${
          method === "PUT" && data?.id ? data.id : ""
        }`,
        {
          headers: { "Content-Type": "application/json" },
          method,
          body: JSON.stringify({ ...payload, avatar: avatarUrl }),
        }
      );

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

      router.push("/admin/instructor");
    } catch (error) {
      toast({
        title: "Error",
        // description: `${error}`,
        description: "An error occurred, please try again later",
        variant: "destructive",
      });
    }
  };

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
        errorMessage="Please enter a valid firstname"
        label="Firstname"
        labelPlacement="outside"
        name="firstname"
        placeholder="Enter your firstname"
        defaultValue={data?.firstname || ""}
        type="text"
        className="w-full"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid lastname"
        label="Lastname"
        labelPlacement="outside"
        name="lastname"
        placeholder="Enter your lastname"
        defaultValue={data?.lastname || ""}
        type="text"
        className="w-full"
      />

      <Textarea
        label="Bio"
        labelPlacement="outside"
        name="bio"
        placeholder="Enter your bio"
        defaultValue={data?.bio || ""}
        className="w-full"
      />

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
