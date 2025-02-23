"use client";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { ChevronLeftIcon } from "lucide-react";

export default function PreviousPage() {
  const router = useRouter();
  return (
    <Button variant="light" onPress={() => router.back()} className="-ml-6">
      <ChevronLeftIcon /> Go Back
    </Button>
  );
}
