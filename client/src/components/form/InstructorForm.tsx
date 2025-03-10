"use client";
import { Form, Input, Button, Textarea, Avatar } from "@heroui/react";
import { LucideTextSelection } from "lucide-react";

interface InstructorFormProps {
  method: "POST" | "PUT";
  data?: any;
}
export default function InstructorForm({ data, method }: InstructorFormProps) {
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch(
      `${process.env.API_URL}/api/user/${method === "PUT" ? data.id : ""}`,
      {
        method,
        body: JSON.stringify(payload),
      }
    );
    console.log(await res.json());
  };

  return (
    <Form
      className="w-full max-w-md mx-auto p-4 shadow-md rounded-lg flex flex-col gap-6"
      onSubmit={onSubmit}
    >
      <Avatar
        className="w-50 h-50 mx-auto rounded-full"
        name="avatar"
        src={data?.avatar || "https://placehold.co/250x250"}
        alt="Instructor Avatar"
      />
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
        type="text"
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
