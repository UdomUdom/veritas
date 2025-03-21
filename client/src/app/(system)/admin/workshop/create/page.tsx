import WorkshopForm from "@/components/form/WorkshopForm";
import PreviousPage from "@/components/PreviousPage";

export default function WorkshopCreate() {
  return (
    <section className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
      <div className="w-full mt-12 flex flex-col justify-center items-start prose prose-neutral dark:prose-invert">
        <PreviousPage path="/admin/instructor" />
        <WorkshopForm method="POST" />
      </div>
    </section>
  );
}
