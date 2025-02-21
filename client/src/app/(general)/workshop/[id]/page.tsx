import { BannerCard } from "@/components/Card";
import mockWorkshop from "@/mock/workshop.json";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Detail from "@/components/Detail";

export default async function WorkshopList({
  params,
}: {
  params: { id: string };
}) {
  // const fetchworkshop = async () => {
  //   const response = await fetch(
  //     `${process.env.API_URL}/api/workshop/${params.id}`
  //   );
  //   const data = await response.json();
  //   return data.data;
  // };

  // const workshop = await fetchworkshop();
  // console.log(workshop);

  const mockworkshop = (await params).id;
  const workshop = mockWorkshop.find((item) => item.id === mockworkshop);

  if (!workshop) {
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
              header={workshop?.category?.name}
              title={workshop?.title}
              paragraph={workshop?.description}
              image={workshop?.image_url}
              altimg={workshop?.title}
              date={workshop?.start_date}
              sub_date={workshop?.end_date}
              time={workshop?.start_time}
              sub_time={workshop?.end_time}
              price={Number(workshop?.price)}
              location={workshop?.location}
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
            <MarkdownRenderer content={workshop?.content} />
          </section>
          <section
            id="instructor"
            className="p-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none bg-default/10  "
          >
            <blockquote className="border-l-4 border-primary-300/40 pl-4 text-default-700 my-6">
              <p className="text-3xl font-sans font-semibold">Instructor</p>
            </blockquote>
            <div className="flex flex-col gap-4">
              {workshop?.workshop_instructor.map((item) => (
                <div key={item.id}>
                  <h1 className="text-2xl font-semibold">{`${item.instructor.firstname} ${item.instructor.lastname}`}</h1>
                </div>
              ))}
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
                <h1 className="text-2xl font-semibold">{workshop?.location}</h1>
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
