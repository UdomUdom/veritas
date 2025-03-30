"use client";
import { useEffect, useState } from "react";
import { ActionCard } from "@/components/Card";
import { Button, Divider } from "@heroui/react";
import { SearchInput } from "@/components/SearchInput";
import { useRouter } from "next/navigation";
import MockWorkshop from "@/mock/workshop.json";

export default function Workshop() {
  const [list, setList] = useState<
    {
      title: string;
      category: { name: string };
      workshop_instructor: { instructor: { firstname: string } }[];
    }[]
  >([]);
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
      `${item.workshop_instructor[0].instructor.firstname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const prepareFetchWorkshop = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/workshop`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      return data.data;
    } catch (error) {
      console.warn("Fetch error, using mock data:", error);
      return MockWorkshop;
    }
  };

  useEffect(() => {
    prepareFetchWorkshop().then((data) => {
      setList(data);
    });
  }, []);

  return (
    <section className="container">
      <div className="p-4 md:p-6 flex justify-center items-center">
        <SearchInput
          placeholder="by title, category, or instructor"
          onSearch={(value) => setSearchQuery(value)}
          className="w-full md:w-3/4 lg:w-1/2"
        />
      </div>
      <Divider />
      <div className="p-8 md:p-12">
        <h1 className="font-semibold text-xl font-sans">WORKSHOP</h1>
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
