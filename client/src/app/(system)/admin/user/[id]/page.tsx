import React from "react";
import UserForm from "@/components/form/UserForm";
import PreviousPage from "@/components/PreviousPage";

const fetchUsers = async (id: string) => {
  const response = await fetch(`${process.env.API_URL}/api/users/${id}`);
  const data = await response.json();

  return data.data;
};

export default async function UserList({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchUsers(id);

  return (
    <section className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
      <div className="w-full mt-12 flex flex-col justify-center items-start prose prose-neutral dark:prose-invert">
        <PreviousPage path="/admin/user" />
        <UserForm data={data} />
      </div>
    </section>
  );
}
