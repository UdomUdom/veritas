import Image from "@/components/build/Image";
import Checkout from "@/components/order/Checkout";
import OrderProgress from "@/components/progress/OrderProgress";
import Fetch from "@/utils/Fetch";
import { redirect } from "next/navigation";

const prepareFetch = async (id: string) => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  redirect(`/e/${id}`);
};

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data }: { data: OrderType } = await prepareFetch(id);

  if (data.status === "waiting") {
    redirect(`/order/${id}/pay`);
  } else if (data.status === "paid") {
    redirect(`/order/${id}/complete`);
  } else if (data.status === "failed") {
    redirect(`/order/${id}/cancel`);
  }

  return (
    <div>
      <OrderProgress progress={0} />
      <div className="container mt-12">
        <div className="flex items-center gap-8 mb-8">
          <Image src={data.event.image} alt={data.event_id} className="h-48" />
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">{data.event.title}</h2>
            <p className="text-sm text-gray-400">{data.event.start_date}</p>
            <p className="text-sm text-gray-400">{data.event.location}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-12">
          <h2 className="text-xl font-semibold mb-4">Review Order Summary</h2>
          <h2 className="text-xl font-semibold">Order #{data.id}</h2>
          <table>
            <thead className="border-t-2 border-b-2 border-black">
              <tr>
                <th className="py-4 w-3/6 text-center">Items</th>
                <th className="py-4 w-1/6 text-center">Price</th>
                <th className="py-4 w-1/6 text-center">Quantity</th>
                <th className="py-4 w-1/6 text-center">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {data.order_item.map((item) => (
                <tr key={item.id}>
                  <td>{item.event_ticket.type}</td>
                  <td className="py-4 text-center">
                    {item.event_ticket.price}
                  </td>
                  <td className="py-4 text-center">{item.quantity}</td>
                  <td className="py-4 text-right">
                    {item.event_ticket.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="font-semibold text-xl border-t-2 border-gray-100">
              <tr className="border-b-2 border-black">
                <td colSpan={3} className="py-4 text-right">
                  Grand Total
                </td>
                <td className="py-4 text-right">{data.total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <Checkout id={data.id} />
      </div>
    </div>
  );
}
