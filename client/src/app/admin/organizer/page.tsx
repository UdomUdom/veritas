import Fetch from "@/utils/Fetch";
import { columns } from "./columns";
import Table from "@/components/table";

const prepareFetch = async () => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/organizer` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return res;
  }

  return { data: [] };
};

export default async function Organizer() {
  const { data } = await prepareFetch();

  const options = {
    search: ["name"],
    filters: [],
  };

  return <Table data={data} columns={columns} option={options}></Table>;
}
