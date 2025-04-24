export default function Image({
  src,
  alt,
  className,
  ...props
}: React.ComponentProps<"img">) {
  return <img src={src} alt={alt} className={className} {...props}></img>;
}
