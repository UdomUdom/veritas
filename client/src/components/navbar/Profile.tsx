"use client";
import { useContextProvider } from "@/provider";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Profile() {
  const user = useContextProvider();

  if (user.email) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="w-10 h-10 cursor-pointer">
            <AvatarImage src={user.avatar || ""} alt="avatar" />
            <AvatarFallback>
              <User className="opacity-50" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-none shadow-xl font-semibold">
          <DropdownMenuGroup>
            <Link href="/profile">
              <DropdownMenuItem>My Wallet</DropdownMenuItem>
            </Link>
            <Link href="/profile#setting">
              <DropdownMenuItem>Setting</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <Link href="/profile">
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return (
      <Link
        href="/signin"
        className="font-semibold cursor-pointer hover:text-base duration-300"
      >
        Login / Signup
      </Link>
    );
  }
}
