"use client";
import { useAuth } from "@/context/AuthContext";
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

export default function Profile() {
  const { loading, user, signOut } = useAuth();

  if (loading) return null;

  if (user?.email) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <Avatar className="w-10 h-10 cursor-pointer" user={user} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-none shadow-xl font-semibold">
          <DropdownMenuGroup>
            <Link href="/wallet">
              <DropdownMenuItem>My Wallet</DropdownMenuItem>
            </Link>
            <Link href="/setting">
              <DropdownMenuItem>Setting</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href="/signin"
      className="font-semibold cursor-pointer hover:text-base duration-300"
    >
      Login / Signup
    </Link>
  );
}
