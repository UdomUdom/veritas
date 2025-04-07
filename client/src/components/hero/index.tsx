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
            <div className="relative min-h-[200px] md:min-h-[300px] lg:min-h-[400px] xl:min-h-[500px] overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.image}
                  alt="hero"
                  className="w-full h-full md:object-cover md:filter md:blur-lg md:scale-105"
                />
              </div>
              <div className="absolute inset-0 z-10 md:flex items-center justify-center hidden">
                <div className="mx-auto flex justify-center">
                  <Link href={`/e/${item.id}` || ""} className="relative">
                    <Image
                      src={item.image}
                      alt="hero"
                      className="container object-contain shadow-xl rounded-lg translate-x-0"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </section>
  );
}
