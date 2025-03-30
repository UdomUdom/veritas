import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
