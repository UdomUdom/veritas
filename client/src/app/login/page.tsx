import FormCard from "@/components/form/FormCard";
import FormInput from "@/components/form/FormInput";
import FormCover from "@/components/form/FormCover";
import Button from "@/components/button/Button";
import { User, KeyRound, Vegan } from "lucide-react";
import actionLogin from "@/utils/actionLogin";
import ColorControl from "@/components/darkmode/ColorControl";

export default function Login() {
  return (
    <div className="bg-base-200 flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-8 m-4">
        <Vegan size={120} />
        <h1 className="font-bold text-4xl">Veritas</h1>
      </div>
      <FormCard>
        <FormCover action={actionLogin}>
          <FormInput
            Icon={User}
            name="username"
            type="text"
            placeholder="Username"
            className="input input-bordered"
          />
          <FormInput
            Icon={KeyRound}
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered"
          />
          <Button
            type="submit"
            className="btn btn-primary font-semibold text-lg tracking-wide duration-300"
            text="LOGIN"
          />
        </FormCover>
      </FormCard>
      <ColorControl hide={true} />
    </div>
  );
}
