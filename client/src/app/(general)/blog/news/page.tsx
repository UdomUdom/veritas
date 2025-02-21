"use client";
import { Divider, Chip } from "@heroui/react";
import { BlogImageCard } from "@/components/Card";
import Link from "next/link";
import { Calendar } from "lucide-react";
import mockBlog from "@/mock/mockblog.json";

export default function BlogNews() {
  const blog = mockBlog;

  return (
    <div className="container">
      <section className="p-8 md:p-12">
        <h1 className="font-semibold text-xl font-sans">NEWS</h1>
        <Divider className="my-4" />
        {blog.map((item) => (
          <Link href={`/blog/${item.id}`} key={item.id}>
            <div className="py-8 flex flex-wrap gap-8 grid-cols-1 md:grid-cols-2 ">
              <BlogImageCard image={item.image_url} />
              <div className="relative z-20 flex flex-col w-full gap-8 lg:w-1/2 xl:mt-10 px-4 md:px-6 border-b-4 border-default-300/40 text-default-700 ">
                <Chip className="font-semibold text-default-600 bg-primary/20 rounded-full px-4 py-1.5 text-sm">
                  Data
                </Chip>
                <div className="flex flex-col gap-4">
                  <h2 className="flex-col">{item.title}</h2>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-default-600">{item.content}</p>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4 text-default-600">
                  <p>by&nbsp;{item.author_name}</p>
                  <p className="flex items-center gap-2">
                    <Calendar size={16} />
                    date
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
