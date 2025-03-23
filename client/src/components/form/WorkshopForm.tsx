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
  Image,
} from "@heroui/react";
import { LucideTextSelection } from "lucide-react";
import React, { useEffect, useState } from "react";
import MDXEditor from "@/components/MDXeditor";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface WorkshopFormProps {
  method: "POST" | "PUT";
  data?: any;
}

export default function WorkshopForm({ data, method }: WorkshopFormProps) {
  const router = useRouter();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    // if (payload.price) {
    //   payload.price = parseFloat(payload.price as string).toString();
    // }

    // const res = await fetch(
    //   `${process.env.API_URL}/api/workshop/${method === "PUT" ? data.id : ""}`,
    //   {
    //     method,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ ...payload, content }),
    //   }
    // );

    try {
      const res = await fetch(
        `${process.env.API_URL}/api/workshop/${
          method === "PUT" ? data.id : ""
        }`,
        {
          headers: { "Content-Type": "application/json" },
          method,
          body: JSON.stringify({ ...payload, content }),
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

      router.push("/admin/workshop");
    } catch (error) {
      toast({
        title: "Error",
        // description: `${error}`,
        description: "An error occurred, please try again later",
        variant: "destructive",
      });
    }
  };

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  const fetchCategories = async () => {
    const response = await fetch(`${process.env.API_URL}/api/category`);
    const data = await response.json();

    return data.data;
  };

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const [content, setContent] = useState(data?.content || "");

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.API_URL}/api/workshop/${data?.id}`,
        {
          headers: { "Content-Type": "application/json" },
          method: "DELETE",
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
      router.push("/admin/workshop");
    } catch (error) {
      toast({
        title: "Error",
        // description: `${error}`,
        description: "An error occurred, please try again later",
        variant: "destructive",
      });
    }
  };

  const confirmDelete = async () => {
    const result = confirm("Are you sure you want to delete this instructor?");
    if (result) {
      handleDelete();
    }
  };

  return (
    <Form
      className="w-full max-w-4xl mx-auto p-4 shadow-md rounded-lg flex flex-col gap-6 items-center md:grid md:grid-cols-2"
      onSubmit={onSubmit}
    >
      <div className="flex justify-center items-center w-full md:col-span-2 p-4 rounded-lg text-center">
        <Image
          className="w-full h-auto object-cover"
          src={data?.image_url || "https://placehold.co/500x250"}
          alt="Workshop Image"
          height={250}
        />
      </div>
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
        // defaultValue={data?.start_date ? new Date(data.end_date) : null}
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
      <Select
        label="Category"
        labelPlacement="outside"
        name="category_id"
        placeholder="Select a category"
        defaultSelectedKeys={[data?.category?.id]}
        className="w-full"
        selectorIcon={<LucideTextSelection />}
      >
        {categories.map((category: { id: string; name: string }) => (
          <SelectItem key={category.id}>{category.name}</SelectItem>
        ))}
      </Select>

      <Textarea
        label="Detail"
        labelPlacement="outside"
        name="detail"
        placeholder="Enter workshop details"
        defaultValue={data?.detail || ""}
        className="w-full md:col-span-2 rounded-lg text-left"
      />

      {/* <Textarea
        label="Content"
        labelPlacement="outside"
        name="content"
        placeholder="Enter workshop content"
        defaultValue={data?.content || ""}
        className="w-full md:col-span-2 rounded-lg text-left"
      /> */}

      <div className="flex flex-col w-full md:col-span-2 gap-2">
        <span className="text-left w-full text-md ">Content</span>
        <MDXEditor
          className="container w-full md:col-span-2 rounded-lg text-center"
          data={content}
          setData={setContent}
        />
      </div>

      <div className="flex justify-end items-end w-full md:col-span-2 rounded-lg text-center gap-4">
        <Button variant="flat" color="primary" type="submit">
          Submit
        </Button>
        <Button
          variant="flat"
          color="danger"
          onPress={confirmDelete}
          className={method === "POST" ? "hidden" : ""}
        >
          Delete
        </Button>
      </div>
    </Form>
  );
}
