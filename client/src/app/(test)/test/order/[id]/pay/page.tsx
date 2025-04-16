import OrderProgress from "@/components/progress/OrderProgress";
import { Button } from "@/components/ui/button";
import Fetch from "@/utils/Fetch";
import { redirect } from "next/navigation";

const prepareFetch = async (id: string) => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  redirect("/");
};

export default async function PayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data }: { data: OrderType } = await prepareFetch(id);

  return (
    <div>
      <OrderProgress progress={50} />
      <div className="container mt-12 font-semibold text-xl">
        <h2 className="font-semibold">Order #{data.id}</h2>
        <div className="mt-4 flex flex-col gap-12">
          <h2 className="text-base bg-gray-100 p-2 text-center">
            Waiting for Payment
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <h2>Amount</h2>
            <h2>&#3647;{data.total.toFixed(2)}</h2>
          </div>
          <Button className="cursor-pointer">Pay</Button>
        </div>
      </div>
    </div>
  );
}
