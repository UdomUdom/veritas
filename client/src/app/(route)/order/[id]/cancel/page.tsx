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

export default async function OrderCancelPage({
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
  } else if (data.status === "paid") {
    redirect(`/order/${id}/success`);
  }

  return (
    <div>
      <OrderProgress progress={100} />
      <div className="container mt-12 font-semibold">
        <div className="flex flex-col items-center gap-8 my-12">
          <h1 className="text-4xl">Order is Cancel!</h1>
        </div>
      </div>
      <div className="text-center">
        <Link href={`/`} className="w-full">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
