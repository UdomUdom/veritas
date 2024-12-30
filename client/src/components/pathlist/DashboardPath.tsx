import React from "react";
import PathCompactView from "./PathCompactView";
import { pathData, IconKey } from "@/data/dashboard";
import { Shapes, FileStack, BookHeart } from "lucide-react";

const icons: Record<IconKey, JSX.Element> = {
  Shapes: <Shapes size={48} />,
  FileStack: <FileStack size={48} />,
  BookHeart: <BookHeart size={48} />,
};

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
            href={path.href}
            button={path.button}
          >
            {React.cloneElement(icons[path.icon], {
              size: 94,
              className: "m-4",
            })}
          </PathCompactView>
        </div>
      ))}
    </div>
  );
}
