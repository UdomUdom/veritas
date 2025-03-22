import { BannerCard } from "@/components/Card";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Detail from "@/components/Detail";

interface WorkshopInstructor {
  id: string;
  instructor: {
    firstname: string;
    lastname: string;
  };
}

export default async function WorkshopList({
  params,
}: {
  params: { id: string };
}) {
  const fetchWorkshop = async (id: string) => {
    const response = await fetch(
      `${process.env.API_URL}/api/workshop/${params.id}`
    );
    const data = await response.json();

    return data.data;
  };
  const { id } = await params;
  const data = await fetchWorkshop(id);

  if (!data) {
    return (
      <div className="container mx-auto">
        <h1 className="text-center text-4xl font-semibold mt-16">
          Workshop not found
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-tr from-primary-200/80 to-secondary/80 p-8">
        <div className="container mx-auto">
          <div className="flex justify-center items-center ">
            <BannerCard
              header={data?.category?.name || "Workshop"}
              title={data?.title || "Workshop"}
              paragraph={data?.description || "Workshop"}
              image={data?.image_url || "https://placehold.co/500x500"}
              altimg={data?.title || "Workshop"}
              date={data?.start_date || "Workshop"}
              sub_date={data?.end_date || "Workshop"}
              time={data?.start_time}
              sub_time={data?.end_time}
              price={Number(data?.price)}
              location={data?.location || "Workshop"}
            />
          </div>
        </div>
      </div>
      <div id="selectionBar" className=""></div>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <section
            id="details"
            className="p-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none bg-default/10 rounded-t-md "
          >
            <blockquote className="border-l-4 border-primary-300/40 pl-4 text-default-700 my-6">
              <p className="text-3xl font-sans font-semibold">Detail</p>
            </blockquote>
            <h2 className="text-xl font-mono border-b-2 border-primary-300/40 my-6 py-4">
              {data?.detail}
            </h2>
            <MarkdownRenderer content={data?.content} />
          </section>
          <section
            id="instructor"
            className="p-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none bg-default/10  "
          >
            <blockquote className="border-l-4 border-primary-300/40 pl-4 text-default-700 my-6">
              <p className="text-3xl font-sans font-semibold">Instructor</p>
            </blockquote>
            <div className="flex flex-col gap-4">
              {(data?.workshop_instructor as WorkshopInstructor[]).map(
                (item) => (
                  <div key={item.id}>
                    <h1 className="text-2xl font-semibold">{`${item.instructor.firstname} ${item.instructor.lastname}`}</h1>
                  </div>
                )
              )}
            </div>
          </section>
          <section
            id="location"
            className="p-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none bg-default/10  "
          >
            <blockquote className="border-l-4 border-primary-300/40 pl-4 text-default-700 my-6">
              <p className="text-3xl font-sans font-semibold">Location</p>
            </blockquote>
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl font-semibold">{data?.location}</h1>
              </div>
            </div>
          </section>
          <section
            id="faq"
            className="p-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none bg-default/10 rounded-b-md "
          >
            <blockquote className="border-l-4 border-primary-300/40 pl-4 text-default-700 my-6">
              <p className="text-3xl font-sans font-semibold">FAQ</p>
            </blockquote>
            <Detail />
          </section>
        </div>
      </main>
    </>
  );
}
