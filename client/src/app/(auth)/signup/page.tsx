"use client";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Fetch from "@/utils/Fetch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { DatePicker } from "@/components/ui/datepicker";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formSchema } from "./formSchema";
import { on } from "events";

export default function RegisterPreview() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      date: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await Fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`,
        {
          method: "POST",
          body: {
            firstname: values.fname,
            lastname: values.lname,
            birthdate: values.date,
            phone: values.phone,
            email: values.email,
            password: values.password,
          },
        }
      );
      if (res.status === "error") {
        return toast.error(res.message);
      }
      toast.success(res.message);
      router.push("/signin");
    } catch {}
  }

  return (
    <Card className="w-full max-w-md p-6 md:bg-white rounded-lg shadow-none md:shadow-md border-0 bg-gray-100">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              <FormField<z.infer<typeof formSchema>>
                control={form.control}
                name="fname"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="name">First Name</FormLabel>
                    <FormControl>
                      <Input
                        id="fname"
                        placeholder="John"
                        {...field}
                        className="bg-white "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField<z.infer<typeof formSchema>>
                control={form.control}
                name="lname"
                render={({ field }) => (
                  <FormItem className="grid gap-2 ">
                    <FormLabel htmlFor="name">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        id="lname"
                        placeholder="Doe"
                        {...field}
                        className="bg-white "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="grid gap-2 ">
                    <FormLabel htmlFor="date">Birth Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="grid gap-2 ">
                    <FormLabel htmlFor="phone">Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput {...field} defaultCountry="TH" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="johndoe@mail.com"
                        type="email"
                        autoComplete="email"
                        className="bg-white "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="******"
                        autoComplete="new-password"
                        className="bg-white "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="confirmPassword"
                        placeholder="******"
                        autoComplete="new-password"
                        className="bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full cursor-pointer">
                Register
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
