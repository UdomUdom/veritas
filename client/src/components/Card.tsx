import {
  Card as Cd,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";
import { Button } from "@heroui/react";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  altimg?: string;
  image?: string;
  title?: string;
  subtitle?: string;
  paragraph?: string;
  link?: string;
  linkdetails?: string;
  onUse?: boolean;
}

export const SimpleCard = (props: CardProps) => {
  const { title, paragraph } = props;
  return (
    <Cd>
      <CardBody>
        <h2>{title}</h2>
        <p>{paragraph}</p>
      </CardBody>
    </Cd>
  );
};

export const DividerCard = (props: CardProps) => {
  const { altimg, image, title, subtitle, paragraph, link, linkdetails } =
    props;
  return (
    <Cd className="max-w-[400px]">
      <CardHeader className="flex">
        <Image alt={altimg} height={40} radius="sm" src={image} width={40} />
        <div className="flex flex-col">
          <h2 className="text-md">{title}</h2>
          <p className="text-small text-default-500">{subtitle}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{paragraph}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href={link}>
          {linkdetails}
        </Link>
      </CardFooter>
    </Cd>
  );
};

export const ImageCard = (props: CardProps) => {
  const { altimg, image, title, subtitle, onUse } = props;
  return (
    <Cd isFooterBlurred className="border-none" radius="lg">
      <Image
        alt={altimg}
        className="object-cover"
        height={200}
        src={image}
        width={200}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">{title}</p>
        <Button
          className={`text-tiny text-white bg-black/20 ${
            onUse ? "" : "hidden"
          }`}
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
        >
          {subtitle}
        </Button>
      </CardFooter>
    </Cd>
  );
};

export default function Card() {
  return {
    SimpleCard,
    DividerCard,
    ImageCard,
  };
}
