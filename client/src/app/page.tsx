import Navbar from "@/components/navbar/Navbar";
import CarouselSlide from "@/components/carousel/CarouselSlide";
import About from "@/components/welcome/about";
import Contact from "@/components/welcome/contact";
import HomePage from "@/components/welcome/home";
import FooterBar from "@/components/footer/FooterBar";
import { homeMenu } from "@/data/navbar";

export default function Home() {
  return (
    <div>
      <div className="pb-24">
        <Navbar navMenu={homeMenu} />
      </div>
      <div className="container shadow-md hover:shadow-2xl">
        <CarouselSlide />
      </div>
      <div className="pb-24"></div>
      <div className="container mx-auto">
        <HomePage />
        <About />
        <Contact />
      </div>
      <div className="pb-24"></div>
      <FooterBar />
    </div>
  );
}
