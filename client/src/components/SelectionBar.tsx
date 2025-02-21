"use client";
import React from "react";
import { Navbar as Nb, NavbarContent, NavbarItem, Link } from "@heroui/react";

interface NavbarProps {
  href: string;
  name: string;
}

export default function SelectionBar({
  NavbarList,
}: {
  NavbarList: NavbarProps[];
}) {
  return (
    <Nb isBordered position="static" className="w-full relative">
      <NavbarContent
        className="flex justify-center items-center w-full"
        justify="center"
      >
        {NavbarList.map((item: NavbarProps, index: number) => (
          <NavbarItem key={index}>
            <Link
              color="foreground"
              href={item.href}
              className="font-medium px-4 py-2"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Nb>
  );
}
