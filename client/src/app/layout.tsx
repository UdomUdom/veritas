import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/providers/Provider";

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
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
