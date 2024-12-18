import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans } from "next/font/google";
import Provider from "@/components/providers/Provider";

export const metadata: Metadata = {
  title: "Veritas",
  description: "Prototype for Veritas",
};

const noto = Noto_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={noto.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
