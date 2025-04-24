import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface AdminStatCardProps {
  title: string;
  description: string;
  value: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function AdminStatCard(props: AdminStatCardProps) {
  const { title, description, value, icon, footer, className, onClick } = props;

  return (
    <Card
      className={`shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      aria-label={onClick ? title : undefined}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon && <div className="text-xl">{icon}</div>}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-primary">{value}</p>
      </CardContent>
      {footer && (
        <CardFooter className="flex justify-between items-center">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
