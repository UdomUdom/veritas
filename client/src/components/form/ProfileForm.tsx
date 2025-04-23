import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PhoneInput } from "../ui/phone-input";

interface UserProps {
  user?: {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    gender?: string;
    birthdate?: string;
  };
}

export default function ProfileForm({ user }: UserProps) {
  return (
    <form className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="Firstname"
          defaultValue={user?.firstname || ""}
        />
        <Input
          type="text"
          placeholder="Lastname"
          defaultValue={user?.lastname || ""}
        />
        <Input
          type="text"
          placeholder="Email"
          defaultValue={user?.email || ""}
        />
        <PhoneInput defaultCountry="TH" value={user?.phone || ""} />
        <Input
          type="text"
          placeholder="Gender"
          defaultValue={user?.gender || ""}
        />
        {/* <DatePicker value={date} onChange={handleDateChange} /> */}
      </div>

      <div className="w-full text-right mt-4">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
