"use client";
import { useEffect, useState } from "react";
import { BlogCard } from "@/components/Card";
import { Button, Divider } from "@heroui/react";
import { useRouter } from "next/navigation";
import mockBlog from "@/mock/mockblog.json";
import { ArrowUpRightFromSquare } from "lucide-react";
import Link from "next/link";

export default function Blog() {
  // const list = mockBlog;
  const [list, setList] = useState([]);
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/blog/${id}`);
  };

  const prepareFetchBlog = async () => {
    const response = await fetch(`${process.env.API_URL}/api/blog`);
    const data = await response.json();
    console.log(data);
    return data.data;
  };

  useEffect(() => {
    prepareFetchBlog().then((data) => {
      setList(data);
    });
  }, []);

  return (
    <div className="container">
      <section className="p-8 md:p-12">
        <Link href="/blog/news">
          <h1 className="font-semibold text-xl font-sans flex items-center ">
            NEWS <ArrowUpRightFromSquare className="mx-4" size={20} />
          </h1>
        </Link>
        <Divider className="my-4" />
        <div className="py-8">
          <BlogCard list={list.slice(0, 6)} onClick={handleCardClick} />
        </div>
      </section>
      <section className="p-8 md:p-12">
        <Link href="/blog/update">
          <h1 className="font-semibold text-xl font-sans flex items-center ">
            UPDATE <ArrowUpRightFromSquare className="mx-4" size={20} />
          </h1>
        </Link>
        <Divider className="my-4" />
        <div className="py-8">
          <BlogCard list={list.slice(0, 6)} onClick={handleCardClick} />
        </div>
      </section>
    </div>
  );
}
