import { Shapes, FileStack, BookHeart } from "lucide-react";
export interface PathDataProps {
  title: string;
  detail: string;
  icon: any;
  href: string;
  button: string;
  bgClass: string;
}

export const pathData: PathDataProps[] = [
  {
    title: "Class",
    detail: "Schedule & Assignment",
    icon: Shapes,
    href: "/classroom",
    button: "Click me ↗",
    bgClass: "bg-gradient-to-bl to-primary from-secondary text-primary-content",
  },
  {
    title: "Information",
    detail: "Course info & Registration",
    icon: FileStack,
    href: "/information",
    button: "Click me ↗",
    bgClass:
      "bg-gradient-to-tl to-secondary from-accent text-secondary-content",
  },
  {
    title: "Organization",
    detail: "Clubs & Meeting",
    icon: BookHeart,
    href: "/organization",
    button: "Click me ↗",
    bgClass: "bg-gradient-to-bl to-accent from-success text-secondary-content",
  },
];
