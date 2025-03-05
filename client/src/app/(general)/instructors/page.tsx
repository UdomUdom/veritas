import { Divider } from "@heroui/react";
import { InstructorsCard } from "@/components/Card";
import mockInstructors from "@/mock/mockInstructors.json";
import Link from "next/link";

export default function Instructors() {
  const instructors = mockInstructors;

  return (
    <div className="container ">
      <div className="p-8 md:p-12">
        <h1 className="font-semibold text-xl font-sans flex items-center">
          All Instructors
        </h1>
        <Divider className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {instructors.map((item) => (
            <Link href={`/instructors/${item.id}`} key={item.id}>
              <div className="relative w-full rounded-lg">
                <InstructorsCard
                  avatar={item.avatar}
                  fname={item.firstname}
                  lname={item.lastname}
                  bio={item.bio}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
