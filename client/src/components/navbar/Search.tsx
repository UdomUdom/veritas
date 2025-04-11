"use client";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Fetch from "@/utils/Fetch";
import Link from "next/link";

interface CategoryType {
  name: string;
}

interface EventType {
  title: string;
}

const prepareFetchCategory = async () => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/category` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: [] };
};

const prepareFetchEvents = async () => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/event` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: [] };
};

export default function Search() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);

  const handleOnChange = (value: string) => {
    setText(value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await prepareFetchCategory();
      setCategories(data);
    };

    fetchCategories();

    const fetchEvents = async () => {
      const { data } = await prepareFetchEvents();
      setEvents(data);
    };

    fetchEvents();

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <button
        className="text-sm text-muted-foreground flex items-center gap-2 cursor-pointer py-2 px-4 hover:bg-muted/50 rounded-xl"
        onClick={() => setOpen((open) => !open)}
      >
        <p>Search</p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search..."
          value={text}
          onValueChange={(e) => handleOnChange(e)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {text && (
            <CommandGroup heading="Events">
              {events.map((event, index) => (
                <Link
                  key={index}
                  href={`/e/${event.title}`}
                  className="flex items-center gap-2"
                >
                  <CommandItem
                    className="cursor-pointer w-full"
                    onSelect={() => setOpen(false)}
                  >
                    {event.title}
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          )}
          <CommandGroup heading="Explore Categories">
            {categories.map((cat, index) => (
              <Link
                key={index}
                href={`/c/${cat.name}`}
                className="flex items-center gap-2"
              >
                <CommandItem
                  className="cursor-pointer w-full"
                  onSelect={() => setOpen(false)}
                >
                  {cat.name}
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
