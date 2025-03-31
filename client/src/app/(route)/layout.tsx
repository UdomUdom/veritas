import { Suspense } from "react";
import Loading from "@/components/build/Loading";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col min-h-screen justify-between">
        <div>
          <Navbar />
          {children}
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}
