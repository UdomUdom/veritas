import { EventForm } from "@/app/admin/event/form";
import Fetch from "@/utils/Fetch";

const prepareFetch = async (id: string) => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/event/${id}` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: [] };
};
export default async function EventEdit({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await prepareFetch(params.id);
  return (
    <div>
      <EventForm core={data} />
    </div>
  );
}
