"use client";
import { Button } from "@heroui/react";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default function PreviousPage({ path }: { path: string }) {
  return (
    <Link href={path}>
      <Button variant="light" className="-ml-6">
        <ChevronLeftIcon size={16} />
        <span>Back</span>
      </Button>
    </Link>
  );
}
