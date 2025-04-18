import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";
import Fetch from "@/utils/Fetch";
import { redirect } from "next/navigation";
import Image from "@/components/build/Image";
import { Carousel } from "@/components/build/Carousel";
import { CarouselItem } from "@/components/ui/carousel";
import Link from "next/link";
// import Banner from "@/components/banner/Banner";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Ticket from "@/components/order/Tickets";

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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await prepareFetch(id);

  return (
    <div className="relative ">
      <Carousel hidden={true}>
        <CarouselItem>
          <div className="relative min-h-[200px] md:min-h-[300px] lg:min-h-[400px] xl:min-h-[500px] overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src={data.banner}
                alt="hero"
                className="w-full h-full object-cover filter blur-lg scale-105"
              />
            </div>

            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="mx-auto max-w-[900px] w-full flex bg-gray-100 rounded-lg shadow-md overflow-hidden transition-transform duration-300 ">
                <div className="w-1/2 relative group">
                  <Image
                    src={data.banner}
                    alt="hero"
                    className="w-full h-[400px] object-cover rounded-tl-lg rounded-bl-lg transition-transform duration-300 "
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                </div>

                <div className="w-1/2 p-6 bg-black text-white">
                  <h1 className="text-4xl font-bold mb-4 bg-clip-text ">
                    {data.title}
                  </h1>
                  <p className="block text-md mb-4">{data.description}</p>
                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex items-center gap-2 text-lg font-medium text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>{data.start_date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-lg font-medium text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>{data.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6 ">
                    <Link href="#tickets">
                      <Button
                        variant="default"
                        className="text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 cursor-pointer"
                      >
                        Buy Tickets
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
      </Carousel>
      <section className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
        <div className="w-full mt-12 flex flex-col justify-center items-start prose prose-neutral dark:prose-invert">
          <div className="w-full"></div>
          <div className="text-start font-sans mt-8 text-lg text-default-700">
            <div className="block text-lg mt-6 text-default-700">
              <MarkdownRenderer content={data.info} />
            </div>
          </div>
        </div>
        <Separator className="my-8" />
      </section>
      <div id="tickets">
        <Ticket event_id={data.id} />
      </div>
    </div>
  );
}
