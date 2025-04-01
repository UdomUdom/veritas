"use client";
import { useState } from "react";
import { handleSignin } from "@/utils/Supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onSignin = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const data = await handleSignin({
        email,
        password,
      });

      console.log(data);
      setMessage("Login successful!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={onSignin} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
