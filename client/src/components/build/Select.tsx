import {
  Select as S,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectProps {
  placeholder?: string;
  className?: string;
  options?: string[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

export default function Select({
  placeholder,
  className,
  options,
  defaultValue,
  onValueChange,
  ...children
}: SelectProps) {
  return (
    <S defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger
        className={`${className} w-full`}
        defaultValue={defaultValue}
        {...children}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options?.map((option, index) => (
            <SelectItem
              key={index}
              value={option}
              onSelect={() => {
                onValueChange!(option);
              }}
            >
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </S>
  );
}
