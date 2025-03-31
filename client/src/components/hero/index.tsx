import MOCK from "@/mocks/event.json";
import Fetch from "@/utils/Fetch";

import Image from "../build/Image";
import { Carousel } from "../build/Carousel";
import { CarouselItem } from "../ui/carousel";
import Link from "next/link";

interface HeroData {
  id: string;
  image: string;
}

const prepareFetch = async () => {
  const API =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_MOCK || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return MOCK.hero;
};

export default async function Hero() {
  const data = await prepareFetch();

  return (
    <section>
      <Carousel>
        {data.map((item: HeroData, index: number) => (
          <CarouselItem key={index}>
            <Link href={`/e/${item.id}` || ""}>
              <Image src={item.image} alt="hero" className="w-full" />
            </Link>
          </CarouselItem>
        ))}
      </Carousel>
    </section>
  );
}
