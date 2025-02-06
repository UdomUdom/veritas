import { TableRow } from "@/types/type";
import Profile from "../profile";
interface TableDetailsProps {
  user: TableRow;
  onClose: () => void;
}
export default function TableDetails({ user, onClose }: TableDetailsProps) {
  return (
    <div className="card bg-base-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <Profile user={user} />
      </div>
    </div>
  );
}
