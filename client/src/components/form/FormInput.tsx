interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  className: string;
  Icon?: any;
}

export default function FormInput(props: FormInputProps) {
  const { name, type, placeholder, className, Icon } = props;
  return (
    <label className="input input-bordered flex items-center gap-2">
      {Icon ? <Icon /> : null}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={className}
      />
    </label>
  );
}
