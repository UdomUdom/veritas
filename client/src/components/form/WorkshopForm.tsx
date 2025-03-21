"use client";
import {
  Form,
  Input,
  Button,
  Textarea,
  Avatar,
  Select,
  DatePicker,
  TimeInput,
  SelectItem,
} from "@heroui/react";
import { LucideTextSelection } from "lucide-react";

interface WorkshopFormProps {
  method: "POST" | "PUT";
  data?: any;
}

export default function WorkshopForm({ data, method }: WorkshopFormProps) {
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    if (payload.price) {
      payload.price = parseFloat(payload.price as string).toString();
    }

    const res = await fetch(
      `${process.env.API_URL}/api/workshop/${method === "PUT" ? data.id : ""}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
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
        src={data?.image_url || "https://placehold.co/250x250"}
        alt="Workshop Image"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid title"
        label="Title"
        labelPlacement="outside"
        name="title"
        placeholder="Enter workshop title"
        defaultValue={data?.title || ""}
        type="text"
        className="w-full"
      />

      <Textarea
        label="Description"
        labelPlacement="outside"
        name="description"
        placeholder="Enter workshop description"
        defaultValue={data?.description || ""}
        className="w-full"
      />

      <Input
        label="Image URL"
        labelPlacement="outside"
        name="image_url"
        placeholder="Enter image URL"
        defaultValue={data?.image_url || ""}
        type="url"
        className="w-full"
      />

      <DatePicker
        label="Start Date"
        labelPlacement="outside"
        name="start_date"
        // defaultValue={data?.start_date || ""}
        // defaultValue={data?.start_date ? new Date(data.start_date) : null}
        className="w-full"
      />

      <DatePicker
        label="End Date"
        labelPlacement="outside"
        name="end_date"
        // defaultValue={data?.end_date || ""}
        // defaultValue={data?.end_date ? new Date(data.end_date) : null}
        className="w-full"
      />

      <TimeInput
        label="Start Time"
        labelPlacement="outside"
        name="start_time"
        // defaultValue={data?.start_time || ""}
        className="w-full"
      />

      <TimeInput
        label="End Time"
        labelPlacement="outside"
        name="end_time"
        // defaultValue={data?.end_time || ""}
        className="w-full"
      />

      <Input
        label="Price"
        labelPlacement="outside"
        name="price"
        placeholder="Enter price"
        defaultValue={data?.price || ""}
        type="number"
        className="w-full"
      />

      <Input
        label="Location"
        labelPlacement="outside"
        name="location"
        placeholder="Enter location"
        defaultValue={data?.location || ""}
        type="text"
        className="w-full"
      />

      <Textarea
        label="Detail"
        labelPlacement="outside"
        name="detail"
        placeholder="Enter workshop details"
        defaultValue={data?.detail || ""}
        className="w-full"
      />

      <Textarea
        label="Content"
        labelPlacement="outside"
        name="content"
        placeholder="Enter workshop content"
        defaultValue={data?.content || ""}
        className="w-full"
      />

      <Select
        label="Category"
        labelPlacement="outside"
        name="category_id"
        placeholder="Select a category"
        defaultSelectedKeys={[data?.category?.id]}
        className="w-full"
        selectorIcon={<LucideTextSelection />}
      >
        <SelectItem key="1">IT</SelectItem>
        <SelectItem key="2">Data Science</SelectItem>
        <SelectItem key="3">Web Development</SelectItem>
        <SelectItem key="4">Cybersecurity</SelectItem>
        <SelectItem key="5">Design</SelectItem>
        <SelectItem key="6">Blockchain</SelectItem>
        <SelectItem key="7">Cloud Computing</SelectItem>
        <SelectItem key="8">Game Development</SelectItem>
        <SelectItem key="9">Data Analytics</SelectItem>
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
