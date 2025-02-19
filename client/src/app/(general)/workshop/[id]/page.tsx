import { BannerCard } from "@/components/Card";
import mockWorkshop from "@/mock/workshop.json";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import SelectionBar from "@/components/SelectionBar";

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
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center text-center">
        <SelectionBar
          NavbarList={[
            { href: "#content", name: "Content" },
            { href: "#instructor", name: "Instructor" },
            { href: "#faq", name: "FAQ" },
          ]}
        />
      </div>
      <section id="content" className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none">
            <MarkdownRenderer content={workshop?.content} />
          </div>
        </div>
      </section>
      <section id="instructor" className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">instructor</div>
      </section>
      <section id="faq" className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">faq</div>
      </section>
    </>
  );
}
