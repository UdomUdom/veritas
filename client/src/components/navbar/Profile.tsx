"use client";
import { useAuth } from "@/provider";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "../build/Avatar";
import { handleSignout } from "@/utils/Supabase";

export default function Profile() {
  const user = useAuth();

  if (user.email) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <Avatar className="w-10 h-10 cursor-pointer" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-none shadow-xl font-semibold">
          <DropdownMenuGroup>
            <Link href="/orders">
              <DropdownMenuItem>My Wallet</DropdownMenuItem>
            </Link>
            <Link href="/setting">
              <DropdownMenuItem>Setting</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignout}>Logout</DropdownMenuItem>
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
