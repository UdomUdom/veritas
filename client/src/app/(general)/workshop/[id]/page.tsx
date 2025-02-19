import CardList from "@/mock/workshop.json";
import { BannerCard } from "@/components/Card";

export default async function WorkshopList({
  params,
}: {
  params: { id: string };
}) {
  const workshopId = (await params).id;
  const workshop = CardList.find((item) => item.id === Number(workshopId));

  if (!workshop) {
    return <div>Workshop not found</div>;
  }

  return (
    <>
      <div className="bg-gradient-to-tr from-primary-200/80 to-secondary/80 p-8 mb-8">
        <div className="container mx-auto">
          <div className="flex justify-center items-center ">
            <BannerCard
              header={workshop.category}
              title={workshop.title}
              paragraph={workshop.description}
              image={workshop.image}
              altimg={workshop.title}
              time={workshop.schedule}
              price={workshop.price}
            />
          </div>
        </div>
      </div>
      <section className="container mx-auto"></section>
    </>
  );
}
