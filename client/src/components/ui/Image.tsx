import { Image as Img } from "antd";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function Image({ src, alt, className }: ImageProps) {
  return <Img src={src} alt={alt} className={className}></Img>;
}
