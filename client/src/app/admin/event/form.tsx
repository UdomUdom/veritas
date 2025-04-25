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
import Select from "@/components/build/Select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import Fetch from "@/utils/Fetch";
import { useEffect, useState } from "react";
import { DatePicker } from "@/components/ui/datepicker";
import { redirect } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { notify } from "@/utils/Notify";
interface EventFormProps {
  core?: {
    id: string;
    title: string;
    description: string;
    image: string;
    banner: string;
    location: string;
    start_date: string;
    end_date: string;
    status: string;
    info: string;
    category_id: string;
    organizer_id: string;
    event_ticket: [
      {
        type: string;
        price: number;
        available: number;
      }
    ];
  };
}

interface FieldDataType {
  name: (typeof FieldData)[number]["name"];
  type: string;
  span: number;
}

export function EventForm({ core }: EventFormProps) {
  const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional(),
    image: z.string().optional(),
    banner: z.string().optional(),
    location: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    status: z.string().optional(),
    info: z.string().optional(),
    category: z.string().optional(),
    organizer: z.string().optional(),
    event_ticket: z
      .array(
        z.object({
          type: z.string().optional(),
          price: z.number().optional(),
          available: z.number().optional(),
        })
      )
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: core?.title || "",
      description: core?.description || "",
      image: core?.image || "",
      banner: core?.banner || "",
      location: core?.location || "",
      start_date: core?.start_date || "",
      end_date: core?.end_date || "",
      status: core?.status || "",
      info: core?.info || "",
      category: core?.category_id || "",
      organizer: core?.organizer_id || "",
      event_ticket: core?.event_ticket || [
        {
          type: " ",
          price: 0,
          available: 0,
        },
      ],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const API =
      `${process.env.NEXT_PUBLIC_API_URL}/api/event/${
        core?.id ? core!.id : ""
      }` || "";
    const res = await Fetch(API!, {
      method: core?.id ? "PUT" : "POST",
      body: {
        title: values.title,
        description: values.description,
        image: values.image,
        banner: values.banner,
        location: values.location,
        start_date: values.start_date,
        end_date: values.end_date,
        status: values.status,
        info: info,
        category_id: values.category,
        organizer_id: values.organizer,
        event_ticket: values.event_ticket,
      },
    });
    if (res && res.status !== "ok") {
      return notify.error(res.message);
    }
    redirect("/admin/event");
  };

  const [info, setInfo] = useState(core?.info || "");
  const [options, setOptions] = useState<{
    [key in (typeof FieldData)[number]["name"]]?: {
      value: string;
      label: string;
    }[];
  }>({
    status: [
      {
        value: "published",
        label: "published",
      },
      {
        value: "draft",
        label: "draft",
      },
      {
        value: "archived",
        label: "archived",
      },
      {
        value: "scheduled",
        label: "scheduled",
      },
    ],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await Fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category`
      );
      if (res && res.status === "ok") {
        setOptions((prev) => ({
          ...prev,
          category: res.data.map((item: { id: string; name: string }) => ({
            value: item.id,
            label: item.name,
          })),
        }));
      }
    };
    fetchCategories();

    const fetchOrganizers = async () => {
      const res = await Fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/organizer`
      );
      if (res && res.status === "ok") {
        setOptions((prev) => ({
          ...prev,
          organizer: res.data.map((item: { id: string; name: string }) => ({
            value: item.id,
            label: item.name,
          })),
        }));
      }
    };
    fetchOrganizers();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          {FieldData.map((data: FieldDataType, index: number) => (
            <FormField
              key={index}
              control={form.control}
              name={data.name}
              render={({ field }) => {
                return (
                  <FormItem className={`col-span-${data.span}`}>
                    <FormLabel className="capitalize">{data.name}</FormLabel>
                    <FormControl>
                      {data.type === "text" ? (
                        <Input {...field} />
                      ) : data.type === "tel" ? (
                        <PhoneInput {...field} defaultCountry="TH" />
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
                      ) : data.type === "mdx" ? (
                        <MarkdownEditor
                          className="w-full md:col-span-2 rounded-lg text-center"
                          data={info}
                          setData={setInfo}
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
        <div className="grid gap-4 mt-4">
          <FormLabel className="capitalize">Tickets</FormLabel>
          <div className="flex items-start justify-start space-x-2 gap-4">
            {form.watch("event_ticket")?.map((ticket, index) => (
              <div key={index} className="grid gap-4">
                <FormField
                  control={form.control}
                  name={`event_ticket.${index}.type`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name={`event_ticket.${index}.price`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name={`event_ticket.${index}.available`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Available</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-start gap-4">
            <Button
              type="button"
              onClick={() => {
                form.setValue("event_ticket", [
                  ...(form.getValues("event_ticket") || []),
                  { type: "", price: 0, available: 0 },
                ]);
              }}
              className="mt-4"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                const tickets = form.getValues("event_ticket") || [];
                if (tickets.length > 1) {
                  tickets.pop();
                  form.setValue("event_ticket", tickets);
                }
              }}
              className="mt-4"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2 pt-6">
          <Button type="submit" className="cursor-pointer">
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
}

const FieldData = [
  {
    name: "title",
    type: "text",
    span: 2,
  },
  {
    name: "description",
    type: "text",
    span: 2,
  },
  {
    name: "image",
    type: "text",
    span: 1,
  },
  {
    name: "banner",
    type: "text",
    span: 1,
  },
  {
    name: "location",
    type: "text",
    span: 1,
  },
  {
    name: "start_date",
    type: "date",
    span: 1,
  },
  {
    name: "end_date",
    type: "date",
    span: 1,
  },
  {
    name: "status",
    type: "select",
    span: 1,
  },
  {
    name: "category",
    type: "select",
    span: 1,
  },
  {
    name: "organizer",
    type: "select",
    span: 1,
  },
  {
    name: "info",
    type: "mdx",
    span: 2,
  },
] as const;
