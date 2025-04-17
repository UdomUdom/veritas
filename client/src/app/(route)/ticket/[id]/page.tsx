import Image from "@/components/build/Image";
import { Button } from "@/components/ui/button";
import Fetch from "@/utils/Fetch";
import { generateQrCode } from "@/utils/QrCode";
import Link from "next/link";
import { redirect } from "next/navigation";

const prepareFetch = async (id: string) => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/ticket/${id}` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  redirect("/");
};

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await prepareFetch(id);
  const qr = await generateQrCode(data.id, 150);

  return (
    <div className="container">
      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Image src={data.order.event.image} alt="event" className="h-48" />
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">
                {data.order.event.title}
              </h2>
              <p className="text-gray-400">{data.order.event.description}</p>
              <p className="text-gray-400">{data.order.event.start_date}</p>
              <p className="text-gray-400">{data.order.event.location}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-gray-400">Type</p>
                  <h2 className="text-xl font-semibold capitalize">
                    {data.order_item.event_ticket.type}
                  </h2>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-gray-400">Price</p>
                  <h2 className="text-xl font-semibold capitalize">
                    {data.order_item.event_ticket.price}
                  </h2>
                </div>
              </div>
            </div>
            {qr && (
              <div className="flex flex-col justify-center items-center">
                <Image src={qr} alt="" />
                <Link href={qr} download="my-qr-code.png">
                  <Button>Download</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
