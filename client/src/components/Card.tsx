"use client";
import {
  Card as Cd,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Chip,
  Avatar,
} from "@heroui/react";
import { Button } from "@heroui/react";
import React from "react";
import { UserRoundPen, Calendar, Timer } from "lucide-react";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  altimg?: string;
  image?: string;
  logo?: any;
  title?: string;
  subtitle?: string;
  paragraph?: string;
  link?: string;
  linkdetails?: string;
  onUse?: boolean;
  time?: string;
  price?: number;
  list?: any[];
  header?: string;
  onClick?: (id: string) => void;
}

export const getStartDate = (schedule: string) => {
  const [startDate, endDateWithTime] = schedule.split(" - ");
  const [endDate, timeRange] = endDateWithTime.split(" ");
  const [startTime] = timeRange.split("-");
  return `${startDate}`;
};

export const getStartTime = (schedule: string) => {
  const [startDate, endDateWithTime] = schedule.split(" - ");
  const [endDate, timeRange] = endDateWithTime.split(" ");
  const [startTime] = timeRange.split("-");
  return `${startTime}`;
};

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

export const FeatureCard = (props: CardProps) => {
  const { logo, title, paragraph } = props;
  return (
    <Cd
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex justify-center p-2 rounded-full items-center bg-default-100/80">
            {logo}
          </div>
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {title}
            </h4>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        {paragraph}
      </CardBody>
      <CardFooter className="gap-3"></CardFooter>
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

export const BannerCard = (props: CardProps) => {
  const { altimg, image, title, paragraph, header, time, price } = props;
  return (
    <Cd
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-start justify-start">
          <div className="relative col-span-1 md:col-span-4">
            <Image
              alt={altimg}
              className="object-cover rounded-md w-full h-auto md:h-[200px]"
              src={image}
            />
          </div>

          <div className="flex flex-col col-span-1 md:col-span-8">
            <div className="flex flex-col gap-2 items-start md:items-end">
              <Chip className="font-semibold text-foreground/90 bg-primary/20 rounded-full px-4 py-1.5 text-sm">
                {header}
              </Chip>
              <h1 className="text-2xl font-bold mt-3 text-foreground/90 leading-tight">
                {title}
              </h1>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {paragraph}
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                ฿ {price}
              </p>
              <Button
                color="primary"
                variant="flat"
                className="w-full md:w-auto"
              >
                Booking
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex flex-col mt-3 gap-1 col-span-1 md:col-span-12">
          <div className="flex flex-col text-sm items-start text-black dark:text-white">
            <p className="flex items-center">
              <Calendar size={14} className="mr-2" />
              {getStartDate(time || "")}
            </p>
            <p className="flex items-center">
              <Timer size={14} className="mr-2" />
              {getStartTime(time || "")}
            </p>
          </div>
        </div>
      </CardFooter>
    </Cd>
  );
};

export const ActionCard = (props: CardProps) => {
  const { onClick, list = [] } = props;
  return (
    <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {list.map((item, index) => (
        <Cd
          isFooterBlurred
          radius="sm"
          key={index}
          isPressable
          shadow="md"
          onPress={() => onClick?.(item.id)}
          className="relative w-full h-auto aspect-[3/4]"
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
            <p className="text-white/65 text-sm leading-relaxed">
              {item.description}
            </p>
          </CardHeader>
          <Image
            radius="sm"
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src={item.image}
          />
          <CardFooter className="absolute bg-default/40 bottom-0 border-t-1 border-default-600 dark:border-default-100 text-small p-4 w-full rounded-sm">
            <div className="flex flex-col justify-between w-full">
              <div className="flex flex-col text-sm items-start text-default">
                <p className="flex ">
                  <UserRoundPen size={14} className="mr-4" />
                  {item.instructor[0].firstname} {item.instructor[0].lastname}
                </p>
                <p className="flex ">
                  <Calendar size={14} className="mr-4" />
                  {getStartDate(item.schedule)}
                </p>

                <p className="flex ">
                  <Timer size={14} className="mr-4" />
                  {getStartTime(item.schedule)}
                </p>
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
    FeatureCard,
    BannerCard,
  };
}
