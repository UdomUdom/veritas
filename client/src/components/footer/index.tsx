import Link from "next/link";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <section className="container py-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
      <Copyright />
      <div className="order-1">
        <h2 className="mb-2 font-semibold text-xl">About Us</h2>
        <ul className="flex flex-col gap-2">
          <Link href="/blog">
            <li>Blog</li>
          </Link>
          <Link href="/contact">
            <li>Contact</li>
          </Link>
        </ul>
      </div>
      <div className="order-2">
        <h2 className="mb-2 font-semibold text-xl">Service</h2>
        <ul className="flex flex-col gap-2">
          <Link href="/events">
            <li>Events</li>
          </Link>
        </ul>
      </div>
    </section>
  );
}
