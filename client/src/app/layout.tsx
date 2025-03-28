import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "Veritas",
  description: "Prototype for Veritas",
};

const noto = Noto_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
