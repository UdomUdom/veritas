import BlogCard from "@/components/card/BlogCard";
import MOCK from "@/mocks/more.json";
import Fetch from "@/utils/Fetch";

interface BlogItem {
  id: string;
  title: string;
  image: string;
}

const prepareFetch = async () => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/blog` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: MOCK.blogs };
};

export default async function Blog() {
  const { data } = await prepareFetch();

  return (
    <div className="container mx-auto">
      <section className="p-8 md:p-12  rounded-lg shadow-md">
        <h1 className="font-semibold text-2xl md:text-3xl font-sans flex items-center text-gray-800 dark:text-gray-200 mb-6">
          Blog
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item: BlogItem, index: number) => (
            <div
              key={index}
              className="block group transition-transform duration-300 transform hover:scale-[1.02]"
            >
              <BlogCard
                url={`/blog/${item.id}`}
                data={{
                  id: item.id,
                  title: item.title,
                  image: item.image,
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
