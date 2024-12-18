import Navbar from "@/components/navbar/Navbar";
import { insideMenu } from "@/data/navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar navMenu={insideMenu} />
      {children}
    </section>
  );
}
