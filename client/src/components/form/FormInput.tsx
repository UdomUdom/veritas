interface FormInputProps {
  title: string;
  name: string;
  type: string;
  placeholder: string;
  className: string;
  Icon?: any;
}

export default function FormInput(props: FormInputProps) {
  const { title, name, type, placeholder, className, Icon } = props;
  return (
    <div className="form-control relative">
      <label className="label">
        <span className="label-text">{title}</span>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        {Icon ? <Icon /> : null}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={className}
        />
      </label>
    </div>
  );
}
