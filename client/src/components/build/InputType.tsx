import { Input } from "../ui/input";

interface InputTypeProps {
  label: string;
  type?: string;
}

export default function InputType({ label, type = "text" }: InputTypeProps) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <label>{label}</label>
      {type === "text" ? <Input className="col-span-3" /> : null}
    </div>
  );
}
