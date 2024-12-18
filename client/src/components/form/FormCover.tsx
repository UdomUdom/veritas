"use client";
import { useEffect, useActionState } from "react";
import { toast } from "@/libs/toast";

interface FormCoverProps {
  action: (prevState: any, data: FormData) => Promise<{ message: string }>;
  children?: React.ReactNode;
}
export default function FormCover(props: FormCoverProps) {
  const { action, children } = props;
  const [state, formAction] = useActionState(action, { message: "" });
  let theme = window.localStorage.getItem("theme");
  if (!theme || theme === "winter") {
    theme = "dark";
  } else {
    theme = "light";
  }

  useEffect(() => {
    if (state.message) {
      toast.error(state.message, theme);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {children}
    </form>
  );
}
