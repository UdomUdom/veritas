import MOCK from "@/mock/event.json";
import { Carousel } from "antd";
import Image from "../ui/Image";

export default async function Hero() {
  const data = MOCK.hero;

  return (
    <section>
      <Carousel arrows autoplay autoplaySpeed={5000}>
        {data.map((item, index) => (
          <div key={index}>
            <Image src={item.image} alt="hero" />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
