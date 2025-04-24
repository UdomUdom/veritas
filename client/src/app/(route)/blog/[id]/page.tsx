import PathButton from "@/components/build/PathButton";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";
import Fetch from "@/utils/Fetch";
import { redirect } from "next/navigation";
import Image from "@/components/build/Image";

const prepareFetch = async (id: string) => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }
  redirect("/blog");
};

export default async function BlogList({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await prepareFetch(id);

  return (
    <section className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
      <div className="w-full mt-12 flex flex-col justify-center items-start prose prose-neutral dark:prose-invert">
        <div className="absolute top-0 left-6">
          <PathButton path="/blog" />
        </div>
        <div className="w-full">
          <div className="text-start font-sans mt-14 text-lg text-default ">
            <p className="block text-sm mb-2">
              Published on{" "}
              {data.created_at
                ? new Date(data.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Unknown date"}
            </p>
            <div className="mb-3 flex w-full flex-col items-start">
              <p className="block text-sm mb-2">
                Author {data.author || "Unknown"}
              </p>
            </div>
          </div>
          <h1 className="text-start text-4xl font-bold mt-6">{data.title}</h1>
          <div className="text-start font-sans mt-8 text-lg text-default-700">
            <p className="block text-lg mb-4">{data.description}</p>
            <Image
              src={data.image}
              alt="Blog Image"
              className="w-full h-96 object-cover rounded-lg shadow-md transition-transform "
            />
            <div className="block text-lg mt-6 text-default-700">
              <MarkdownRenderer content={data.content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
