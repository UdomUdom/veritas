import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans } from "next/font/google";
import { Providers } from "@/provider";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Veritas",
  description: "Prototype for Veritas",
};

const noto = Noto_Sans({
  weight: ["300"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body className={noto.className}>
        <div className="flex flex-col min-h-screen justify-between">
          <Providers>{children}</Providers>
          <Footer />
        </div>
      </body>
    </html>
  );
}
