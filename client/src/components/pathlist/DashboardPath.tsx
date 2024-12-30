import React from "react";
import PathCompactView from "./PathCompactView";
import { pathData } from "@/data/dashboard";

export default function DashboardPath() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-0 px-0 pt-8">
      {pathData.map((path, index) => (
        <div
          key={index}
          className={`w-auto h-96 flex justify-center items-center ${path.bgClass}`}
        >
          <PathCompactView
            title={path.title}
            detail={path.detail}
            Icon={path.icon}
            href={path.href}
            button={path.button}
          />
        </div>
      ))}
    </div>
  );
}
