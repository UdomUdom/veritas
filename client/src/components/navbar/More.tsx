import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function More() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hidden lg:flex items-center gap-2 font-semibold cursor-pointer hover:text-base duration-300 outline-none">
          <p>More</p>
          <ChevronDown size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-none shadow-xl">
        <DropdownMenuGroup>
          <DropdownMenuItem>Blog</DropdownMenuItem>
          <DropdownMenuItem>News</DropdownMenuItem>
          <DropdownMenuItem>Contact</DropdownMenuItem>
          <DropdownMenuItem>Help Center</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
