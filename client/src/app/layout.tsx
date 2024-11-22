import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veritas",
  description: "Prototype for Veritas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
