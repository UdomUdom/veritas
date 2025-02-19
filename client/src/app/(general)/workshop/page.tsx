"use client";
import { useState } from "react";
import { ActionCard } from "@/components/Card";
import { Button, Divider } from "@heroui/react";
import { SearchInput } from "@/components/SearchInput";
import CardList from "@/mock/workshop.json";
import { useRouter } from "next/navigation";

export default function Workshop() {
  const router = useRouter();
  const list = CardList;
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
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${item.instructor[0].firstname} ${item.instructor[0].lastname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

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
        {visibleItems < filteredList.length && (
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
