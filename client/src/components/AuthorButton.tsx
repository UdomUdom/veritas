"use client";
import { Button, Avatar } from "@heroui/react";
import Link from "next/link";

interface AuthorButtonProps {
  author?: string;
  link: string;
  link_name?: string;
  avatar?: string;
}

export default function AuthorButton(props: AuthorButtonProps) {
  const { author, link, link_name, avatar } = props;
  return (
    <Link href={link}>
      <Button
        variant="light"
        startContent={<Avatar src={avatar} />}
        className="-ml-4"
      >
        <div className="flex flex-col items-start">
          <p>{author}</p>
          <p>{link_name}</p>
        </div>
      </Button>
    </Link>
  );
}
