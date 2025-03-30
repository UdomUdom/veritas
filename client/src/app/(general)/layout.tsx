import Navbar from "@/components/Navbar";

const NavbarList = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Workshop",
    href: "/workshop",
  },
  {
    name: "Instructors",
    href: "/instructors",
  },
  {
    name: "Blog",
    href: "/blog",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Navbar NavbarList={NavbarList} />
      {children}
    </section>
  );
}
