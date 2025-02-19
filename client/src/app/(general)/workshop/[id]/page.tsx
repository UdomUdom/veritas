import { BannerCard } from "@/components/Card";
import mockWorkshop from "@/mock/workshop.json";

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
      <div className="bg-gradient-to-tr from-primary-200/80 to-secondary/80 p-8 mb-8">
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
      <section className="container mx-auto"></section>
    </>
  );
}
