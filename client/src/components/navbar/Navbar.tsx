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
      <div className="container navbar">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl gap-2">
            <FlameKindling className="w-11 h-10" />
            Veritas
          </Link>
        </div>
        <div className="flex-none">
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
    </nav>
  );
}
