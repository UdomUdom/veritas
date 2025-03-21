import MockUser from "@/mock/mockUser.json";
import React from "react";
import UserForm from "@/components/form/UserForm";
import PreviousPage from "@/components/PreviousPage";

export default async function UserList({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const mockList = (await params).id;
  const userList = MockUser.find((item) => item.id === Number(mockList));
  return (
    <section className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
      <div className="w-full mt-12 flex flex-col justify-center items-start prose prose-neutral dark:prose-invert">
        <PreviousPage path="/admin/user" />
        {userList ? <UserForm data={userList} /> : <p>User not found</p>}
      </div>
    </section>
  );
}
