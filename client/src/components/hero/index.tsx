import MOCK from "@/mocks/event.json";
import Fetch from "@/utils/Fetch";

import Image from "../build/Image";

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
      <h1>Carousel</h1>
    </section>
  );
}
