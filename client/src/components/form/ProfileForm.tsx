import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function ProfileForm() {
  return (
    <form className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Input type="text" placeholder="Firstname" />
        <Input type="text" placeholder="Lastname" />
        <Input type="text" placeholder="Email" />
        <Input type="text" placeholder="Tel" />
        <Input type="text" placeholder="Gender" />
        <Input type="text" placeholder="Birthday" />
      </div>
      <div className="w-full text-right mt-4">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
