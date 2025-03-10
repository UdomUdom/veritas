import MockWorkshop from "@/mock/workshop.json";
import React from "react";
import WorkshopForm from "@/components/form/WorkshopForm";
import PreviousPage from "@/components/PreviousPage";

export default async function WorkshopList({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const mockList = (await params).id;
  const workshopList = MockWorkshop.find(
    (item) => item.id === Number(mockList)
  );
  return (
    <section className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
      <div className="w-full mt-12 flex flex-col justify-center items-start prose prose-neutral dark:prose-invert">
        <PreviousPage path="/admin/workshop" />
        {workshopList ? (
          <WorkshopForm method="PUT" data={workshopList} />
        ) : (
          <p>workshop not found</p>
        )}
      </div>
    </section>
  );
}
