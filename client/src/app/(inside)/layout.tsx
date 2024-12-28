import Navbar from "@/components/navbar/Navbar";
import FooterBar from "@/components/footer/FooterBar";
import { insideMenu } from "@/data/navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar navMenu={insideMenu} />
      {children}
      <div className="mx-auto">
        <FooterBar />
      </div>
    </section>
  );
}
