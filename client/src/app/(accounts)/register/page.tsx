"use client";
import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { EyeClosed, Eye, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export const EyeSlashFilledIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <EyeClosed />
    </svg>
  );
};

export const EyeFilledIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <Eye />
    </svg>
  );
};

export default function Login() {
  const [action, setAction] = React.useState<string | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <section className="container mx-auto">
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-center py-10">
          <span className="text-4xl font-bold text-default-700 drop-shadow-[0px_0px_67px_rgba(255,255,255,0.9)]">
            Register
          </span>
        </h1>
        <Form
          className="w-full max-w-xs flex flex-col gap-4"
          validationBehavior="native"
          onReset={() => setAction("reset")}
          onSubmit={(e) => {
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.currentTarget));

            setAction(`submit ${JSON.stringify(data)}`);
          }}
        >
          <Input
            isRequired
            className="max-w-xs"
            errorMessage="Please enter a valid username"
            label="Username"
            name="username"
            placeholder="Enter your username"
            type="text"
            variant="bordered"
          />
          <Input
            isRequired
            className="max-w-xs"
            errorMessage="Please enter a valid email"
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="text"
            variant="bordered"
          />
          <Input
            className="max-w-xs"
            isRequired
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            label="Password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <Input
            className="max-w-xs"
            isRequired
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            label="Confirm Password"
            placeholder="Confirm your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />

          <div className="w-full">
            <Link href="/login">
              <h1 className="flex text-small text-default-500 justify-end hover:text-default-700 duration-300">
                Already have an account?{" "}
                <ExternalLinkIcon
                  className="ml-2 text-default-500 gap-4"
                  size={18}
                />
              </h1>
            </Link>
          </div>
          <div className="flex gap-2">
            <Button color="primary" type="submit">
              Submit
            </Button>
            <Button type="reset" variant="flat">
              Reset
            </Button>
          </div>
          {action && <div className="text-small text-default-500"></div>}
        </Form>
      </div>
    </section>
  );
}
