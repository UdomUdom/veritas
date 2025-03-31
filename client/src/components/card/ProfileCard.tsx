"use client";
import { useContextProvider } from "@/provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Avatar from "../build/Avatar";
import Link from "next/link";
import { FileText, Settings } from "lucide-react";

export default function ProfileCard() {
  const user = useContextProvider();

  return (
    <Card className="col-span-2 border-1 border-slate-100 h-fit min-w-48">
      <CardHeader>
        <CardTitle>
          <Avatar className="mx-auto w-24 h-24" size={40} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <h2 className="text-xl font-semibold mx-auto">
              {user.firstname} {user.lastname}
            </h2>
            <p className="mx-auto opacity-50 text-md">{user.email}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col space-y-4">
          <Link href="/orders" className="flex items-center space-x-2">
            <FileText />
            <span>Orders</span>
          </Link>
          <Link href="/setting" className="flex items-center space-x-2">
            <Settings />
            <span>Setting</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
