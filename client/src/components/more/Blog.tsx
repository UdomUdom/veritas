import MOCK from "@/mock/more.json";
import Link from "next/link";
import Image from "../ui/Image";

export default function Blog() {
  const data = MOCK.blogs;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">News</h1>
        <Link href="/s/news" className="text-base">
          <p>View All</p>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="md:w-3/4">
          <Image
            src={data[0].image}
            alt={data[0].title}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{data[0].title}</h2>
          </div>
        </div>

        <div className="md:w-1/3 flex flex-col gap-4 md:gap-2 md:justify-between">
          {data.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <Image
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
