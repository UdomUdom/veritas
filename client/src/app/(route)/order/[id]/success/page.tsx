import Image from "@/components/build/Image";
import OrderProgress from "@/components/progress/OrderProgress";
import { Button } from "@/components/ui/button";
import Fetch from "@/utils/Fetch";
import Link from "next/link";
import { redirect } from "next/navigation";

const prepareFetch = async (id: string) => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  redirect(`/e/${id}`);
};

export default async function OrderSuccessPage({
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
  } else if (data.status === "failed") {
    redirect(`/order/${id}/cancel`);
  }

  return (
    <div>
      <OrderProgress progress={100} />
      <div className="container mt-12 font-semibold">
        <div className="flex flex-col items-center gap-8 my-12">
          <h1 className="text-4xl">Thank You!</h1>
          <p>Your order is complete (order number #{data.id})</p>
        </div>
        <div className="flex items-center gap-8 mb-12">
          <Image src={data.event.image} alt={data.event_id} className="h-48" />
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">{data.event.title}</h2>
            <p className="text-sm text-gray-400">{data.event.start_date}</p>
            <p className="text-sm text-gray-400">{data.event.location}</p>
          </div>
        </div>
        <div className="text-center">
          <Link href={`/order/${data.id}`} className="w-full">
            <Button>View My Order</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
