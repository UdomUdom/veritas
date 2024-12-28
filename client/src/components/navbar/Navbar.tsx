"use client";
import { FlameKindling } from "lucide-react";
import Link from "next/link";
import ColorControl from "@/components/darkmode/ColorControl";

interface NavbarProps {
  title: string;
  href: string;
  children?: Array<{ title: string; href: string }>;
}

export default function Navbar({ navMenu }: { navMenu: NavbarProps[] }) {
  return (
    <nav className="bg-base-300 text-base-content">
      <div className="container navbar max-w-full mx-auto">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl gap-2">
            <FlameKindling className="w-11 h-10" />
            Veritas
          </Link>
        </div>
        <div className="flex-none lg:hidden">
          <button
            className="btn btn-square btn-ghost"
            onClick={() =>
              document.getElementById("mobile-menu")?.classList.toggle("hidden")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal px-1">
            {navMenu.map((item, index) => (
              <li key={index}>
                {item.children ? (
                  <details>
                    <summary>{item.title}</summary>
                    <ul className="bg-base-300 rounded-t-none p-2">
                      {item.children.map((child, index) => (
                        <li key={index}>
                          <Link href={child.href}>{child.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={item.href}>{item.title}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center w-10 h-10 mx-2">
          <ColorControl />
        </div>
      </div>
      <div id="mobile-menu" className="lg:hidden hidden">
        <ul className="menu menu-vertical px-1">
          {navMenu.map((item, index) => (
            <li key={index}>
              {item.children ? (
                <details>
                  <summary>{item.title}</summary>
                  <ul className="bg-base-300 rounded-t-none p-2">
                    {item.children.map((child, index) => (
                      <li key={index}>
                        <Link href={child.href}>{child.title}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link href={item.href}>{item.title}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
