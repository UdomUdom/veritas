import { BookUser, Home, User2, BookText, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ThemeSwitcher from "@/components/ThemeSwitcher";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const items: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "User",
    url: "/admin/user",
    icon: User2,
  },
  {
    title: "Instructor",
    url: "/admin/instructor",
    icon: BookUser,
  },
  {
    title: "Workshop",
    url: "/admin/workshop",
    icon: BookText,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

const SidebarMenuItemComponent = ({ item }: { item: MenuItem }) => (
  <SidebarMenuItem key={item.url}>
    <SidebarMenuButton asChild>
      <a
        href={item.url}
        aria-label={item.title}
        className="flex items-center p-2 text-default-700 hover:bg-default-200 rounded-md transition-colors duration-200"
      >
        <item.icon className="w-5 h-5" />
        <span className="ml-3">{item.title}</span>
      </a>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center justify-between p-4 bg-default-100 rounded-md">
              <p className="font-semibold text-inherit">VERITAS Management</p>
              <ThemeSwitcher />
            </div>
            <SidebarMenu className="flex-col gap-6 my-4">
              {items.map((item) => (
                <SidebarMenuItemComponent key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
