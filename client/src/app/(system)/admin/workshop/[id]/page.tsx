import React from "react";
import WorkshopForm from "@/components/form/WorkshopForm";
import PreviousPage from "@/components/PreviousPage";
const fetchWorkshop = async (id: string) => {
  const response = await fetch(`${process.env.API_URL}/api/workshop/${id}`);
  const data = await response.json();

  return data.data;
};
export default async function WorkshopList({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchWorkshop(id);
  return (
    <section className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
      <div className="w-full mt-12 flex flex-col justify-center items-start prose prose-neutral dark:prose-invert">
        <PreviousPage path="/admin/workshop" />
        <WorkshopForm method="PUT" data={data} />
      </div>
    </section>
  );
}
