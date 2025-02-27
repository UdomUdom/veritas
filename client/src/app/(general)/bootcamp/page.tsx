"use client";
import { useEffect, useState } from "react";
import { BlogImageCard } from "@/components/Card";
import { Button, Divider, Chip } from "@heroui/react";
import { SearchInput } from "@/components/SearchInput";
import { useRouter } from "next/navigation";
import mockWorkshop from "@/mock/workshop.json";
import mockBootcamp from "@/mock/mockBootcamp.json";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default function Bootcamp() {
  const blog = mockBootcamp;
  const list = mockWorkshop;
  // const [list, setList] = useState([]);
  const router = useRouter();
  const [visibleItems, setVisibleItems] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSeeMore = () => {
    setVisibleItems(list.length);
  };

  const handleCardClick = (id: string) => {
    router.push(`/bootcamp/${id}`);
  };

  const filteredList = list.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${item.workshop_instructor[0].instructor.firstname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // const prepareFetchWorkshop = async () => {
  //   const response = await fetch(`${process.env.API_URL}/api/workshop`);
  //   const data = await response.json();
  //   console.log(data);
  //   return data.data;
  // };

  // useEffect(() => {
  //   prepareFetchWorkshop().then((data) => {
  //     setList(data);
  //   });
  // }, []);

  return (
    <>
      <div className="bg-gradient-to-tr from-default-500/80 to-default-200/80 p-8 rounded-lg shadow-md">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col justify-center space-y-4 text-default-900">
              <h2 className="text-2xl font-bold">Bootcamp</h2>
              <h1 className="text-4xl font-bold">อัปสกิลแบบก้าวกระโดด</h1>
              <p className="text-base leading-relaxed">
                เรียนรู้ผ่านหลักสูตรระยะยาวในหลากหลายสาขา เช่น Data Analytics,
                UX/UI, Product Management, และ Digital Leadership โดยผู้สอนและ
                Speaker ระดับท็อปของวงการ เนื้อหาแน่น
                เรียนจบสามารถนำไปใช้งานได้จริง
              </p>
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://dummyimage.com/600x400/000/fff"
                alt="Bootcamp Illustration"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-6 flex justify-center items-center">
        <SearchInput
          placeholder="by title, category, or instructor"
          onSearch={(value) => setSearchQuery(value)}
          className="w-full md:w-3/4 lg:w-1/2"
        />
      </div>
      <Divider />
      <main className="container mx-auto px-4 py-8">
        <div className="p-8 md:p-12">
          <h1 className="font-semibold text-xl font-sans pb-4">All Bootcamp</h1>
          {blog.map((item) => (
            <Link
              href={`/bootcamp/${item.id}`}
              key={item.id}
              className="group block"
            >
              <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="relative w-full h-72  overflow-hidden rounded-lg">
                  <BlogImageCard
                    image={item.image_url}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-4 px-4 md:px-6">
                  {/* <Chip className="font-semibold text-sm bg-primary/20 text-primary rounded-full px-4 py-1.5">
                    Data
                  </Chip> */}
                  <h2 className="text-xl text-default-900 sm:text-2xl font-semibold leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-default-400 text-base sm:text-lg line-clamp-3">
                    {item.description}
                  </p>
                  <Button variant="flat" color="warning">
                    Booking
                  </Button>
                  <Divider />
                  <div className="flex flex-col sm:flex-row items-start gap-2 text-sm text-default-400">
                    <p>
                      by&nbsp; Somchai
                      {/* {item.author_name} */}
                    </p>
                    <p className="flex items-center gap-1">
                      <Calendar size={16} />
                      date
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
