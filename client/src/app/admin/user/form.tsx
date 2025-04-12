"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Select from "@/components/build/Select";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { DatePicker } from "@/components/ui/datepicker";
import Fetch from "@/utils/Fetch";

interface UserFormProps {
  core: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    gender: string;
    birthdate: string;
    avatar: string;
    role: string;
  };
}

interface FieldDataType {
  name: (typeof FieldData)[number]["name"];
  type: string;
}

const prepareFetchRole = async () => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/role` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: [] };
};

export function UserForm({ core }: UserFormProps) {
  const [options, setOptions] = useState<Record<string, string[]>>({
    gender: ["male", "female"],
  });

  const formSchema = z.object({
    firstname: z.string().min(2, "Firstname is required"),
    lastname: z.string().min(2, "Lastname is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    gender: z.string().optional(),
    birthdate: z.string().optional(),
    avatar: z.string().optional(),
    role: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: core.firstname || "",
      lastname: core.lastname || "",
      email: core.email || "",
      phone: core.phone || "",
      gender: core.gender || "",
      birthdate: core.birthdate || "",
      avatar: core.avatar || "",
      role: core.role || "",
    },
  });

  useEffect(() => {
    const fetchRole = async () => {
      const res = await prepareFetchRole();
      if (res.status === "ok") {
        setOptions((prev) => ({
          ...prev,
          role: res.data.map((item: { name: string }) => item.name),
        }));
      }
    };

    fetchRole();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {FieldData.map((data: FieldDataType, index: number) => (
            <FormField
              key={index}
              control={form.control}
              name={data.name}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="capitalize">{data.name}</FormLabel>
                    <FormControl>
                      {data.type === "text" ? (
                        <Input {...field} />
                      ) : data.type === "select" ? (
                        <Select
                          {...field}
                          defaultValue={field.value}
                          onValueChange={(text: string) => {
                            if (field.value !== text) {
                              field.onChange(text);
                            }
                          }}
                          options={options[data.name] || []}
                        />
                      ) : data.type === "tel" ? (
                        <PhoneInput {...field} defaultCountry="TH" />
                      ) : data.type === "date" ? (
                        <DatePicker
                          {...field}
                          value={
                            field.value
                              ? new Date(field.value).toISOString()
                              : ""
                          }
                          onChange={field.onChange}
                        />
                      ) : null}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-end space-x-2 pt-6">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </Form>
  );
}

const FieldData = [
  {
    name: "firstname",
    type: "text",
  },
  {
    name: "lastname",
    type: "text",
  },
  {
    name: "email",
    type: "text",
  },
  {
    name: "phone",
    type: "tel",
  },
  {
    name: "gender",
    type: "select",
  },
  {
    name: "birthdate",
    type: "date",
  },
  {
    name: "avatar",
    type: "text",
  },
  {
    name: "role",
    type: "select",
  },
] as const;
