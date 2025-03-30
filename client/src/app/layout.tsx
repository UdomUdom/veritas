import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Veritas",
  description: "Prototype for Veritas",
};

const noto = Poppins({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={noto.className}>{children}</body>
    </html>
  );
}
