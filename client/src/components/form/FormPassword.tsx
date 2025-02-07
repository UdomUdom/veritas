"use client";
import React, { useState } from "react";
import Button from "../button/Button";
import { Eye, EyeOff } from "lucide-react";

export default function FormPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  return (
    <div className="form-control relative">
      <label className="label">
        <span className="label-text">Password</span>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder=""
          className="input-ghost w-full pr-10"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="button"
          className=""
          onClick={() => setShowPassword(!showPassword)}
          text={showPassword ? <EyeOff /> : <Eye />}
        />
      </label>
    </div>
  );
}
