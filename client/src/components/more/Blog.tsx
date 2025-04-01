import MOCK from "@/mocks/more.json";
import Fetch from "@/utils/Fetch";

import Link from "next/link";
import Image from "../build/Image";

interface BlogData {
  id: string;
  title: string;
  image: string;
}

const prepareFetch = async () => {
  const API =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_MOCK || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return MOCK.blogs;
};

export default async function Blog() {
  const data = await prepareFetch();

  return (
    <section className="container mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">{config.title}</h1>
        <Link href={config.url} className="text-base">
          <p>View All</p>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <Link href={`/blog/${data[0].id}`} className="md:w-3/5">
          <Image
            src={data[0].image}
            alt={data[0].title}
            className="w-full h-full object-cover rounded-lg"
          />
        </Link>
        <div className="md:w-1/3 flex flex-col gap-4 md:gap-2 md:justify-between">
          {data.slice(1, 4).map((item: BlogData, index: number) => (
            <Link
              href={`/blog/${item.id}`}
              key={index}
              className="grid grid-cols-2 gap-4"
            >
              <Image
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const config = {
  title: "Blog",
  url: "/blog",
};
