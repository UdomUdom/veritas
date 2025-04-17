import Image from "@/components/build/Image";
import { Button } from "@/components/ui/button";
import Fetch from "@/utils/Fetch";
import { generateQrCode } from "@/utils/QrCode";
import Link from "next/link";
import { redirect } from "next/navigation";

const prepareFetch = async (id: string) => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  redirect("/");
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data }: { data: OrderType } = await prepareFetch(id);

  if (data.status === "pending") {
    redirect(`/order/${id}/checkout`);
  } else if (data.status === "waiting") {
    redirect(`/order/${id}/pay`);
  }

  return (
    <section className="container">
      <h1 className="text-2xl font-semibold mb-4">Order No. #{data.id}</h1>
      {data.tickets.map(async (item: { id: string }, index: number) => {
        const qr = await generateQrCode(item.id);
        return (
          <div
            key={index}
            className="w-full flex flex-col gap-4 p-4 border border-gray-300 mb-4 justify-between"
          >
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Image
                  src={data.event.image}
                  alt={data.event_id}
                  className="h-48"
                />
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-semibold">{data.event.title}</h2>
                  <p className="text-sm text-gray-400">
                    {data.event.start_date}
                  </p>
                  <p className="text-sm text-gray-400">{data.event.location}</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Link href={`/ticket/${item.id}`}>
                  <Button variant="outline" className="cursor-pointer">
                    View Tickets
                  </Button>
                </Link>
                <div>{qr && <Image src={qr} alt={item.id} />}</div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
