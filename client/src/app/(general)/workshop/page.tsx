"use client";
import { useEffect, useState } from "react";
import { ActionCard } from "@/components/Card";
import { Button, Divider } from "@heroui/react";
import { SearchInput } from "@/components/SearchInput";
import { useRouter } from "next/navigation";
import mockWorkshop from "@/mock/workshop.json";

export default function Workshop() {
  const list = mockWorkshop;
  // const [list, setList] = useState([]);
  const router = useRouter();
  const [visibleItems, setVisibleItems] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSeeMore = () => {
    setVisibleItems(list.length);
  };

  const handleCardClick = (id: string) => {
    router.push(`/workshop/${id}`);
  };

  const filteredList = list.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${item.workshop_instructor[0].instructor.firstname} ${item.workshop_instructor[0].instructor.firstname}`
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
    <section className="container">
      <div className="p-4 md:p-6 flex justify-center items-center">
        <SearchInput
          placeholder="by title, category, or instructor"
          onSearch={(value) => setSearchQuery(value)}
        />
      </div>
      <Divider />
      <div className="p-8 md:p-12">
        <h1 className="font-semibold text-xl">WORKSHOP</h1>
        <div className="py-8">
          <ActionCard
            list={filteredList.slice(0, visibleItems)}
            onClick={handleCardClick}
          />
        </div>
        {visibleItems < list.length && (
          <div className="flex justify-center mt-6">
            <Button
              color="primary"
              variant="flat"
              onClick={handleSeeMore}
              className="px-6 py-2 font-semibold rounded-lg hover:bg-primary-600 transition-colors"
            >
              See More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
