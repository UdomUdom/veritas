import Link from "next/link";
import React from "react";
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-default/80 ">
      <div className="container mx-auto flex flex-col items-center py-6">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Veritas. All rights reserved.
        </p>
        <div className="flex items-center space-x-2 mt-4 text-gray-700">
          <span>Made with ❤️ by</span>
          <Link
            href="https://github.com/naxn1a"
            className="flex items-center space-x-1 hover:text-gray-900 transition"
          >
            <Github className="h-4 w-4" />
            <span>naxn1a</span>
          </Link>
          <span>&bull;</span>
          <Link
            href="https://github.com/udomudom"
            className="flex items-center space-x-1 hover:text-gray-900 transition"
          >
            <Github className="h-4 w-4" />
            <span>udomudom</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
