import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const items = [
  { title: "Events", url: "/e" },
  { title: "Upcoming", url: "/e/upcoming" },
  { title: "Blog", url: "/blog" },
  { title: "Contact", url: "/contact" },
  { title: "Help Center", url: "/help" },
];

export default function More() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hidden lg:flex items-center gap-2 font-semibold cursor-pointer hover:text-base duration-300 outline-none">
          <p>More</p>
          <ChevronDown size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-none shadow-xl font-semibold">
        <DropdownMenuGroup>
          {items.map((item, index) => (
            <Link key={index} href={item.url}>
              <DropdownMenuItem>{item.title}</DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
