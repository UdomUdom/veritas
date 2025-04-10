import MOCK from "@/mocks/ads.json";
type MockKeys = keyof typeof MOCK;
import Fetch from "@/utils/Fetch";

import Link from "next/link";
import Image from "../build/Image";

interface BannerProps {
  q: string;
}

interface BannerData {
  id: string;
  banner: string;
}

const prepareFetch = async ({ q }: BannerProps) => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/event/new?limit=1` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: MOCK[q as MockKeys] };
};

export default async function Banner({ q }: BannerProps) {
  const { data } = await prepareFetch({ q });

  return (
    <section>
      <div
        className={`container ${
          data.length > 1 && "grid grid-cols-1 lg:grid-cols-2"
        }`}
      >
        {data.map((item: BannerData, index: number) => (
          <Link key={index} href={`/e/${item.id}` || ""} className="m-1">
            <Image src={item.banner} alt="banner" />
          </Link>
        ))}
      </div>
    </section>
  );
}
