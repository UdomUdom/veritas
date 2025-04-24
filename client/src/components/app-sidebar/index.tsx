"use client";
import { Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { menus } from "./menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function AppSidebar() {
  const { signOut } = useAuth();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="flex flex-col h-full gap-4">
          <SidebarGroupLabel className="flex justify-between items-center">
            <h1 className="text-2xl select-none">Veritas</h1>
            <Link href="/">
              <Home className="cursor-pointer" />
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="destructive" onClick={signOut}>
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
