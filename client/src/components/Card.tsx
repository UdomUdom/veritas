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
  AvatarGroup,
  avatar,
} from "@heroui/react";
import { Button } from "@heroui/react";
import React from "react";
import { UserRoundPen, Calendar, Timer, Pin } from "lucide-react";
import { start } from "repl";

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
  sub_time?: string;
  price?: number;
  date?: string;
  sub_date?: string;
  list?: any[];
  avatar?: string;
  header?: string;
  location?: string;
  onClick?: (id: string) => void;
}

const getDateRange = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const startMonth = start.getMonth();
  const startYear = start.getFullYear();
  const startDay = start.getDate();

  const endMonth = end.getMonth();
  const endYear = end.getFullYear();
  const endDay = end.getDate();

  if (startMonth === endMonth && startYear === endYear) {
    return `${startDay} - ${endDay} ${monthNames[startMonth]} ${startYear}`;
  } else {
    const formattedStartDate = `${startDay} ${monthNames[startMonth]} `;
    const formattedEndDate = `${endDay} ${monthNames[endMonth]} `;
    return `${formattedStartDate} - ${formattedEndDate} ${startYear}`;
  }
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

export const BlogImageCard = (props: CardProps) => {
  const { image } = props;
  return (
    <Cd shadow="lg" className="rounded-md col-span-12 sm:col-span-4 h-[300px]">
      <Image
        removeWrapper
        className="z-0 w-full h-full object-cover rounded-sm"
        src={image}
      />
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
  const {
    altimg,
    image,
    title,
    paragraph,
    header,
    location,
    date,
    sub_date,
    time,
    sub_time,
    price,
  } = props;
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
            <div className="flex flex-col gap-2 items-start md:items-end text-start md:text-end">
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
              <Pin size={14} className="mr-2" />
              {location}
            </p>
            <p className="flex items-center">
              <Calendar size={14} className="mr-2" />
              {date && sub_date
                ? getDateRange(new Date(date), new Date(sub_date))
                : "Invalid date"}
            </p>
            <p className="flex items-center">
              <Timer size={14} className="mr-2" />
              {time} - {sub_time}
            </p>
          </div>
        </div>
      </CardFooter>
    </Cd>
  );
};

export const BlogCard = (props: CardProps) => {
  const { onClick, list = [] } = props;
  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {list.map((item, index) => (
        <Cd
          isBlurred
          isPressable
          key={index}
          onPress={() => onClick?.(item.id)}
          className="rounded-lg py-4 border-none bg-background/60 dark:bg-default-100/50 shadow-lg transition-shadow hover:-translate-y-2"
        >
          <CardHeader className="pb-0 pt-2 px-4 flex flex-col justify-center items-start">
            <h2 className="font-bold text-xl pb-2">{item.title}</h2>
          </CardHeader>
          <CardBody className="overflow-visible py-2 px-4">
            <div className="relative w-full h-48 overflow-hidden rounded-xl">
              <Image
                className="object-cover w-full h-full"
                src={item.image_url}
                alt={item.title}
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <p className="text-sm text-default-500 line-clamp-3">
                {item.description}
              </p>
            </div>
          </CardBody>
          <CardFooter className="gap-3 px-4 py-2">
            <div className="flex flex-row w-full justify-between items-center">
              <p className="text-xs text-default-500">{item.author_name}</p>
              <Avatar size="md" src={item.author_avatar} className="w-8 h-8" />
            </div>
          </CardFooter>
        </Cd>
      ))}
    </div>
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
          className="relative w-full h-auto aspect-[3/4] hover:-translate-y-3 "
        >
          <CardHeader className="absolute z-10 top-1 flex flex-col items-start text-start p-4 space-y-2">
            <Chip radius="md" className="mb-2 bg-default font-semibold text-xs">
              {item.category.name}
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
            src={item.image_url}
          />
          <CardFooter className="absolute bg-default/10 bottom-0 border-default-600 dark:border-default-100 text-small p-4 w-full rounded-sm">
            <div className="flex flex-col justify-between w-full">
              <div className="flex flex-col text-sm items-start text-white gap-1">
                <div className="flex items-center">
                  <AvatarGroup
                    className="p-1"
                    max={3}
                    renderCount={(count) => (
                      <p className="text-small text-foreground font-medium ms-2">
                        +{count} others
                      </p>
                    )}
                  >
                    {item.workshop_instructor.map((staff: any) => (
                      <Avatar
                        key={staff.instructor.id}
                        size="sm"
                        src={staff.instructor.avatar}
                      />
                    ))}
                  </AvatarGroup>
                </div>
                <p className="flex items-center">
                  <Calendar size={14} className="mr-4" />
                  {getDateRange(item.start_date, item.end_date)}
                </p>
                <p className="flex items-center">
                  <Timer size={14} className="mr-4" />
                  {item.start_time} - {item.end_time}
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
    BlogCard,
    BlogImageCard,
  };
}
