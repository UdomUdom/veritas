"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default function PathPage({
  path,
  className,
  name = "Back",
}: {
  path: string;
  className?: string;
  name?: string;
}) {
  return (
    <Link href={path} className={className}>
      <Button variant="ghost" className="cursor-pointer">
        <ChevronLeftIcon size={16} />
        <span>{name}</span>
      </Button>
    </Link>
  );
}
