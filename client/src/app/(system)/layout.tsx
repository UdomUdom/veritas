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
    name: "Bootcamp",
    href: "/bootcamp",
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
