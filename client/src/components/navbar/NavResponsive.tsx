"use client";
import { AlignJustify } from "lucide-react";

export default function NavResponsive() {
  return (
    <div className="flex-none lg:hidden">
      <button
        className="btn btn-square btn-ghost"
        onClick={() =>
          document.getElementById("mobile-menu")?.classList.toggle("hidden")
        }
      >
        <AlignJustify />
      </button>
    </div>
  );
}
