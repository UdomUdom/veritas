import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";
import Fetch from "@/utils/Fetch";
import { redirect } from "next/navigation";
import Image from "@/components/build/Image";
import MOCK from "@/mocks/event.json";
import { Carousel } from "@/components/build/Carousel";
import { CarouselItem } from "@/components/ui/carousel";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const prepareFetch = async (id: string) => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/event/${id}` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }
  redirect("/events");
};

export default async function EventList({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await prepareFetch(params.id);
  console.log(data);
  return (
    <div className="relative ">
      <Carousel>
        <CarouselItem>
          <div className="relative min-h-[200px] md:min-h-[300px] lg:min-h-[400px] xl:min-h-[500px] overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src={data.banner}
                alt="hero"
                className="w-full h-full md:object-cover md:filter md:blur-lg md:scale-105"
              />
            </div>
            <div className="absolute inset-0 z-10 md:flex items-center justify-center hidden">
              <div className="mx-auto flex justify-center">
                <Link href={`/e/${data.id}` || ""} className="relative">
                  <Image
                    src={data.banner}
                    alt="hero"
                    className="container object-contain shadow-xl rounded-lg translate-x-0 min-w-[1150px]"
                  />
                </Link>
              </div>
            </div>
          </div>
        </CarouselItem>
      </Carousel>
      <section className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
        <div className="w-full mt-12 flex flex-col justify-center items-start prose prose-neutral dark:prose-invert">
          <div className="w-full">
            <div className="text-start font-sans text-lg text-default ">
              <Image
                src={data.image}
                className="w-full h-96 object-cover rounded-lg shadow-md transition-transform "
              />
            </div>
          </div>
          <h1 className="text-start text-4xl font-bold mt-4">{data.title}</h1>
          <div className="text-start font-sans mt-8 text-lg text-default-700">
            <p className="block text-lg mb-4">{data.description}</p>

            <div className="block text-lg mt-6 text-default-700">
              <MarkdownRenderer content={data.content} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
