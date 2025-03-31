"use client";
import { useContextProvider } from "@/provider";
import {
  Avatar as Avt,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { User } from "lucide-react";

interface AvatarProps {
  className?: string;
  size?: number;
}

export default function Avatar({ className, size }: AvatarProps) {
  const user = useContextProvider();

  return (
    <Avt className={className}>
      <AvatarImage src={user.avatar || ""} alt="avatar" />
      <AvatarFallback>
        <User className="opacity-50" size={size} />
      </AvatarFallback>
    </Avt>
  );
}
