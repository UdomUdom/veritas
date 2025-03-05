"use client";
import { Image as Img } from "@heroui/react";

export default function Image({
  avatar,
  className,
  alt_img,
}: {
  avatar: string;
  className: string;
  alt_img?: string;
}) {
  return <Img alt={alt_img} className={className} src={avatar} />;
}
