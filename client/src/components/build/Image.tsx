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
      width={typeof width === "string" ? parseInt(width, 10) : width || 500}
      height={typeof height === "string" ? parseInt(height, 10) : height || 500}
      {...props}
    ></Images>
  );
}
