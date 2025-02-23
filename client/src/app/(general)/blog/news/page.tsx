"use client";
import { Divider, Chip } from "@heroui/react";
import { BlogImageCard } from "@/components/Card";
import Link from "next/link";
import { Calendar } from "lucide-react";
import mockBlog from "@/mock/mockblog.json";

export default function BlogNews() {
  const blog = mockBlog;

  return (
    <div className="container mx-auto">
      <section className="p-6 md:p-10 lg:p-12">
        <h1 className="font-bold text-2xl sm:text-3xl text-center mb-6">
          NEWS
        </h1>
        <Divider className="my-4" />
        {blog.map((item) => (
          <Link href={`/blog/${item.id}`} key={item.id} className="group block">
            <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-lg">
                <BlogImageCard
                  image={item.image_url}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-4 px-4 md:px-6">
                <Chip className="font-semibold text-sm bg-primary/20 text-primary rounded-full px-4 py-1.5">
                  Data
                </Chip>
                <h2 className="text-xl text-default-900 sm:text-2xl font-semibold leading-tight">
                  {item.title}
                </h2>
                <p className="text-default-400 text-base sm:text-lg line-clamp-3">
                  {item.description}
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-2 text-sm text-default-400">
                  <p>by&nbsp;{item.author_name}</p>
                  <p className="flex items-center gap-1">
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
