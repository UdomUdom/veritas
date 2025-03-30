import MOCK from "@/mocks/event.json";
import Fetch from "@/utils/Fetch";

import { Carousel } from "antd";
import Image from "../ui/Image";

const prepareFetch = async () => {
  const API =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_MOCK || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return MOCK.hero;
};

interface HeroProps {
  image: string;
}

export default async function Hero() {
  const data = await prepareFetch();

  return (
    <section>
      <Carousel arrows autoplay autoplaySpeed={5000}>
        {data.map((item: HeroProps, index: number) => (
          <div key={index}>
            <Image src={item.image} alt="hero" className="mx-auto" />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
