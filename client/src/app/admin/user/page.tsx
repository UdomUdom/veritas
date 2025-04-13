import Fetch from "@/utils/Fetch";
import { columns } from "./columns";
import Table from "@/components/table";

interface UserType {
  role: {
    id: string;
    name: string;
  };
}

const prepareFetch = async () => {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/user` || "";

  const res = await Fetch(API!);

  if (res && res.status === "ok") {
    return {
      data: res.data.map((user: UserType) => ({
        ...user,
        role: {
          id: user.role.id,
          name: user.role.name,
        },
      })),
    };
  }

  return { data: [] };
};

export default async function User() {
  const { data } = await prepareFetch();

  const options = {
    search: ["email"],
    filters: [],
  };

  return <Table data={data} columns={columns} option={options}></Table>;
}
