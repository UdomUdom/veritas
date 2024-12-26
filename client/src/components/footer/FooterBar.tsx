import { FlameKindling, X, Youtube, Facebook } from "lucide-react";
import Link from "next/link";

export default function FooterBar() {
  return (
    <footer className="footer bg-neutral text-neutral-content p-10">
      <div className="container flex flex-col md:flex-row justify-between mx-auto max-w-7xl px-16">
        <nav className="mb-6 md:mb-0">
          <h6 className="footer-title mb-2">Services</h6>
          <ul>
            <li>
              <Link href="#">Schedules</Link>
            </li>
            <li>
              <Link href="#">Enrollment</Link>
            </li>
            <li>
              <Link href="#">Grade</Link>
            </li>
            <li>
              <Link href="#">News</Link>
            </li>
          </ul>
        </nav>
        <nav className="mb-6 md:mb-0">
          <h6 className="footer-title mb-2">Veritas</h6>
          <ul>
            <li>
              <Link href="/#home">Home</Link>
            </li>
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li>
              <Link href="/#contact">Contact</Link>
            </li>
            {/* <li>
              <Link href="#">Branding</Link>
            </li> */}
          </ul>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <Link href="#">
              <X size={24} />
            </Link>
            <Link href="#">
              <Youtube size={24} />
            </Link>
            <Link href="#">
              <Facebook size={24} />
            </Link>
          </div>
        </nav>
        <aside className="flex flex-col items-start gap-2">
          <FlameKindling className="w-12 h-12" />
          <p className="font-bold">
            Veritas Inc.
            <br />
            Providing reliable tech since 1992
          </p>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Veritas Inc.
          </p>
        </aside>
      </div>
    </footer>
  );
}
