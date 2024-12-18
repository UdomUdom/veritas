"use client";
import { useFormStatus } from "react-dom";
import { CircleDashed } from "lucide-react";

interface ButtonProps {
  type: "submit" | "reset" | "button";
  className: string;
  text: string;
}

export default function Button(props: ButtonProps) {
  const { type, className, text } = props;
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type={type} className={className}>
      {pending ? <CircleDashed className="animate-spin" /> : text}
    </button>
  );
}
