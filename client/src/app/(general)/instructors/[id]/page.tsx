import MarkdownRenderer from "@/components/MarkdownRenderer";
import PreviousPage from "@/components/PreviousPage";
import mockInstructors from "@/mock/mockInstructors.json";
import Image from "@/components/Image";

export default async function InstructorsList({
  params,
}: {
  params: { id: string };
}) {
  const mockblog = (await params).id;
  const instructorsList = mockInstructors.find(
    (item) => item.id === Number(mockblog)
  );

  return (
    <section className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
      <div className="w-full mt-12 flex flex-col justify-center items-start prose prose-neutral dark:prose-invert">
        <div className="absolute top-0 left-6">
          <PreviousPage path="/instructors" />
        </div>
        <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="w-full flex flex-col items-center md:items-center gap-6">
            <Image
              alt_img="instructor"
              className="rounded-full md:rounded-lg w-32 h-32 md:w-72 md:h-72 "
              avatar={instructorsList?.avatar ?? ""}
            />
            <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left text-default-900">
              {instructorsList?.firstname} {instructorsList?.lastname}
            </h1>
          </div>
          <div className="w-full space-y-6">
            <MarkdownRenderer content={instructorsList?.bio || ""} />
          </div>
        </div>
      </div>
    </section>
  );
}
