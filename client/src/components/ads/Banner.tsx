import Image from "../ui/Image";

interface BannerProps {
  image: string;
}

export default function Banner({ image }: BannerProps) {
  return (
    <section className="m-2">
      <Image src={image} alt="banner" />
    </section>
  );
}
