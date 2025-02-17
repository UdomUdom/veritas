import {
  Card as Cd,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Chip,
} from "@heroui/react";
import { Button } from "@heroui/react";
import React from "react";

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
  price?: string;
  list?: any[];
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

export const ActionCard = (props: CardProps): React.ReactElement => {
  const { list = [] } = props;

  const getStartDate = (schedule: string) => {
    const [startDate, endDateWithTime] = schedule.split(" - ");
    const [endDate, timeRange] = endDateWithTime.split(" ");
    const [startTime] = timeRange.split("-");
    return `${startDate}`;
  };

  const getStartTime = (schedule: string) => {
    const [startDate, endDateWithTime] = schedule.split(" - ");
    const [endDate, timeRange] = endDateWithTime.split(" ");
    const [startTime] = timeRange.split("-");
    return `${startTime}`;
  };

  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {list.map((item, index) => (
        <Cd
          isFooterBlurred
          key={index}
          isPressable
          shadow="sm"
          onPress={() => console.log("item pressed")}
          className="relative w-full h-auto aspect-square md:aspect-[3/4]"
        >
          <CardHeader className="absolute z-10 top-1 flex flex-col items-start text-start p-4 space-y-2">
            <Chip radius="md" className="mb-2 bg-default font-semibold text-xs">
              {item.category}
            </Chip>
            <p className="text-primary-400 font-semibold text-sm uppercase tracking-wider">
              Workshop
            </p>
            <h4 className="text-white font-semibold text-xl md:text-2xl">
              {item.title}
            </h4>
            <p className="text-white/65 text-sm md:text-base leading-relaxed">
              {item.description}
            </p>
          </CardHeader>
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src={item.image}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 border-t-1 border-default-600 dark:border-default-100 text-small p-4 w-full">
            <div className="flex flex-col justify-between w-full">
              <div className="flex items-center justify-between text-white">
                <b>{getStartDate(item.schedule)}</b>
                <p>{getStartTime(item.schedule)}</p>
              </div>
              <div className="text-sm md:text-base">
                {item.instructor.firstname} {item.instructor.lastname}
              </div>
            </div>
          </CardFooter>
        </Cd>
      ))}
    </div>
  );
};

export default function Card() {
  return {
    SimpleCard,
    DividerCard,
    ImageCard,
    ActionCard,
  };
}
