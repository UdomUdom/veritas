import MOCK from "@/mocks/ads.json";
type MockKeys = keyof typeof MOCK;
import Fetch from "@/utils/Fetch";

import Image from "../ui/Image";

interface BannerProps {
  q: string;
}

interface BannerData {
  image: string;
}

const prepareFetch = async ({ q }: BannerProps) => {
  const API =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_MOCK || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return MOCK[q as MockKeys];
};

export default async function Banner({ q }: BannerProps) {
  const data = await prepareFetch({ q });

  return (
    <section>
      <div
        className={`container ${
          data.length > 1 && "grid grid-cols-1 lg:grid-cols-2"
        }`}
      >
        {data.map((item: BannerData, index: number) => (
          <Image key={index} src={item.image} alt="banner" className="p-2" />
        ))}
      </div>
    </section>
  );
}
