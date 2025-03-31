import Loading from "@/components/build/Loading";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Suspense } from "react";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col min-h-screen justify-between">
        <Navbar />
        {children}
        <Footer />
      </div>
    </Suspense>
  );
}
