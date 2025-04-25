"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import Fetch from "@/utils/Fetch";
import { notify } from "@/utils/Notify";

export default function ChangePasswordForm({ id }: { id: string | undefined }) {
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      return notify.error("New password and confirmation do not match");
    }

    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}/reset-password`,
      {
        method: "PUT",
        body: {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
      }
    );

    if (res && res.status === "ok") {
      notify.success("Password updated successfully");
      window.location.reload();
    }

    notify.error(res.message);
    window.location.reload();
  };

  return (
    <form className="w-full">
      <div className="lg:w-1/2 flex flex-col gap-4">
        <Input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={data.currentPassword}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={data.newPassword}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Password Confirmation"
          value={data.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="w-full text-right mt-4">
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </form>
  );
}
