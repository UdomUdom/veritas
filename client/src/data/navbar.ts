export const homeMenu = [
  {
    title: "Home",
    href: "#home",
  },
  {
    title: "jump",
    href: "#",
    children: [
      {
        title: "About",
        href: "#about",
      },
      {
        title: "Contact",
        href: "#contact",
      },
    ],
  },
];

export const insideMenu = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Profile",
    href: "#",
    children: [
      {
        title: "Settings",
        href: "/settings",
      },
      {
        title: "Logout",
        href: "",
      },
    ],
  },
];
