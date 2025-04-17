import Fetch from "@/utils/Fetch";
import { columns } from "./columns";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const prepareFetch = async () => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/event` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: [] };
};

export default async function Event() {
  const { data } = await prepareFetch();

  const options = {
    search: ["title"],
    filters: [],
  };

  return (
    <Table data={data} columns={columns} option={options}>
      <div className="flex w-full items-center justify-end">
        <Link href="/admin/event/create">
          <Button className="cursor-pointer">New Event</Button>
        </Link>
      </div>
    </Table>
  );
}
