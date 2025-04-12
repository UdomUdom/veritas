"use client";
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
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";

interface OrganizerFormProps {
  core: {
    name: string;
    image: string;
    email: string;
    phone: string;
    website: string;
  };
}

interface FieldDataType {
  name: (typeof FieldData)[number]["name"];
  type: string;
}

export function OrganizerForm({ core }: OrganizerFormProps) {
  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    image: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().optional(),
    website: z.string().url({ message: "Invalid URL" }).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: core.name || "",
      image: core.image || "",
      email: core.email || "",
      phone: core.phone || "",
      website: core.website || "",
    },
  });

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
                      ) : data.type === "tel" ? (
                        <PhoneInput {...field} defaultCountry="TH" />
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
    name: "name",
    type: "text",
  },
  {
    name: "image",
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
    name: "website",
    type: "text",
  },
] as const;
