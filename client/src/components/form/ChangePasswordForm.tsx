import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function ChangePasswordForm() {
  return (
    <form className="w-full">
      <div className="lg:w-1/2 flex flex-col gap-4">
        <Input type="text" placeholder="Current Password" />
        <Input type="text" placeholder="New Password" />
        <Input type="text" placeholder="Password Confirmation" />
      </div>
      <div className="w-full text-right mt-4">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
