import Images from "next/image";

export default function Image({
  src,
  alt,
  className,
  width,
  height,
  ...props
}: React.ComponentProps<"img">) {
  return (
    <Images
      src={String(src) || ""}
      alt={alt || "Image"}
      className={className}
      width={width || 500}
      height={height || 500}
      {...props}
    ></Images>
  );
}
