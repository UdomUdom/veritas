import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings, Wallet } from "lucide-react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <hr className="opacity-10" />
      <div className="container">
        <div className="flex gap-4">
          <Link href="/wallet" className="flex items-center space-x-2">
            <Button variant="link">
              <Wallet />
              <span>Wallet</span>
            </Button>
          </Link>
          <Link href="/setting" className="flex items-center space-x-2">
            <Button variant="link">
              <Settings />
              <span>Setting</span>
            </Button>
          </Link>
        </div>
        <hr className="mt-2 mb-4" />
        {children}
      </div>
    </div>
  );
}
