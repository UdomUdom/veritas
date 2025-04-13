import Fetch from "@/utils/Fetch";
import { columns } from "./columns";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrganizerForm } from "./form";

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

  return (
    <Table data={data} columns={columns} option={options}>
      <div className="flex w-full items-center justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Organizer</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Organizer</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <OrganizerForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Table>
  );
}
