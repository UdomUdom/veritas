import {
  Calendar,
  LayoutDashboard,
  User,
  Building,
  NotebookPen,
} from "lucide-react";

export const menus = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "User",
    url: "/admin/user",
    icon: User,
  },
  {
    title: "Organizer",
    url: "/admin/organizer",
    icon: Building,
  },
  {
    title: "Event",
    url: "/admin/event",
    icon: Calendar,
  },
  {
    title: "Blog",
    url: "/admin/blog",
    icon: NotebookPen,
  },
];
