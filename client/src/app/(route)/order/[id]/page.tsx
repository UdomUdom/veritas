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

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await prepareFetch(id);

  if (data.status === "pending") {
    redirect(`/order/${id}/checkout`);
  } else if (data.status === "waiting") {
    redirect(`/order/${id}/pay`);
  } else if (data.status === "paid") {
    redirect(`/order/${id}/complete`);
  }
}
