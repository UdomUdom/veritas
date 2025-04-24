import Link from "next/link";
import Image from "@/components/build/Image";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

export interface BlogCardProps {
  id: string;
  title: string;
  image: string;
}

export default function BlogCard({
  url,
  data,
}: {
  url?: string;
  data: BlogCardProps;
}) {
  return (
    <Link
      href={url ? url : `/e/${data.id}`}
      className="flex flex-col gap-4 group  transition-all duration-300"
    >
      <Card className="w-full max-w-xs shadow-md rounded-lg overflow-hidden py-0">
        <Image
          src={data.image}
          alt={data.title}
          className="object-cover w-full h-auto aspect-[1.6] transition-transform duration-300 "
        />
        <CardHeader className="grid gap-1 pb-4">
          <CardDescription className="text-gray-800 font-medium text-sm line-clamp-2">
            {data.title}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
