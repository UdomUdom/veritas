"use client";
import { useAuth } from "@/provider";
import {
  Avatar as Avt,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface AvatarProps {
  className?: string;
  size?: number;
}

export default function Avatar({ className }: AvatarProps) {
  const user = useAuth();

  return (
    <Avt className={className}>
      <AvatarImage src={user.avatar || ""} alt="avatar" />
      <AvatarFallback className="select-none">
        {user.email.split("@")[0].slice(0, 2)}
      </AvatarFallback>
    </Avt>
  );
}
