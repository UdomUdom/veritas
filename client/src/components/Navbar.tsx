"use client";
import React from "react";
import {
  Navbar as Nb,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from "next/link";
import { tr } from "framer-motion/client";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

interface NavbarProps {
  href: string;
  name: string;
}

export default function Navbar({ NavbarList }: { NavbarList: NavbarProps[] }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Nb isBordered onMenuOpenChange={setIsMenuOpen} maxWidth="2xl">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link color="foreground" href="/">
            <AcmeLogo />
            <p className="font-bold text-inherit">VERITAS</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {NavbarList.map((item: NavbarProps, index: number) => (
          <NavbarItem key={index} isActive={true}>
            <Link
              color="foreground"
              href={item.href}
              className="font-semibold mx-4 font-sans"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        <ThemeSwitcher />
      </NavbarContent>
      <NavbarMenu>
        {NavbarList.map((item: NavbarProps, index: number) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            className="mx-auto leading-loose"
          >
            <Link className="w-full" color="foreground" href={item.href}>
              <span className="text-3xl leading-loose">{item.name}</span>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Nb>
  );
}
